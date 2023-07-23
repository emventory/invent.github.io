  
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
  
  function getTransactionsSalesDetails(){

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const rep_id = urlParams.get('rep_id');
    const rep_name = urlParams.get('rep_name');
    const t_Id = urlParams.get('t_Id');
    const discount = urlParams.get('discount');
    const mode_of_pay = urlParams.get('mode_of_pay');
    const userid = urlParams.get('userid');

    const amount_tendered = urlParams.get('amttendered');
    const remaining_balance = urlParams.get('remainbalance');

    document.getElementById("repNameH6").innerText = rep_name;
    document.getElementById("repNameH6").innerHTML += '\n <h6 class="text-success">Deals</h6>';
    document.getElementById("repId").value = rep_id;
    document.getElementById("repName").value = rep_name;
    document.getElementById("tidHidden").value = t_Id;

    document.getElementById("discountHidden").value = discount;
    document.getElementById("paymentmodeHidden").value = mode_of_pay;
    document.getElementById("useridHidden").value = userid;

    document.getElementById("amttenderedHidden").value = amount_tendered;
    document.getElementById("remainbalanceHidden").value = remaining_balance;
  
  
  //document.getElementById("repIdHidden").value = rep_id;
    
      var status = 1;
      console.log(rep_id);
      
      const que = query(ref(db,'sales'),orderByChild('t_id'),equalTo(t_Id));

      get(que).then((snapshot) => {
        if (snapshot.exists()) {

          var transactionsSales = [];

          snapshot.forEach(function (childSnapshot) {

            transactionsSales.push(childSnapshot.val());

        });

        addTransactionsSalesForDisplay(transactionsSales);

        //console.log(snapshot.val().name);
        } else {
          alert("Sorry! No Transaction(s) Yet For This Sales Rep");
        }
      }).catch((error) => {
        console.error(error);
      });

      document.getElementById('printerRef').addEventListener('click', ()=>{
        window.open('confirmorder.html?tid='+t_Id, "_self");
      });
							
}



      window.onload = getTransactionsSalesDetails();

      var tAmount = 0;
      var tRemAmount = document.getElementById("remainbalanceHidden").value;
      var tAmountTendered = document.getElementById("amttenderedHidden").value;
      var tDiscount = document.getElementById("discountHidden").value;
      //var tAfterDiscount = 0;

function  addTransactionsSalesForDisplay(transactionsSales){
        transactionsSales.forEach(element => {

          sendToDisplay(element.sales_id, element.t_id, element.sales_rep_id, 
            element.product_id, element.product_qty, element.total_amount, 
            element.unit_price, element.user_id, element.date,element.status);

            //tAmount = Number(element.total_amount);

            tAmount = Number(element.total_amount) + tAmount;
            // tRemAmount = Number(element.remaining_balance) + tRemAmount;
            // tAmountTendered = Number(element.amount_tendered) + tAmountTendered;
            //tDiscount = Number(element.discount) + tDiscount;
            //tAfterDiscount = Number((tAmount - tDiscount)) + tAfterDiscount;
            //console.log(tAmount);

        });
        console.log(tAmount);

        //document.getElementById("discountHidden").value

        if(tRemAmount > 0){   



          document.getElementById('totalDisplay').classList.add('btn','btn-danger','btn-sm','w-100','shadow')
          document.getElementById('totalDisplay').innerText = "Accum. Total: \u20A6"+tAmount+
          "\n Discount: \u20A6"+ tDiscount+
          "\n Total After Discount: \u20A6"+ (tAmount - tDiscount)+
          "\n Amount Tendered: \u20A6"+ tAmountTendered+"\n Remaining Bal: \u20A6"+ tRemAmount+"\n\n";

          document.getElementById('totalDisplay').innerHTML += `<button id="payBal" class="btn btn-warning btn-sm shadow float-none"><i class="bi bi-credit-card-2-front  fw-bold"> Pay Balance</i></button>`;

          document.getElementById('payBal').addEventListener('click', ()=>{
            alert('Are You Sure To Pay Balance?');
          });

        }
        else if(tRemAmount <= 0){

          document.getElementById('totalDisplay').classList.add('btn','btn-success','btn-sm','w-100','shadow')
          document.getElementById('totalDisplay').innerText = "Accum. Total: \u20A6"+tAmount+
          "\n Discount: \u20A6"+ tDiscount+
          "\n Total After Discount: \u20A6"+ (tAmount - tDiscount)+
          "\n Amount Tendered: \u20A6"+ tAmountTendered+"\n Remaining Bal: \u20A6"+ tRemAmount;
          
        }
 
}


    var osahan_btn_group = document.getElementById('osahan_btn_group');
    var bg_white = document.getElementById('bg_white');

    var radioId = 1;

