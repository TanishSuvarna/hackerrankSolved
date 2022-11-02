import React from 'react'
import { useState , useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import ReactLogo from './img/hackerrank.svg';
import axios from 'axios';
const Form = () => {
    const navigate = useNavigate()
    const [username , setUsername] = useState("");
    const[error , setError] = useState(false);
    const handleChange = async(e) => {
        setUsername(e.target.value);
    }
    const handleSubmit = async(e) =>{
      e.preventDefault();
      localStorage.setItem("username" , username);
      navigate('/display')
    }
    useEffect(() => {
        const controller = new AbortController(); 
        let data;
        const x =async()=>{ 
        try{
              data = await axios.get(`http://localhost:5000/${username}`,{
                signal: controller.signal
              })
              setError(data.data.check)
        }
        catch(err){
            return err;
        }
        }
        x();     
     return()=>{
      controller.abort()
     }   
}, [username])
    
  return (
    <div className='username'>
      <form style={{ width : "500px" , border : '3px solid grey' ,backgroundColor:"#1C1C1C" , display : 'flex' , alignItems : 'center'  , flexDirection : 'column'}} onSubmit ={handleSubmit}>
        <img style={{
        backgroundColor: 'grey',
        border:'8px solid grey',
      }}
        src ={ReactLogo} 
        alt ="Not Loaded"/>
        <label style={{ display : "flex" , marginTop : '40px',marginBottom : '40px' , color : 'grey' , fontSize : '15px' , fontWeight: 'bold',flexDirection : 'column'}}>
            <h2 style={{marginBottom : '2px' , marginLeft:"auto" , marginRight : "auto"}} >Username</h2>
            <input style = {{marginBottom:'4px', maxWidth :"200px" , height :"30px"}} value  ={username} onChange = {handleChange} type = "text" placeholder='Enter Your Username'/>
            <span style={{  marginLeft:"auto" , marginRight : "auto" , border:'1px' , color:'red'}}>{error && username.length > 0 && 'Username Is Not Valid'}</span>
        </label>
        <input style= {{marginBottom : "10px" , background :"grey" , width : "6rem" ,height:"2rem" , borderRadius:"10px"}} disabled = {error} type = "submit" placeholder='Submit'/>
    </form>
    </div>
    
  )
}

export default Form

