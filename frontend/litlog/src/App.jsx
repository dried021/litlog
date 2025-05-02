import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AppRouter from './routes/AppRouter';
import { useState, useEffect } from 'react'
import axios from 'axios';

function App(){
  return(
    <>
      <div className="app-container">
        <Header/>
        <main styles={{minHeight: '80vh'}}>
          <AppRouter />
        </main>
        <Footer/>
      </div>
    </>
  );

}
export default App
//api 호출 예시
/*
function App() {
  const [message, setMessage] = useState("");

  useEffect(()=>{
    axios.get("http://localhost:8080/api/message")
      .then(res=>setMessage(res.data))
      .catch(err=> console.error("API 호출 에러: ", err));
  }, []);

  return (
    <>
        <div>
          <h1>React + Spring Boot 연동</h1>
          <p>서버 메시지: {message}</p>
        </div>
    </>
  )
}

export default App
*/