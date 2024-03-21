import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import '../index.css';



const ProfilePage = () => {


  const [user3, setUser] = useState([]);
  //const [loading, setLoading] = useState(false);
  useEffect(() => {
      //setLoading(true);
      axios
          .get('http://localhost:5555/user3')
          .then((response) => {
              setUser(response.data.data);
             // setLoading(false);
          })
          .catch((error) => {
              console.log(error);
             // setLoading(false);
          });
  },[]);



return (
    <div className="Profile-page">

        <div className="Profile-page-bar">
        <h1 className = "rounded-lg bg-gradient-to-r from-sky-400 to-emerald-300 hover:from bg-sky-500 hover:to-emerald-400 text-white text-xl px-3 py-2"> Profile Page </h1>
      </div>

      <div className="button-container">
        <Link to="/page1" className="orange-sidebar-text">Player Stats</Link>
        <Link to="/page2" className="orange-sidebar-text">Matches Played</Link>
        <Link to="/page3" className="orange-sidebar-text">Awards Earned</Link>
        <Link to="/page4" className="orange-sidebar-text">Team History</Link>
        <Link to="/page5" className="orange-sidebar-text">Request Team Transfer</Link>
        <Link to="/page5" className="orange-sidebar-text">Find/Join a team</Link>
      </div>

    <div className="profile-role">
    <img className="Profile-image" src="/src/images/ProfileIcon.png" alt="Profile Icon" />
    </div>
    
    <div>
    <h1 className='Profile-info' > Name:  </h1>
    <p className='Profile-info' > My role/position: </p>
    <p className='Profile-info' > Membership type: </p>
    </div>
     





    </div>





  );
};
export default ProfilePage;