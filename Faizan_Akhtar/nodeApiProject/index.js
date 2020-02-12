const express=require('express');
const bodyParser=require('body-parser')
const app=express();
const cors = require('cors');
const database=require('./database/config')
app.use(bodyParser.json());
app.use(cors({origin: '*'}));
require('./routes/route.js')(app)


app.listen(4000,()=>{
	console.log("listening port 4000");
})

