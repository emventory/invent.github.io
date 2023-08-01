
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
  import { getDatabase, set, ref ,push, child, onValue,query,orderByChild,equalTo,get} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCobTrhlsjzQ1KGSeVoN-j8wM3S7uy4ie0",
    authDomain: "emventory-c2455.firebaseapp.com",
	  databaseURL: "https://emventory-c2455-default-rtdb.firebaseio.com/",
    projectId: "emventory-c2455",
    storageBucket: "emventory-c2455.appspot.com",
    messagingSenderId: "956457180798",
    appId: "1:956457180798:web:0eb938d68c9c4bd467822f"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  // Get a reference to the database service
  const db = getDatabase();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var stdNo = 0;
////////////////////////////////////////////////////////////////Daily Sales - Start ///////////////////////////////////////
var salesTBody = document.getElementById("salesTBodyDay");


function AddItemToTableDay(productsid,productqty,proId_date,sum){
  let trow = document.createElement("tr");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");

  //console.log(proId_date) 
  ///////////Get Item or product Quantity For a particular date from sales Node - Start///////////////////////////////
  const QueryT = query(ref(db,"sales"), orderByChild("proId_date"),equalTo(proId_date));
  var proID = 0;
  var salesTemp = [];
  get(QueryT)
  .then((snapshot) =>{
     
      snapshot.forEach(childSnapshot => {

        proID += childSnapshot.val().product_qty;
        td2.innerHTML = proID;
      });

  
  });
///////////Get Item or product  Quantity For a particular date from sales Node - End///////////////////////////////
  
  var salesTemp = [];

///////////Get Item or product  Name For a particular date from stock Node - Start///////////////////////////////
  const Query = query(ref(db,"stock"), orderByChild("product_id"),equalTo(productsid));
  get(Query)
  .then((snapshot) =>{
    
      snapshot.forEach(childSnapshot => {
      
        td1.innerHTML = childSnapshot.val().product_name;
       
        trow.appendChild(td1);
        trow.appendChild(td2);


        var proID = childSnapshot.val().product_id;
        salesTemp.push(proID);

        console.log(proID);

        if(salesTemp.includes(proID) == true){
          //console.log(1);
        }
        else if(salesTemp.includes(proID) == false){
          salesTemp.push(childSnapshot.val().product_id);
        }


      });
  });
  ///////////Get Item or product  Name For a particular date from stock Node - End///////////////////////////////
  console.log(salesTemp);
  document.getElementById("totalSalesDay").innerHTML = sum;     
  salesTBody.appendChild(trow);

}

function AddAllItemsToTableDay(theStocks,sum){
  //theStocks.reverse();
    //stdNo = 0;
    salesTBody.innerHTML = "";

    theStocks.forEach(element => {
        AddItemToTableDay(element.product_id,element.product_qty,element.proId_date,sum);
    });
}


function GetAllDataOnceDay(){

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
    
  today = yyyy + '-' + mm + '-' + dd;
  console.log(today);
  const status = 1;
  const Query = query(ref(db,"sales"), orderByChild("date_for_query"),equalTo(today));

  var sales = [];

  get(Query)
  .then((snapshot) =>{
     
      var sum = 0;
      snapshot.forEach(childSnapshot => {

        console.log(childSnapshot.val().product_id);
        console.log(childSnapshot.val().product_qty);

        sum += (childSnapshot.val().product_qty);
          sales.push(childSnapshot.val());
        
      });
      console.log(sales);
      ///////////// Filters Out or Remove Duplicate Values from array of Sales objects - Start////////////////////

      const pids = sales.map(({ product_id }) => product_id);
      const filtered = sales.filter(({ product_id }, index) => !pids.includes(product_id, index + 1));

      ///////////// Filters Out or Remove Duplicate Values from array of objects - End//////////////////// 
      console.log(filtered);

        AddAllItemsToTableDay(filtered,sum);

  });

}

////////////////////////////////////////////////////////////////Daily Sales - End ///////////////////////////////////////


////////////////////////////////////////////////////////////////Weekly Sales - Start ///////////////////////////////////////

var salesTBodyWeek = document.getElementById("salesTBodyWeek");


function AddItemToTableWeek(productsid,productqty,proId_week,sum){
let trow = document.createElement("tr");
let td1 = document.createElement("td");
let td2 = document.createElement("td");

//console.log(proId_date) 
///////////Get Item or product Quantity For a particular date from sales Node - Start///////////////////////////////
const QueryT = query(ref(db,"sales"), orderByChild("proId_week"),equalTo(proId_week));
var proID = 0;
var salesTemp = [];
get(QueryT)
.then((snapshot) =>{
   
    snapshot.forEach(childSnapshot => {

      proID += childSnapshot.val().product_qty;
      td2.innerHTML = proID;
    });


});
///////////Get Item or product  Quantity For a particular date from sales Node - End///////////////////////////////

var salesTemp = [];

///////////Get Item or product  Name For a particular date from stock Node - Start///////////////////////////////
const Query = query(ref(db,"stock"), orderByChild("product_id"),equalTo(productsid));
get(Query)
.then((snapshot) =>{
  
    snapshot.forEach(childSnapshot => {
    
      td1.innerHTML = childSnapshot.val().product_name;
     
      trow.appendChild(td1);
      trow.appendChild(td2);


      var proID = childSnapshot.val().product_id;
      salesTemp.push(proID);

      console.log(proID);

      if(salesTemp.includes(proID) == true){
        //console.log(1);
      }
      else if(salesTemp.includes(proID) == false){
        salesTemp.push(childSnapshot.val().product_id);
      }


    });
});
///////////Get Item or product  Name For a particular date from stock Node - End///////////////////////////////
console.log(salesTemp);
document.getElementById("totalSalesWeek").innerHTML = sum;     
salesTBodyWeek.appendChild(trow);

}

