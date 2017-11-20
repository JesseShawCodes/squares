const bcrypt = require('bcryptjs');
const request = require('request');
const cheerio = require('cheerio');
/*
var hash = bcrypt.hashSync('bacon', 10);
console.log(hash);
console.log(bcrypt.compareSync('bacon', hash));
var hash = bcrypt.hashSync('bacon', 10);
console.log(hash);
console.log(bcrypt.compareSync('bacon', hash));
var hash = bcrypt.hashSync('bacon', 10);
console.log(hash);
console.log(bcrypt.compareSync('bacon', hash));
var hash = bcrypt.hashSync('bacon', 10);
console.log(hash);
console.log(bcrypt.compareSync('bacon', hash));
var hash = bcrypt.hashSync('bacon', 10);
console.log(hash);
console.log(bcrypt.compareSync('not_bacon', hash));
*/

request('https://www.netflix.com/browse', function(err, resp, html) {
    if (!err){
      const $ = cheerio.load(html);
      let title = $("head > title").html();
      console.log(title); 
  }
});
