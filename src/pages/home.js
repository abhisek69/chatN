import React , { useState } from "react";
import "./style.css";

const Home = () => {
    const [toggletheme, settoggletheme] = useState(false);
    
    const ToggleDark = () => {
        settoggletheme(!toggletheme);
        toggletheme ? console.log('light') : console.log('dark');
    }

    return (
        <div className={`home h-screen ${toggletheme ? 'dark' : 'light'} flex`}>
            <div className="absolute top-4 right-4" >
                <button className="btn p-2 rounded-full" onClick={ToggleDark}>
                    {toggletheme ? 'light' : 'dark'} {/* Emoji icons for day and night */}
                </button>
            </div>
        </div>
    );
}

export default Home;
