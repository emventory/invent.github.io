  
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


  function writeUserData(producttitle,selectcategory,selectcompany,selectcontainer
    ,qtysupplied,supplyprice,productdescr) {

        const dates = new Date();
        var dateToString = dates.toString()
        var productId = md5(dateToString);
        productId = productId.substr(0, 10);
        var stock_value = qtysupplied*supplyprice;


    set(ref(db, 'stock/' + producttitle), {
        product_id:productId,
        product_name:producttitle,
        product_cat:selectcategory,
        product_company:selectcompany,
        product_container:selectcontainer,
        stock_qty:qtysupplied,
        unit_price:supplyprice,
        stock_value_in_hand:stock_value,
        reorder_value:25,
        product_descr:productdescr,
        status:1
    }).then(()=>{
        alert("Item Added Successfully");
    }).catch(()=>{
        alert("Error: Item Added Not Successful");
    });
  }

  var saveBtn  = document.getElementById("saveButton");


  saveBtn.addEventListener('click', ()=>{ 
    
  var producttitle  = document.getElementById("producttitle").value;
  var selectcategory  = document.getElementById("selectcategory").value;
  var selectcompany  = document.getElementById("selectcompany").value;
  var selectcontainer  = document.getElementById("selectcontainer").value;
  var qtysupplied  = document.getElementById("qtysupplied").value;
  var supplyprice  = document.getElementById("supplyprice").value;
  var productdescr  = document.getElementById("productdescr").value;

  if(producttitle == ""){
    alert("Error: Please Insert Product Name");
  }
  else if(selectcategory == ""){
    alert("Error: Please Select Product Category");
  }
  else if(selectcompany == ""){
    alert("Error: Please Select Product Company");
  }
  else if(selectcontainer == ""){
    alert("Error: Please Select Product Container Type");
  }
  else if(qtysupplied == ""){
    alert("Error: Please Insert Quantity Supplied");
  }
  else if(supplyprice == ""){
    alert("Error: Please Insert Supply Price");
  }
  else if(productdescr == ""){
    alert("Error: Please Insert Product Description");
  }
  else{

    const que = query(ref(db,'stock'),orderByChild('product_name'),equalTo(producttitle));

    // console.log(que);

    get(que).then((snapshot) => {
      if (snapshot.exists()) {

        alert("Error: Product Already Exists");

      //console.log(snapshot.val().name);
      } else {
        
            writeUserData(producttitle,selectcategory,selectcompany,selectcontainer,qtysupplied,supplyprice,productdescr);
            
      }
    }).catch((error) => {
      console.error(error);
    });
 
  }

    

});
  

  ///////////////////Starts Get Category//////////////////////////////////////////////
  function getCategory(){

      var status = 1;
      const que = query(ref(db,'categories'),orderByChild('status'),equalTo(status));

      get(que).then((snapshot) => {
        if (snapshot.exists()) {

          var category = [];

          snapshot.forEach(function (childSnapshot) {

            category.push(childSnapshot.val());

        });

        addCategoryToSelect(category);

        //console.log(snapshot.val().name);
        } else {
          alert("Error: No Item(s) already added to the inventory");
        }
      }).catch((error) => {
        console.error(error);
      });
	
							
}

window.onload = getCategory();

function  addCategoryToSelect(categories){
    categories.forEach(element => {

    sendToCategorySelect(element.cat_id, element.cat_name, element.cat_desc);

  });
}


var selectcategory= document.getElementById('selectcategory');

var radioId = 1;

function sendToCategorySelect(cat_id, cat_name, cat_desc){

var option = document.createElement("option");
option.value = cat_name;
option.text = cat_name;
selectcategory.appendChild(option);

}

////////////////////////////////////Ends Get Category//////////////////////////

///////////////////Starts Get Brand//////////////////////////////////////////////
  //function getBrand(){

//     var status = 1;
//     const que = query(ref(db,'brand'),orderByChild('status'),equalTo(status));

//     get(que).then((snapshot) => {
//       if (snapshot.exists()) {

//         var brands = [];

//         snapshot.forEach(function (childSnapshot) {

//           brands.push(childSnapshot.val());

//       });

//       addBrandToSelect(brands);

//       //console.log(snapshot.val().name);
//       } else {
//         alert("Error: No Item(s) already added to the inventory");
//       }
//     }).catch((error) => {
//       console.error(error);
//     });
  
                          
// }

// window.onload = getBrand();

// function  addBrandToSelect(brands){
//   brands.forEach(element => {

//   sendToBrandSelect(element.brand_id, element.brand_name, element.brand_descr, element.brand_company);

// });
// }


// var selectbrand = document.getElementById('selectbrand');

// var radioId = 1;

// function sendToBrandSelect(brand_id, brand_name, brand_descr, brand_company){

// var option = document.createElement("option");
// option.value = brand_name;
// option.text = brand_name;
// selectbrand.appendChild(option);

// }
////////////////////////////////////Ends Get Brand///////////////////////

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

