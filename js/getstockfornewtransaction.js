  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
  import { getDatabase, set, get, ref ,query, child, onValue, limitToFirst, orderByChild,equalTo } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
  //export {allStorage};
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
  var stocks = [];

  //const productsEl = document.querySelector(".products");
  const cartItemsEl = document.querySelector(".cartitems");
  const subtotalButtomEl = document.querySelector(".subtotalButtom");
  const subtotalTopEl = document.querySelector(".subtotalTop");
  const totalInBasketEl = document.querySelector(".totalInBasket");
  const clearAndCheckOutEl = document.querySelector(".clearAndCheckOut");
  


  function getAllStock(){

      var status = 1;
      const que = query(ref(db,'stock'),orderByChild('status'),equalTo(status));

      get(que).then((snapshot) => {
        if (snapshot.exists()) {

          

          snapshot.forEach(function (childSnapshot) {

            stocks.push(childSnapshot.val());

        });
        console.log(stocks);
        addStockItemsForDisplay(stocks);

        //console.log(snapshot.val().name);
        } else {
          alert("Error: No Item(s) already added to the inventory");
        }
      }).catch((error) => {
        console.error(error);
      });
	
							
}

window.onload = getAllStock();

function  addStockItemsForDisplay(stocks){
  stocks.forEach(element => {

    sendToDisplay(element.product_name, element.product_brand, element.product_cat, 
      element.stock_qty, element.reorder_value, element.product_id, element.product_company, 
      element.stock_value_in_hand, element.unit_price);

  });
}


var osahan_btn_group = document.getElementById('osahan_btn_group');
var bg_white = document.getElementById('bg_white');

var radioId = 1;

function sendToDisplay(product_name,product_brand, product_cat, stock_qty, reorder_value, product_id, 
  product_company, stock_value_in_hand, unit_price){

  let btn_check = document.createElement('input');
  btn_check.setAttribute('type', 'radio');
  btn_check.setAttribute('id', 'btnradio'+radioId);
  btn_check.setAttribute('name', 'btnradio');
  btn_check.setAttribute('autocomplete', 'off');
  btn_check.checked = true;
	btn_check.classList.add ('btn-check');

  osahan_btn_group.appendChild(btn_check);


  let btn_outline_lightLabel = document.createElement('label');
  btn_outline_lightLabel.setAttribute('type', 'label');
  btn_outline_lightLabel.setAttribute('id', 'label'+radioId);
  btn_outline_lightLabel.setAttribute('for', 'btnradio'+radioId);
	btn_outline_lightLabel.classList.add ('btn','btn-outline-light','d-flex','align-items-center','gap-3','rounded','px-3','py-2','mt-2');


  let bi_houseItalics = document.createElement('i');
	bi_houseItalics.classList.add ('bi','bi-house');
  //
  btn_outline_lightLabel.appendChild(bi_houseItalics);

  let text_startSpan = document.createElement('span');
	text_startSpan.classList.add ('text-start');

  let fw_boldH6 = document.createElement('h6');
	fw_boldH6.classList.add ('mb-0','fw-bold');

  let h6Text = document.createTextNode(product_name +' -> '+ product_cat);
  fw_boldH6.appendChild(h6Text);

  text_startSpan.appendChild(fw_boldH6);

  let text_mutedDiv = document.createElement('div');
  text_mutedDiv.classList.add ('text-muted', 'small', 'text-opacity-50');

  let text_mutedDivText = document.createTextNode('Qty Remaining : '+stock_qty);
  text_mutedDiv.appendChild(text_mutedDivText);
  
  
  let text_mutedDiv2 = document.createElement('div');
  text_mutedDiv2.classList.add ('text-muted', 'small', 'text-opacity-50');
  
  let text_mutedDivText2 = document.createTextNode('Unit Price : \u20A6'+ unit_price);
  text_mutedDiv2.appendChild(text_mutedDivText2);

  text_startSpan.appendChild(text_mutedDiv);
  text_startSpan.appendChild(text_mutedDiv2);

  let bi_check_circle_filltalics = document.createElement('i');
	bi_check_circle_filltalics.classList.add ('bi','bi-plus-square-fill','ms-auto');

  let bi_check_circle_filltalicsDown = document.createElement('i');
	bi_check_circle_filltalicsDown.classList.add ('bi','bi-plus-square-fill','ms-auto');
  
 // bi bi-arrow-down-square

  btn_outline_lightLabel.appendChild(text_startSpan);

  if(stock_qty <= reorder_value){
    btn_outline_lightLabel.appendChild(bi_check_circle_filltalicsDown);

  }
  else if(stock_qty > reorder_value){
    btn_outline_lightLabel.appendChild(bi_check_circle_filltalics);

  }
  


  let hiddenForItemID = document.createElement('input');
  hiddenForItemID.setAttribute('type', 'hidden');
  hiddenForItemID.setAttribute('value', product_id);
  hiddenForItemID.setAttribute('id', 'hiddenID'+radioId);

  let itemID = document.createTextNode(product_id);
  hiddenForItemID.appendChild(itemID);

  osahan_btn_group.appendChild(btn_outline_lightLabel);
  osahan_btn_group.appendChild(hiddenForItemID);
  bg_white.appendChild(osahan_btn_group);
  
  

  var el = document.getElementById('hiddenID'+radioId);
  var el2 = document.getElementById('label'+radioId);
  //console.log(el.innerText);


  el2.addEventListener("click", function(){

      //console.log(el.value);
      //window.open('itemdetails.html?product_id='+product_id+'&product_name='+product_name+'&product_brand='
      //+product_brand+'&product_cat='+product_cat+'&stock_qty='+stock_qty+'&reorder_value='
      //+reorder_value+'&product_company='+product_company+'&stock_value_in_hand='+stock_value_in_hand+'&unit_price='
      //+unit_price, "_self");
	  
	  addToCart(product_id);
    }
  )
  radioId = radioId+1;

}

// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();


function getAllBasketDetails() {
  //console.clear();
  var m = JSON.parse(localStorage.getItem("CART"));
    
    // //console.log(key.numberOfUnits +' '+ key.product_cat +' '+ key.product_name +' '+ key.product_id);

    // if(localStorage.getItem("CART") == null){

    // }

    window.open('checkout.html', "_self");
  
}



// ADD TO CART
function addToCart(product_id) {

    // check if prodcut already exist in cart
    if (cart.some((item) => item.product_id === product_id)) {
      changeNumberOfUnits("plus", product_id);
      //alert("Product already in cart");
    } else {
      const item = stocks.find((stock) => stock.product_id === product_id);
      cart.push({
        ...item,
        numberOfUnits: 1,
      });
      
    }

	updateCart();

}

//Update Cart
function updateCart(){
  renderCartItems();
  renderSubtotal();

   // save cart to local storage
   localStorage.setItem("CART", JSON.stringify(cart));
}

function clearBasket(){
               
  localStorage.clear();
  cart = [];
  document.querySelector(".cartitems").innerHTML = "";
  document.querySelector(".subtotalButtom").innerHTML = 'Sub Total(0 Items): &#8358;0.00';
  document.querySelector(".subtotalTop").innerHTML = 'Sub Total(0 Items): &#8358;0.00';
  document.querySelector(".totalInBasket").innerHTML = '0';
  //window.location = window.location;
  clearAndCheckOutEl.removeChild(document.querySelector(".checkOut"));

}


