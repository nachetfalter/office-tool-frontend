import { useState } from 'react';
import { Button, TextField, SelectChangeEvent } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { UploadFile, Send } from '@mui/icons-material';
import { CustomisedInput, CustomisedFormControl, CustomisedCard, Title } from './PdfSplit.styled';
import Select from '../../../common/Select';

const PdfSplit = (): JSX.Element => {
  const [pageName, setPageName] = useState('Page');
  const [pageOption, setPageOption] = useState('no-split');
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('Upload File');
  const [processStatus, setProcessStatus] = useState('completed');
  const pageOptions = [
    {
      text: 'No Page Split',
      value: 'no-split',
    },
    {
      text: 'Page Split (Horizontal)',
      value: 'horizontal-split',
    },
    {
      text: 'Page Split (Vertical)',
      value: 'vertical-split',
    },
  ];

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

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessStatus('processing');
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
            disabled={processStatus === 'processing'}
          />
        </CustomisedFormControl>
        <CustomisedFormControl>
          <Select
            title="Page Options"
            selectHandler={pageOptionSelectHandler}
            selectedValue={pageOption}
            options={pageOptions}
            disabled={processStatus === 'processing'}
          />
        </CustomisedFormControl>
        <label htmlFor="pdf-upload">
          <CustomisedFormControl>
            <CustomisedInput accept="pdf/*" type="file" id="pdf-upload" onChange={fileUploadHandler} />
            <Button
              variant="outlined"
              component="span"
              endIcon={<UploadFile />}
              disabled={processStatus === 'processing'}
            >
              {fileName}
            </Button>
          </CustomisedFormControl>
        </label>
        <CustomisedFormControl>
          <LoadingButton
            loading={processStatus === 'processing'}
            variant="contained"
            endIcon={<Send />}
            disabled={!(pageName && pageOption && file)}
            type="submit"
          >
            Submit
          </LoadingButton>
        </CustomisedFormControl>
      </CustomisedCard>
    </form>
  );
};

export default PdfSplit;
