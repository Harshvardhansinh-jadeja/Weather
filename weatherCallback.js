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
    callback(undefined ,"currently atmosphere is " +  body.current.weather_descriptions[0] + ". Temprature is " + body.current.temperature + " degrees " + "But it feels like " + body.current.feelslike +" Pressure is " + body.current.pressure + " and Humidity is " + body.current.humidity)
} )
}

module.exports = forecast