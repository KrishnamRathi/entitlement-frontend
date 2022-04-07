import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import '../static/styles/common.css'
import TermsConditionsData from '../components/TermsConditionsData';
import common from '../static/styles/common';
import Button from '../components/Button';
import instance from '../firebase/otp_verification';

function TermsConditions({navigation}) {
  const [phoneNumber] = useState("8435912066");
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const otp_verification = instance;
  let navigate = useNavigate();

  useEffect(() => {
    const isVerified = window.localStorage.getItem("isVerified");
    const isAddressAdded = window.localStorage.getItem("isAddressAdded");
    if(isAddressAdded) {
      window.alert("Phone Number already verified.");;
      setDisabled(true);
    }
    else if(isVerified){
      navigate(`/emergency_address/${phoneNumber}`);
    }
  }, [])

  function redirectToVerification(){
    navigate(`/verification/${phoneNumber}`);
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
                await otp_verification.recaptchaVerifierInvisible();
                await otp_verification.sendOtp(phoneNumber, redirectToVerification);
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