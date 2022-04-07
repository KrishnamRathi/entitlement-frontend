import { initialize } from './firebase';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


class OtpVerification{
    constructor(){
        initialize();
        this.auth = getAuth();
        this.auth.languageCode = 'en';
    }

    async recaptchaVerifierInvisible(){
        console.log("CALLED")
        if(!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
                'size': 'invisible',
                'callback': (response) => {
                  console.log(response, " Ready to send OTP")
                }
              }, this.auth);
        }
      }

    async sendOtp(phoneNumber, callback){
        console.log("Sending otp...");
        phoneNumber = "+91"+phoneNumber;
        const appVerifier = window.recaptchaVerifier;
        await signInWithPhoneNumber(this.auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                console.log("OTP sent to "+phoneNumber);
                window.confirmationResult = confirmationResult;
                callback();
            }).catch((error) => {
                console.log("error while sending otp", error);
                window.recaptchaVerifier.reset();
            });
    }

    async verifyOtp(code, callback){
        let confirmationResult = window.confirmationResult;
        confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            const user = result.user;
            console.log(user, "Successfully verified");
            callback();
          }).catch((error) => {
            window.alert("Invalid OTP")
            console.log(error, "Failed to verify");
      });
    }
}

var instance = new OtpVerification();

export default instance;

