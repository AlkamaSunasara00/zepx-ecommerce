import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../../assets/css/forget-password.css";

function ForgotPassword() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [otpVerified, setOtpVerified] = useState(false); // New state to track OTP verification
    const navigate = useNavigate();

    const handleSendOTP = async () => {
        try {
            const res = await axios.post("http://localhost:4800/sendotp", { email });
            toast.success("OTP sent successfully to your email!");
            setStep(2); // Move to OTP Verification step
        } catch (error) {
            toast.error("Failed to send OTP. Please try again!");
        }
    };

    const handleVerifyOTP = async () => {
        try {
            const res = await axios.post("http://localhost:4800/verifyotpcheck", { email, otp }); // new route for checking otp
            toast.success("OTP verified successfully!");
            setOtpVerified(true); // Set OTP verification to true
            setStep(3) // move to change password section
        } catch (error) {
            toast.error("Invalid OTP. Please try again.");
            setOtpVerified(false);
        }
    };

    const handleResetPassword = async () => {
        try {
            const res = await axios.post("http://localhost:4800/verifyotp", { email, otp, newPassword });
            toast.success("Password reset successful! You can now log in.");
            setTimeout(() => navigate("/login"), 2000); // Redirect to login after success
        } catch (error) {
            toast.error("Error in resetting password.");
        }
    };

    return (
        <div className="container">
            <div className="forget-password-container">
                <div className="forget-password">
                    {step === 1 ? (
                        <div className="change-password-container">
                            <div className="forget-password-otp-logo">
                                <img src={require("../../assets/images/logo.png")} alt="Logo" />
                            </div>
                            <div className="forget-password-otp">
                                <div className="forget-password-otp-heading">
                                    <h6>Enter your email to <br />Get a verification code</h6>
                                </div>
                                <div className="forget-password-otp-input">
                                    <input type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                            </div>
                            <div className="forget-password-otp-button" >
                                <button onClick={handleSendOTP}>Send OTP</button>
                            </div>
                        </div>
                    ) : step === 2 ? (
                        <div className="change-password-container">
                            <div className="forget-password-otp-logo">
                                <img src={require("../../assets/images/logo.png")} alt="Logo" />
                            </div>
                            <div className="forget-password-otp">
                                <div className="forget-password-otp-heading">
                                    <h6>Enter the code</h6>
                                </div>
                                <div className="forget-password-otp-input">
                                    <div className="forget-password-otp-input-para">
                                        <p>A text message with a 6-digit verification code was just sent to email </p>
                                    </div>
                                    <div>
                                        <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                                    </div>
                                </div>
                            </div>
                            <div className="forget-password-otp-button" >
                                <button onClick={handleVerifyOTP}>Verify OTP</button>
                            </div>
                        </div>
                    ) : (
                        <div className="change-password-container">
                            <div className="forget-password-otp-logo">
                                <img src={require("../../assets/images/logo.png")} alt="Logo" />
                            </div>
                            <div className="forget-password-otp">
                                <div className="forget-password-otp-heading">
                                    <h6>Change password</h6>
                                </div>
                                <div className="forget-password-otp-input">
                                    <div className="forget-password-otp-input-para" >
                                        <p>Create a new, strong password that you don’t use for other websites</p>
                                    </div>
                                    <div>
                                        <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                                    </div>
                                </div>
                            </div>
                            <div className="forget-password-otp-button" >
                                <button onClick={handleResetPassword}>Reset Password</button>
                            </div>
                        </div>
                    )}
                </div>
                <ToastContainer autoClose={1500} />
            </div>
        </div>
    );
}

export default ForgotPassword;