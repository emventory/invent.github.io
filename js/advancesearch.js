////////////////////////////////////Starts Get and Set Payment Type///////////////////////

  
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
  import { getDatabase, set, get, ref ,query, child, onValue, limitToFirst, orderByChild,equalTo,update } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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
  
  //var firebase = initializeApp(firebaseConfig);
  //console.log(firebase);

  const app = initializeApp(firebaseConfig);
  console.log(app);
  // Get a reference to the database service
  const db = getDatabase();

///////////////////Starts Get Company//////////////////////////////////////////////
function getCompany(){

    var status = 1;
    const que = query(ref(db,'company'),orderByChild('status'),equalTo(status));

    get(que).then((snapshot) => {
      if (snapshot.exists()) {

        var companies = [];

        snapshot.forEach(function (childSnapshot) {

            companies.push(childSnapshot.val());

      });

      addCompanyToSelect(companies);

      //console.log(snapshot.val().name);
      } else {
        alert("Error: No Item(s) already added to the inventory");
      }
    }).catch((error) => {
      console.error(error);
    });
  
                          
}

window.onload = getCompany();

function  addCompanyToSelect(companies){
    companies.forEach(element => {

  sendToCompanySelect(element.comp_id, element.comp_name, element.comp_email, element.comp_phone, element.comp_description, element.comp_address);

});
}


var selectcompany = document.getElementById('selectcompany');

var radioId = 1;

function sendToCompanySelect(comp_id, comp_name, comp_email, comp_phone, comp_description, comp_address){

var option = document.createElement("option");
option.value = comp_name;
option.text = comp_name;
selectcompany.appendChild(option);

}
////////////////////////////////////Ends Get Company///////////////////////

///////////////////Starts Get Sale Rep//////////////////////////////////////////////
function getSaleRep(){

  var status = 1;
  const que = query(ref(db,'salesrep'),orderByChild('status'),equalTo(status));

  get(que).then((snapshot) => {
    if (snapshot.exists()) {

      var salesreps = [];

      snapshot.forEach(function (childSnapshot) {

        salesreps.push(childSnapshot.val());

    });

    addRepToSelect(salesreps);

    //console.log(snapshot.val().name);
    } else {
      alert("Error: No Item(s) already added to the inventory");
    }
  }).catch((error) => {
    console.error(error);
  });

                        
}

window.onload = getSaleRep();

function  addRepToSelect(salesreps){
  salesreps.forEach(element => {

sendToSalesRepSelect(element.rep_id, element.rep_name, element.rep_email, element.rep_phone, element.rep_gender, element.rep_address);

});
}

var selectsalesrep = document.getElementById('selectsalesrep');

var radioId = 1;

function sendToSalesRepSelect(rep_id, rep_name, rep_email, rep_phone, rep_gender, rep_address){

var option = document.createElement("option");
option.value = rep_id;
option.text = rep_name;
selectsalesrep.appendChild(option);

}
////////////////////////////////////Ends Get Sale Rep///////////////////////


document.getElementById('getSummary').addEventListener('click', (e)=>{

  if (window.confirm('Are You Sure To Get The Summary?')) {

        var selectsalesrep  = document.getElementById("selectsalesrep").value;
        var selectcompany  = document.getElementById("selectcompany").value;
        var rangefrom  = document.getElementById("rangefrom").value;
        var rangeto  = document.getElementById("rangeto").value;

        if(selectsalesrep == ""){
          alert("Error: Please Select A Sales Rep");
        }
        else if(selectcompany == ""){
          alert("Error: Please Select A Company");
        }
        else if(rangefrom == ""){
          alert("Error: Please Select A Start Date");
        }
        else if(rangeto == ""){
          alert("Error: Please Select An End Date");
        }
        else{
      
            //const que = query(ref(db,'salesrep'),orderByChild('rep_email'),equalTo(repemail));
    
          console.log(rangeto + " "+ rangefrom + " "+ selectcompany+ " "+ selectsalesrep);
          window.open('searchresult.html?selectsalesrep='+selectsalesrep+'&selectcompany='+selectcompany+'&rangefrom='+rangefrom+'&rangeto='
          +rangeto, "_self");

        }
  }
  else {
    window.open("advancesearch.html", "_self");
  }
 
});


// ////// Start  Discount//////////////

// document.getElementById('discount').addEventListener('click', (e)=>{

//   var discountValue = Number(document.getElementById("discount").value);
  
//   if(discountValue == ''){
//     document.getElementById("cumAmount").value = grandTotal.toFixed(2);
//     document.getElementById('amtTendered').value = '';
//     document.getElementById('dueChange').value = '';
//   }
//   else if(discountValue != ''){

//     console.log(discountValue);
//     var gTotalDiscount = Number(grandTotal) - discountValue;
//     document.getElementById("cumAmount").value = gTotalDiscount.toFixed(2);
//     document.getElementById('amtTendered').value = '';
//     document.getElementById('dueChange').value = '';

//   }
// });