function sendToDisplay(sales_id, t_id, sales_rep_id, product_id, product_qty, total_amount, 
  unit_price, user_id, date, status){

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
        

        btn_outline_lightLabel.classList.add ('btn','btn-outline','d-flex','align-items-center','gap-3','rounded','px-3','py-2','mt-2');


        let bi_houseItalics = document.createElement('i');
        //bi_houseItalics.classList.add ('bi','bi-ui-checks-grid','text-success');

        //if(remaining_balance == 0){
          bi_houseItalics.classList.add ('bi','bi-ui-checks-grid','text-success');
        //}
        //else if(remaining_balance > 0){
          //bi_houseItalics.classList.add ('bi','bi-ui-checks-grid','text-danger');
        //}
        //
        btn_outline_lightLabel.appendChild(bi_houseItalics);

        let text_startSpan = document.createElement('span');
        text_startSpan.classList.add ('text-start');

        let fw_boldH6 = document.createElement('h6');
        fw_boldH6.classList.add ('mb-0','fw-bold','text-dark');





      
        let p_Name;
        const getProductNameQue = query(ref(db,'stock'),orderByChild('product_id'),equalTo(product_id));

        get(getProductNameQue).then((snapshot) => {
          if (snapshot.exists()) {

            var productNames = [];

            snapshot.forEach(function (childSnapshot) {

              p_Name = childSnapshot.val().product_name;
              let h6Text = document.createTextNode("Product: "+p_Name);
              fw_boldH6.appendChild(h6Text);

              btn_outline_lightLabel.setAttribute('title', p_Name+ '\n Total: '+total_amount);

          });

          //addTransactionsSalesForDisplay(productNames);

          //console.log(snapshot.val().name);
          } else {
            alert("Sorry! No Transaction(s) Yet For This Sales Rep");
          }
        }).catch((error) => {
          console.error(error);
        });

        




        text_startSpan.appendChild(fw_boldH6);

        let text_mutedDiv = document.createElement('div');
        text_mutedDiv.classList.add ('small', 'text-dark');

        let text_mutedDivNoItemsText = document.createTextNode('Quantity: '+product_qty);
        text_mutedDiv.appendChild(text_mutedDivNoItemsText);

        let br = document.createElement('br');
        text_mutedDiv.appendChild(br);


        let text_mutedDivAmtTendered = document.createTextNode('Unit Price: \u20A6'+unit_price);
        text_mutedDiv.appendChild(text_mutedDivAmtTendered);

        let br2 = document.createElement('br');
        text_mutedDiv.appendChild(br2);

        let text_mutedDivDiscount = document.createTextNode('Total: \u20A6'+total_amount);
        text_mutedDiv.appendChild(text_mutedDivDiscount);

        let br3 = document.createElement('br');
        text_mutedDiv.appendChild(br3);

        // let text_mutedRemainingBal = document.createTextNode('Remaining Bal.: \u20A6'+remaining_balance);
        // text_mutedDiv.appendChild(text_mutedRemainingBal);

        // let br4 = document.createElement('br');
        // text_mutedDiv.appendChild(br4);

        let text_mutedDivTransDate = document.createTextNode(' Transac. Date: '+date.slice(0, -36));
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


        // el2.addEventListener("click", function(){
        //   //rep_id, rep_name, rep_phone, rep_email, rep_address, date_registered
        //     //console.log(el.value);
        //     window.open('salestransactiondetails.html?rep_id='+document.getElementById("repId").value+'&rep_name='+document.getElementById("repName").value, "_self");
        //   }
        // )
        radioId = radioId+1;
      
}

