import React, { useState } from 'react';
import { Button, TextField, SelectChangeEvent } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { UploadFile, Send } from '@mui/icons-material';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { StyledInput, StyledFormControl } from './PdfSplit.styled';
import Select from '../../../common/Select';
import Interface, { NotificationDetail } from '../../../common/Interface';
import { downloadFile } from '../../../utility/dom';
import { cleanString } from '../../../utility/string';
import { fileIsValid } from '../../../utility/file';
import { uploadFile } from '../../../utility/upload';

type PageSplitOption = 'no-split' | 'horizontal' | 'vertical';

interface PageOptions {
  split: string;
}

const splitOptions = [
  {
    text: 'No Page Split',
    value: 'no-split',
  },
  {
    text: 'Page Split (Horizontal)',
    value: 'horizontal',
  },
  {
    text: 'Page Split (Vertical)',
    value: 'vertical',
  },
];

const defaultPageOptions = {
  split: 'no-split',
};

const PdfSplit = (): JSX.Element => {
  const [pageName, setPageName] = useState('Page');
  const [pageOptions, setPageOptions] = useState<PageOptions>(defaultPageOptions);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('Upload A PDF File');
  const [isUploading, setIsUploading] = useState('initial');
  const [notificationDetail, setNotificationDetail] = useState<NotificationDetail | null>(null);

  const setPageNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pageNameInput = cleanString(e.target.value);
    if (pageNameInput.length > 30) {
      setNotificationDetail({
        message: 'The page name cannot be more than 30 characters',
        severity: 'error',
      });
    } else {
      setPageName(pageNameInput);
    }
  };

  const splitOptionSelectHandler = (e: SelectChangeEvent<string>): void => {
    const newPageOptions = { ...pageOptions };
    newPageOptions.split = e.target.value as PageSplitOption;
    setPageOptions(newPageOptions);
  };

  const fileUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length) {
      if (fileIsValid(files[0], 150, ['application/pdf'])) {
        setFileName(files[0].name);
        setFile(files[0]);
      } else {
        setNotificationDetail({
          message: 'The input file is either too big (>150Mb) or has an invalid type',
          severity: 'error',
        });
      }
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading('processing');

    const fileId = uuid();
    const fileUploadedSuccessfully = await uploadFile(`${fileId}.pdf`, file as File);
    if (!fileUploadedSuccessfully) {
      setNotificationDetail({
        message: 'Sorry, an error has happened, please raise an issue on GitHub.',
        severity: 'error',
      });
    } else {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/pdf/split`, {
          fileName: `${fileId}.pdf`,
          pageName,
          pageOptions,
        })
        .then((response) => {
          const responseBuffer = Buffer.from(response.data, 'base64');

          downloadFile(responseBuffer, fileName.replace('.pdf', '.zip'));

          setFile(null);
          setFileName('Upload A PDF File');
          setNotificationDetail({
            message: 'Process Finished',
            severity: 'success',
          });
        })
        .catch((err) => {
          setNotificationDetail({
            message: err?.response?.data.errors[0] ?? 'Sorry, an error has happened, please raise an issue on GitHub.',
            severity: 'error',
          });
        })
        .finally(() => {
          setIsUploading('initial');
        });
    }
  };

  const clearUploadedFileHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).value = '';
  };

  return (
    <Interface
      submitHandler={submitHandler}
      title="PDF Split Tool"
      notificationMessage={notificationDetail}
      setNotificationMessage={setNotificationDetail}
    >
      <StyledFormControl>
        <TextField
          label="Output Page Name"
          helperText="Enter up to 30 characters"
          value={pageName}
          onChange={setPageNameHandler}
          disabled={isUploading === 'processing'}
        />
      </StyledFormControl>
      <StyledFormControl>
        <Select
          title="Page Options"
          selectHandler={splitOptionSelectHandler}
          selectedValue={pageOptions.split}
          options={splitOptions}
          disabled={isUploading === 'processing'}
        />
      </StyledFormControl>
      <label htmlFor="pdf-upload">
        <StyledFormControl>
          <StyledInput
            accept=".pdf"
            type="file"
            id="pdf-upload"
            data-testid="pdf-upload"
            onChange={fileUploadHandler}
            onClick={clearUploadedFileHandler}
          />
          <Button variant="outlined" component="span" endIcon={<UploadFile />} disabled={isUploading === 'processing'}>
            {fileName}
          </Button>
        </StyledFormControl>
      </label>
      <StyledFormControl>
        <LoadingButton
          loading={isUploading === 'processing'}
          variant="contained"
          endIcon={<Send />}
          disabled={!(pageName && pageOptions && file)}
          type="submit"
        >
          Submit
        </LoadingButton>
      </StyledFormControl>
    </Interface>
  );
};

export default PdfSplit;
