import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, TextField } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store'; // Adjust the path to match your Redux setup
import { setAbhaAddress } from '../store/slices/userSlice'; // Assuming you have a setProfileDetails action

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

const InfoContainer = styled(Container)({
  backgroundColor: '#f0f0f0',
  padding: '24px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  marginTop: '32px',
  textAlign: 'left',
});

const StyledButton = styled(Button)({
  marginTop: '16px',
});

const StyledTextField = styled(TextField)({
  marginTop: '16px',
  marginBottom: '16px',
  position: 'relative',
});

const WelcomeMessage = styled(Typography)({
  textAlign: 'left',
  marginLeft: '16px',
});

const FixedText = styled(Typography)({
  position: 'absolute',
  top: '50%',
  right: '16px',
  transform: 'translateY(-50%)',
  fontWeight: 'bold',
});

const SuggestionContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px', // Adjust gap between suggestions
  marginBottom: '16px', // Add margin bottom for spacing
});

const SuggestionItem = styled(Typography)({
  cursor: 'pointer',
  padding: '8px',
  borderRadius: '4px',
  backgroundColor: '#f0f0f0',
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
});

const InfoItem = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '8px',
});

const GreenLineMessage = styled(Typography)({
  color: '#4caf50', // Green color
});

const ErrorMessage = styled(Typography)({
  color: '#f44336', // Red color
});

const UserSuggestions: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { firstName, lastName, day, month, year, abhaAddress } = useSelector((state: RootState) => ({
    ...state.user.profileDetails,
    abhaAddress: state.user.abhaAddress,
  }));
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [validations, setValidations] = useState({
    minLength: false,
    maxLength: false,
    specialChars: false,
    specialCharsPosition: false,
    alphanumeric: false,
  });
  const [isAvailable, setIsAvailable] = useState(false);
  const [isInvalidLength, setIsInvalidLength] = useState(false);

  useEffect(() => {
    const generateSuggestions = () => {
      const suggestion1 = `${lastName}${year.slice(0, 1)}.${year}${day}`;
      const suggestion2 = `${firstName}${year.slice(0, 1)}${day}_${year}`;
      const suggestion3 = `${firstName}${day}.${day}${year}`;
      setSuggestions([suggestion1, suggestion2, suggestion3]);
    };

    const validateAbhaAddress = (address: string) => {
      const minLength = address.length >= 8;
      const maxLength = address.length <= 18;
      const specialChars = /^[a-zA-Z0-9._]+$/.test(address) && (address.match(/[._]/g) || []).length <= 2;
      const specialCharsPosition = /^[a-zA-Z0-9]+[._]?[a-zA-Z0-9]+$/.test(address);
      const alphanumeric = /^[a-zA-Z0-9]+$/.test(address.replace(/[._]/g, ''));

      const isValid = minLength && maxLength && specialChars && specialCharsPosition && alphanumeric;
      setIsAvailable(isValid);
      setValidations({
        minLength,
        maxLength,
        specialChars,
        specialCharsPosition,
        alphanumeric,
      });
      setIsInvalidLength(address.length > 18);
    };

    generateSuggestions();
    validateAbhaAddress(abhaAddress);
  }, [firstName, lastName, day, month, year, abhaAddress]);

  const handleSuggestionClick = (suggestion: string) => {
    dispatch(setAbhaAddress(suggestion));
  };

  const handleContinue = () => {
    navigate('/create-password');
  };

  return (
    <StyledContainer>
      <StyledTextField
        label="ABHA Address"
        variant="outlined"
        fullWidth
        placeholder="Enter ABHA Address"
        value={abhaAddress}
        onChange={(e) => dispatch(setAbhaAddress(e.target.value))}
        InputProps={{
          endAdornment: (
            <FixedText variant="body1">
              @abdm
            </FixedText>
          ),
          style: { borderColor: abhaAddress ? (isAvailable ? '#4caf50' : '#f44336') : '' }, // Change border color based on validation
        }}
      />
      {isInvalidLength && (
        <ErrorMessage variant="body1">
          Invalid ABHA Address: Length exceeds 18 characters
        </ErrorMessage>
      )}
      {abhaAddress && !isInvalidLength && (
        <GreenLineMessage variant="body1">
          {abhaAddress} {isAvailable ? '(is available)' : '(is not available)'}
        </GreenLineMessage>
      )}
      <WelcomeMessage variant="body1" gutterBottom>
        Suggestions:
      </WelcomeMessage>
      <SuggestionContainer>
        {suggestions.map((suggestion, index) => (
          <SuggestionItem
            key={index}
            variant="body1"
            onClick={() => handleSuggestionClick(suggestion)}
            style={{ backgroundColor: abhaAddress === suggestion ? '#2196f3' : '#f0f0f0' }} // Change background color on click
          >
            {suggestion}
          </SuggestionItem>
        ))}
      </SuggestionContainer>
      <StyledButton variant="contained" color="primary" onClick={handleContinue}>
        Continue
      </StyledButton>
      <InfoContainer>
        <InfoItem variant="body1">
          {validations.minLength ? (
            <CheckIcon color="success" style={{ marginRight: '8px' }} />
          ) : (
            <CloseIcon color="error" style={{ marginRight: '8px' }} />
          )}
          Minimum length - 8 characters
        </InfoItem>
        <InfoItem variant="body1">
          {validations.maxLength && validations.minLength ? (
            <CheckIcon color="success" style={{ marginRight: '8px' }} />
          ) : (
            <CloseIcon color="error" style={{ marginRight: '8px' }} />
          )}
          Maximum length - 18 characters
        </InfoItem>
        <InfoItem variant="body1">
          {validations.specialChars ? (
            <CheckIcon color="success" style={{ marginRight: '8px' }} />
          ) : (
            <CloseIcon color="error" style={{ marginRight: '8px' }} />
          )}
          Special characters allowed - 1 dot(.) and/or 1 underscore(_)
        </InfoItem>
        <InfoItem variant="body1">
          {validations.specialCharsPosition ? (
            <CheckIcon color="success" style={{ marginRight: '8px' }} />
          ) : (
            <CloseIcon color="error" style={{ marginRight: '8px' }} />
          )}
          Special character dot and underscore should be in between. Special characters cannot be at the beginning or at the end
        </InfoItem>
        <InfoItem variant="body1">
          {validations.alphanumeric ? (
            <CheckIcon color="success" style={{ marginRight: '8px' }} />
          ) : (
            <CloseIcon color="error" style={{ marginRight: '8px' }} />
          )}
          Alphanumeric - only numbers, only letters, or any combination of numbers and letters is allowed
        </InfoItem>
      </InfoContainer>
    </StyledContainer>
  );
};

export default UserSuggestions;
