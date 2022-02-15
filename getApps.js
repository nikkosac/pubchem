const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');

const options = {
  port: 3333,
  path: '/',
  method: 'GET'
};

let rawData = fs.readFileSync('cids.json')
let cids = JSON.parse(rawData)
console.log(cids)
let appNums = []
//https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/" + cids[id] + "/JSON/?source=FDA%20Orange%20Book

  function recursiveGet (id,cids,appNums){
    console.log((id+1)+"/"+(cids.length+1))
    console.log(cids[id][0])
    let a = [...appNums]
    let url ="https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/"+cids[id][0]+"/JSON/?source=FDA%20Orange%20Book"
    console.log(https)
    let request = https.get(url,options,(res) => {
    let body = "";
  
    res.on("data", (chunk) => {
        body += chunk;
    });
  
    res.on("end", () => {
        try {
          if(JSON.parse(body).Record != undefined){
           let = tempObject = new Object({"cid":cids[id][0],"record":JSON.parse(body).Record.Reference.map(x => x.ANID)})
            a.push(tempObject)
           // console.log(appNums)
          }else{
            let = tempObject = new Object({"cid":cids[id],"record":null})
            a.push(tempObject)
            //console.log(a)
          }
          if(id < cids.length){
            let next = id + 1
            recursiveGet(next,cids,a)
          }else{
            console.log("finished")
            fs.writeFileSync('appNums.json', JSON.stringify(finished));
            return finished
          }
            // do something with JSON
        } catch (error) {
            console.error(error.message);
        };
    });
  
  }).on("error", (error) => {
    console.error(error.message);
  });
}

let final = recursiveGet(0,cids,appNums)