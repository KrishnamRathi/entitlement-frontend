import React, {useState} from 'react';
import TermsConditions from './views/TermsConditions';
import OtpVerification from './views/OtpVerification';
import EmergencyAddress from './views/EmergencyAddress';
import PageNotFound from './views/PageNotFound';
import { Routes, Route } from "react-router-dom";
import Loading from './components/Loading';


function App() {
  const [loading, setLoading] = useState(false);
  return (
    <div style={{overFlow: 'hidden', position: 'relative'}}> 
      {loading ? <Loading type={'spin'} color="#fffff"/> : null}
      <Routes>
        <Route path="/:phoneNumber/:mcc/:mnc" element={<TermsConditions setLoading={setLoading} />} />
        <Route path="/verification/:phoneNumber/:mcc/:mnc" element={<OtpVerification setLoading={setLoading} />} />
        <Route path="/emergency_address/:phoneNumber/:mcc/:mnc" element={<EmergencyAddress setLoading={setLoading}/>} />
        <Route path="/:phoneNumber" element={<PageNotFound/>} />
        <Route path="/:phoneNumber/:mcc" element={<PageNotFound/>} />
        <Route path="/" element={<PageNotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
