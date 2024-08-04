const express = require('express');
const cors = require('cors');
const {MongoClient} = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

app.post("/save",(req,res)=>{
	const url = "mongodb+srv://hrishikesh0304:jF4akltx8SEJwgFE@cluster0.ndzx4qh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
	const client = new MongoClient(url);
	const db = client.db("ss16april24");
	const coll = db.collection("student");
	const doc = {"name":req.body.name,"company":req.body.company,"pkg":req.body.pkg};
	coll.insertOne(doc)
	.then(result=>res.send(result))
	.catch(error=>res.send(error));
});

app.listen(9000,()=>{console.log('Server listening at port 9000');});