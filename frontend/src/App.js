import './App.css';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Chat from './Pages/Chat';
import Chatrooms from './Pages/Chatrooms';
import Chatroom from './Pages/Chatroom';
import ProtectedRoute from './Pages/ProtectedRoute';



function App() {

  

  const [isLoggedIn, setLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') === 'true');
  const [username, setusername] = useState(sessionStorage.getItem('username') || '');
  console.log("App");
  console.log(isLoggedIn);
  useEffect(() => {
    // Update sessionStorage whenever isLoggedIn or username changes
    sessionStorage.setItem('isLoggedIn', isLoggedIn);
    sessionStorage.setItem('username', username);
  }, [isLoggedIn, username]);



  const [isHome, setHome] = useState(true);
  const [isRegister, setRegister] = useState(true);
  const [isChat, setChat] = useState(true);
  const [isLogin, setLogin] = useState(true);
  const [showNav,setNav]=useState(true);
  return (

      <div className="App">
      {showNav && <Navbar isLoggedIn={isLoggedIn}  setLoggedIn={setLoggedIn} 
        isHome={isHome} setHome={setHome}
        isRegister={isRegister}  setRegister={setRegister}
        isChat={isChat} 
        setChat={setChat}
        isLogin={isLogin}
        setLogin={setLogin}
        username={username}/>
  }
        <Routes>

          <Route path="/" element={<Home setHome={setHome}
          setRegister={setRegister}
          setChat={setChat}
          setLogin={setLogin}/>} />

          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} 
          setHome={setHome}
          setRegister={setRegister}
          setChat={setChat}
          setLogin={setLogin}/>} /> 

          <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn} 
          setHome={setHome}
          setRegister={setRegister}
          setChat={setChat}
          setLogin={setLogin}/>} />

          <Route path="/chat" element={
             
            <Chat 
          isLoggedIn={isLoggedIn}
          setHome={setHome}
          setChat={setChat}
          setLogin={setLogin}
          setNav={setNav}
          setusername={setusername}/>
        
          } />

          <Route path="/rooms" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Chatrooms setNav={setNav} />
            </ProtectedRoute>
          } />  
          
          <Route path="/rooms/:id" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Chatroom username={username} />
              </ProtectedRoute>
            } />

        </Routes>
        {/* <ToastContainer/> */}
      </div>
   
  );
}

export default App;
