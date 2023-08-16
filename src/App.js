import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';


import Homepage from './layouts/main/Body/pages/homepage/Homepage';
import Register from './layouts/main/Body/pages/register/Register';
import Login from './layouts/main/Body/pages/login/Login';

import Header from './layouts/main/Header/Header';
import Body from './layouts/main/Body/Body';

import GlobalContext from './layouts/hooks/GlobalContext';
import getAPI from './server/axios/getAPI';

function Authenication() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: "100%",
      alignItems: 'center',
      minHeight: "100vh"
    }}>
      <Header />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  )
}
function Main() { 
  return (
    <>
      <Header />
      <Body />
    </>
  )
}

const IP = "192.168.1.4"
function App() {

  const [userInformations, setUserInformations] = useState(null)

  useEffect(() => {
    async function getInformation() {
      const id = localStorage.getItem("UID")
      if (localStorage.getItem("accessToken")) {
        getAPI(`http://${IP}:5000/api/user/get`, {
          id: id
        }, () => {}, (response) => {
          setUserInformations(response.data)
        })
      }
    }

    getInformation()
  }, [])

  return (
    <GlobalContext.Provider value={{
      // sẽ cập nhật những state global tại đây
      userInformations,       // những thông tin người dùng được lấy từ databse
      setUserInformations,
      IP

    }}>
      <div style={{ background: "#7ac8f5" }}>
        <Router>
          {userInformations !== null ? <Main /> : <Authenication />}
        </Router>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
