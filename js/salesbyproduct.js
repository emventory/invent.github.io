
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
var salesTBodyDayMan = document.getElementById("salesTBodyDayMan");


function AddItemToTableDayMan(pCompany_day,product_company,productqty,proId_date,sum){
  let trow = document.createElement("tr");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
console.log(proId_date);
  console.log(productqty+"dsd") 
  ///////////Get Item or product Quantity For a particular date from sales Node - Start///////////////////////////////
  const QueryT = query(ref(db,"sales"), orderByChild("pCompany_day"),equalTo(pCompany_day));
  var proID = 0;
  var salesTemp = [];
  get(QueryT)
  .then((snapshot) =>{
     
      snapshot.forEach(childSnapshot => {


        //if(proId_date == childSnapshot.val().proId_date){
          console.log(childSnapshot.val().proId_date);
proID += childSnapshot.val().product_qty;
        console.log("ddd"+proID);
        td2.innerHTML = proID;
        //}


        
        
      });

  
  });
///////////Get Item or product  Quantity For a particular date from sales Node - End///////////////////////////////
  

///////////Get Item or product  Name For a particular date from stock Node - Start///////////////////////////////

        td1.innerHTML = product_company;
       
        trow.appendChild(td1);
        trow.appendChild(td2);


  ///////////Get Item or product  Name For a particular date from stock Node - End///////////////////////////////
  console.log(salesTemp);
  document.getElementById("totalSalesDayMan").innerHTML = sum;     
  salesTBodyDayMan.appendChild(trow);

}

function AddAllItemsToTableDayMan(theStocks,sum){
  //theStocks.reverse();
    //stdNo = 0;
    salesTBodyDayMan.innerHTML = "";

    theStocks.forEach(element => {
        AddItemToTableDayMan(element.pCompany_day,element.product_company,element.product_qty,element.proId_date,sum);
    });
}


function GetAllDataOnceDayMan(){

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

      const pids = sales.map(({ product_company }) => product_company);
      const filtered = sales.filter(({ product_company }, index) => !pids.includes(product_company, index + 1));

      ///////////// Filters Out or Remove Duplicate Values from array of objects - End//////////////////// 
      console.log(filtered);

      AddAllItemsToTableDayMan(filtered,sum);

  });

}

////////////////////////////////////////////////////////////////Daily Sales - End ///////////////////////////////////////


////////////////////////////////////////////////////////////////Weekly Sales - Start ///////////////////////////////////////

var salesTBodyWeekMan = document.getElementById("salesTBodyWeekMan");


function AddItemToTableWeekMan(pCompany_week,product_company,productqty,proId_week,sum){
let trow = document.createElement("tr");
let td1 = document.createElement("td");
let td2 = document.createElement("td");

//console.log(proId_date) 
///////////Get Item or product Quantity For a particular date from sales Node - Start///////////////////////////////
const QueryT = query(ref(db,"sales"), orderByChild("pCompany_week"),equalTo(pCompany_week));
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

///////////Get Item or product  Name For a particular date from stock Node - Start///////////////////////////////

    
      td1.innerHTML = product_company;
     
      trow.appendChild(td1);
      trow.appendChild(td2);


///////////Get Item or product  Name For a particular date from stock Node - End///////////////////////////////
console.log(salesTemp);
document.getElementById("totalSalesWeekMan").innerHTML = sum;     
salesTBodyWeekMan.appendChild(trow);

}

function AddAllItemsToTableWeekMan(theStocks,sum){
//theStocks.reverse();
  //stdNo = 0;
  salesTBodyWeekMan.innerHTML = "";

  theStocks.forEach(element => {
      AddItemToTableWeekMan(element.pCompany_week,element.product_company,element.product_qty,element.proId_week,sum);
  });
}


function GetAllDataOnceWeekMan(){

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

    const pids = sales.map(({ product_company }) => product_company);
    const filtered = sales.filter(({ product_company }, index) => !pids.includes(product_company, index + 1));

    ///////////// Filters Out or Remove Duplicate Values from array of objects - End//////////////////// 
    console.log(filtered);

      AddAllItemsToTableWeekMan(filtered,sum);

});

}
////////////////////////////////////////////////////////////////Weekly Sales - End ///////////////////////////////////////



////////////////////////////////////////////////////////////////Monthly Sales - Start ///////////////////////////////////////

var salesTBodyMonthMan = document.getElementById("salesTBodyMonthMan");


function AddItemToTableMonthMan(pCompany_month,product_company,productqty,proId_month,sum){
let trow = document.createElement("tr");
let td1 = document.createElement("td");
let td2 = document.createElement("td");

//console.log(proId_date) 
///////////Get Item or product Quantity For a particular date from sales Node - Start///////////////////////////////
const QueryT = query(ref(db,"sales"), orderByChild("pCompany_month"),equalTo(pCompany_month));
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

      td1.innerHTML = product_company;
     
      trow.appendChild(td1);
      trow.appendChild(td2);


///////////Get Item or product  Name For a particular date from stock Node - End///////////////////////////////
console.log(salesTemp);
document.getElementById("totalSalesMonthMan").innerHTML = sum;     
salesTBodyMonthMan.appendChild(trow);

}

function AddAllItemsToTableMonthMan(theStocks,sum){
//theStocks.reverse();
  //stdNo = 0;
  salesTBodyMonthMan.innerHTML = "";

  theStocks.forEach(element => {
      AddItemToTableMonthMan(element.pCompany_month,element.product_company,element.product_qty,element.proId_month,sum);
  });
}


function GetAllDataOnceMonthMan(){

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

    const pids = sales.map(({ product_company }) => product_company);
    const filtered = sales.filter(({ product_company }, index) => !pids.includes(product_company, index + 1));

    ///////////// Filters Out or Remove Duplicate Values from array of objects - End//////////////////// 
    console.log(filtered);

      AddAllItemsToTableMonthMan(filtered,sum);

});

}
////////////////////////////////////////////////////////////////Monthly Sales - End ///////////////////////////////////////



//window.onload = GetAllDataOnce;

window.onload = function(){
document.getElementById("tsa-today-tab").click();
document.getElementById("tsa-today-tab-man").click();
}


document.getElementById("tsa-today-tab-man").addEventListener("click", GetAllDataOnceDayMan);
document.getElementById("tsa-week-tab-man").addEventListener("click", GetAllDataOnceWeekMan);
document.getElementById("tsa-month-tab-man").addEventListener("click", GetAllDataOnceMonthMan);



