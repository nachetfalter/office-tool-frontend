import { ListItem, FormControl } from '@mui/material';
import styled from 'styled-components';

export const StyledInput = styled.input`
  display: none;
`;

export const StyledFormControl = styled(FormControl)`
  padding: 0.3rem 0 !important;
  margin: 0.3rem 0 !important;
  width: 100%;
`;

export const StyledListItem = styled(ListItem)`
  border: 1px solid #d9d9d9;
  padding: 1rem;
  border-radius: 5px;
`;
