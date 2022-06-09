import React, { useEffect } from 'react';
import axios from 'axios';

function Protected() {
    useEffect(()=>{
        const token = localStorage.getItem('token');
        axios.get("http://localhost:5000/protected",{headers: {
            Authorization : token,
        }}).then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
        })
    },[])
  return (
    <div><h1>Protected</h1>
    </div>
  )
}

export default Protected