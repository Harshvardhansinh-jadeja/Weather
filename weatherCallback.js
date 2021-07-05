const request = require('request')

const forecast = ( latitude,longitude,callback)=>{
    
const url = 'http://api.weatherstack.com/current?access_key=eea0f2e6f41867825be9cbf83db3ff58&query=' +encodeURIComponent(latitude)  +','+encodeURIComponent(longitude) 

// request({url :url , json :true}, (error,response) =>{
request({url, json :true}, (error,{body}) =>{
    if(error){
        callback(undefined,'Unable to connect to the internet')
    }else if(body.error){
        callback( 'Unable to find the location',undefined)
    }
    callback(undefined ,"Here temprature is " + body.current.temperature + " degrees " + "but it feels like " + body.current.feelslike)
} )
}

module.exports = forecast