import express  from "express";
import axios from "axios";
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
axios.defaults.withCredentials = true;

const checkLogin = async(req,res) =>{
    const username = req.params.username;
    try {
        await axios.get(`https://www.hackerrank.com/rest/contests/master/hackers/${username}/profile`,{
            headers:{
                'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
            }
        })
        .then(data => {
          if(!data.error) res.status(200).json({check : false});
          else res.json({check:true});
        })
  }
  catch(err){
     res.json({check:true});
  }
}
const getAllQues = async (req,res) => {
    let res1;
    let cursor="";
    let allQues = [];
    const username = req.params.username;
    do{
    try{
        res1 = await axios.get(`https://www.hackerrank.com/rest/hackers/${username}/recent_challenges?limit=100?&cursor=${cursor}` ,{ headers:{
           'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
        }
       });
       }catch(err){
            return res.status(err.response.status).json({err : err.response.statusText})
       }
       cursor = res1.data.cursor;
       res1.data.models.forEach(ques => {
        const {name,url} = ques; 
        allQues = [...allQues ,{name,url}];
       })
       
    }while(!res1.data.last_page);
    return res.status(200).json({allQues , totalQues : allQues.length});
}
const query = "https://www.hackerrank.com/rest/contests/master/tracks/algorithms/challenges?offset=0&limit=50&filters[subdomains][]=arrays-and-sorting&filters[subdomains][]=search&filters[difficulty][]=medium"
const getData =async (req,res) => {
    let res1
    try{
         res1 = await axios.get(query ,{
        headers:{
            'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
        }
        }
        )
        }catch(err){
             console.log(err);
        };
        console.log(res1);
        console.log(res1.data.models.length);
        res.status(200).json({ques: res1.data.models});
    }
app.get('/hacker',getData);
app.get('/allQues/:username',getAllQues);
app.get('/:username',checkLogin)
console.log(process.env.PORT);
app.listen(process.env.PORT || 5000);
