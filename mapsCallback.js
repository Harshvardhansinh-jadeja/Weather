const request = require('request')

const geoCode = (address , callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +  '.json?access_token=pk.eyJ1IjoiaGFyc2h2YXJkaGFuc2luaCIsImEiOiJja3FieW90YmExZTN6MzJtdnUzY2tnZGoxIn0.t_k_2wGjiObchIPYcDxD5g&limit=1'

    // request({url :url , json :true}, (error,response) =>{
    //Using ES6 properties
    request({url, json :true}, (error,{body}) =>{
        if(error){
            callback('Unable to connect to the internet',undefined)
        }else if(body.features.length === 0){
            callback('Unable to find the location',undefined)
        }
        callback(undefined , {
            latitude : body.features[0].center[1],
            longitude: body.features[0].center[0],
            location : body.features[0].place_name,
        } )
    } )
}

module.exports = geoCode