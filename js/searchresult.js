  
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
  import { getDatabase, set, get, ref ,query, child, onValue, limitToFirst, orderByChild,equalTo,startAt,endAt } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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
  
  function getSearchResult(){


    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const selectsalesrep = urlParams.get('selectsalesrep');
    const selectcompany = urlParams.get('selectcompany');
    const rangefrom = urlParams.get('rangefrom');
    const rangeto = urlParams.get('rangeto');

    // document.getElementById("repNameH6").innerText = rep_name;
    // document.getElementById("repNameH6").innerHTML += '\n <h6 class="text-success">Trans. History</h6>';
    // document.getElementById("repId").value = rep_id;
    // document.getElementById("repName").value = rep_name;
  
  
    //console.log(selectsalesrep +" "+ selectcompany +" "+ rangefrom +" "+ rangeto);

  //document.getElementById("repIdHidden").value = rep_id;
    
      var status = 1;
     // console.log(rep_id);
      
      const que = query(ref(db,'sales'),orderByChild('date_for_query'),startAt(rangefrom),endAt(rangeto));

      get(que).then((snapshot) => {
        if (snapshot.exists()) {

          var transactions = [];

          snapshot.forEach(function (childSnapshot) {

            //transactions.push(childSnapshot.val());
            //console.log(childSnapshot.val().product_company);

            if(childSnapshot.val().product_company == selectcompany){
                console.log(childSnapshot.val().product_id);
            }

        });

        addTransactionsForDisplay(transactions);

        //console.log(snapshot.val().name);
        } else {
          alert("Sorry! No Transaction(s) Yet For This Sales Rep");
          window.history.go(-1);
        }
      }).catch((error) => {
        console.error(error);
      });
	
							
}

window.onload = getSearchResult();

var tAmount = 0;
var tRemAmount = 0;
var tAmountTendered = 0;
var tDiscount = 0;
//var tAfterDiscount = 0;

function  addTransactionsForDisplay(transactions){
  transactions.forEach(element => {

    sendToDisplay(element.t_id, element.user_id, element.sales_rep_id, 
      element.total_amount, element.total_items, element.amount_tendered, 
      element.remaining_balance, element.discount, element.mode_of_pay, 
      element.payment_status, element.t_date, element.status);

      tAmount = Number(element.total_amount) + tAmount;
      tRemAmount = Number(element.remaining_balance) + tRemAmount;
      tAmountTendered = Number(element.amount_tendered) + tAmountTendered;
      tDiscount = Number(element.discount) + tDiscount;
      //tAfterDiscount = Number((tAmount - tDiscount)) + tAfterDiscount;
      //console.log(tAmount);

  });
 // console.log(tAmount);

  if(tRemAmount > 0){   

    document.getElementById('totalDisplay').classList.add('btn','btn-danger','btn-sm','w-100','shadow')
    document.getElementById('totalDisplay').innerText = "Accum. Total: \u20A6"+tAmount+
    "\n Total Discount: \u20A6"+ tDiscount+
    "\n Total After Discount: \u20A6"+ (tAmount - tDiscount)+
    "\n Total Amount Tendered: \u20A6"+ tAmountTendered+"\n Total Remaining Bal: \u20A6"+ tRemAmount;

  }
  else if(tRemAmount <= 0){

    document.getElementById('totalDisplay').classList.add('btn','btn-success','btn-sm','w-100','shadow')
    document.getElementById('totalDisplay').innerText = "Accum. Total: \u20A6"+tAmount+
    "\n Total Discount: \u20A6"+ tDiscount+
    "\n Total After Discount: \u20A6"+ (tAmount - tDiscount)+
    "\n Total Amount Tendered: \u20A6"+ tAmountTendered+"\n Total Remaining Bal: \u20A6"+ tRemAmount;
    
  }
 
}


var osahan_btn_group = document.getElementById('osahan_btn_group');
var bg_white = document.getElementById('bg_white');

var radioId = 1;

