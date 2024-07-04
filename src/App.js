import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import "./input.css";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import { CgSpinner } from "react-icons/cg";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config";
import { RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";
function App() {
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [user, setUser] = useState(null);

  function OnCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignUp();
          },
          "expired-callback": () => {},
        }
      );
    }
  }
  function onSignUp() {
    setLoading(true);
    OnCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
    const fomatph = "+" + phone;
    signInWithPhoneNumber(auth, fomatph, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setShowOtp(true);
        toast.success("OTP sent successfully");
      })
      .catch((error) => {
        setLoading(false);
      });
  }
  function OnVerifyOtp() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (result) => {
        console.log(result.user);
        setUser(result.user);
        setLoading(false);
        toast.success("OTP verified successfully");
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Invalid OTP");
        console.log(error);
      });
  }

  return (
    <section className="bg-blue-500 flex items-center justify-center h-screen">
      <Toaster toastOptions={{ duration: 4000 }} />
      <div>
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="text-center text-white font-medium text-2xl">
            &#128077; Login Sucess
          </h2>
        ) : (
          <div className=" w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Welcome to <br /> FarmVestor
            </h1>
            {showOtp ? (
              <>
                <div className="bg-white mx-auto text-blue-500 p-4 w-fit rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="ph"
                  className="font-bold text-xl  text-center text-white"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="otp-container"
                ></OtpInput>
                <button
                  onClick={OnVerifyOtp}
                  className="bg-blue-600 rounded w-full flex gap-1 items-center justify-center py-2.5 text-white "
                >
                  {loading && <CgSpinner size={20} className="animate-spin" />}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-white mx-auto text-blue-500 p-4 w-fit rounded-full">
                  <BsTelephoneFill size={30} />
                </div>
                <label
                  htmlFor=""
                  className="font-bold text-xl  text-center text-white"
                >
                  Verify your phone number
                </label>
                <PhoneInput country={"in"} value={phone} onChange={setPhone} />
                <button
                  onClick={onSignUp}
                  className="bg-blue-600 rounded w-full flex gap-1 items-center justify-center py-2.5 text-white "
                >
                  {loading && <CgSpinner size={20} className="animate-spin" />}
                  <span>Send code Via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
