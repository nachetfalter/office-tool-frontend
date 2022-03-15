import React, { useState } from 'react';
import { Button, TextField, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { UploadFile, Send } from '@mui/icons-material';
import FadeIn from 'react-fade-in';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { StyledInput, StyledFormControl } from './PdfMerge.styled';
import DragAndDropList from '../../../common/DragAndDropList';
import Interface, { NotificationDetail } from '../../../common/Interface';
import { downloadFile } from '../../../utility/dom';
import { cleanString } from '../../../utility/string';
import { fileIsValid } from '../../../utility/file';
import { uploadFile } from '../../../utility/upload';

interface StyledFile {
  content: File;
  name: string;
}

type StyledFileList = Array<StyledFile>;

const PdfMerge = (): JSX.Element => {
  const [files, setFiles] = useState<StyledFileList>([]);
  const [outputFileName, setOutputFilename] = useState<string>('');
  const [isUploading, setIsUploading] = useState<string>('initial');
  const [notificationDetail, setNotificationDetail] = useState<NotificationDetail | null>(null);

  const fileUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    const fileList = [];
    if (files && files.length) {
      if (files.length > 200) {
        setNotificationDetail({
          message: 'You can only upload up to 200 files',
          severity: 'error',
        });
      } else {
        for (const file of files) {
          if (!fileIsValid(file, 1, ['image/png', 'image/jpeg'])) {
            setNotificationDetail({
              message: 'One of the input image is either too big (>1Mb) or has an invalid type',
              severity: 'error',
            });
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
      })
      .catch((err) => {
        setNotificationDetail({
          message: err?.response?.data?.errors[0] ?? 'Sorry, an error has happened, please raise an issue on GitHub.',
          severity: 'error',
        });
      })
      .finally(() => {
        setIsUploading('initial');
      });
  };

  const clearUploadedFileHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).value = '';
  };

  const setOutputFilenameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const outputFileName = cleanString(e.target.value);
    if (outputFileName.length > 30) {
      setNotificationDetail({
        message: 'The output file name cannot be more than 30 characters',
        severity: 'error',
      });
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
    <Interface
      submitHandler={submitHandler}
      title="PDF Merge Tool"
      notificationMessage={notificationDetail}
      setNotificationMessage={setNotificationDetail}
    >
      <StyledFormControl>
        <TextField
          label="Output PDF Name"
          value={outputFileName}
          onChange={setOutputFilenameHandler}
          disabled={isUploading === 'processing'}
        />
      </StyledFormControl>
      <label htmlFor="images-upload">
        <StyledFormControl>
          <StyledInput
            accept="image/jpeg, image/png"
            type="file"
            id="images-upload"
            data-testid="images-upload"
            onChange={fileUploadHandler}
            onClick={clearUploadedFileHandler}
            multiple
          />
          <Button variant="outlined" component="span" endIcon={<UploadFile />} disabled={isUploading === 'processing'}>
            Upload PNG/JPEGs
          </Button>
        </StyledFormControl>
      </label>

      {!!files.length && (
        <FadeIn>
          <StyledFormControl>
            <Alert severity="info">Reorder the pages by dragging and dropping if needed</Alert>
            <DragAndDropList
              items={files.map((file) => file.name)}
              onDragging={draggingHandler}
              onDelete={deleteFileHandler}
            />
          </StyledFormControl>
        </FadeIn>
      )}
      <StyledFormControl>
        <LoadingButton
          loading={isUploading === 'processing'}
          variant="contained"
          endIcon={<Send />}
          disabled={!files.length || !outputFileName}
          type="submit"
        >
          Submit
        </LoadingButton>
      </StyledFormControl>
    </Interface>
  );
};

export default PdfMerge;
