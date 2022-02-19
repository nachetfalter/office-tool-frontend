import React, { useState } from 'react';
import { Button, TextField, SelectChangeEvent, Snackbar, Alert, AlertColor, SnackbarCloseReason } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { UploadFile, Send } from '@mui/icons-material';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { CustomisedInput, CustomisedFormControl, CustomisedCard, Title } from './PdfSplit.styled';
import Select from '../../../common/Select';
import { downloadFile } from '../../../utility/dom';
import { cleanString } from '../../../utility/string';
import { fileIsValid } from '../../../utility/file';
import { uploadFile } from '../../../utility/upload';

type PageSplitOption = 'no-split' | 'horizontal' | 'vertical';

interface PageOptions {
  split: string;
}

interface NotificationDetail {
  message: string;
  severity: AlertColor | undefined;
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
        setShowNotification(true);
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
      setShowNotification(true);
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
          setShowNotification(true);
        })
        .catch((err) => {
          setNotificationDetail({
            message: err?.response?.data.errors[0] ?? 'Sorry, an error has happened, please raise an issue on GitHub.',
            severity: 'error',
          });
          setShowNotification(true);
        })
        .finally(() => {
          setIsUploading('initial');
        });
    }
  };

  const clearUploadedFileHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).value = '';
  };

  // eslint-disable-next-line
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
            selectHandler={splitOptionSelectHandler}
            selectedValue={pageOptions.split}
            options={splitOptions}
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
            disabled={!(pageName && pageOptions && file)}
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
