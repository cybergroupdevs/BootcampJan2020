const express =require('express')
const bodyParser=require('body-parser')
const app=express();
const database=require('./database/config')
app.use(bodyParser.json());

require('./routes/route.js')(app)


app.listen(4000,()=>{
    console.log("Listening port 4000")
})

app.get("/",(req,res)=>{
    console.log("Hello! Himanshu Kr here")
    res.send({"text":"Welcome to node session"})
})

app.post("/bootcamp",(req,res)=>{
    console.log(req.body)
    res.send({session:`Bootcamp session:${req.body.year}`})
    //res.send({session:"Bootcamp session:"+${req.body.year}})
})

app.post("/resume",(req,res)=>{
    console.log(req.body)
    res.send({session:`My name is:${req.body.name}`})
    //res.send({session:"Bootcamp session:"+${req.body.year}})
})