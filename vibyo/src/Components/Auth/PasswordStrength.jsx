import React, { useEffect } from 'react'
import { useState } from 'react'

const PasswordStrength = ({password}) => {

const colors = [
 { id: 0, color: "bg-gray-200", text: "text-gray-200", strength: "" },        // No Password
 { id: 1, color: "bg-red-500", text: "text-red-500", strength: "Very weak" },        // Very Weak
 { id: 2, color: "bg-orange-400", text: "text-orange-400", strength: "Weak" },     // Weak
 { id: 3, color: "bg-yellow-400", text: "text-yellow-400", strength: "Moderate" },     // Moderate
 { id: 4, color: "bg-lime-500", text: "text-lime-500", strength: "Strong" },       // Strong
 { id: 5, color: "bg-green-600", text: "text-green-600", strength: "Very strong" },      // Very Strong
];

  function getPasswordStrength(password) {
    let score = 0;
    if (!password) return score;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (password.length <= 4) return Math.min(2,score);
    if(password.length <= 6 && password.length > 4) return Math.min(3,score);
    return score;
  }

  const [passwordStrength, setPasswordStrength] = useState(getPasswordStrength(password));

  useEffect(() => {
    setPasswordStrength(getPasswordStrength(password));
  } , [password]);

  return (
    <div className={`flex items-center justify-start gap-10 w-full`}>
      {passwordStrength >= 1 && (
        <>
          <div className="w-1/2 bg-gray-200 h-1 rounded">
            <div
              className={`h-1 transition-all duration-300 ${colors[passwordStrength].color}`}
              style={{
                width: `${(passwordStrength / 5) * 100}%`,
                borderRadius: 'inherit',
                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
              }}
            />
          </div>
          <div className={`${colors[passwordStrength].text} text-[13px] font-semibold`}>
            <span className='text-black'>Strength: </span>{colors[passwordStrength].strength}
          </div>
        </>
      )}
    </div>
  );

}

export default PasswordStrength
