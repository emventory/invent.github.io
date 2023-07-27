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


var grandTotal = 0;
let subTotal;
var m = JSON.parse(localStorage.getItem("CART"));
var f = 0;
    m.forEach(function(key){

         var t = key.unit_price*key.numberOfUnits;
        f++;
        //window.open('aa.html?numberOfUnits='+key.numberOfUnits+'&product_id='+key.product_id, "_self");
        console.log(key.numberOfUnits +' '+ key.product_cat +' '+ key.product_name +' '+ key.product_id);

        subTotal = key.unit_price*key.numberOfUnits;
        grandTotal = grandTotal += subTotal;
        document.getElementById("cumAmount").value = grandTotal.toFixed(2);
        console.log(subTotal);
      })
        console.log(grandTotal);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById('selectpaymenttype').addEventListener('change', function() {
  selectPaymentType();
});


////// Start  Discount//////////////

document.getElementById('discount').addEventListener('click', (e)=>{

  var discountValue = Number(document.getElementById("discount").value);
  
  if(discountValue == ''){
    document.getElementById("cumAmount").value = grandTotal.toFixed(2);
    document.getElementById('amtTendered').value = '';
    document.getElementById('dueChange').value = '';
  }
  else if(discountValue != ''){

    console.log(discountValue);
    var gTotalDiscount = Number(grandTotal) - discountValue;
    document.getElementById("cumAmount").value = gTotalDiscount.toFixed(2);
    document.getElementById('amtTendered').value = '';
    document.getElementById('dueChange').value = '';

  }
});


document.getElementById('discount').addEventListener('keyup', (e)=>{

  var discountValue = Number(document.getElementById("discount").value);
  
  if(discountValue == ''){
    document.getElementById("cumAmount").value = grandTotal.toFixed(2);
    document.getElementById('amtTendered').value = '';
    document.getElementById('dueChange').value = '';
  }
  else if(discountValue != ''){

    console.log(discountValue);
    var gTotalDiscount = Number(grandTotal) - discountValue;
    document.getElementById("cumAmount").value = gTotalDiscount.toFixed(2);
    document.getElementById('amtTendered').value = '';
    document.getElementById('dueChange').value = '';

  }

});

////// End  Discount//////////////

var paymentStatus = "";
function selectPaymentType() {

  const displayPaymentDetails = document.getElementById("displayPaymentDetails");
  var paymentType = document.getElementById("selectpaymenttype").value;

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
    var grandTotalCum = Number(document.getElementById('cumAmount').value); 

    if(amtTendered == ''){
      document.getElementById('amtTError').innerHTML = "Amount Tendered (<small>&#8358;</small>)";
    }

    else{

    if(amtTendered < grandTotalCum){
      
      var dueCV = grandTotalCum - amtTendered;
      document.getElementById('amtTError').innerHTML = "<small class = 'font-weight-normal text-danger small l-hght-18'>Incomplete Amount</small>";
      document.getElementById('dueChange').value = dueCV.toFixed(2);

      paymentStatus = "Pending Completion"
      
    }

    else if(amtTendered == grandTotalCum){

      var dueCV = amtTendered - grandTotalCum;
      document.getElementById('amtTError').innerHTML = "Amount Tendered (<small>&#8358;</small>)";
      document.getElementById('dueChange').value = dueCV.toFixed(2);
      paymentStatus = "Completed"
    }

    else if(amtTendered > grandTotalCum){

      alert("Error!: Amount Tendered Must Not Be Greater Than "+grandTotalCum);
      document.getElementById('amtTendered').value = null;
      document.getElementById('amtTendered').setAttribute("placeholder","0.00");
      document.getElementById('dueChange').value = null;
      document.getElementById('dueChange').setAttribute("placeholder","0.00");
    }
  }

  });

  }
  else if(paymentType == "POSTrans"){
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
    var grandTotalCum = Number(document.getElementById('cumAmount').value); 

    if(amtTendered == ''){
      document.getElementById('amtTError').innerHTML = "Amount Tendered (<small>&#8358;</small>)";
    }

    else{

    if(amtTendered < grandTotalCum){
      
      var dueCV = grandTotalCum - amtTendered;
      document.getElementById('amtTError').innerHTML = "<small class = 'font-weight-normal text-danger small l-hght-18'>Incomplete Amount</small>";
      document.getElementById('dueChange').value = dueCV.toFixed(2);

      paymentStatus = "Pending Completion"
      
    }

    else if(amtTendered == grandTotalCum){

      var dueCV = amtTendered - grandTotalCum;
      document.getElementById('amtTError').innerHTML = "Amount Tendered (<small>&#8358;</small>)";
      document.getElementById('dueChange').value = dueCV.toFixed(2);
      paymentStatus = "Completed"
    }

    else if(amtTendered > grandTotalCum){

      alert("Error!: Amount Tendered Must Not Be Greater Than "+grandTotalCum);
      document.getElementById('amtTendered').value = null;
      document.getElementById('amtTendered').setAttribute("placeholder","0.00");
      document.getElementById('dueChange').value = null;
      document.getElementById('dueChange').setAttribute("placeholder","0.00");
    }
  }

  });
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

