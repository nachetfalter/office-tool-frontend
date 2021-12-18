import { Card } from '@mui/material';
import styled from 'styled-components';
import breakpoints from '../breakpoints';

export const CustomisedCard = styled(Card)`
  text-align: center;
  margin: 5% auto;
  padding: 2em;
  width: 40em;
  @media (max-width: ${breakpoints.sm}) {
    width: fit-content;
  }
`;
