const http = require('https'); // or 'https' for https:// URLs
const fs = require('fs');

const file = fs.createWriteStream("cids.json");
const request = http.get("https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/174/JSON/?source=FDA%20Orange%20Book", function(response) {
  console.log(response)
 // response.pipe(file);
});

let rawData = fs.readFileSync('cid1.json')
let cids = JSON.parse(rawData).Annotations.Annotation.map(x => x.LinkedRecords.CID)
rawData = fs.readFileSync('cid2.json')
cids.push(...JSON.parse(rawData).Annotations.Annotation.map(x => x.LinkedRecords.CID))
rawData = fs.readFileSync('cid3.json')
cids.push(...JSON.parse(rawData).Annotations.Annotation.map(x => x.LinkedRecords.CID))
rawData = fs.readFileSync('cid4.json')
cids.push(...JSON.parse(rawData).Annotations.Annotation.map(x => x.LinkedRecords.CID))
rawData = fs.readFileSync('cid5.json')
cids.push(...JSON.parse(rawData).Annotations.Annotation.map(x => x.LinkedRecords.CID))
console.log(cids.length)
fs.writeFileSync('cids.json', JSON.stringify(cids));