// const express = require("express");
// const cors = require('cors');
// require('./RAM_DB.js');

// const app = express();

// app.use(cors({
//     origin: ['http://127.0.0.1:5500', 'http://localhost:5500/']
// }));

// const productController = require("./RAM_create")
// app.use("/RAM", productController);

// app.listen(3000, () => {
//     console.log(`Server is running at http://localhost:3000`)
// })



// const http = require('http');
// const fs = require('fs');

// const server = http.createServer((req, res) => {
//     console.log(req.url, req.method);
//     res.setHeader('Content-Type', "text/html; charset=utf-8;");
//     res.setHeader('Content-Type', "text/css; charset=utf-8;");
//     res.setHeader('Set-Cookie', 'text/javascript');
//     fs.readFile('./store.html', (err, data) =>{
//         if(err)
//         {
//             console.log(data);
//             res.end();
//         }
//         else
//         {
//             res.write(data);
//             res.end();
//         }
//     })
// })

// server.listen(3000, () => {
//     console.log(`Server is running at http://localhost:3000`)
// })

const express = require("express");
const mongoose = require("mongoose");
const { createServer } = require("http");
const app = express();
const serverPort = 3000;
var cors = require("cors");
app.use(cors());
app.use(express.json({ type: "*/*" }));
const dataBaseUrl = "mongodb+srv://valentyn2004pro:Valik2OO4@cluster0.ubpqdy9.mongodb.net/";

mongoose.connect(dataBaseUrl, { useNewUrlParser: true })
  .then(() => console.log("MongoDb connected"))
  .catch(err => console.log(err));

const componentsScheme = new mongoose.Schema({
  call: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
  bar: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Components = mongoose.model("Components", componentsScheme);

app.get("/components", (req, res) => {
    Components.find().then(array=> res.send(array)).catch(err => res.send(err));
});

app.post("/components/new",(req,res)=>{
        req = req.body;
        Components.create({
        call: req.call,
        purpose: req.purpose,
        type: req.type,
        volume: Number(req.volume),
        bar: Number(req.bar),
        image: req.image,
      }).then(obj=>res.send(obj)).catch(err=> res.send(err));
});

app.post("/components/find",(req,res)=>{
  req = req.body;
  Components.findById(req._id).then(obj=>res.send(obj)).catch(err=> res.send(err));
});

app.post("/components/delete",(req,res)=>{
  req = req.body;
  Components.deleteOne({_id: req._id}).then(obj=>res.send(obj)).catch(err=> res.send(err));
});

app.post("/components/change",(req,res)=>{
  req = req.body;
  Components.updateOne({_id: req._id},req).then(obj=>res.send(obj)).catch(err=> res.send(err));
});

const server = createServer(app);
server.listen(serverPort, () => console.log(`Server is ready!\nPort: ${serverPort}`));
