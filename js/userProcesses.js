  
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


  function  writeUserData(surname,middlename,lastname,email,phone,gender,selectstate,lga,userlevel,passwords,resaddress) {

        const dates = new Date();
        var dateToString = dates.toString()
        var uid = md5(dateToString);
        uid = uid.substr(0, 10);

        var loginkey = md5(email+passwords);
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


    set(ref(db, 'users/' + surname+' '+middlename+' '+lastname), {
        u_id:uid,
        u_surname:surname,
        u_middlename:middlename,
        u_lastname:lastname,
        u_email:email,
        u_phone:phone,
        u_gender:gender,
        u_state:selectstate,
        u_lga:lga,
        u_level:userlevel,
        u_password:passwords,
        u_address:resaddress,
        loginkey:loginkey,
        u_regdate:todayDate(),
        u_status:1
    }).then(()=>{
        alert("User Account Created Successfully");
    }).catch(()=>{
        alert("Error: User Not Successfully Added");
    });
  }

  var saveBtn  = document.getElementById("saveButton");


  saveBtn.addEventListener('click', ()=>{ 
    
  var surname  = document.getElementById("surname").value;
  var middlename  = document.getElementById("middlename").value;
  var lastname  = document.getElementById("lastname").value;
  var email  = document.getElementById("email").value;
  var phone  = document.getElementById("phone").value;
  var gender  = document.getElementById("gender").value;
  var selectstate  = document.getElementById("selectstate").value;
  var lga  = document.getElementById("lga").value;
  var userlevel  = document.getElementById("userlevel").value;
  var passwords  = document.getElementById("passwords").value;
  var resaddress  = document.getElementById("resaddress").value;

  if(surname == ""){
    alert("Error: Please Insert Surname");
  }
  else if(middlename == ""){
    alert("Error: Please Insert Middle Name");
  }
  else if(lastname == ""){
    alert("Error: Please Insert Last Name");
  }
  else if(email == ""){
    alert("Error: Please Insert Email Address");
  }
  else if(phone == ""){
    alert("Error: Please Insert Phone Number");
  }
  else if(gender == ""){
    alert("Error: Please Select Gender");
  }
  else if(selectstate == ""){
    alert("Error: Please Select State Of Origin");
  }
  else if(lga == ""){
    alert("Error: Please Select L.G.A");
  }
  else if(userlevel == ""){
    alert("Error: Please Select User Level");
  }
  else if(passwords == ""){
    alert("Error: Please Insert Password");
  }
  else if(resaddress == ""){
    alert("Error: Please Insert Residential Address");
  }
  else{

    const que = query(ref(db,'users'),orderByChild('u_email'),equalTo(email));

    // console.log(que);

    get(que).then((snapshot) => {
      if (snapshot.exists()) {

        alert("Error: User Already Exists In Record");

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

        writeUserData(surname,middlename,lastname,email,phone,gender,selectstate,lga,userlevel,passwords,resaddress);
            
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



