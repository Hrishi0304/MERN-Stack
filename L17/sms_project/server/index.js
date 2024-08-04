const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
	"host": "localhost",
	"user": "root",
	"password": "53mY3SQl_",
	"database": "sms11april24",
});

// Set up multer for file uploads
const storage = multer.diskStorage({
	destination: (res,file,cb)=>{
		cb(null,'uploads/'); //Destination for folder uploads
	},
	filename: (req,file,cb) => {
		cb(null, Date.now() + path.extname(file.originalname));  //Unique filename
	},
});

const upload  = multer({storage});

//Serve uploaded files statically
app.use('/uploads',express.static('uploads'));

app.post("/save",upload.single('file'), (req,res) => {
	let data = [req.body.rno,req.body.name,req.body.marks,req.file.filename];
	let sql = "insert into student values(?,?,?,?)";
	con.query(sql,data,(err,result)=>{
		if(err) res.send(err);
		else res.send(result);
	});
});

app.get("/read",(req,res)=>{
	let sql = "select * from student";
	con.query(sql,(err,result)=>{
		if(err) res.send(err);
		else res.send(result);
	});
});

app.delete("/remove",(req,res)=>{
	let data = [req.body.rno];
	fs.unlink("./uploads/"+req.body.image,()=>{});
	let sql = "delete from student where rno=?";
	con.query(sql,data,(err,result)=>{
		if(err) res.send(err);
		else res.send(result);
	});
});

app.listen(9000,()=>{console.log("server ready at 9000");});
