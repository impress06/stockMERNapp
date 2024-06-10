const morgan=require('morgan')

const fs=require('node:fs')

const currentTime=new Date()
const todayString=currentTime.toISOString().split('T')[0]
console.log(todayString)


module.exports=morgan('combined',{
   
    stream:fs.createWriteStream(`./log/${todayString}.log`,{flags:'a+'})

})