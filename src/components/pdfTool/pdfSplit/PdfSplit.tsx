import React, { useState } from 'react';
import { Button, TextField, SelectChangeEvent, Snackbar, Alert, AlertColor, SnackbarCloseReason } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { UploadFile, Send } from '@mui/icons-material';
import axios, { AxiosRequestConfig } from 'axios';
import { CustomisedInput, CustomisedFormControl, CustomisedCard, Title } from './PdfSplit.styled';
import Select from '../../../common/Select';
import { cleanString } from '../../../utility/string';
import { fileIsValid } from '../../../utility/file';

type PageSplitOption = 'no-split' | 'horizontal' | 'vertical';

interface NotificationDetail {
  message: string;
  severity: AlertColor | undefined;
}

const pageOptions = [
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

const PdfSplit = (): JSX.Element => {
  const [pageName, setPageName] = useState('Page');
  const [pageOption, setPageOption] = useState<PageSplitOption>('no-split');
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('Upload A PDF File');
  const [isUploading, setIsUploading] = useState('initial');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationDetail, setNotificationDetail] = useState<NotificationDetail>({
    message: 'Process Finished',
    severity: 'success',
  });

  const setPageNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pageNameInput = cleanString(e.target.value);
    if (pageNameInput.length > 30) {
      setNotificationDetail({
        message: 'The page name cannot be more than 30 characters',
        severity: 'error',
      });
      setShowNotification(true);
    } else {
      setPageName(pageNameInput);
    }
  };

  const pageOptionSelectHandler = (e: SelectChangeEvent<string>): void => {
    setPageOption(e.target.value as PageSplitOption);
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
        setShowNotification(true);
      }
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading('processing');
    const formData = new FormData();
    formData.append('file', file as Blob, fileName);
    formData.append('pageName', pageName.trim());
    formData.append('pageOptions', JSON.stringify({ split: pageOption }));
    const headers = {
      headers: { 'content-type': 'multipart/form-data', accept: 'application/octet-stream' },
    } as AxiosRequestConfig;
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/pdf/split`, formData, headers)
      .then((response) => {
        const responseBuffer = Buffer.from(response.data, 'base64');

        const url = window.URL.createObjectURL(new Blob([responseBuffer]));
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.setAttribute('download', fileName.replace('.pdf', '.zip'));
        document.body.appendChild(link);
        link.click();

        setFile(null);
        setFileName('Upload A PDF File');
        setNotificationDetail({
          message: 'Process Finished',
          severity: 'success',
        });
        setShowNotification(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsUploading('initial');
      });
  };

  const clearUploadedFileHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).value = '';
  };

  const closeNotificationHandler = (_: Event | React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => {
    if (reason === 'timeout') {
      setShowNotification(false);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <CustomisedCard>
        <Title variant="h3">PDF Split Tool</Title>
        <CustomisedFormControl>
          <TextField
            label="Output Page Name"
            helperText="Enter up to 30 characters"
            value={pageName}
            onChange={setPageNameHandler}
            disabled={isUploading === 'processing'}
          />
        </CustomisedFormControl>
        <CustomisedFormControl>
          <Select
            title="Page Options"
            selectHandler={pageOptionSelectHandler}
            selectedValue={pageOption}
            options={pageOptions}
            disabled={isUploading === 'processing'}
          />
        </CustomisedFormControl>
        <label htmlFor="pdf-upload">
          <CustomisedFormControl>
            <CustomisedInput
              accept=".pdf"
              type="file"
              id="pdf-upload"
              data-testid="pdf-upload"
              onChange={fileUploadHandler}
              onClick={clearUploadedFileHandler}
            />
            <Button
              variant="outlined"
              component="span"
              endIcon={<UploadFile />}
              disabled={isUploading === 'processing'}
            >
              {fileName}
            </Button>
          </CustomisedFormControl>
        </label>
        <CustomisedFormControl>
          <LoadingButton
            loading={isUploading === 'processing'}
            variant="contained"
            endIcon={<Send />}
            disabled={!(pageName && pageOption && file)}
            type="submit"
          >
            Submit
          </LoadingButton>
        </CustomisedFormControl>
      </CustomisedCard>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showNotification}
        autoHideDuration={4000}
        onClose={closeNotificationHandler}
      >
        <Alert severity={notificationDetail.severity} sx={{ width: '100%' }}>
          {notificationDetail.message}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default PdfSplit;
