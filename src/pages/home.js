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
import ChatModal from "./components/chatModal"
import HamburgerButton from './components/hamburger';
import Menu from './components/menu';
const Home = () => {
    const navigate = useNavigate();
    const { logout } = useAuth(null);
    const [toggletheme, settoggletheme] = useState(false);
    const [User, SetUser] = useState()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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



    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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

            <div className="m-4 absolute">
                <HamburgerButton isActive={isMenuOpen} toggleButton={toggleMenu} />
                <Menu isOpen={isMenuOpen}>
                    <div className="flex justify-center">
                        {User ? (
                            <div className="flex justify-center items-center p-4 text-white group w-full" style={{ height: 'fit-content' }}>
                                <div>
                                    <img className="mr-4 border rounded-full" style={{ height: 38, width: 38 }} src={mypic} alt="" />
                                </div>
                                <h3 className="text-xl">{User.userName}</h3>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <ChatModal />
                    <Chats />
                    <div className="flex-grow"></div>
                    <div className="flex items-center justify-center p-4">
                        <div>
                            <button className="btn p-2 mr-4 rounded-full" onClick={ToggleDark}>
                                {toggletheme ? (
                                    <LightIcon className="h-5 w-5" />
                                ) : (
                                    <DarkIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                        <button onClick={handleLogout} className="btn p-2 rounded-2xl w-24">
                            Logout
                        </button>
                    </div>
                </Menu>
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
