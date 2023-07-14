////////////////////////////////////Starts Get and Set Payment Type///////////////////////

  
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
  import { getDatabase, set, get, ref ,query, child, onValue, limitToFirst, orderByChild,equalTo } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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






var grandTotal = 0;
let subTotal;
var m = JSON.parse(localStorage.getItem("CART"));
var f = 0;
    m.forEach(function(key){

         var t = key.unit_price*key.numberOfUnits;
        f++;
        //window.open('aa.html?numberOfUnits='+key.numberOfUnits+'&product_id='+key.product_id, "_self");
        console.log(key.numberOfUnits +' '+ key.product_cat +' '+ key.product_name +' '+ key.product_id);
//         document.getElementById("checkOutDiv").innerHTML += `<a href="listing.html" class="text-dark text-decoration-none">
//    <div class="osahan-gift d-flex gap-3 align-items-center bg-white shadow-sm rounded mb-3 overflow-hidden p-3">
//       <div class="d-flex">
//          <i class="bi bi-check-lg display-6 text-dark"></i>
//       </div>
//       <div>
//          <div class="gift-card">
//             <h6 class="mb-0 fw-bold text-success l-hght-18">${key.product_name}</h6>
//             <span class="text-dark-50 small">Quantity : ${key.numberOfUnits}</span><br>
//             <span class="text-dark-50 small">Unit Price : &#8358 ${key.unit_price}</span>
//          </div>
//       </div>
//       <div class="ms-auto">
//          <p class="small mb-0 l-hght-10 text-success gift-code">Total : &#8358 ${t.toFixed(2)}</p>
//       </div>
//    </div>
// </a>`;

subTotal = key.unit_price*key.numberOfUnits;
grandTotal = grandTotal += subTotal;
document.getElementById("cumAmount").value = grandTotal.toFixed(2);
console.log(subTotal);
    })
console.log(grandTotal);

//document.getElementById("grandT").innerText="\u20A6 "+grandTotal.toFixed(2);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById('selectpaymenttype').addEventListener('change', function() {
  selectPaymentType();
});



////// Start  VAT//////////////
document.getElementById('vat').addEventListener('click', (e)=>{

  var vatValue = Number(document.getElementById("vat").value);
  
  if(vatValue == ''){
    document.getElementById("cumAmount").value = grandTotal.toFixed(2);
  }
  else if(vatValue != ''){

    console.log(vatValue);
    var gTotalVat = Number(grandTotal) + vatValue;
    document.getElementById("cumAmount").value = gTotalVat.toFixed(2);

    //document.getElementById('dueChange').value = dueCV.toFixed(2);
  }
//console.log(gTotalVat);
//document.getElementById("cumAmount").value = "";
  //document.getElementById("cumAmount").value = gTotalVat;

});

document.getElementById('vat').addEventListener('keyup', (e)=>{

  var vatValue = Number(document.getElementById("vat").value);
  
  if(vatValue == ''){
    document.getElementById("cumAmount").value = grandTotal.toFixed(2);
  }
  else if(vatValue != ''){

    console.log(vatValue);
    var gTotalVat = Number(grandTotal) + vatValue;
    document.getElementById("cumAmount").value = gTotalVat.toFixed(2);

    //document.getElementById('dueChange').value = dueCV.toFixed(2);
  }
//console.log(gTotalVat);
//document.getElementById("cumAmount").value = "";
  //document.getElementById("cumAmount").value = gTotalVat;

});

////// End  VAT//////////////



////// Start  Discount//////////////

document.getElementById('discount').addEventListener('click', (e)=>{

  var discountValue = Number(document.getElementById("discount").value);
  
  if(discountValue == ''){
    document.getElementById("cumAmount").value = grandTotal.toFixed(2);
  }
  else if(discountValue != ''){

    console.log(discountValue);
    var gTotalDiscount = Number(grandTotal) - discountValue;
    document.getElementById("cumAmount").value = gTotalDiscount.toFixed(2);

    //document.getElementById('dueChange').value = dueCV.toFixed(2);
  }
//console.log(gTotalVat);
//document.getElementById("cumAmount").value = "";
  //document.getElementById("cumAmount").value = gTotalVat;

});


document.getElementById('discount').addEventListener('keyup', (e)=>{

  var discountValue = Number(document.getElementById("discount").value);
  
  if(discountValue == ''){
    document.getElementById("cumAmount").value = grandTotal.toFixed(2);
  }
  else if(discountValue != ''){

    console.log(discountValue);
    var gTotalDiscount = Number(grandTotal) - discountValue;
    document.getElementById("cumAmount").value = gTotalDiscount.toFixed(2);

    //document.getElementById('dueChange').value = dueCV.toFixed(2);
  }
//console.log(gTotalVat);
//document.getElementById("cumAmount").value = "";
  //document.getElementById("cumAmount").value = gTotalVat;

});

////// End  Discount//////////////




