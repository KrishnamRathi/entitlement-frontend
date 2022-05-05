import React, {useState, useEffect} from 'react'
import '../static/styles/common.css'
import Button from '../components/Button';
import TextField from '../components/TextField';
import common from '../static/styles/common';
import { useNavigate, useParams } from 'react-router-dom';
import URL from '../baseUrl';

function EmergencyAddress({setLoading}) {
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [postalCode, setPostalCode] = useState("");
	const [country, setCountry] = useState("");
	const navigate = useNavigate();
    const { phoneNumber, mcc, mnc } = useParams();

    useEffect(() => {
        const isVerified = window.localStorage.getItem("isVerified");
        const isAddressAdded = window.localStorage.getItem("isAddressAdded");

        if(!isVerified){
            navigate('/');
        }else if(isAddressAdded){
            window.alert("Emergency Address already added");
            // Do next step i.e. redirect to next flow
        } else if(!phoneNumber){
            navigate('/');
            window.alert("Not able to fetch mobile number.");
        }
      }, [phoneNumber, mcc, mnc, navigate])

	async function submitAddress(){
       if(name && address && city && postalCode && country){
			// post api call for emergency address
            setLoading(true);
            const data = {
                "fullname": name,
                "city": city,
                "country": country,
                "mobile_no": phoneNumber,
                "pincode": postalCode,
                "address": address
            }
            const postOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            await fetch(URL+"/address", postOptions)
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    window.localStorage.setItem("isAddressAdded", true);
                    window.alert("Verification completed successfully.");
                    setLoading(false);
                })
                .catch((error) => {
                    window.alert("Error while submitting address. Try Again.");
                    setLoading(false);
                });
		} else{
			window.alert("Please fill all the required entries.");
			navigate(`/emergency_address/${phoneNumber}/${mcc}/${mnc}`)
		}
	}

  return (
    <div style={{padding: 20, backgroundColor: common.colors.blueLight, height: '100vh'}}>
        <div style={{backgroundColor: common.colors.light, padding: 15}}>
            <div style={{fontSize: common.fontSize.large}}>Emergency Address</div>
            <p/>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type 
                specimen book. It has survived not only five centuries, but also the leap into 
                electronic typesetting, remaining essentially unchanged. 
            </p>
            <p>REQUIRED*</p>

            <div style={{display: 'grid', gap: 10}}>
                <div style={{color: common.colors.blueDark, fontSize: common.fontSize.small}} className="col">
                    Full Name*: 
                    <TextField width={'95%'} value={name} setValue={setName} /> 
                </div>
                <div style={{color: common.colors.blueDark, fontSize: common.fontSize.small}} className="col">
                    Apartment/Area/Flat no.*: 
                    <TextField width={'95%'} value={address} setValue={setAddress} /> 
                </div>
                <div style={{color: common.colors.blueDark, fontSize: common.fontSize.small}} className="col">
                    City*: 
                    <TextField width={'95%'} value={city} setValue={setCity} /> 
                </div>
                <div style={{color: common.colors.blueDark, fontSize: common.fontSize.small}} className="col">
                    Postal Code*: 
                    <TextField width={'95%'} value={postalCode} setValue={setPostalCode} /> 
                </div>
                <div style={{color: common.colors.blueDark, fontSize: common.fontSize.small}} className="col">
                    Country*: 
                    <TextField width={'95%'} value={country} setValue={setCountry} /> 
                </div>
            </div>
        </div>
        <div style={{ marginTop: 20, marginBottom: 20 }}>
            <Button 
                title={"Submit"} 
                width={'100%'} 
                theme="dark" 
                style={{marginTop: 20}} 
								onClick={() => {
									submitAddress()
								}}
            />
        </div>
    </div>
  )
}

export default EmergencyAddress;