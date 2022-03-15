import { Card } from '@mui/material';
import styled from 'styled-components';
import breakpoints from '../breakpoints';

export const StyledCard = styled(Card)`
  text-align: center;
  margin: 5% auto;
  padding: 2rem;
  width: 40rem;
  @media (max-width: ${breakpoints.sm}) {
    width: fit-content;
  }
`;