function sendToDisplay(t_id, user_id, sales_rep_id, total_amount, total_items, 
  amount_tendered, remaining_balance, discount, mode_of_pay, payment_status, 
  t_date, status){

  let btn_check = document.createElement('input');
  btn_check.setAttribute('type', 'radio');
  btn_check.setAttribute('id', 'btnradio'+radioId);
  btn_check.setAttribute('name', 'btnradio');
  btn_check.setAttribute('autocomplete', 'off');
  btn_check.setAttribute('for', 'flexCheckIndeterminate');
  btn_check.checked = true;
	btn_check.classList.add ('btn-check','is-invalid');

  osahan_btn_group.appendChild(btn_check);


  let btn_outline_lightLabel = document.createElement('label');
  btn_outline_lightLabel.setAttribute('type', 'label');
  btn_outline_lightLabel.setAttribute('id', 'label'+radioId);
  btn_outline_lightLabel.setAttribute('for', 'btnradio'+radioId);

  btn_outline_lightLabel.setAttribute('data-bs-toggle', 'tooltip');
  btn_outline_lightLabel.setAttribute('data-bs-placement', 'bottom');
  btn_outline_lightLabel.setAttribute('title', 'Remaining Balance : '+remaining_balance);

	btn_outline_lightLabel.classList.add ('btn','btn-outline','d-flex','align-items-center','gap-3','rounded','px-3','py-2','mt-2');


  let bi_houseItalics = document.createElement('i');
	//bi_houseItalics.classList.add ('bi','bi-ui-checks-grid','text-success');

  let fw_boldH6 = document.createElement('h6');
	

  if(remaining_balance == 0){
    bi_houseItalics.classList.add ('bi','bi-ui-checks-grid','text-success');
    fw_boldH6.classList.add ('mb-0','fw-bold','text-success');
  }
  else if(remaining_balance > 0){
    bi_houseItalics.classList.add ('bi','bi-ui-checks-grid','text-danger');
    fw_boldH6.classList.add ('mb-0','fw-bold','text-danger');
  }
  //
  btn_outline_lightLabel.appendChild(bi_houseItalics);

  let text_startSpan = document.createElement('span');
	text_startSpan.classList.add ('text-start');

  

  let h6Text = document.createTextNode("Transac. Amount: \u20A6"+ Intl.NumberFormat('en-US').format(total_amount));
  fw_boldH6.appendChild(h6Text);

  text_startSpan.appendChild(fw_boldH6);

  let text_mutedDiv = document.createElement('div');
	text_mutedDiv.classList.add ('small', 'text-dark');

  let text_mutedDivNoItemsText = document.createTextNode('No. Of Items: '+total_items);
  text_mutedDiv.appendChild(text_mutedDivNoItemsText);

  let br = document.createElement('br');
  text_mutedDiv.appendChild(br);


  let text_mutedDivAmtTendered = document.createTextNode('Amount Tendered: \u20A6'+amount_tendered);
  text_mutedDiv.appendChild(text_mutedDivAmtTendered);

  let br2 = document.createElement('br');
  text_mutedDiv.appendChild(br2);

  let text_mutedDivDiscount = document.createTextNode('Discount: \u20A6'+discount);
  text_mutedDiv.appendChild(text_mutedDivDiscount);

  let br3 = document.createElement('br');
  text_mutedDiv.appendChild(br3);

  let text_mutedRemainingBal = document.createTextNode('Remaining Bal.: \u20A6'+remaining_balance);
  text_mutedDiv.appendChild(text_mutedRemainingBal);

  let br4 = document.createElement('br');
  text_mutedDiv.appendChild(br4);

  let text_mutedDivTransDate = document.createTextNode(' Transac. Date: '+t_date.slice(0, -36));
  text_mutedDiv.appendChild(text_mutedDivTransDate);

  text_startSpan.appendChild(text_mutedDiv);

  let bi_check_circle_filltalics = document.createElement('i');
	bi_check_circle_filltalics.classList.add ('bi','bi-check-circle-fill','ms-auto');

  let bi_check_circle_filltalicsDown = document.createElement('i');
	bi_check_circle_filltalicsDown.classList.add ('bi','bi-arrow-down-square-fill','ms-auto');
  
 // bi bi-arrow-down-square

  btn_outline_lightLabel.appendChild(text_startSpan);

  // if(stock_qty <= reorder_value){
  //   btn_outline_lightLabel.appendChild(bi_check_circle_filltalicsDown);

  // }
 // else if(stock_qty > reorder_value){
    btn_outline_lightLabel.appendChild(bi_check_circle_filltalics);
    

  //}
  


  let hiddenForItemID = document.createElement('input');
  hiddenForItemID.setAttribute('type', 'hidden');
  hiddenForItemID.setAttribute('value', t_id);
  hiddenForItemID.setAttribute('id', 'hiddenID'+radioId);

  let itemID = document.createTextNode(t_id);
  hiddenForItemID.appendChild(itemID);

  osahan_btn_group.appendChild(btn_outline_lightLabel);
  osahan_btn_group.appendChild(hiddenForItemID);
  bg_white.appendChild(osahan_btn_group);
  
  

  var el = document.getElementById('hiddenID'+radioId);
  var el2 = document.getElementById('label'+radioId);
  //console.log(el.innerText);


  el2.addEventListener("click", function(){
    //rep_id, rep_name, rep_phone, rep_email, rep_address, date_registered
      //console.log(el.value);
      window.open('salestransactiondetails.html?rep_id='+document.getElementById("repId").value+
      '&rep_name='+document.getElementById("repName").value+'&t_Id='+t_id+'&discount='+discount+
      '&paymentmode='+mode_of_pay+
      '&userid='+user_id+
      '&amttendered='+amount_tendered+
      '&remainbalance='+remaining_balance, "_self");
    }
  )
  radioId = radioId+1;
 
}


