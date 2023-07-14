  
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
  import { getDatabase, set, get, ref ,query, child, onValue, limitToFirst, orderByChild,equalTo,serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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


  function  writeUserData(repname,repphone,repemail,repgender,resaddress) {

        const dates = new Date();
        var dateToString = dates.toString()
        var repid = md5(dateToString);
        repid = repid.substr(0, 10);

        //var loginkey = md5(email+passwords);
        //var stock_value = qtysupplied*supplyprice;

        const todayDate = () => {
          let d = new Date();
          //d.setDate(d.getDate() + 7);
          d.setDate(d.getDate());
          console.log(d);
          return d.toISOString().split('T')[0];
        };
        console.log(todayDate());
        todayDate(); // 2018-10-17 (if current date is 2018-10-18)


    set(ref(db, 'salesrep/' + repname), {
        rep_id:repid,
        rep_name:repname,
        rep_phone:repphone,
        rep_email:repemail,
        rep_gender:repgender,
        rep_address:resaddress,
        date_registered:todayDate(),
        status:1
    }).then(()=>{
        alert("Rep Account Created Successfully");
    }).catch(()=>{
        alert("Error: Rep Not Successfully Added");
    });
  }

  var saveBtn  = document.getElementById("saveButton");


  saveBtn.addEventListener('click', ()=>{ 
    
  var repname  = document.getElementById("repname").value;
  var repphone  = document.getElementById("repphone").value;
  var repemail  = document.getElementById("repemail").value;
  var repgender  = document.getElementById("repgender").value;
  var resaddress  = document.getElementById("resaddress").value;

  if(repname == ""){
    alert("Error: Please Insert Rep Full Name");
  }
  else if(repphone == ""){
    alert("Error: Please Insert Rep Phone Number");
  }
  else if(repemail == ""){
    alert("Error: Please Insert Rep Email");
  }
  else if(repgender == ""){
    alert("Error: Please Select Rep Gender");
  }
  else if(resaddress == ""){
    alert("Error: Please Insert Residential Address");
  }
  else{

    const que = query(ref(db,'salesrep'),orderByChild('rep_email'),equalTo(repemail));

    // console.log(que);

    get(que).then((snapshot) => {
      if (snapshot.exists()) {

        alert("Error: Rep Already Exists In Record");

      //console.log(snapshot.val().name);
      } else {
        

  //       var surname  = document.getElementById("surname").value;
  // var middlename  = document.getElementById("middlename").value;
  // var lastname  = document.getElementById("lastname").value;
  // var email  = document.getElementById("email").value;
  // var phone  = document.getElementById("phone").value;
  // var gender  = document.getElementById("gender").value;
  // var selectstate  = document.getElementById("selectstate").value;
  // var lga  = document.getElementById("lga").value;
  // var userlevel  = document.getElementById("userlevel").value;
  // var passwords  = document.getElementById("passwords").value;
  // var resaddress  = document.getElementById("resaddress").value;

        writeUserData(repname,repphone,repemail,repgender,resaddress);
            
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



