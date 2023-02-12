"use strict";

// HTML:element

let fakeStoreEl = document.getElementById("fakeStore");
let userAdressEl = document.getElementById("userAdress")
let userNameEl = document.getElementById("userName");
let userMailEl = document.getElementById("userMail");
let names = [];
const messageEl = document.getElementById("message");
const deleteMessageEl = document.getElementById("deleteMessage");
const productIdEl = document.getElementById("productId");
const messageIdEl = document.getElementById("messageId")

const listEl = document.getElementById("list");
const submitButtonEl = document.getElementById("submitButton");

let sectionEl = document.getElementById("section");




// Hämta data från Fakestoreapi
fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
       //     .then(data=>getData(data));
            .then(data=>getData(data));

           // function getData(jsonData) {
           
           
           function getData(getData) {


                console.log(getData)

              //  const itemArray = jsonData;
                const itemArray = getData;
                
            
                for (let shop of itemArray) {
                    console.log("hej alla")
                
                    fakeStoreEl.innerHTML += `
                
                    <article>
                    <p>  <img src='${shop.image}' width="300" >  </p>
                    <h2> ${shop.title} </h2>  
                    <p id="idShop" value="idShop> Id: ${shop.id} </p>              
                    <p> Price: $${shop.price} </p>
                    <p> Category: ${shop.category} </p>
                    <p> Description:  ${shop.description} </p>
                   <p> Rating: ${shop.rating.rate } </p>
                    <p> Count: ${shop.rating.count} </p>
                   
<input type="button" value"add to cart " class="btn" onclick="createOrder ()">
<button  onclick="createOrder('${shop.id}')">Välj</button>

                    <p id='messageId'></p>              
               <hr>     
                   </article>
                   
                    <hr> 
                   
                    ` 
                   
                }
                
              }

              

             
       // Skapa ny order
              function createOrder (id){
             //   messageIdEl.innerHTML = 'Order adderad till kundvagn'
                console.log("kom jag in nu då igen?")
                console.log(id)
                
                let userName = userNameEl.value;
                let userAdress = userAdressEl.value;
                let userMail =  userMailEl.value;
              
               
                  messageEl.innerHTML += "Grattis " + "! Din order beräknas ankomma inom tre arbetsdagar." ;
               
                names.push(userName);            
               
              console.log(userName + userMail + userAdress)
               
                // Sätt samman värden till JSON-objekt
                let body = 
                JSON.stringify(
                 {
                 "fields": {
                     "idProduct": { 
                      "integerValue": 6 
                      
                    },   
                  "name": {
                    "stringValue": userName
                    // 
                    
                  } ,
                  "mail": {
                    "stringValue":userMail
                    // 
                     
                  },
                  "adress": {
                    "stringValue": userAdress 
                    //            
                },
                "fraktvillkor": {
                  "stringValue": "hemleverans(SEK 75)"
                  
                }
              }         
                  }
                )
                  
                //Skicka fetch-anrop med POST-metoden
                
                 fetch("https://firestore.googleapis.com/v1/projects/webbutik-28aae/databases/(default)/documents/fakeStore",{
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                
                  },
                  body : body 
                })
              .then(res => res.json())
              .then(data => console.log(data));
              
            } 

         //   Hämta data från Firebase och lägg upp
 fetch('https://firestore.googleapis.com/v1/projects/webbutik-28aae/databases/(default)/documents/fakeStore')

            .then(res=>res.json())
            .then(data=>getOrders(data));
           // .then(json=>console.log(json))

           
  function getOrders(data) {
                
                let ordersArray = data.documents;
            
                for (let orders of ordersArray) {
                    console.log(orders.fields.name.stringValue);
                    console.log(orders.fields.adress.stringValue);
                    console.log(orders.fields.mail.stringValue);
                
                    sectionEl.innerHTML += `

                    <article> 
                    <p>  Namn: ${orders.fields.name.stringValue} </p>
                    <p>  Adress: ${orders.fields.adress.stringValue} </p>
                
                   <p> Mail: ${orders.fields.mail.stringValue } </p>
                   <p> Produktid: ${orders.fields.idProduct.integerValue } </p>
                    <p>  Fraktvillkor: ${orders.fields.fraktvillkor.stringValue} </p>
                    <button  onclick="deleteUser('${orders.name}')">Radera order</button>
                    </article>  
                   <hr>  
                   
                  
                
                    `         
                }
                }

               
             
            
                function deleteUser (name){

              
                
                        fetch("https://firestore.googleapis.com/v1/" + name, {
                          method: 'DELETE'

                 })
                  //  location.reload();

                  // setTimeout(() => location.reload(), 2000);  // Ladda om sidan efter 2 sekunder (2000 millisekunder)
                  deleteMessageEl.innerHTML = "Order deleted";
                }
              
              buyEl.addEventListener("click", createProduct)         
                    
                
           
                    

              