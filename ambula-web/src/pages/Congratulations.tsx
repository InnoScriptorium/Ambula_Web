import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useSelector } from 'react-redux';
import { RootState } from '../store'; 

const StyledContainer = styled(Container)({
  backgroundColor: '#ffffff',
  padding: '32px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  marginTop: '64px',
  textAlign: 'center',
  width: '70%',
  margin: '64px auto',
});

const StyledTypography = styled(Typography)({
  marginBottom: '16px',
});

const GreenCheckmark = styled(CheckCircleOutlineIcon)({
  color: '#4CAF50',
  fontSize: '64px',
  marginBottom: '16px',
});

const RedText = styled(Box)({
  color: '#f44336',  
  fontWeight: 'bold',
});

const Congratulations: React.FC = () => {
  const abhaAddress = useSelector((state: RootState) => state.user.abhaAddress);

  return (
    <StyledContainer>
      <GreenCheckmark />
      <StyledTypography variant="h6">Congratulations!</StyledTypography>
      <Typography variant="body1">
        ABHA Address
      </Typography>
      <Typography variant="body1">
        <RedText>{abhaAddress}</RedText>
      </Typography>
      <Typography variant="body1">
        is created successfully
      </Typography>
    </StyledContainer>
  );
};

export default Congratulations;
