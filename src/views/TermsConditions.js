import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import '../static/styles/common.css'
import TermsConditionsData from '../components/TermsConditionsData';
import common from '../static/styles/common';
import Button from '../components/Button';
import instance from '../firebase/otp_verification';

function TermsConditions({setLoading}) {
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const otp_verification = instance;
  const { phoneNumber, mcc, mnc } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const isVerified = window.localStorage.getItem("isVerified");
    const isAddressAdded = window.localStorage.getItem("isAddressAdded");
    if(isAddressAdded) {
      window.alert("Phone Number already verified.");;
      setDisabled(true);
    }
    else if(isVerified){
      navigate(`/emergency_address/${phoneNumber}/${mcc}/${mnc}`);
    }console.log(mcc, mnc);
    if(!isValidMobileNumber(phoneNumber) || !mnc || !mcc){
      window.alert("Invalid mobile number. Please try again.");
      navigate('/');
    }
  }, [phoneNumber, mcc, mnc, navigate])

  const isValidMobileNumber = (phone_number) => {
    if(!phone_number || phone_number.length!==10 || isNaN(parseInt(phone_number))){
      return false;
    }

    return true;
  }

  const callback = {
    redirectToVerification: () => {
      navigate(`/verification/${phoneNumber}/${mcc}/${mnc}`);
      setLoading(false);
    },
    failedSendingOtp: () => {
      window.alert("Failed to send OTP. Try Again");
      setLoading(false);
      window.location.reload();
    }
  }

  return (
    <div style={{height: '100vh', borderWidth: 1, overflow: 'hidden', padding: '0px 20px', backgroundColor: common.colors.blueLight}}>
        <TermsConditionsData/>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 10, flexWrap: 'wrap'}}>

          <div style={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
            <input 
              type="checkbox" 
              style={{marginRight: 10, height: 15, width: 15}} 
              value={checked} 
              onChange={() => setChecked(!checked)} 
            /> 
            <div>I accept the above Terms {'&'} Conditions.</div>
          </div>
          
          <Button
            // title={<Link to="/verification" style={{textDecoration: 'none', color: 'inherit'}}>Continue</Link>}
            title = "Continue"
            width={"100%"}
            theme={"dark"}
            id='sign-in-button'
            disabled={disabled}
            onClick={async () => {
              if(checked){
                setLoading(true);
                await otp_verification.recaptchaVerifierInvisible();
                await otp_verification.sendOtp(phoneNumber, callback);
              } else{
                window.alert("Please agree to Terms & Conditions.")
              }
            }}
          />
        </div>
    </div>
  )
}

export default TermsConditions;