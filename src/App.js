import React from 'react'
import './App.css'
import {Navbar}  from './pages/Navbar';
import {Signup} from './pages/Signup';
import {Login} from './pages/Login';
import {Contact }from './pages/Contact';
import {Search} from './pages/Search';
import  {About} from './pages/About';
import {Home} from './pages/Home'
import { Routes, Route} from 'react-router-dom'
import { Transition } from './pages/Transition';
import  {Freelancer} from './pages/Freelancer';



function App(){ 
    return (
     
        <div className='app'>
          <Navbar/>
          <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/signup" element={<Transition/>}/>
          <Route path="/signup?job=client" element={<Signup/>}/>
          <Route path="/signup?job=freelancer" element={<Freelancer/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/Search" element={<Search/>}/>
          </Routes>
          </div>  
       
          
    );
    
}
export default App ; 













