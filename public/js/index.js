console.log("I have attached index js file in main app.js file which is used by the express.");

// fetch('https://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     })
// })
// fetch('http://localhost:3000/weather?address=rajkot').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);  
//     })
// })


const weatherForm = document.querySelector('form')
let search = document.querySelector('input')
const p1= document.querySelector('.p1')
const p2= document.querySelector('.p2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    p1.textContent='Loading....'
    p2.textContent = ''

    //It will use in localhost but we need it on the site.
    // fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error)
                p1.textContent = data.error

            } else {
                // console.log(data.locati on)
                p1.textContent = "Location:" + data.location
                // console.log(data.forecast)
                p2.textContent ="Forecast:" + data.forecast
            }
        })
    })
})