import React, { useState } from "react";
import { collection, query, where, getDocs, updateDoc, getDoc } from "firebase/firestore";
import { db, auth } from '../../components/firebase'; // Ensure the path is correct
import { setDoc, doc, addDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
const ChatModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchField, setSearchField] = useState('userName');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setUsers([]);
        setSearchValue('');
        setError(null);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const q = query(collection(db, "Users"), where(searchField, "==", searchValue));
            const querySnapshot = await getDocs(q);

            const foundUsers = [];
            querySnapshot.forEach((doc) => {
                foundUsers.push({ id: doc.id, ...doc.data() });
            });

            if (foundUsers.length > 0) {
                setUsers(foundUsers);
                setError(null);
            } else {
                setUsers([]);
                setError("User not found");
            }
        } catch (err) {
            console.error("Error searching for user: ", err);
            setError("An error occurred while searching for the user");
        }
    };

    const handleAddFriend = async (userName, email, number) => {
        const user = auth.currentUser;
       console.log(userName.email , number)
        try {
          if (user) {
            // Validate input parameters
            if (!userName || !email || !number) {
              throw new Error("Invalid input: userName, email, and number are required.");
            }
      
            const docDetails = doc(db, "Users", user.uid);
            const userDetailsSnapshot = await getDoc(docDetails);
      
            if (userDetailsSnapshot.exists()) {
              const theUserSendingReq = userDetailsSnapshot.data();
      
              // Validate user data from Firestore
              if (!theUserSendingReq.userName || !theUserSendingReq.email || !theUserSendingReq.number) {
                throw new Error("Invalid user data: userName, email, and number are required.");
              }
      
              // Ensure the user is not sending a request to themselves
              if (userName === theUserSendingReq.userName || email === theUserSendingReq.email) {
                alert("You cannot send a friend request to yourself.");
                return;
              }
      
              // Add friend request document
              const docRef = await addDoc(collection(db, "reqFriends"), {
                from: {
                  userName: theUserSendingReq.userName,
                  email: theUserSendingReq.email,
                  number: theUserSendingReq.number,
                },
                to: {
                  userName: userName,
                  email: email,
                  number: number,
                },
                status:'pending',
                accept:false
              });
              toast.success(`friend request sent to ${userName}`,{position:"bottom-center"})
              alert(`friend request sent to ${userName}`)
            } else {
              console.log("User data not found");
            }
          } else {
            console.log("No authenticated user");
          }
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      };

    return (
        <div className={`w-full  ${isOpen ? 'blur-background' : ''}`}>
            <div className="btn w-full h-8 flex items-center justify-center">
                <button
                    className="text-3xl text-white rounded-full relative bottom-1"
                    onClick={openModal}
                >
                    +
                </button>
            </div>
            {isOpen && (
                <div className="fixed chatModal inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
                    <div className="addUserModal flex justify-center items-center flex-col bg-white p-8 rounded-lg shadow-lg z-10">
                        <button className="absolute top-2 right-2 m-4 text-xl" onClick={closeModal}>x</button>
                        <div>
                            <form className="flex justify-center items-center flex-col" onSubmit={handleSearch}>
                                <h2 className="text-2xl border-b-2 mb-4">Add User</h2>
                                <select
                                    className="select inpt p-2 mt-4 w-full h-12 text-xl"
                                    value={searchField}
                                    onChange={(e) => setSearchField(e.target.value)}
                                >
                                    <option className="text-xl" value="userName" key="userName">Username</option>
                                    <option className="text-xl" value="email" key="email">Email</option>
                                    <option className="text-xl" value="number" key="number">Number</option>
                                </select>
                                <input
                                    type="text"
                                    className="inpt text-xl p-2 m-2 w-full"
                                    style={{ background: 'transparent' }}
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                />
                                <button className="btn p-2 m-2 rounded-md" type="submit">Search User</button>
                            </form>
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                            {users.length > 0 && (
                                <div className="mt-4 w-full flex flex-col justify-around items-around">
                                    <p>Users found:</p>
                                    <ul>
                                        {users.map(user => (
                                            <li key={user.id} className="mb-2 flex items-center justify-between">
                                                <p>{user.userName}</p>
                                                <p className="ml-4">{user.email}</p>
                                                <button
                                                    className="btn p-2 ml-2 rounded-md"
                                                    onClick={() => handleAddFriend(user.userName , user.email ,user.number)}
                                                >
                                                    Add Friend
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatModal;