import { Typography, ListItem, FormControl, Card } from '@mui/material';
import styled from 'styled-components';

export const CustomisedInput = styled.input`
  display: none;
`;

export const CustomisedFormControl = styled(FormControl)`
  padding: 0.3em 0 !important;
  margin: 0.3em 0 !important;
  width: 100%;
`;

export const CustomisedCard = styled(Card)`
  margin: 5% auto;
  padding: 2em;
  width: 50%;
`;

export const Title = styled(Typography)`
  margin-bottom: 3% !important;
  text-align: center;
`;

export const CustomisedListItem = styled(ListItem)`
  border: 1px solid #d9d9d9;
  padding: 1em;
  border-radius: 5px;
`;
