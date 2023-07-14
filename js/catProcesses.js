  
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


  function writeCatData(catname,catdescr) {

        const dates = new Date();
        var dateToString = dates.toString()
        var catid = md5(dateToString);
        catid = catid.substr(0, 10);
        //var stock_value = qtysupplied*supplyprice;


    set(ref(db, 'categories/' + catname), {
        cat_id:catid,
        cat_name:catname,
        cat_desc:catdescr,
        status:1
    }).then(()=>{
        alert("Category Added Successfully");
    }).catch(()=>{
        alert("Error: Category Not Successfully Added");
    });
  }

  var saveBtn  = document.getElementById("saveButton");


  saveBtn.addEventListener('click', ()=>{ 
    
  var catname  = document.getElementById("catname").value;
  var catdescr  = document.getElementById("catdescr").value;

  if(catname == ""){
    alert("Error: Please Insert Category Name");
  }
  else if(catdescr == ""){
    alert("Error: Please Insert Category Description");
  }
  else{

    const que = query(ref(db,'categories'),orderByChild('cat_name'),equalTo(catname));

    // console.log(que);

    get(que).then((snapshot) => {
      if (snapshot.exists()) {

        alert("Error: Category Already Exists In Record");

      //console.log(snapshot.val().name);
      } else {
        
        writeCatData(catname,catdescr);
            
      }
    }).catch((error) => {
      console.error(error);
    });
 
  }

    

});
  


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



