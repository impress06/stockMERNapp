
const crypto=require('node:crypto')


const key=process.env.SECRET_KEY
const loop=100_000
const count=32
const type='sha512'


module.exports= function(password){
    return crypto.pbkdf2Sync(password,key,loop,count,type).toString('hex')
}