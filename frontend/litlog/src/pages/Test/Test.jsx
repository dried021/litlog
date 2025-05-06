import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Test = () => {
    const [message, setMessage] = useState("");

    useEffect(()=>{
        axios.get("http://localhost:9090/api/message")
        .then(res=>setMessage(res.data))
        .catch(err=> console.error("API 호출 에러: ", err));
    }, []);

    return(
        <>
            <div>
            <h1>React + Spring Boot 연동</h1>
            <p>서버 메시지: {message}</p>
            </div>
        </>
    );
}
export default Test;
