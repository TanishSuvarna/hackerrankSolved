import React from 'react'
import { useState , useEffect} from 'react';
import axios from 'axios';
import ReactLogo from './img/hackerrank.svg';
import './css/display.css'
const DisplayPage = () => {
    const [questions , setQuestions] = useState("");
    const [totalQues , setTotalQues] = useState(0);
    const [visible , setVisible] = useState(false);
    useEffect(() => {
       (async()=>{
            const ques = await axios.get(`http://localhost:5000/allQues/${localStorage.getItem("username")}`)
            setQuestions(ques.data.allQues)
            setTotalQues(ques.data.totalQues);
        })();
    }, [])
  return (
    <div style={{minHeight:'inherit'}}>
    <img style={{
        backgroundColor: 'grey',
        border:'8px solid grey',
        maxWidth:'20%',
      }}
        src ={ReactLogo} 
        alt ="Not Loaded"/>
    <div className="waviy">
   <span style={{'--i':1 , marginLeft:'10px'}}>T</span>
   <span style={{'--i':2}}>O</span>
   <span style={{'--i':3}}>T</span>
   <span style={{'--i':5}}>A</span>
   <span style={{'--i':6}}>L</span>
   <span style={{'--i':7, marginLeft : '15px'}}>Q</span>
   <span style={{'--i':8}}>U</span>
   <span style={{'--i':9}}>E</span>
   <span style={{'--i':10}}>S</span>
   <span style={{'--i':11 }}>T</span>
   <span style={{'--i':12}}>I</span>
   <span style={{'--i':13}}>O</span>
   <span style={{'--i':14}}>N</span>
   <span style={{'--i':15}}>S</span>
   <span style={{'--i':16,marginLeft : '15px'}}>S</span>
   <span style={{'--i':17 }}>O</span>
   <span style={{'--i':18}}>L</span>
   <span style={{'--i':19}}>V</span>
   <span style={{'--i':20}}>E</span>
   <span style={{'--i':21}}>D</span>
   <span style={{color : 'grey' , marginLeft : '15px' , '--i' : 24 , paddingRight:'20px' , textDecoration:'underline black'}}>{totalQues}</span>
  </div>
  {!visible ?
  <div onClick ={() => setVisible(true)}className="btn btn-one"><span>QUESTIONS...</span></div>:
  <div style={{color:"white" , fontSize :'30px' , margin:'10px 0' ,textAlign:"center" }}>All Questions</div>}
    {questions && visible && 
        questions.map((ques , index)=> (
           <div key = {index} className = "dis" onClick = {(e) => window.open(`https://hackerrank.com/${ques.url}`)}>{ques.name}</div>
        ))
    }
    </div>
  )
}

export default DisplayPage;