// calculate and render subtotal
function renderSubtotal() {
  let totalPrice = 0,totalItems = 0;
  cart.forEach((item) => {
    totalPrice += item.unit_price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subtotalTopEl.innerHTML = `Sub Total(${totalItems} Items): \u20A6${totalPrice.toFixed(2)}`;
  subtotalButtomEl.innerHTML = `Sub Total(${totalItems} Items): \u20A6${totalPrice.toFixed(2)}`;
  totalInBasketEl.innerHTML = totalItems;
}


function renderClearBasket(){
  
  clearAndCheckOutEl.innerHTML = `<a class="btn btn-success btn-md shadow cb"><i class="bi bi-trash me-2"></i>Clear Basket</a>`; // clear basket element
    
 ///// Done
      



       let btn_btn_success_btn_md_shadow_CheckoutA = document.createElement('a');
       btn_btn_success_btn_md_shadow_CheckoutA.classList.add ('checkOut','btn', 'btn-success', 'btn-md', 'shadow');

       let bi_bi_cart_me2ltalics = document.createElement('i');
       bi_bi_cart_me2ltalics.classList.add ('bi','bi-cart','me-2');
       btn_btn_success_btn_md_shadow_CheckoutA.appendChild(bi_bi_cart_me2ltalics);

       let checkOutText = document.createTextNode("Check Out");
       btn_btn_success_btn_md_shadow_CheckoutA.appendChild(checkOutText);



       document.querySelector(".cb").onclick = function() { clearBasket(); };
       //btn_btn_success_btn_md_shadow_ClearA.onclick = function() { clearBasket(); };
       btn_btn_success_btn_md_shadow_CheckoutA.onclick = function() { getAllBasketDetails(); };


       //clearAndCheckOutEl.appendChild(btn_btn_success_btn_md_shadow_ClearA);
       clearAndCheckOutEl.appendChild(document.createTextNode(" "));

       if(cart.length >= 1){
        clearAndCheckOutEl.appendChild(btn_btn_success_btn_md_shadow_CheckoutA);
       }
   
       
 
}


//Render Cart Items
function renderCartItems(){
  
 cartItemsEl.innerHTML = ""; // clear cart element
  cart.forEach((item) => {
   
///// Done
      let bg_white_shadow_smDiv = document.createElement('div');
      bg_white_shadow_smDiv.classList.add ('bg-white', 'shadow-sm', 'my-3', 'p-3');
      

      let card_od_cardDiv  = document.createElement('div');
      card_od_cardDiv.classList.add ('card', 'od-card', 'border-0');


      let d_flex_bag_itemDiv  = document.createElement('div');
      d_flex_bag_itemDiv.classList.add ('d-flex', 'bag-item');


      let bag_item_right_w_100Div  = document.createElement('div');
      bag_item_right_w_100Div.classList.add ('bag-item-right', 'w-100');


      let card_body_pe_0_py_0Div  = document.createElement('div');
      card_body_pe_0_py_0Div.classList.add ('card-body', 'pe-0', 'py-0');


      let badge_bg_successSpan  = document.createElement('span');
      badge_bg_successSpan.classList.add ('badge', 'bg-danger');
      badge_bg_successSpan.setAttribute("role", "button");

      let bi_bi_trashltalics = document.createElement('i');
	    bi_bi_trashltalics.classList.add ('bi','bi-trash');
      badge_bg_successSpan.appendChild(bi_bi_trashltalics);
      
      let removeText = document.createTextNode("Remove");
      badge_bg_successSpan.appendChild(removeText);

      badge_bg_successSpan.onclick = function() { removeItemFromCart(item.product_id); };


      card_body_pe_0_py_0Div.appendChild(badge_bg_successSpan);


      let card_text_mb_0_mt_1P = document.createElement('p');
      card_text_mb_0_mt_1P.classList.add ('card-text', 'mb-0', 'mt-1', 'text-black');

      let normalH6 = document.createElement('h6');
      let h6Text = document.createTextNode(item.product_name);
      normalH6.appendChild(h6Text);

      card_text_mb_0_mt_1P.appendChild(normalH6);
      card_body_pe_0_py_0Div.appendChild(card_text_mb_0_mt_1P);


      let text_mutedSmall = document.createElement('small');
      text_mutedSmall.classList.add ('text-muted');


      let bi_bi_shop_me_1ltalics = document.createElement('i');
	    bi_bi_shop_me_1ltalics.classList.add ('bi','bi-shop','me-1');
      text_mutedSmall.appendChild(bi_bi_shop_me_1ltalics);

      let unitPriceText = document.createTextNode("Unit Price");
      text_mutedSmall.appendChild(unitPriceText);

      card_body_pe_0_py_0Div.appendChild(text_mutedSmall);

      let card_title_mt_2H4 = document.createElement('h4');
      card_title_mt_2H4.classList.add ('card-title','mt-2','text-black','fw-bold');

      let unitPriceValueText = document.createTextNode("\u20A6"+item.unit_price);
      card_title_mt_2H4.appendChild(unitPriceValueText);
      card_body_pe_0_py_0Div.appendChild(card_title_mt_2H4);

      let d_flex_align_items_center_Div  = document.createElement('div');
      d_flex_align_items_center_Div.classList.add ('d-flex', 'align-items-center', 'justify-content-between', 'gap-3');

      let quantity_btn_Div  = document.createElement('div');
      quantity_btn_Div.classList.add ('quantity-btn');

      let text_muted_small_mb_1_Div  = document.createElement('div');
      text_muted_small_mb_1_Div.classList.add ('text-muted','small','mb-1');

      let quantityText = document.createTextNode("Quantity");
      text_muted_small_mb_1_Div.appendChild(quantityText);

      quantity_btn_Div.appendChild(text_muted_small_mb_1_Div);


      let input_group_input_group_smDiv  = document.createElement('div');
      input_group_input_group_smDiv.classList.add ('input-group','input-group-sm','border','rounded','overflow-hiddem');

//Still working here


      let btn_btn_light_text_success_MinusDiv  = document.createElement('div');
      btn_btn_light_text_success_MinusDiv.classList.add ('btn','btn-light','text-success','minus','border-0','bg-white');

      //btn_btn_light_text_success_MinusDiv.setAttribute('onclick', "showMore('io');");

      //Decrease Quantity Event
      btn_btn_light_text_success_MinusDiv.onclick = function() { changeNumberOfUnits('minus', item.product_id); };
 


      let bi_bi_dashltalics = document.createElement('i');
	    bi_bi_dashltalics.classList.add ('bi','bi-dash');
      btn_btn_light_text_success_MinusDiv.appendChild(bi_bi_dashltalics);


      input_group_input_group_smDiv.appendChild(btn_btn_light_text_success_MinusDiv);


//Something to be here
//text-center box border-0
      let form_control_text_center_box_border_0Div  = document.createElement('div');
      form_control_text_center_box_border_0Div.classList.add ('form-control','text-center','box','border-0');

      let numberOfUnitsText = document.createTextNode(item.numberOfUnits);
      form_control_text_center_box_border_0Div.appendChild(numberOfUnitsText);

      input_group_input_group_smDiv.appendChild(form_control_text_center_box_border_0Div);



      let btn_btn_light_text_success_PlusDiv  = document.createElement('div');
      btn_btn_light_text_success_PlusDiv.classList.add ('btn','btn-light','text-success','plus','border-0','bg-white');

      //Increase Quantity Event
      btn_btn_light_text_success_PlusDiv.onclick = function() { changeNumberOfUnits('plus', item.product_id); };


      let bi_bi_plusltalics = document.createElement('i');
	    bi_bi_plusltalics.classList.add ('bi','bi-plus');
      btn_btn_light_text_success_PlusDiv.appendChild(bi_bi_plusltalics);




      input_group_input_group_smDiv.appendChild(btn_btn_light_text_success_PlusDiv);


//Still working here
      quantity_btn_Div.appendChild(input_group_input_group_smDiv);

      d_flex_align_items_center_Div.appendChild(quantity_btn_Div);

      card_body_pe_0_py_0Div.appendChild(d_flex_align_items_center_Div);

      bag_item_right_w_100Div.appendChild(card_body_pe_0_py_0Div);

      d_flex_bag_itemDiv.appendChild(bag_item_right_w_100Div);

      card_od_cardDiv.appendChild(d_flex_bag_itemDiv);

      bg_white_shadow_smDiv.appendChild(card_od_cardDiv);

      cartItemsEl.appendChild(bg_white_shadow_smDiv);

///// Done
//document.querySelector('.minusBtn').addEventListener('click', changeNumberOfUnits("minus", item.product_id));
  }); 
  renderClearBasket();
}


// remove item from cart
function removeItemFromCart(product_id) {
  cart = cart.filter((item) => item.product_id !== product_id);

  updateCart();
}

// change number of units for an item
function changeNumberOfUnits(action, product_id) {
  //console.log(product_id);
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.product_id === product_id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.stock_qty) {
        numberOfUnits++;
        
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

 updateCart();
}







