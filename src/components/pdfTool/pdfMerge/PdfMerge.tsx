import React, { useState } from 'react';
import { Button, Snackbar, TextField, Alert, SnackbarCloseReason } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { UploadFile, Send } from '@mui/icons-material';
import FadeIn from 'react-fade-in';
import axios, { AxiosRequestConfig } from 'axios';
import { CustomisedInput, CustomisedFormControl, CustomisedCard, Title } from './PdfMerge.styled';
import DragAndDropList from '../../../common/DragAndDropList';

interface CustomisedFile {
  content: File;
  name: string;
}
type CustomisedFileList = Array<CustomisedFile>;

const PdfMerge = (): JSX.Element => {
  const [files, setFiles] = useState<CustomisedFileList>([]);
  const [outputPdfName, setOutputPdfName] = useState<string>('');
  const [isUploading, setIsUploading] = useState<string>('initial');
  const [showNotification, setShowNotification] = useState(false);

  const fileUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    const fileList = [];
    if (files && files.length) {
      for (const file of files) {
        fileList.push({
          name: file.name,
          content: file,
        });
      }
      setFiles(fileList);
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading('processing');
    // const formData = new FormData();
    // formData.append('file', file as Blob, fileName);
    // formData.append('pageName', pageName);
    // formData.append('pageOptions', JSON.stringify({ split: pageOption }));
    // const headers = {
    //   headers: { 'content-type': 'multipart/form-data', accept: 'application/octet-stream' },
    // } as AxiosRequestConfig;
    // axios
    //   .post(`${process.env.REACT_APP_BACKEND_URL}/pdf/split`, formData, headers)
    //   .then((response) => {
    //     const responseBuffer = Buffer.from(response.data, 'base64');

    //     const url = window.URL.createObjectURL(new Blob([responseBuffer]));
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute('download', fileName.replace('.pdf', '.zip'));
    //     document.body.appendChild(link);
    //     link.click();

    //     setFile(null);
    //     setFileName('Upload File');
    //     setShowNotification(true);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    //   .finally(() => {
    //     setIsUploading('initial');
    //   });
  };

  const clearUploadedFileHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).value = '';
  };

  const closeNotificationHandler = (_: Event | React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => {
    if (reason === 'timeout') {
      setShowNotification(false);
    }
  };

  const setOutputPdfNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOutputPdfName(e.target.value);
  };

  const draggingHandler = (sourceIndex: number, targetIndex: number) => {
    const itemBeingDragged = files[sourceIndex];
    files.splice(sourceIndex, 1);
    files.splice(targetIndex, 0, itemBeingDragged);
    setFiles([...files]);
  };

  const deleteFileHandler = (_: React.MouseEvent<HTMLButtonElement>, indexToBeDeleted: number) => {
    files.splice(indexToBeDeleted, 1);
    setFiles([...files]);
  };

  return (
    <form onSubmit={submitHandler}>
      <CustomisedCard>
        <Title variant="h3">PDF Merge Tool</Title>
        <CustomisedFormControl>
          <TextField
            label="Output File Name"
            value={outputPdfName}
            onChange={setOutputPdfNameHandler}
            disabled={isUploading === 'processing'}
          />
        </CustomisedFormControl>
        <label htmlFor="images-upload">
          <CustomisedFormControl>
            <CustomisedInput
              accept="image/jpeg, image/png"
              type="file"
              id="images-upload"
              data-testid="images-upload"
              onChange={fileUploadHandler}
              onClick={clearUploadedFileHandler}
              multiple
            />
            <Button
              variant="outlined"
              component="span"
              endIcon={<UploadFile />}
              disabled={isUploading === 'processing'}
            >
              Upload Files
            </Button>
          </CustomisedFormControl>
        </label>

        {!!files.length && (
          <FadeIn>
            <CustomisedFormControl>
              <Alert severity="info">Reorder the pages by dragging and dropping if needed</Alert>
              <DragAndDropList
                items={files.map((file) => file.name)}
                onDragging={draggingHandler}
                onDelete={deleteFileHandler}
              />
            </CustomisedFormControl>
          </FadeIn>
        )}
        <CustomisedFormControl>
          <LoadingButton
            loading={isUploading === 'processing'}
            variant="contained"
            endIcon={<Send />}
            disabled={!files.length || !outputPdfName}
            type="submit"
          >
            Submit
          </LoadingButton>
        </CustomisedFormControl>
      </CustomisedCard>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showNotification}
        autoHideDuration={2000}
        onClose={closeNotificationHandler}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Process Finished
        </Alert>
      </Snackbar>
    </form>
  );
};

export default PdfMerge;
