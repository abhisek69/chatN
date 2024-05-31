import React, { useState, useEffect } from "react";
import "./style.css";
import { ReactComponent as DarkIcon } from '../../src/components/icons/dark.svg';
import { ReactComponent as LightIcon } from '../../src/components/icons/light.svg';
import { auth, db } from "../components/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import mypic from "./mypic.jpg";
import Chats from "./chats";
import Search from "./components/searchbar";
import ChatBox from "./components/chatBox";
const Home = () => {
    const navigate = useNavigate();
    const { logout } = useAuth(null);
    const [toggletheme, settoggletheme] = useState(false);
    const [User, SetUser] = useState()
    const ToggleDark = () => {
        settoggletheme(!toggletheme);
        localStorage.setItem('theme', JSON.stringify(toggletheme ? 'light' : 'dark'));
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


    const handleLogout = async () => {
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
        <div className={`home h-screen ${toggletheme ? 'dark' : 'light'}`}>

            <div className="menu w-auto h-full flex flex-col  ">
                <div className="flex justify-center">
                    {User ? (<div className=" flex justify-center items-center p-4  text-white group w-full uppermenu" style={{ height: 'fit-content' }}>
                        <div className="" >
                            <img className="mr-4 border rounded-full" style={{ height: 38, width: 38 }} src={mypic} alt="" />
                        </div>
                        <h3 className="text-xl menu-text">{User.userName}</h3>

                        {/* <div className="nameHover absolute top-20 p-4 rounded-lg shadow-lg hidden group-hover:block">
                            <p className="text-sm text-gray-300">{User.email}</p>
                            <p className="text-sm text-gray-300">{User.number}</p>
                        </div> */}
                    </div>) : (<div></div>)}

                </div>
                <div className="btn h-10 flex items-center justify-center flex-col">
                    <button className="text-xl text-white rounded-full menu-text">new chat</button>
                </div>
                <Chats />
                
                <div className="flex-grow"></div>
                
                <div className="flex items-center justify-center p-4 uppermenu">
                <div>
                <button className="btn p-2 mr-4  rounded-full" onClick={ToggleDark}>
                        {toggletheme ? (
                            <LightIcon style={{ height: 20, width: 20 }} />
                        ) : (
                            <DarkIcon style={{ height: 20, width: 20 }} />
                        )}
                    </button>
                </div>
                    
                    <button onClick={handleLogout} className="btn p-2 rounded-2xl " style={{ width: "100px" }}>
                        logout
                    </button>
                    
                </div>
            </div>
            <div className="flex w-full items-center flex-col">
                <div className="flex w-full  justify-center">
                    <Search />
                </div>

                <ChatBox />

            </div>
        </div>

    );
}

export default Home;
