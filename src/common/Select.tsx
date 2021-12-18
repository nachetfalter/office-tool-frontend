import { InputLabel, Select as MuiSelect, MenuItem, SelectChangeEvent } from '@mui/material';

type selectOptions = {
  text: string;
  value: string;
};

interface Props {
  title: string;
  selectHandler: (e: SelectChangeEvent<string>) => void;
  selectedValue: string;
  options: selectOptions[];
  disabled?: boolean;
}

const Select = ({ title, selectHandler, selectedValue, options, disabled }: Props): JSX.Element => {
  return (
    <>
      <InputLabel id={`${title.toLowerCase().replaceAll(' ', '-')}-page-option-label`}>{title}</InputLabel>
      <MuiSelect
        labelId={`${title.toLowerCase().replaceAll(' ', '-')}-page-option-label`}
        value={selectedValue}
        label={title}
        onChange={selectHandler}
        disabled={disabled}
      >
        {options.map((option) => {
          return (
            <MenuItem key={option.value} value={option.value}>
              {option.text}
            </MenuItem>
          );
        })}
      </MuiSelect>
    </>
  );
};

export default Select;
