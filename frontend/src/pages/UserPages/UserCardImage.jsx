import React, { useEffect, useState } from 'react';
import supabase from '../../config/supabase';
import { useNavigate } from "react-router"
// anish king
function UserCardImage() {
  const data = [
    { value: '19', label: 'Age' },
    { value: 'Male', label: 'Sex' },
  ];

  const navigate = useNavigate();
  const [user,setUser] = useState([]);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      navigate('/login')
    }
  };

  useEffect(() => {
    const fetch = async () =>{
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
  
      if (sessionError) {
        console.log('Failed to get session: ' + sessionError.message);
        return;
      }
  
      const userEmail = session?.user?.email;
      if (!userEmail) {
        console.log('No authenticated user.');
        return;
      }
  
      // Step 2: Fetch data from Table A where email matches the authenticated user
      const { data: fetchedData, error: fetchError } = await supabase
        .from('patient') // Replace 'table_a' with your source table name
        .select('*')
        .eq('patient_email', userEmail);

        setUser(fetchedData[0])
    }
    
    fetch();
  },[])

  return (
    <div className="min-w-sm mx-auto bg-white  rounded-xl overflow-hidden shadow">
      {/* Top background image */}
      <div
        className="h-[140px] bg-cover bg-center bg-blue-50"
        
      />

      {/* Avatar image */}
      <img
        src="/profilePic.png"
        alt="Avatar"
        className="w-28 h-28 rounded-full mx-auto -mt-14 "
      />

      {/* User name and title */}
      <div className="px-6 pb-6">
        <p className="text-center text-2xl font-medium mt-2">{user.patient_name}</p>
       

        {/* Stats */}
        <div className="flex  justify-between gap-8 mt-10">
            <div className='flex items-center'>
              <p className="text-center text-xl text-gray-500 font-bold">Age&nbsp;</p>
              <p className="text-center text-xl text-blue-600 font-bold">{user.patient_age}</p>
            </div>
            <div className='flex items-center'>
              <p className="text-center text-xl text-gray-500 font-bold">Sex&nbsp;</p>
              <p className="text-center text-xl text-blue-600 font-bold">{user.patient_gender}</p>
            </div>
          
        </div>
        <div className='flex justify-center mt-10'>
           <button className='bg-blue-600 py-2 px-[139px] rounded-lg text-white font-semibold  '
           onClick={() => logout()}
           >
          Log out
        </button>
        </div>
       
       
      </div>
    </div>
  );
}
export default UserCardImage