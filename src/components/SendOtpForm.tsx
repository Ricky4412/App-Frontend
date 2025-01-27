import React, { useState, FormEvent } from 'react';
import { sendOtp } from '../../services/api'

const SendOtpForm: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userId = 'user-id'; // Replace with actual user ID
      await sendOtp({ userId, email, phoneNumber });
      setMessage('OTP sent successfully');
    } catch (error: any) {
      setMessage('Failed to send OTP');
    }
  };

  return (
    <form onSubmit={handleSendOtp}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <button type="submit">Send OTP</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default SendOtpForm;