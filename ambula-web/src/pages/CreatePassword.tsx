import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, IconButton, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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

const StyledTextField = styled(TextField)({
  marginTop: '16px',
});

const StyledButton = styled(Button)({
  marginTop: '16px',
});

const InfoContainer = styled(Container)({
  backgroundColor: '#f0f0f0',
  padding: '24px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  marginTop: '32px',
  textAlign: 'left',
});

const InfoItem = styled(Typography)({
  marginBottom: '8px',
  display: 'flex',
  alignItems: 'center',
});

const CreatePassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    numeric: false,
    symbol: false,
    match: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    validatePassword(password, confirmPassword);
  }, [password, confirmPassword]);

  const validatePassword = (pass: string, confirmPass: string) => {
    const validations = {
      length: pass.length >= 8,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      numeric: /[0-9]/.test(pass),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
      match: pass === confirmPass && pass !== '' && confirmPass !== '',
    };

    setIsPasswordValid(validations);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleCreatePassword = () => {
    if (!isPasswordValid.match) {
      alert('Passwords do not match');
      return;
    }
    navigate('/congratulations');
  };

  return (
    <StyledContainer>
      <StyledTypography variant="h4">Create Password</StyledTypography>
      <StyledTextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePasswordVisibility}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <StyledTextField
        label="Confirm Password"
        type={showConfirmPassword ? 'text' : 'password'}
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          validatePassword(password, e.target.value); // Validate on every change in confirm password
        }}
        fullWidth
        variant="outlined"
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleToggleConfirmPasswordVisibility}>
                {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Typography variant="body1" style={{ marginTop: '16px', color: isPasswordValid.match ? '#4caf50' : '#f44336' }}>
        {isPasswordValid.match ? 'Password matched' : 'Password mismatched'}
      </Typography>
      <InfoContainer>
        <InfoItem variant="body1">
          {isPasswordValid.length ? (
            <CheckIcon style={{ color: '#4caf50', marginRight: '8px' }} />
          ) : (
            <CloseIcon style={{ color: '#f44336', marginRight: '8px' }} />
          )}
          8 characters or longer
        </InfoItem>
        <InfoItem variant="body1">
          {isPasswordValid.uppercase ? (
            <CheckIcon style={{ color: '#4caf50', marginRight: '8px' }} />
          ) : (
            <CloseIcon style={{ color: '#f44336', marginRight: '8px' }} />
          )}
          One A-Z
        </InfoItem>
        <InfoItem variant="body1">
          {isPasswordValid.lowercase ? (
            <CheckIcon style={{ color: '#4caf50', marginRight: '8px' }} />
          ) : (
            <CloseIcon style={{ color: '#f44336', marginRight: '8px' }} />
          )}
          One a-z
        </InfoItem>
        <InfoItem variant="body1">
          {isPasswordValid.numeric ? (
            <CheckIcon style={{ color: '#4caf50', marginRight: '8px' }} />
          ) : (
            <CloseIcon style={{ color: '#f44336', marginRight: '8px' }} />
          )}
          One 0-9
        </InfoItem>
        <InfoItem variant="body1">
          {isPasswordValid.symbol ? (
            <CheckIcon style={{ color: '#4caf50', marginRight: '8px' }} />
          ) : (
            <CloseIcon style={{ color: '#f44336', marginRight: '8px' }} />
          )}
          At least one symbol
        </InfoItem>
        <InfoItem variant="body1">
          {isPasswordValid.match ? (
            <CheckIcon style={{ color: '#4caf50', marginRight: '8px' }} />
          ) : (
            <CloseIcon style={{ color: '#f44336', marginRight: '8px' }} />
          )}
          Password and Confirm Password matched
        </InfoItem>
      </InfoContainer>
      <StyledButton variant="contained" color="primary" onClick={handleCreatePassword}>
        Continue
      </StyledButton>
    </StyledContainer>
  );
};

export default CreatePassword;
