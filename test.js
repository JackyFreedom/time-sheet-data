const fs = require('fs/promises')
const fs1= require('fs')
// console.log("fs1.existsSync('./sheet/2011')",fs1.existsSync('./sheet/2011'))
// fs.mkdir('./sheet/232/')
if(fs1.existsSync('./sheet/2011/')){
   console.log(111)
    fs.writeFile('./sheet/2011/test.json',JSON.stringify([{name:23,ageg:232}]))

}else{
   console.log(222)

    fs.mkdir('./sheet/2011/').then(res=>{
      fs.writeFile('./sheet/2011/test.json',JSON.stringify([{name:23,ageg:232}]))

    })

}