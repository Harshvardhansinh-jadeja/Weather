const product ={
    price : 30,
    label : 'da vinci code',
    author : 'james allen',
}

//Using function
const transaction= (type ,{label ,author='no author'}={}) =>{
        console.log(type,label,author);
}
   
//Here if we don't use the product as a object and just use transaction('order') then it will give the error . For that in es6 function we have to define empty object for {label,stock}={} or something default value then it won't give the error.
transaction('order',product)
transaction('order')