////// Start Confirm Order Button//////////////

document.getElementById('confirmorder').addEventListener('click', (e)=>{


  if (window.confirm('Are You Sure To Confirm This Order?')) {

  var paymentType = document.getElementById("selectpaymenttype").value;
  var selectsalesrep = document.getElementById("selectsalesrep").value;

  if(selectsalesrep == ''){
    //console.log("Empty");
    document.getElementById("salesreplabel").innerHTML = `<label class="form-label text-muted small mb-1">Select Sales Rep &nbsp;<code>Fill Here!</code></label>`;
  }
  else if(paymentType == ''){
    //console.log("Empty");
    document.getElementById("paymenttypelabel").innerHTML = `<label class="form-label text-muted small mb-1">Payment Type &nbsp;<code>Fill Here!</code></label>`;
  }

  else{
  
  if(paymentType == "Cash"){

    var amtTendered = Number(document.getElementById('amtTendered').value); 

    if(amtTendered == ''){

      document.getElementById('amtTError').innerHTML = `<label id = "amtTError" class="form-label text-muted small mb-1">Amount Tendered <code>Fill Here!</code></label>`;

    }
    else{

          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
      
          today = yyyy + '-' + mm + '-' + dd;



          var currentDate = new Date();
          var startDate = new Date(currentDate.getFullYear(), 0, 1);
          var days = Math.floor((currentDate - startDate) /
            (24 * 60 * 60 * 1000));

          var weekNumber = Math.ceil(days / 7);

          // Display the calculated result	
          console.log("Week number of " + currentDate +
            " is : " + weekNumber);

          const dates = new Date();
          var dateToString = dates.toString()
          var tid = md5(dateToString);
          tid = tid.substr(0, 10);

          var salesid = md5(tid);
          salesid = salesid.substr(0, 7);
          //var stock_value = qtysupplied*supplyprice;

          var grandTotal = 0;
          let subTotal;
          var numberOfItems = 0;
          var m = JSON.parse(localStorage.getItem("CART"));

          var remainingbalance = document.getElementById('dueChange').value;
          var discountValue = document.getElementById('discount').value;

          const updateStock = {};
          const setSales = {};
          
          m.forEach(function(key){

            updateStock[`/stock/${key.product_name}/stock_qty`] = Number(key.stock_qty - key.numberOfUnits);
            
            var totalAmount = key.unit_price*key.numberOfUnits;
            
              salesid = salesid.substr(0, 7)+md5(key.product_name).substr(0, 3);
              var proId_date = key.product_id +"_"+ today;
              var proId_week = key.product_id +"_"+ weekNumber;
              var proId_month = key.product_id +"_"+ mm;

              console.log(key.product_company);

            set(ref(db, 'sales/' + salesid), {
              t_id:tid,
              user_id:sessionStorage.getItem("key"),
              sales_rep_id:selectsalesrep,
              sales_id:salesid,
              product_id:key.product_id,
              product_qty:key.numberOfUnits,
              unit_price:key.unit_price,
              total_amount:totalAmount,
              product_company:key.product_company,
              date:dateToString,
              date_for_query:today,
              day_for_query:dd,
              month_for_query:mm,
              year_for_query:yyyy,
              week:weekNumber,
              proId_date:proId_date,
              proId_week:proId_week,
              proId_month:proId_month,
              status:1
            });


            console.log(key.numberOfUnits +' '+ key.product_cat +' '+ key.product_name +' '+ key.product_id +' '+ key.stock_qty);
            console.log(key.stock_qty - key.numberOfUnits);
            subTotal = key.unit_price*key.numberOfUnits;

            numberOfItems += Number(key.numberOfUnits);
    
            grandTotal = grandTotal += subTotal;
        //document.getElementById("cumAmount").value = grandTotal.toFixed(2);
            console.log(subTotal);
    });
      console.log(grandTotal);
      console.log(updateStock);

      console.log(numberOfItems);
      var proId_date = tid +"_"+ today;
      var proId_week = tid +"_"+ weekNumber;
      var proId_month = tid +"_"+ mm;
  
            set(ref(db, 'transactions/' + tid), {
              t_id:tid,
              user_id:sessionStorage.getItem("key"),
              sales_rep_id:selectsalesrep,
              mode_of_pay:paymentType,
              total_items:numberOfItems,
              total_amount:grandTotal.toFixed(2),
              amount_tendered:amtTendered.toFixed(2),
              remaining_balance:remainingbalance,
              discount:discountValue,
              t_date:dateToString,
              date_for_query:today,
              day_for_query:dd,
              month_for_query:mm,
              year_for_query:yyyy,
              week:weekNumber,
              proId_date:proId_date,
              proId_week:proId_week,
              proId_month:proId_month,
              payment_status:paymentStatus,
              status:1
            }).then(()=>{
///////////////////////////update////////////////////////////////////////////////
            update(ref(db), updateStock).then(()=>{
              alert("Your Order was Confirmed Successfully!");

              window.open('confirmorder.html?tid='+tid, "_self");
  
          }).catch((error)=>{
              alert("Your Order was Not Confirmed Successfully!");
          });

////////////////////////////update/////////////////////////////////////////////
          }).catch(()=>{
            alert("Error: Item Added Not Successful");
          });
   

    }
    var grandTotalCum = Number(document.getElementById('cumAmount').value); 

    console.log(paymentType);
    console.log(selectsalesrep);

  }

  else if(paymentType == "POSTrans"){

    var amtTendered = Number(document.getElementById('amtTendered').value); 

    if(amtTendered == ''){

      document.getElementById('amtTError').innerHTML = `<label id = "amtTError" class="form-label text-muted small mb-1">Amount Tendered <code>Fill Here!</code></label>`;

    }
    else{


          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
      
          today = yyyy + '-' + mm + '-' + dd;

          

          ///////////Get Week - Start/////////////////////////////
          var currentDate = new Date();
          var startDate = new Date(currentDate.getFullYear(), 0, 1);
          var days = Math.floor((currentDate - startDate) /
            (24 * 60 * 60 * 1000));

          var weekNumber = Math.ceil(days / 7);

          // Display the calculated result	
          console.log("Week number of " + currentDate +
            " is : " + weekNumber);
          ///////////Get Week - End///////////////////////////////

          const dates = new Date();
          var dateToString = dates.toString()
          var tid = md5(dateToString);
          tid = tid.substr(0, 10);

          var salesid = md5(tid);
          salesid = salesid.substr(0, 7);
          //var stock_value = qtysupplied*supplyprice;

          var grandTotal = 0;
          let subTotal;
          var numberOfItems = 0;
          var m = JSON.parse(localStorage.getItem("CART"));

          var remainingbalance = document.getElementById('dueChange').value;
          var discountValue = document.getElementById('discount').value;

          const updateStock = {};
          const setSales = {};
          
          m.forEach(function(key){

            updateStock[`/stock/${key.product_name}/stock_qty`] = Number(key.stock_qty - key.numberOfUnits);
            
            var totalAmount = key.unit_price*key.numberOfUnits;
            
              salesid = salesid.substr(0, 7)+md5(key.product_name).substr(0, 3);

              var proId_date = key.product_id +"_"+ today;
              var proId_week = key.product_id +"_"+ weekNumber;
              var proId_month = key.product_id +"_"+ mm;

            set(ref(db, 'sales/' + salesid), {
              t_id:tid,
              user_id:sessionStorage.getItem("key"),
              sales_rep_id:selectsalesrep,
              sales_id:salesid,
              product_id:key.product_id,
              product_qty:key.numberOfUnits,
              unit_price:key.unit_price,
              total_amount:totalAmount,
              product_company:key.product_company,
              date:dateToString,
              date_for_query:today,
              day_for_query:dd,
              month_for_query:mm,
              year_for_query:yyyy,
              week:weekNumber,
              proId_date:proId_date,
              proId_week:proId_week,
              proId_month:proId_month,
              status:1
            });


            console.log(key.numberOfUnits +' '+ key.product_cat +' '+ key.product_name +' '+ key.product_id +' '+ key.stock_qty);
            console.log(key.stock_qty - key.numberOfUnits);
            subTotal = key.unit_price*key.numberOfUnits;

            numberOfItems += Number(key.numberOfUnits);
    
            grandTotal = grandTotal += subTotal;
        //document.getElementById("cumAmount").value = grandTotal.toFixed(2);
            console.log(subTotal);
    });
    console.log(grandTotal);
    console.log(updateStock);

    console.log(numberOfItems);
    var proId_date = tid +"_"+ today;
    var proId_week = tid +"_"+ weekNumber;
    var proId_month = tid +"_"+ mm;

          set(ref(db, 'transactions/' + tid), {
            t_id:tid,
            user_id:sessionStorage.getItem("key"),
            sales_rep_id:selectsalesrep,
            mode_of_pay:paymentType,
            total_items:numberOfItems,
            total_amount:grandTotal.toFixed(2),
            amount_tendered:amtTendered.toFixed(2),
            remaining_balance:remainingbalance,
            discount:discountValue,
            t_date:dateToString,
            date_for_query:today,
            day_for_query:dd,
            month_for_query:mm,
            year_for_query:yyyy,
            week:weekNumber,
            proId_date:proId_date,
            proId_week:proId_week,
            proId_month:proId_month,
            payment_status:paymentStatus,
            status:1
          }).then(()=>{
///////////////////////////update////////////////////////////////////////////////
            update(ref(db), updateStock).then(()=>{
              alert("Your Order was Confirmed Successfully!");

              window.open('confirmorder.html?tid='+tid, "_self");
  
          }).catch((error)=>{
              alert("Your Order was Not Confirmed Successfully!");
          });

////////////////////////////update/////////////////////////////////////////////
          }).catch(()=>{
            alert("Error: Item Added Not Successful");
          });
   

    }
    var grandTotalCum = Number(document.getElementById('cumAmount').value); 

    console.log(paymentType);
    console.log(selectsalesrep);

  }
  
  else if(discountValue != ''){

    console.log(discountValue);
    var gTotalDiscount = Number(grandTotal) - discountValue;
    document.getElementById("cumAmount").value = gTotalDiscount.toFixed(2);
    document.getElementById('amtTendered').value = '';
    document.getElementById('dueChange').value = '';
  }

}

} else {
  window.open("newtransaction.html", "_self");
}

});

////// Stop Confirm Order Button//////////////
