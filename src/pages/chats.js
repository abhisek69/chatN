import React from "react";
import mypic  from "./mypic.jpg";
const Chats = () => {
    const chat1 = [
        { name: 'Nanda', pic: mypic },
        { name: 'lisa', pic: mypic },
        { name: 'penda', pic: mypic },
        { name: 'babula', pic: mypic }
    ];

    return (
        <div className="flex m-4 flex-col items-center mt-10 ">
               <h1 className="text-white text-3xl border-b-2 w-[80] text-center p-4 mb-1">Chats</h1>
            {chat1.map((chat, index) => (
                <div key={index} className="flex items-center justify-start pl-4 m-1 cursor-pointer w-full p-4 chat">
                    <img src={chat.pic} alt={`${chat.name}'s avatar`} className="w-10 h-10 rounded-full mr-2 ml-10" />
                    <span className="text-white text-2xl">{chat.name}</span>
                </div>
            ))}
        </div>
    );
};

export default Chats;
