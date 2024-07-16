import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './Chatroom.css';
import axios from 'axios';
import { useEffect } from 'react';
const Chatroom = ({username}) => {
  console.log("Chatroom")
  const { id } = useParams();
  // console.log(id)
  const navigate=useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  
  console.log(id);
  
  function clickHandler()
  {
    navigate(-1);
  }

  useEffect(() => {
    // Fetch messages from the backend for the specific room
    fetchMessages();
  }, []);
  const endpoint1=`/messages/${id}/`
  const fetchMessages = async () => {
    // Fetch messages from the backend and set them to state
    const response = await axios.get(endpoint1);
    const data = response.data.chat;
    console.log(data);
    setMessages(data);
  };
   
   const endpoint='/newmessage/';
  async function handleSendMessage (){
    // Send new message to the backend
    const data={id,username,newMessage};

    const response = await axios.post(endpoint, data);
    setNewMessage('');
    fetchMessages(id); // Refresh messages
  };
  return (
    <div className="Chatroom">
      <div className='left'>
        <br/>
        <br />
        <br />
        <button className='button-8' onClick={clickHandler}>Back to Chatroom Page</button>
      </div>
      <div className='right'>
      <div className="messages">
  {messages.map((msg, index) => (
    <div key={index} className="message">
      {msg.sender === username ? (
        <div className="Mine">{msg.message}</div> // Show only message if sender is current user
      ) : (
        <div className="sender">
          <span >{msg.sender}: </span>
          {msg.message}
        </div>
      )}
    </div>
  ))}
</div>





        <div className="new-message">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here"
          />
          {/* <br></br>
          <br></br>
          <br></br> */}
          <button className="button-17" onClick={handleSendMessage}>Send</button>
        </div>
      </div>

    </div>
  );
}

export default Chatroom;

//// const [messages, setMessages] = useState([]);
  // const [newMessage, setNewMessage] = useState('');

  // const handleSendMessage = () => {
  //   if (newMessage) {
  //     setMessages([...messages, { text: newMessage, sender: 'You' }]);
  //     setNewMessage('');
  //   }
  // };

  // return (
  //   <div>
  //     <h2>{id.charAt(0).toUpperCase() + id.slice(1)} Room</h2>
  //     <div>
  //       {messages.map((msg, index) => (
  //         <div key={index}>
  //           <strong>{msg.sender}:</strong> {msg.text}
  //         </div>
  //       ))}
  //     </div>
  //     <input
  //       type="text"
  //       value={newMessage}
  //       onChange={(e) => setNewMessage(e.target.value)}
  //     />
  //     <button onClick={handleSendMessage}>Send</button>
  //   </div>