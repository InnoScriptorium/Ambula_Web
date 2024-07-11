import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Radio, RadioGroup, FormControlLabel, Typography, Checkbox, FormControl, FormGroup, InputAdornment } from '@mui/material';
import { setMobileNumber, setAadharNumber } from '../store/slices/userSlice';
import { styled } from '@mui/system';

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

const StyledTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#3f51b5',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#3f51b5',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#3f51b5',
    },
    '&:hover fieldset': {
      borderColor: '#3f51b5',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#3f51b5',
    },
  },
  marginBottom: '16px',
  width: '50%',
  '@media screen and (max-width: 600px)': {
    width: '100%', 
  },
 
});

const StyledWarningText = styled(Typography)({
  color: 'red',
  marginTop: '8px',
});

const StyledButton = styled(Button)({
  backgroundColor: '#3f51b5',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#303f9f',
  },
  marginTop: '16px',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
});

const WelcomeContainer = styled(Container)({
  backgroundColor: '#3f51b5',
  color: '#fff',
  padding: '5px',
  borderRadius: '8px',
  marginBottom: '32px',
  textAlign: 'center',
});

const Registration: React.FC = () => {
  const [mobileNumber, setMobileNumberState] = useState('');
  const [aadharNumber, setAadharNumberState] = useState('');
  const [selectedOption, setSelectedOption] = useState('aadhar');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = () => {
    if (selectedOption === 'mobile') {
      if (mobileNumber.length !== 10 || isNaN(Number(mobileNumber))) {
        alert('Invalid mobile number');
        return;
      }
      dispatch(setMobileNumber(mobileNumber));
      navigate('/otp-verification');
    } else {
      if (!termsAccepted) {
        alert('You must accept the terms and conditions');
        return;
      }
      if (aadharNumber.length !== 12 || isNaN(Number(aadharNumber))) {
        alert('Invalid Aadhar number');
        return;
      }
      dispatch(setAadharNumber(aadharNumber));
      navigate('/otp-verification');
    }
  };

  const isMobileValid = mobileNumber.length === 10 && !isNaN(Number(mobileNumber));
  const isAadharValid = aadharNumber.length === 12 && !isNaN(Number(aadharNumber));
  const isFormValid = (selectedOption === 'mobile' && isMobileValid) || (selectedOption === 'aadhar' && isAadharValid && termsAccepted);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <>
      <WelcomeContainer>
        <Typography variant="h5" component="h2" style={{ marginBottom: '16px' }}>
          Welcome!
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '24px' }}>
          You are about to create your ABHA number and ABHA Address
        </Typography>
      </WelcomeContainer>

      <StyledContainer>
        <RadioGroup row value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} style={{ justifyContent: 'center', marginBottom: '24px' }}>
          <FormControlLabel value="aadhar" control={<Radio />} label="Aadhar" />
          <FormControlLabel
            value="mobile"
            control={<Radio />}
            label="Mobile Number"
            style={{ marginLeft: '16px' }}
          />
        </RadioGroup>
        {selectedOption === 'mobile' && (
          <>
            <StyledTextField
              label="Enter Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumberState(e.target.value)}
              margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                inputProps: { maxLength: 10 },
              }}
              variant="outlined"
              color="primary"
              onKeyPress={handleKeyPress}
            />
            <StyledWarningText variant="body2">Complete the KYC verification to get the unique ABHA number</StyledWarningText>
          </>
        )}
        {selectedOption === 'aadhar' && (
          <>
            <Typography variant="body2" color="textSecondary" style={{ marginBottom: '16px', fontWeight: 'bold' }}>
              We will send a 6 digit OTP to the mobile number linked to your Aadhar
            </Typography>
            <StyledTextField
              label="Enter Aadhar Number"
              value={aadharNumber}
              onChange={(e) => setAadharNumberState(e.target.value)}
              margin="normal"
              inputProps={{ maxLength: 12 }}
              variant="outlined"
              color="primary"
              onKeyPress={handleKeyPress}
            />
            <Typography variant="body2" color="textSecondary" style={{ marginBottom: '16px', fontWeight: 'bold' }}>
              Your ABHA Number & ABHA Address both will be created
            </Typography>
            <FormControl component="fieldset">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      name="termsAccepted"
                      color="primary"
                    />
                  }
                  label="Accept Terms & Conditions and Aadhar Declaration"
                  style={{ justifyContent: 'center', display: 'flex' }}
                />
              </FormGroup>
            </FormControl>
          </>
        )}
        <StyledButton
          variant="contained"
          onClick={handleRegister}
          disabled={!isFormValid}
        >
          Verify
        </StyledButton>
      </StyledContainer>
    </>
  );
};

export default Registration;
