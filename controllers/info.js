const mu = require("../lib/mongoUtils");

const getInfos = (callback) => {
  mu.then((client) => {
    client
      .db("infosdb")
      .collection("infos")
      .find({})
      .toArray((err, data) => {        
        callback(data);
      });
  });
};
const getInfo=(user, callback)=> {
  mu.then(client=>{
      client.db("infosdb")
      .collection("infos")
      .findOne({user})
      .then((result)=>{
  callback(result);
      });
  });
  };

  const getInfotkn=(tkn, callback)=> {
    mu.then(client=>{
        client.db("infosdb")
        .collection("infos")
        .findOne({tkn})
        .then((result)=>{
    callback(result);
        });
    });
    };

const addInfo = (info) => {
  mu.then((client) => {
    client.db("infosdb").collection("infos").insertOne(info);
  });
};


const updateInfo =(user, content,callback)=>{
  console.log(content)
  mu.then((client)=>{
      client.db("infosdb")
      .collection("infos")
      .updateOne({user},{$set:{tkn:content}}).then((result)=>{
          callback(result);
      });
  })
}

const deleteInfo =(id,callback)=>{
  mu.then((client)=>{
      client.db("infosdb")
      .collection("infos")
      .deleteOne({id})
      .then((result)=>{
          callback(result);
      });
  })
}
const info = { getInfos, addInfo,getInfo,updateInfo,deleteInfo,getInfotkn };

module.exports = info;