import React, { useState } from 'react';
import { Button, Snackbar, TextField, Alert, AlertColor, SnackbarCloseReason } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { UploadFile, Send } from '@mui/icons-material';
import FadeIn from 'react-fade-in';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { CustomisedInput, CustomisedFormControl, CustomisedCard, Title } from './PdfMerge.styled';
import DragAndDropList from '../../../common/DragAndDropList';
import { downloadFile } from '../../../utility/dom';
import { cleanString } from '../../../utility/string';
import { fileIsValid } from '../../../utility/file';
import { uploadFile } from '../../../utility/upload';

interface CustomisedFile {
  content: File;
  name: string;
}
interface NotificationDetail {
  message: string;
  severity: AlertColor | undefined;
}

type CustomisedFileList = Array<CustomisedFile>;

const PdfMerge = (): JSX.Element => {
  const [files, setFiles] = useState<CustomisedFileList>([]);
  const [outputFileName, setOutputFilename] = useState<string>('');
  const [isUploading, setIsUploading] = useState<string>('initial');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationDetail, setNotificationDetail] = useState<NotificationDetail>({
    message: 'Process Finished',
    severity: 'success',
  });

  const fileUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    const fileList = [];
    if (files && files.length) {
      if (files.length > 200) {
        setNotificationDetail({
          message: 'You can only upload up to 200 files',
          severity: 'error',
        });
        setShowNotification(true);
      } else {
        for (const file of files) {
          if (!fileIsValid(file, 1, ['image/png', 'image/jpeg'])) {
            setNotificationDetail({
              message: 'One of the input image is either too big (>1Mb) or has an invalid type',
              severity: 'error',
            });
            setShowNotification(true);
            return;
          } else {
            fileList.push({
              name: file.name,
              content: file,
            });
          }
        }
        setFiles(fileList);
      }
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading('processing');

    const fileNames = [];
    for (const file of files) {
      const fileId = uuid();
      const fileUploadedSuccessfully = await uploadFile(`${fileId}.png`, file.content as File);
      if (!fileUploadedSuccessfully) {
        setNotificationDetail({
          message: 'Sorry, an error has happened, please raise an issue on GitHub.',
          severity: 'error',
        });
        setShowNotification(true);
        return;
      } else {
        fileNames.push(`${fileId}.png`);
      }
    }

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/pdf/merge`, {
        outputFileName,
        fileNames,
      })
      .then((response) => {
        const responseBuffer = Buffer.from(response.data, 'base64');

        downloadFile(responseBuffer, `${outputFileName}.pdf`);

        setFiles([]);
        setOutputFilename('');
        setNotificationDetail({
          message: 'Process Finished',
          severity: 'success',
        });
        setShowNotification(true);
      })
      .catch((err) => {
        setNotificationDetail({
          message: err?.response?.data?.errors[0] ?? 'Sorry, an error has happened, please raise an issue on GitHub.',
          severity: 'error',
        });
        setShowNotification(true);
      })
      .finally(() => {
        setIsUploading('initial');
      });
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

  const setOutputFilenameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const outputFileName = cleanString(e.target.value);
    if (outputFileName.length > 30) {
      setNotificationDetail({
        message: 'The output file name cannot be more than 30 characters',
        severity: 'error',
      });
      setShowNotification(true);
    } else {
      setOutputFilename(outputFileName);
    }
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
            label="Output PDF Name"
            value={outputFileName}
            onChange={setOutputFilenameHandler}
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
              Upload PNG/JPEGs
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
            disabled={!files.length || !outputFileName}
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

export default PdfMerge;
