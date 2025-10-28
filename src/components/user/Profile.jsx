import React, { useEffect, useState} from "react";
import UHeatMap from "./HeatMap";


import Navbar from "../Navbar";
import { HiOutlineComputerDesktop } from 'react-icons/hi2';
import "./Profile.css";
import { FaBookOpen } from 'react-icons/fa';
const Profile = () => {
   const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const response = await fetch(`http://51.21.194.205:3000/profile/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);
  if (!user) {
    return (
      <>
        <Navbar />
        <div className="loading">Loading user profile...</div>
      </>
    );
  }

 

  const handleLogout = () => {
     localStorage.removeItem('userId');
     localStorage.removeItem('token');
     window.location.href = '/auth';
  }

   
return(
    <>
<Navbar/>
<div className="profile">
<h3><FaBookOpen/>  Overview</h3>
<h3><HiOutlineComputerDesktop/> Starred Repositories</h3>
<div>
<button onClick={handleLogout}>Logout</button>
</div>
</div>

<hr />
<div className="pro-details">
  <div>
    <div className="circle">
    { user.username.charAt(0).toUpperCase()}  
      </div>
    <h3 style={{marginLeft:"30px"}}>{user.username}</h3>
    <button>Follow</button>
    <div className="para">
        <p>10 followers</p>
        <p>10 following</p>
        
    </div>
    </div>
    <UHeatMap/>

</div>
</>
)
}
export default Profile;