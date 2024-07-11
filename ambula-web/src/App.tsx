// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './pages/Registration';
import OtpVerification from './pages/OtpVerification';
import ProfileDetails from './pages/ProfileDetails';
import UserSuggestions from './pages/UserSuggestions';
import CreatePassword from './pages/CreatePassword';
import Congratulations from './pages/Congratulations';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/profile-details" element={<ProfileDetails />} />
        <Route path="/user-suggestions" element={<UserSuggestions />} />
        <Route path="/create-password" element={<CreatePassword />} />
        <Route path="/congratulations" element={<Congratulations />} />
      </Routes>
    </Router>
  );
};

export default App;
