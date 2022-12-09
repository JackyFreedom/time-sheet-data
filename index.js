const Koa = require('koa');
const app = new Koa();
const fs = require('fs/promises')
const fs1 = require('fs')
var bodyParser = require('koa-bodyparser');

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', ctx.headers.origin); // 很奇怪的是，使用 * 会出现一些其他问题
    ctx.set('Access-Control-Allow-Headers', 'content-type');
    ctx.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH')
    await next();
  });
  app.use(bodyParser());

app.use(async ctx => {
     
      // 将POST请求参数字符串解析成JSON
      
console.log('ctx.request.body',ctx.request.body)
let data = ctx.request.body
    if(data.year){
        let sheetName = './sheet/'+data.year+'/'
        // data.data = JSON.parse(data.data)
        console.log('data--',data)
            //   data.data.map(item=>{
              
            if(fs1.existsSync(sheetName)){
                console.log('paht-1',sheetName+ data.month +'.json')

                fs.writeFile(sheetName+ data.month+'.json',data.data)
            }else{
                fs.mkdir(sheetName).then(res=>{
                console.log('paht-2',sheetName+ data.month+'.json')

                fs.writeFile(sheetName+ data.month +'.json',data.data)

                })
            }
        // })
        // data.data.map(item=>{
              
        //     if(fs1.existsSync(sheetName)){
        //         console.log('paht-1',sheetName+ item.month +'.json')
        // console.log('item--data',item.data)

        //         fs.writeFile(sheetName+ item.month +'.json',JSON.stringify( item.data))
        //     }else{
        //         fs.mkdir(sheetName).then(res=>{
        //         console.log('paht-2',sheetName+ item.month +'.json')

        //         fs.writeFile(sheetName+ item.month +'.json',JSON.stringify( item.data))

        //         })
        //     }
        // })
       
    }
      
        // fs.writeFile(ctx.body.name,ctx.body.data)
// 
   
  ctx.body = 'Hello World';
});
 

app.listen(3000);

 

function sheetfn   (year,months){
    months = months?months:[01,02,03,04,05,06,07,08,09,10,11,12];
    
    year = year?year : '2018'
   let promiseList =  months.map(async month=>{
    month= month.toString().length ===1? '0'+month:month.toString()
    let list = []
        for(let i =1 ;i<=31;i++){
            let day = i.toString().length ===1? '0'+i:i.toString()
            console.log('day',day)

            let time = year + month + day
            console.log('time',time)

              list.push( $.post('https://i.xinrenxinshi.com/attendancePC/ajax-get-attendance-record-by-date',{date: 
              time}).then(res=>{
                  let data = res.data
                  // console.log('res',data)  ; 
                   return {...data,day} 
                  }))
        }
        await Promise.all(list).then(res=>{
            $.post('http://localhost:3000',{year,month,data:JSON.stringify(res)}).then(res=>{console.log('---',res)})

            // ({month,data:res})
        })

        
    })
    //  Promise.all(promiseList).then(res=>{
    //     console.log('resssss',res)
    //     $.post('http://localhost:3000',{year,data:JSON.stringify(res)}).then(res=>{console.log('---',res)})
    //  })
}

// $.post('http://localhost:3000',{name:'test',data:JSON.stringify(data)}).then(res=>{console.log('---',res)})