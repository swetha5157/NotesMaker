/* eslint-disable no-unused-vars */
import axios from 'axios'
import React,{useEffect, useState}from 'react'
import { Link } from 'react-router-dom'

import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Edit'
import './Home.css'
function Home() {

    const [notes,setNotes]=useState([])

    const callFtn=()=>{
        const token=localStorage.getItem("token")
        axios.get("http://127.0.0.1:3000/getnotes",{
            headers:{Authorization: `Bearer ${token}`},
        }).then((res)=>{
            console.log(res);
            setNotes(res.data)
        }).catch((e)=>{
            console.log(e);
        });
    };
    useEffect(()=>{
        callFtn()
    },[setNotes])

    return (
        <div className='Home'>
          <h1 className='homenotes'> </h1>
          <Link to="/create">
            <button className='add'>+</button>
          </Link>
          {!notes || (notes.length==0 && (
            <h2 className='nonotes'>No Notes Found!</h2>
          ))}
          <div className='NoteList'>
            {notes && (
              <div>
                {notes.map((note) => (
                  <div key={note._id} className='Notes'>
                    <div className='Content'>{note.content}</div>
                    <Link to={`/update/${note._id}`}>
                      <span className='upicon'><UpdateIcon/></span>
                    </Link>
                    <Link to={`/delete/${note._id}`}>
                      <span className='delicon'><DeleteIcon/></span>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }
export default Home;
