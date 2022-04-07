import React from 'react';
import TermsConditions from './views/TermsConditions';
import OtpVerification from './views/OtpVerification';
import EmergencyAddress from './views/EmergencyAddress';
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div style={{overFlow: 'hidden'}}>
      <Routes>
        <Route path="/" element={<TermsConditions />} />
        <Route path="/verification/:phoneNumber" element={<OtpVerification />} />
        <Route path="/emergency_address/:phoneNumber" element={<EmergencyAddress/>} />
      </Routes>
    </div>
  );
}

export default App;
