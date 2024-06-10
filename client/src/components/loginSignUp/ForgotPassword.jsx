import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import { toastErrorNotify, toastSuccessNotify} from '../../helper/ToastNotify';
import { useNavigate } from "react-router-dom";

function ForgatForm() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value) => {
    console.log("Captcha value:", value);
    setCaptchaValue(value);
  };
  const navigate=useNavigate()

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/reset`, { email });
      console.log("response",response.data)
      
      if(response.data.error){
        setError("There is no user with this email");
      }
      if (!response.data.error) {
        setStep(2);
      }
    } catch (error) {
      setError("Failed to send email. Please try again.");
    }
  };

  const handleCodeSubmit = async (e) => {
    
    e.preventDefault();
    if (newPassword.length < 6 || !/[A-Z]/.test(newPassword)) {
      setError("Password must be at least 6 characters long and include a capital letter.");
      return;
    }
    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/reset`, { email, code, newPassword });
      if (!response.data.error) {
        console.log("sucess",response.data)
        
       alert("şifreniz değiştirildi griş ekranıan yönlendirileceksiniz")
        toastSuccessNotify("başarılı şekilde değiştirldi")
       
          navigate('/')

        
        

      }
    } catch (error) {
      if (error.response && error.response.data) {
        
        setError(error.response.data.message);
        toastErrorNotify(`${error.response.data.message}`)
       
      } else {
        
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="forgat-container">
        <div>
        {step === 1 && (
        
        <form onSubmit={handleEmailSubmit}>
             <h1>Send Code to Mail</h1>
          <p>Please type your email and we will send a code to your email.</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
    
          
          <a style={{cursor:"pointer",color:"brown"}} onClick={()=>setStep(2)}> Mailime gelen Kodu gircem</a>
          {error && <div className="error">{error}</div>}
          <button type="submit">Send</button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleCodeSubmit}>
          <h1>Change Password</h1>
          <p>Please check your email and type the code below.</p>
          <input
            type="text"
            placeholder="Type Code Which we sent your email"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Password(min 6 characters, 1 capital letter)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <a style={{cursor:"pointer",color:"brown"}} onClick={()=>setStep(1)}>Mail ekranına Döndür</a>
          {error && <div className="error">{error}</div>}
          <button type="submit">Reset Password</button>
        </form>
      )}

        </div>
     
      
    </div>
  );
}

export default ForgatForm;
