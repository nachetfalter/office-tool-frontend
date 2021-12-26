import React, { useState } from 'react';
import { Button, TextField, SelectChangeEvent, Snackbar, Alert, SnackbarCloseReason } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { UploadFile, Send } from '@mui/icons-material';
import axios, { AxiosRequestConfig } from 'axios';
import download from 'downloadjs';
import { CustomisedInput, CustomisedFormControl, CustomisedCard, Title } from './PdfSplit.styled';
import Select from '../../../common/Select';

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
  const [pageOption, setPageOption] = useState('no-split');
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('Upload File');
  const [isUploading, setIsUploading] = useState('initial');
  const [showNotification, setShowNotification] = useState(false);

  const setPageNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageName(e.target.value);
  };

  const pageOptionSelectHandler = (e: SelectChangeEvent<string>): void => {
    setPageOption(e.target.value);
  };

  const fileUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length) {
      setFileName(files[0].name);
      setFile(files[0]);
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading('processing');
    const formData = new FormData();
    formData.append('file', file as Blob, fileName);
    formData.append('pageName', pageName);
    formData.append('pageOptions', JSON.stringify({ split: pageOption }));
    const headers = {
      headers: { 'content-type': 'multipart/form-data' },
      responseType: 'arraybuffer',
    } as AxiosRequestConfig;
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/pdf/split`, formData, headers)
      .then((response) => {
        download(response.data, fileName.replace('.pdf', '.zip'));
        setFile(null);
        setFileName('Upload File');
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
        autoHideDuration={3000}
        onClose={closeNotificationHandler}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Process Finished
        </Alert>
      </Snackbar>
    </form>
  );
};

export default PdfSplit;
