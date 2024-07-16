import { Link} from "react-router-dom";
import './Chatrooms.css'
import { useState,useEffect } from "react";
import axios from "axios";

const Chatrooms = (props)=> {
  const username=props.username;
  const [rooms,setrooms] =useState([]);
  const [createroom,showroom]=useState(false);
  const[newroom,setnewroom]=useState('');
  const[delroom,setdelroom]=useState('');
  const [showdel,setshowdel]=useState(false);
  
  function clickHandler1()
  {
    setshowdel(!showdel);
  }

  function changeHandler1(event)
  {
    event.preventDefault();
    setdelroom(event.target.value);
  }
  function changeHandler(event)
  {
    event.preventDefault();
    setnewroom(event.target.value);
  }
  useEffect(() => {
    fetchChatRooms();
  }, []);

  const fetchChatRooms = async () => {
    try {
      const response = await axios.get('/chatrooms/');
      console.log(response.data);
      setrooms(response.data.room_list);
      console.log(rooms)
      console.log("response aaya")
    } catch (error) {
      console.error('Error fetching chat rooms', error);
    }
  };

 
  const submitHandler = async (event) => {
    event.preventDefault();
    if (newroom.trim()) {
      try {
        console.log(newroom)
        await postRoom(newroom);
        setrooms((prevRooms) => prevRooms.filter(room => room !== newroom));
        setrooms((prevRooms) => [...prevRooms,  newroom]);
        setnewroom('');
        showroom(false);
      } catch (error) {
        console.error('Error creating chat room', error);
      }
    }
  };

  const submitHandler1 = async (event) => {
    event.preventDefault();
    if (delroom.trim()) {
      try {
        
        await postRoom1(delroom);
        setrooms((prevRooms) => prevRooms.filter(room => room !== delroom));
        setdelroom('');
        setshowdel(false);
      } catch (error) {
        console.error('Error creating chat room', error);
      }
    }
  };

  const endpoint=`/addroom/`

  const postRoom = async (roomName) => {
    try {
      const data={roomName}
      const response = await axios.post(endpoint, data);
      console.log(response.data);
    } catch (error) {
      console.error('Error posting chat room', error);
    }
  };

  const postRoom1 = async (roomName) => {
    try {
      const data={roomName}
      const response = await axios.post(`/delete/`, data);
      console.log(response.data);
    } catch (error) {
      console.error('Error posting chat room', error);
    }
  };

  function clickHandler()
  {
    showroom(!createroom);
  }
  console.log("Chatrooms")
  // const setNav=props.setNav;
  // setNav(false);
  return (
     <div>
        <h2>Chat Rooms</h2>
        <button className="but" onClick={clickHandler}>
         {!createroom?(<div>Create Chatroom</div>):(<div>Hide</div>)} 
        </button>
        {createroom && 
        <form onSubmit={submitHandler} className="SForm">
        <label className="Ut">
          <p>Name </p>
          
          <input 
          className="inputt"
          required 
          type="text"
          value={newroom}
          onChange={changeHandler}
          name="newroom"
          placeholder="Enter the room you want to create..."
          />
        </label>
        </form>

}


      <ul className="rooms">
        {rooms.map((room, index) => (
        
            <button className="button" key={index} ><Link className="link" to={`/rooms/${room}`}>{room}</Link> </button>
        ))}
      </ul>

      <br />
     
      <button className="but" onClick={clickHandler1}>
         {!showdel?(<div>Delete Chatroom</div>):(<div>Hide</div>)} 
        </button>
        {showdel && 
        <form onSubmit={submitHandler1} className="SForm">
        <label className="Ut">
          <p>Name </p>
          
          <input 
          className="inputt"
          required 
          type="text"
          value={delroom}
          onChange={changeHandler1}
          name="newroom"
          placeholder="Type name of Chatroom that you want to delete.."
          />
        </label>
        </form>

}

<br />
<br />
     </div>
  )
}

export default Chatrooms;