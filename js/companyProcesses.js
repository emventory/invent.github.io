  
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


  function writeCompanyData(companyname,companyphone,companyemail,companyaddress,companydescr) {

        const dates = new Date();
        var dateToString = dates.toString()
        var compid = md5(dateToString);
        compid = compid.substr(0, 10);
        //var stock_value = qtysupplied*supplyprice;


    set(ref(db, 'company/' + companyname), {
        comp_id:compid,
        comp_name:companyname,
        comp_phone:companyphone,
        comp_email:companyemail,
        comp_address:companyaddress,
        comp_description:companydescr,
        status:1
    }).then(()=>{
        alert("Company Added Successfully");
    }).catch(()=>{
        alert("Error: Company Not Successfully Added");
    });
  }

  var saveBtn  = document.getElementById("saveButton");


  saveBtn.addEventListener('click', ()=>{ 
    
  var companyname  = document.getElementById("companyname").value;
  var companyphone  = document.getElementById("companyphone").value;
  var companyemail  = document.getElementById("companyemail").value;
  var companyaddress  = document.getElementById("companyaddress").value;
  var companydescr  = document.getElementById("companydescr").value;

  if(companyname == ""){
    alert("Error: Please Insert Company Name");
  }
  else if(companyphone == ""){
    alert("Error: Please Insert Company Phone");
  }
  else if(companyemail == ""){
    alert("Error: Please Insert Company Email");
  }
  else if(companyaddress == ""){
    alert("Error: Please Insert Company Address");
  }
  else if(companydescr == ""){
    alert("Error: Please Insert Company Description");
  }
  else{

    const que = query(ref(db,'company'),orderByChild('comp_name'),equalTo(companyname));

    // console.log(que);

    get(que).then((snapshot) => {
      if (snapshot.exists()) {

        alert("Error: Company Already Exists In Record");

      //console.log(snapshot.val().name);
      } else {
        
        writeCompanyData(companyname,companyphone,companyemail,companyaddress,companydescr);
            
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



