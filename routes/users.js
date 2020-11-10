var express = require('express');
var router = express.Router();

var middleware = require("../middleware.js");
/* GET home page. */
let data=[{name:"Juan"},{name:"Sebastian"},{name:"Valentina"}];
const sendClients=(req,res)=>{
    res.send(data);
}
const addClients=(req,res)=>{
    data.push(req.body.name);
    res.send(data);
}
router.get('/',middleware.checkToken,sendClients)
router.post('/',middleware.checkToken,addClients)
module.exports = router;