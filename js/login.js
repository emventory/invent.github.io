  
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

  const email_field = document.getElementById("email_field");
  const password_field = document.getElementById("password_field");
  const authButtonElememt = document.getElementById("auth_button");
  
  //usersRef.once('value', function(snapshot){
			
	//console.log(oneRef);
//	
//  oneRef.orderByChild("u_lastname").equalTo("Iman").on("child_added", function(data) {
//   console.log("Equal to Lastname: " + data.val().u_state);
//});
// // });
  
  
  authButtonElememt.addEventListener("click", function(){

  	let getEmail = email_field.value;
  	let getPassword = password_field.value;


    if(getEmail == '' || getPassword == ''){

       		alert("Please complete any blank field!");

     		}

    else{

      var loginkey = md5(getEmail+getPassword);

      const que = query(ref(db,'users'),orderByChild('loginkey'),equalTo(loginkey));

      // console.log(que);

      get(que).then((snapshot) => {
        if (snapshot.exists()) {

          snapshot.forEach(function (childSnapshot) {

            var value = childSnapshot.val();

            sessionStorage.setItem("key", loginkey);

            window.open("main.html", "_self");

        });

        //console.log(snapshot.val().name);
        } else {
          alert("Error: Invalid Login Details");
        }
      }).catch((error) => {
        console.error(error);
      });

  }
	
							
}
)