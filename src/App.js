import React, {useState} from 'react';
import TermsConditions from './views/TermsConditions';
import OtpVerification from './views/OtpVerification';
import EmergencyAddress from './views/EmergencyAddress';
import { Routes, Route } from "react-router-dom";
import Loading from './components/Loading';


function App() {
  const [loading, setLoading] = useState(false);
  return (
    <div style={{overFlow: 'hidden', position: 'relative'}}> 
      {loading ? <Loading type={'spin'} color="#fffff"/> : null}
      <Routes>
        <Route path="/" element={<TermsConditions setLoading={setLoading} />} />
        <Route path="/verification/:phoneNumber" element={<OtpVerification setLoading={setLoading} />} />
        <Route path="/emergency_address/:phoneNumber" element={<EmergencyAddress setLoading={setLoading}/>} />
      </Routes>
    </div>
  );
}

export default App;
