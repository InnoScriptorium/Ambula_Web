import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import { setOtp } from '../store/slices/userSlice';
import { RootState } from '../store'; // Adjust the path to match your Redux setup
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
  width: '3rem', // Adjust width for individual OTP fields
  '& input': {
    textAlign: 'center',
  },
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

const OtpVerification: React.FC = () => {
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [otp, setOtpState] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mobileNumber = useSelector((state: RootState) => state.user.mobileNumber);
  const aadharNumber = useSelector((state: RootState) => state.user.aadharNumber);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isResendDisabled) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev === 0) {
            setIsResendDisabled(false);
            clearInterval(interval as NodeJS.Timeout);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isResendDisabled]);

  let sentToMessage = '';
  if (mobileNumber) {
    sentToMessage = `Please enter the 6 digit verification code sent to mobile  ******${mobileNumber.slice(-4)}`;
  } else if (aadharNumber) {
    sentToMessage = `Enter OTP sent to the mobile number linked with Aadhar ending with ${aadharNumber.slice(-4)}`;
  } else {
    sentToMessage = 'Enter OTP';
  }

  const handleVerifyOtp = () => {
    const fullOtp = otpDigits.join('');
    if (fullOtp === '123456') {
      dispatch(setOtp(fullOtp));
      navigate('/profile-details');
    } else {
      alert('Invalid OTP');
      // Reset OTP input fields and state
      setOtpDigits(['', '', '', '', '', '']);
      setOtpState('');
    }
  };

  const handleResendOtp = () => {
    setIsResendDisabled(true);
    setResendTimer(60); // Reset timer
    // Logic to resend OTP
    // Example: dispatch action to resend OTP
    console.log('Resending OTP...');
  };

  const handleOtpChange = (index: number, value: string) => {
    const updatedOtp = [...otpDigits];
    updatedOtp[index] = value;

    // Move focus to the next input field
    if (value && index < otpDigits.length - 1) {
      const nextIndex = index + 1;
      const nextInput = document.getElementById(`otp-input-${nextIndex}`);
      if (nextInput) {
        nextInput.focus();
      }
    }

    setOtpDigits(updatedOtp);
    setOtpState(updatedOtp.join(''));
  };

  return (
    <StyledContainer>
      <Typography variant="h4" style={{ marginBottom: '16px' }}>OTP Verification</Typography>
      <Typography variant="body1" color="textSecondary" style={{ marginBottom: '16px' }}>
        {sentToMessage}
      </Typography>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {otpDigits.map((digit, index) => (
          <Grid item key={index}>
            <StyledTextField
              id={`otp-input-${index}`}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              inputProps={{ maxLength: 1 }}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} style={{ marginTop: '16px' }}>
        <Grid item xs={6}>
          <Typography variant="body2" style={{ cursor: 'pointer' }}>
            Didn't receive OTP?
          </Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'right' }}>
          <Typography variant="body2" color="textSecondary" onClick={handleResendOtp} style={{ cursor: 'pointer' }}>
            {isResendDisabled ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
          </Typography>
        </Grid>
      </Grid>
      <StyledButton
        variant="contained"
        color="primary"
        onClick={handleVerifyOtp}
        style={{ marginTop: '16px' }}
        disabled={otp.length !== 6}
      >
        Verify and continue
      </StyledButton>
    </StyledContainer>
  );
};

export default OtpVerification;