function selectPaymentType() {

  const displayPaymentDetails = document.getElementById("displayPaymentDetails");
  var paymentType = document.getElementById("selectpaymenttype").value;

  //var cumAmtValue = 300; 


  if(paymentType == "Cash"){

    displayPaymentDetails.innerHTML = `<div class="col-6">
    <label id = "amtTError" class="form-label text-muted small mb-1">Amount Tendered (<small>&#8358;</small>)</label>
    <div class="input-group input-group-lg bg-white shadow-sm rounded overflow-hiddem">
       <input onkeypress="return isNumberKey(this, event);" type="text" class="form-control"  id="amtTendered" placeholder="0.00" ondrop="return false;" onpaste="return false;" oncontextmenu="return false;" required>
    </div>
  </div>`;

  var dueChangeValue = "0.00"; 

  displayPaymentDetails.innerHTML +=`
  <div class="col-6">
    <label class="form-label text-muted small mb-1">Due Change (<small>&#8358;</small>)</label>
    <div class="input-group input-group-lg bg-white shadow-sm rounded overflow-hiddem">
       <input value = "${dueChangeValue}"  onkeypress="return isNumberKey(this, event);" type="text" class="form-control"  id="dueChange" placeholder="0.00" readonly>
    </div>
  </div>`;

  
  

  document.getElementById('amtTendered').addEventListener('input', (e)=>{

    var amtTendered = document.getElementById('amtTendered').value; 

    if(amtTendered == ''){
      document.getElementById('amtTError').innerHTML = "Amount Tendered (<small>&#8358;</small>)";
    }

    else{

    if(amtTendered < grandTotal){
      
      document.getElementById('amtTError').innerHTML = "<small class = 'font-weight-normal text-danger small l-hght-18'>Incomplete Amount</small>";
      document.getElementById('dueChange').value = "0.00";
    }

    else if(amtTendered >= grandTotal){

      var dueCV = amtTendered - grandTotal;
      document.getElementById('amtTError').innerHTML = "Amount Tendered (<small>&#8358;</small>)";
      document.getElementById('dueChange').value = dueCV.toFixed(2);
    }
  }


   // console.log(tt);

  });


  }
  else if(paymentType == "POSTrans"){
    displayPaymentDetails.innerHTML = ` <div class="col-6">
    <label class="form-label text-muted small mb-1">Amount Tendered (<small>&#8358;</small>)</label>
    <div class="input-group input-group-lg bg-white shadow-sm rounded overflow-hiddem">
       <input onkeypress="return isNumberKey(this, event);" type="text" class="form-control"  id="supplyprice" placeholder="0.00" ondrop="return false;" onpaste="return false;" oncontextmenu="return false;" required>
    </div>
  </div>
  
  <div class="col-6">
    <label class="form-label text-muted small mb-1">Due Change (<small>&#8358;</small>)</label>
    <div class="input-group input-group-lg bg-white shadow-sm rounded overflow-hiddem">
       <input value = "0.00" onkeypress="return isNumberKey(this, event);" type="text" class="form-control"  id="supplyprice" placeholder="0.00" readonly>
    </div>
  </div>`;
  }
  else if(paymentType == "CashPOStransfer"){
        displayPaymentDetails.innerHTML = ` <div class="col-6">
    <label class="form-label text-muted small mb-1">Cash Tendered (<small>&#8358;</small>)</label>
    <div class="input-group input-group-lg bg-white shadow-sm rounded overflow-hiddem">
       <input onkeypress="return isNumberKey(this, event);" type="text" class="form-control"  id="supplyprice" placeholder="0.00" ondrop="return false;" onpaste="return false;" oncontextmenu="return false;" required>
    </div>
  </div>
  
  <div class="col-6">
    <label class="form-label text-muted small mb-1">POS (<small>&#8358;</small>)</label>
    <div class="input-group input-group-lg bg-white shadow-sm rounded overflow-hiddem">
       <input onkeypress="return isNumberKey(this, event);" type="text" class="form-control"  id="supplyprice" placeholder="0.00" required>
    </div>
  </div>

  <div class="col-6">
    <label class="form-label text-muted small mb-1">Total (<small>&#8358;</small>)&nbsp;<code>Error</code></label>
    <div class="input-group input-group-lg bg-white shadow-sm rounded overflow-hiddem">
       <input onkeypress="return isNumberKey(this, event);" type="text" class="form-control"  id="supplyprice" placeholder="100000000.00" readonly required>
    </div>
  </div>


  <div class="col-6">
    <label class="form-label text-muted small mb-1">Due Change (<small>&#8358;</small>)</label>
    <div class="input-group input-group-lg bg-white shadow-sm rounded overflow-hiddem">
       <span class="input-group-text bg-white" style="opacity: 0.8;"><small>&#8358;</small></span>
       <input onkeypress="return isNumberKey(this, event);" type="text" class="form-control"  id="supplyprice" placeholder="0.00"  readonly required>
    </div>
  </div>`;
  }

  
}