function AddAllItemsToTableWeek(theStocks,sum){
//theStocks.reverse();
  //stdNo = 0;
  salesTBodyWeek.innerHTML = "";

  theStocks.forEach(element => {
      AddItemToTableWeek(element.product_id,element.product_qty,element.proId_week,sum);
  });
}


function GetAllDataOnceWeek(){

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
  
today = yyyy + '-' + mm + '-' + dd;
console.log(today);


var currentDate = new Date();
var startDate = new Date(currentDate.getFullYear(), 0, 1);
var days = Math.floor((currentDate - startDate) /(24 * 60 * 60 * 1000));

var weekNumber = Math.ceil(days / 7);


const Query = query(ref(db,"sales"), orderByChild("week"),equalTo(weekNumber));

var sales = [];

get(Query)
.then((snapshot) =>{
   
    var sum = 0;
    snapshot.forEach(childSnapshot => {

      console.log(childSnapshot.val().product_id);
      console.log(childSnapshot.val().product_qty);

      sum += (childSnapshot.val().product_qty);
        sales.push(childSnapshot.val());
      
    });
    console.log(sales);
    ///////////// Filters Out or Remove Duplicate Values from array of Sales objects - Start////////////////////

    const pids = sales.map(({ product_id }) => product_id);
    const filtered = sales.filter(({ product_id }, index) => !pids.includes(product_id, index + 1));

    ///////////// Filters Out or Remove Duplicate Values from array of objects - End//////////////////// 
    console.log(filtered);

      AddAllItemsToTableWeek(filtered,sum);

});

}
////////////////////////////////////////////////////////////////Weekly Sales - End ///////////////////////////////////////



////////////////////////////////////////////////////////////////Monthly Sales - Start ///////////////////////////////////////

var salesTBodyMonth = document.getElementById("salesTBodyMonth");


function AddItemToTableMonth(productsid,productqty,proId_month,sum){
let trow = document.createElement("tr");
let td1 = document.createElement("td");
let td2 = document.createElement("td");

//console.log(proId_date) 
///////////Get Item or product Quantity For a particular date from sales Node - Start///////////////////////////////
const QueryT = query(ref(db,"sales"), orderByChild("proId_month"),equalTo(proId_month));
var proID = 0;
var salesTemp = [];
get(QueryT)
.then((snapshot) =>{
   
    snapshot.forEach(childSnapshot => {

      proID += childSnapshot.val().product_qty;
      td2.innerHTML = proID;
    });


});
///////////Get Item or product  Quantity For a particular date from sales Node - End///////////////////////////////

var salesTemp = [];

///////////Get Item or product  Name For a particular date from stock Node - Start///////////////////////////////
const Query = query(ref(db,"stock"), orderByChild("product_id"),equalTo(productsid));
get(Query)
.then((snapshot) =>{
  
    snapshot.forEach(childSnapshot => {
    
      td1.innerHTML = childSnapshot.val().product_name;
     
      trow.appendChild(td1);
      trow.appendChild(td2);


      var proID = childSnapshot.val().product_id;
      salesTemp.push(proID);

      console.log(proID);

      if(salesTemp.includes(proID) == true){
        //console.log(1);
      }
      else if(salesTemp.includes(proID) == false){
        salesTemp.push(childSnapshot.val().product_id);
      }


    });
});
///////////Get Item or product  Name For a particular date from stock Node - End///////////////////////////////
console.log(salesTemp);
document.getElementById("totalSalesMonth").innerHTML = sum;     
salesTBodyMonth.appendChild(trow);

}

function AddAllItemsToTableMonth(theStocks,sum){
//theStocks.reverse();
  //stdNo = 0;
  salesTBodyMonth.innerHTML = "";

  theStocks.forEach(element => {
      AddItemToTableMonth(element.product_id,element.product_qty,element.proId_month,sum);
  });
}


function GetAllDataOnceMonth(){

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
  
today = yyyy + '-' + mm + '-' + dd;
console.log(today);


var currentDate = new Date();
var startDate = new Date(currentDate.getFullYear(), 0, 1);
var days = Math.floor((currentDate - startDate) /(24 * 60 * 60 * 1000));

var weekNumber = Math.ceil(days / 7);


const Query = query(ref(db,"sales"), orderByChild("month_for_query"),equalTo(mm));

var sales = [];

get(Query)
.then((snapshot) =>{
   
    var sum = 0;
    snapshot.forEach(childSnapshot => {

      console.log(childSnapshot.val().product_id);
      console.log(childSnapshot.val().product_qty);

      sum += (childSnapshot.val().product_qty);
        sales.push(childSnapshot.val());
      
    });
    console.log(sales);
    ///////////// Filters Out or Remove Duplicate Values from array of Sales objects - Start////////////////////

    const pids = sales.map(({ product_id }) => product_id);
    const filtered = sales.filter(({ product_id }, index) => !pids.includes(product_id, index + 1));

    ///////////// Filters Out or Remove Duplicate Values from array of objects - End//////////////////// 
    console.log(filtered);

      AddAllItemsToTableMonth(filtered,sum);

});

}
////////////////////////////////////////////////////////////////Monthly Sales - End ///////////////////////////////////////



//window.onload = GetAllDataOnce;

window.onload = function(){
document.getElementById("tsa-today-tab").click();
}


document.getElementById("tsa-today-tab").addEventListener("click", GetAllDataOnceDay);
document.getElementById("tsa-week-tab").addEventListener("click", GetAllDataOnceWeek);
document.getElementById("tsa-month-tab").addEventListener("click", GetAllDataOnceMonth);



