import React , { useState , useEffect } from "react";
import "./style.css";
import { ReactComponent as DarkIcon } from '../../src/components/icons/dark.svg';
import { ReactComponent as LightIcon } from '../../src/components/icons/light.svg';
import { auth , db } from "../components/firebase";
import { doc , getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
const Home = () => {
    const navigate = useNavigate();
    const {  logout } = useAuth(null);
    const [toggletheme, settoggletheme] = useState(false);
    const [User , SetUser]= useState()
    const ToggleDark = () => {
        settoggletheme(!toggletheme);
        localStorage.setItem('theme', JSON.stringify(toggletheme?'light':'dark'));
        toggletheme ? console.log('light') : console.log('dark');
    }

    const getUserData = async () => {
        const user = auth.currentUser;
        if (user) {
            const docDetails = doc(db, "Users", user.uid);
            const UserDetails = await getDoc(docDetails);
            if (UserDetails.exists()) {
                SetUser(UserDetails.data());
            } else {
                console.log("User data not found");
            }
        } else {
            console.log("User not authenticated");
        }
    };
    
    
    const handleLogout = async ()=>{
     try {
        await logout(User.userName);
        navigate("/")
     } catch (error) {
        navigate("/")
     }
    }
    useEffect(() => {
        const savedTheme = JSON.parse(localStorage.getItem('theme'));
        if (savedTheme) {
            settoggletheme(savedTheme === 'dark');
        }
        getUserData();
        
      }, []);

    return (
        <div className={`home h-screen ${toggletheme ? 'dark' : 'light'} flex`}>
            <div className="absolute flex items-center justify-around top-4 right-4 " >
                <button className="btn p-2 rounded-full" onClick={ToggleDark}>
                {toggletheme  ? <LightIcon style={{height:20,width:20}}  /> : <DarkIcon style={{height:20,width:20}}  />}
                </button>
                <button onClick={handleLogout} className="btn p-2 rounded-2xl m-2">logout</button>
            </div>
         {User?(<div className="border p-4 m-2" style={{height:'fit-content'}}>
            <h3>Welcome {User.userName}</h3>
            <p>{User.email}</p>
            <p>{User.number}</p>
         </div>):(<div><p>no user details present</p></div>)}
        </div>
    );
}

export default Home;
