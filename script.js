// ELEMENTY

//post box
let postBox = document.querySelector(".post-box");
let nameInPostBox = document.querySelector(".post-box .name-holder");
let textInPostBox = document.querySelector(".post-box .text-holder");

// write box
let nameInWriteBox = document.querySelector(".write-box .name-holder");
let textInWriteBox = document.querySelector(".write-box .text-holder");
let sentButton = document.querySelector(".sent-button");

//-----------------------------------------------------------------------------------------

// FIREBASE

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCKxZIuSbPov1Wa9PBZAla5U_GN8nZWLac",
    authDomain: "kuku-post.firebaseapp.com",
    databaseURL: "https://kuku-post.firebaseio.com",
    projectId: "kuku-post",
    storageBucket: "kuku-post.appspot.com",
    messagingSenderId: "751094440089",
    appId: "1:751094440089:web:87f4dd176f9804ae411808"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let database = firebase.database();

// Reference na místo v databázi
let kukuRef = database.ref("kuku");

//-----------------------------------------------------------------------------------------

// POSLÁNÍ ZPRÁVY DO DATABSE
sentButton.addEventListener("click", sentKuk);

function sentKuk() {

    let kuk = {
        name: nameInWriteBox.value,
        text: textInWriteBox.value
    };

    kukuRef.push().set(kuk);
    console.log("Save to database is OK");

    // čištění formu
    textInWriteBox.value = "";
}

//-----------------------------------------------------------------------------------------

// ZOBRAZENÍ ZPRÁV

// id zobrazenýh zpráv
let kukId = [];
let kukuData = {};
let allId = [];

// nastavení reakce na změnu v databazi
kukuRef.on("value", showData, err);

function showData(data) {
    // zprávy a jejich idečka z database
    kukuData = data.val();
    allId = Object.keys(kukuData);

    console.log(kukuData);
    console.log(allId);

    allId.forEach(id =>{
        if(!(kukId.includes(id))){
            //Vykresli kuk
            drawKuk(id);
            kukId[kukId.length] = id;
        }
    })
}

// Vykreslení zprávy
function drawKuk(id){
    //use  bracket notation
    let kukName = kukuData[id].name;
    let kukText = kukuData[id].text;
    
   console.log(id);
   console.log("Nová Zpráva od: "+kukName+": "+kukText);

   let kukElement = document.createElement("div");
   kukElement.classList.add("kuk-holder");
   let nameElement = document.createElement("span");
   nameElement.classList.add("name-holder");
   let textElement = document.createElement("p");
   textElement.classList.add("text-holder");

   nameElement.textContent = kukName;
   textElement.textContent = kukText;
   kukElement.appendChild(nameElement);
   kukElement.appendChild(textElement);

   postBox.appendChild(kukElement);



    
}

function err(e) {
    console.log(e);
}

//-----------------------------------------------------------------------------------------

// TODO

//Zobrazit "žádne správy" pokud není nic v databázi

//-----------------------------------------------------------------------------------------


