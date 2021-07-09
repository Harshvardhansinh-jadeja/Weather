const path = require('path')
const express = require("express");
const hbs = require('hbs')
const geoCode = require('./mapsCallback')
const forecast = require('./weatherCallback')

//__dirname is where your file is located in the folder
// console.log(__dirname);
// console.log(path.join(__dirname,'/public'));

const app = express();
//it will listen us at given heroku port but if we don't have that and we have to use locally then it will listen us at port 3000
const port = process.env.PORT || 3000

//setting up handlebars
app.set('view engine', 'hbs')

//Serving static file from the public folder
//You can access file like localhost:3000/help.html
const staticFile = path.join(__dirname ,'/public')
app.use(express.static(staticFile))

//If you don't want to give the name of the folder views then you can use it like this
const viewsPath= path.join(__dirname ,'/template/views')
app.set('views',viewsPath)

//partilas folder hbs file showing in every hbs file 
const partialsPath = path.join(__dirname,'/template/partials')
hbs.registerPartials(partialsPath)

//Dynamic file using hbs
app.get('',(req,res)=>{
  res.render('index',{
    title: 'Weather', 
    name : 'H.S.jadeja',
  })
})

//Dynamic file using hbs
app.get('/about',(req,res)=>{
  res.render('about',{
    title : 'About Me',
    AboutMe : 'I am a student at dharmsinh desai university.',
    degree : 'I am pursuing B.Tech Information Technology.',
    name : 'H.S.Jadeja',
  })
})

//IF you need then use /weather there is some error i think
// app.get("/forecast", (req, res) => {
//   res.render('weather',{
//     title : 'Weather',
//     name : 'H.S.jadeja',
//   });
// });


//Standard style using express
// app.get("/home", (req, res) => {
  // res.send("hello express");
// });

//Standard style but with the json data using express
// app.get("/about", (req, res) => {
//   res.send([{
//     Name : "you know nothing jon snow",
//   }]);
// }); 

//standard style using json data using express
// app.get("/weather", (req, res) => {
//   res.send({
//     location : "Rajkot",
//     Forecast : "here it is very hot",
//   });
// });

//accessing the api from the browser through query
app.get("/weather", (req, res) => {
  if(!req.query.address){
    return res.send("Please provide an address")
  }
  else{
    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
      if(error){
        return res.send({error})
      }
      forecast(latitude,longitude,(error,forecastData)=>{
        if(error){
          return res.send({error})
        }
        res.send({
          forecast : forecastData,
          location,

        })
      })
    })
  }  
});

app.get("/products", (req, res) => {
  // here you use query like localhost:3000/products?search=books here after the ? called the query
  console.log(req.query); // it will show you the object as query
  console.log(req.query.search); //It will show you the books as a string

  if(!req.query.search){
    return res.send("please provide a search term.")
  }
  res.send({
    products : [],
  });
});


app.get('/help/*',(req,res)=>{
  // res.send('Help article not found')
  res.render('Error',{
    title : 'Help Article not found',
    name :'H.S.Jadeja',
    errorMessage : 'Please check the URL of help page.'
  })
})

app.get('*',(req,res)=>{
    res.render('Error',{
      title : 'Error 404. Page not found',
      name : 'Concerned third party',
      errorMessage : 'Please check the URL'
    })
})

//This is the port where we listen our website Locally.
// app.listen(3000, () => {
//   console.log("server is started on the port 3000");
// });

//This is the port where heroku listen our website.
app.listen(port,()=>{
  console.log('server started on the port'+ port );
})


