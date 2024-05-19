import React , { useState , useEffect } from "react";
import "./style.css";
import { ReactComponent as DarkIcon } from '../../src/components/icons/dark.svg';
import { ReactComponent as LightIcon } from '../../src/components/icons/light.svg';

const Home = () => {
    const [toggletheme, settoggletheme] = useState(false);
    
    const ToggleDark = () => {
        settoggletheme(!toggletheme);
        localStorage.setItem('theme', JSON.stringify(toggletheme?'light':'dark'));
        toggletheme ? console.log('light') : console.log('dark');
    }

    useEffect(() => {
        const savedTheme = JSON.parse(localStorage.getItem('theme'));
        if (savedTheme) {
            settoggletheme(savedTheme === 'dark');
        }
      }, []);

    return (
        <div className={`home h-screen ${toggletheme ? 'dark' : 'light'} flex`}>
            <div className="absolute top-4 right-4 " >
                <button className="btn p-2 rounded-full" onClick={ToggleDark}>
                {toggletheme  ? <LightIcon style={{height:20,width:20}}  /> : <DarkIcon style={{height:20,width:20}}  />}
                </button>
            </div>
        </div>
    );
}

export default Home;
