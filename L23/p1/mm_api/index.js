const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get("/mm",(req,res)=>{
	let msgs = ["live and let live","just do it","nothing impossible","live big","u can win","just did it","tit for tat","All is well"];
	let randIdx = parseInt(Math.random() * msgs.length);
	res.send({"msg":msgs[randIdx]});
	res.end();
});

app.listen(9000,()=>{console.log("Server listening at port 9000")});