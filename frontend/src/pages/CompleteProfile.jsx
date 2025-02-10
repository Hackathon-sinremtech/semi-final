import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import supabase from "../config/supabase";

const CompleteProfile = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("Male");
  const [email, setEmail] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    const getUserEmail = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email); // Store the user's email
      } else {
        setMessage('You are not logged in.');
      }
    };
    getUserEmail();
  }, []);

  const handleSubmit = async (e) => {
    const { data, error } = await supabase.from('patient').insert([
      {
        patient_email: email,
        patient_name: name,
        patient_contact: mobile,
        patient_gender: sex,
        patient_age: age
      }
    ])
    
    if (error){
      console.log(error)
    } else {
      navigate('/')
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Complete Your Profile</h2>
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-3 mb-4 border rounded" />
        <input type="tel" placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} required className="w-full p-3 mb-4 border rounded" />
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required className="w-full p-3 mb-4 border rounded" />
        <select value={sex} onChange={(e) => setSex(e.target.value)} className="w-full p-3 mb-4 border rounded">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <button  onClick={handleSubmit} type="submit" className="w-full bg-blue-600 text-white p-3 rounded">Submit</button>
      </div>
    </div>
  );
};

export default CompleteProfile;
