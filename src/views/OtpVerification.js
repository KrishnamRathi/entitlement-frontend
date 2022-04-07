import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import TextField from '../components/TextField'
import common from '../static/styles/common'
import '../static/styles/common.css'
import instance from '../firebase/otp_verification'


function OtpVerification() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const otp_verification = instance;
  const { phoneNumber } = useParams();

  useEffect(() => {
    const isVerified = window.localStorage.getItem("isVerified");
    if(isVerified){
      navigate(`/emergency_address/${phoneNumber}`);
    }else{
      // navigate('/');
    }

    if(!phoneNumber){
      navigate("/");
      window.alert("Failed to fetch Phone Number. Try again.");
    }

  }, [])
  
  function successfullVerification(){
    window.localStorage.setItem("isVerified", true);
    navigate(`/emergency_address/${phoneNumber}`)
  }

  return (
    <div style={{padding: 20, backgroundColor: common.colors.blueLight, height: '100vh'}}>
        <div style={{backgroundColor: common.colors.light, padding: 15}}>
          <div style={{fontSize: common.fontSize.large}}>Enter Verification Code</div>
          <p>Please enter the 6 digit verification code sent on the mobile number +91 {phoneNumber}</p>
          <TextField 
            placeholder={"XXXXXX"} 
            width={"100%"} 
            style={{textAlign: 'center'}}
            value={code}
            setValue={setCode}
          />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type 
            specimen book. It has survived not only five centuries, but also the leap into 
            electronic typesetting, remaining essentially unchanged. 
          </p>
        </div> 
        <Button
          id="verify-otp"
          title={"Continue"}
          width={"100%"}
          theme={"dark"}
          style={{marginTop: 20}}
          onClick={async () => {
            if(code.length === 0){
              window.alert("Please enter OTP");
            }else{
              await otp_verification.verifyOtp(code, successfullVerification);
            }
          }}
        />
    </div>
  )
}

export default OtpVerification