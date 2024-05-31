import React from "react";

const ChatBox = ()=>{
return (            <div className=" chatBox w-[90%] h-[87%] rounded-lg p-3 mt-5">
<div className="sendForm w-full flex justify-center  flex-col">
    <form className="flex">
        <input className="sendInput h-10 focus:outline-none" type="text" placeholder="type" />
        <button className="Sendbtn h-10">Send</button>
    </form>
</div>
</div>)
}

export default ChatBox;