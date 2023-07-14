
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
  import { getDatabase, set, ref ,push, child, onValue} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
  apiKey: "AIzaSyB1g4YVwK7_eMwB3M6KeYBbDeu6miOQMfY",
  authDomain: "tohtmltable.firebaseapp.com",
  databaseURL: "https://tohtmltable-default-rtdb.firebaseio.com",
  projectId: "tohtmltable",
  storageBucket: "tohtmltable.appspot.com",
  messagingSenderId: "837979969634",
  appId: "1:837979969634:web:46b236a150d71330b8593b"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  // Get a reference to the database service
  const database = getDatabase(app);

  // write data
 /* submit.addEventListener('click',(e) => {
    var firstName = document.getElementById('first-name').value;  
    var lastName = document.getElementById('last-name').value;  
    var email = document.getElementById('email').value;  

    const userId = push(child(ref(database), 'users')).key;
   
    set(ref(database, 'users/' + userId), {
    firstName: firstName,
    lastName: lastName,
    email : email
   });
   alert('saved');
  });*/

  // read data
  //getData.addEventListener('click',(e) => {

    //var mainContainer = document.getElementById("stocklist");
	
	let sellingbox_id = document.createElement('div');
			sellingbox_id.classList.add ('single-item', 'selling-box');
			sellingbox_id.id = 'sellingbox_id'; 
			
	
	let h6 = document.createElement('h6');
			h6.classList.add ('mb-3', 'text-black', 'fw-bold');
			
			let itemsInStock = document.createTextNode('Items In Stock');
			h6.appendChild(itemsInStock);
			
			
			let bglight2Div = document.createElement('div');
			bglight2Div.classList.add ('p-3', 'bg-light2');
			
			bglight2Div.appendChild(h6);
			
			bglight2Div.appendChild(sellingbox_id);
			
			document.body.insertBefore(bglight2Div, document.getElementById('buttomNav'));
	  
		
    const dbRef = ref(database, 'users/');

    onValue(dbRef, (snapshot) => { 
		
		//mainContainer.innerHTML = "";
       // $('#dataTbl td').remove();
    //var rowNum = 0;
      snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
	  
	  
	  		
			
			let istdiv = document.createElement('div');
			
			istdiv.classList.add ('home-product');
			
			let homeproductdiv = document.createElement('div');
			//stocklist.id = 'content';
			homeproductdiv.classList.add ('card', 'border', 'shadow-sm', 'rounded-3');
			
			let image = document.createElement("img");
			image.src = "img/listing/1.jpg";
			image.classList.add ('card-img-top', 'rounded-3', 'p-3');
			
			
			
			let card_body_top = document.createElement('div');
			card_body_top.classList.add ('card-body', 'p-2', 'border-top');
			
			
			let paragraph = document.createElement('p');
			paragraph.classList.add ('card-text', 'm-0', 'd-flex', 'align-items-center');
			
			let productName = document.createTextNode(childData.firstName);
			paragraph.appendChild(productName);
			
			let list_bi_Icon = document.createElement('i');
			list_bi_Icon.classList.add ('bi', 'bi-megaphone', 'ms-auto');
			
			paragraph.appendChild(list_bi_Icon);
			
			
			card_body_top.appendChild(paragraph);
			
			
			
			let card_body_top2 = document.createElement('div');
			card_body_top2.classList.add ('card-body', 'p-2', 'border-top');
			
			
			let paragraph2 = document.createElement('p');
			paragraph2.classList.add ('card-text', 'm-0', 'd-flex', 'align-items-center');
			
			let productName2 = document.createTextNode(childData.lastName);
			paragraph2.appendChild(productName2);
			
			
			card_body_top2.appendChild(paragraph2);
			
			homeproductdiv.append(image,card_body_top,card_body_top2);
			
			
			istdiv.appendChild(homeproductdiv);

			// create a new heading and add it to the div
			//let h2 = document.createElement('h2');
			//h2.textContent = 'Add h2 element to the div';
			//sellingbox_id.appendChild(istdiv);
			
			 $(istdiv).appendTo('#sellingbox_id');
			
			
			
			
			
	  
	  
	  
	  
	  
	  
      // ...
      //rowNum += 1; 
      //var div = "<tr><td>" + rowNum + "</td><td>" + childData.firstName + "</td><td>" + childData.lastName + "</td><td>" + childData.email + "</td></tr>"
	  
	  
	 /* var singleDiv = '
	  		
				<div class="home-product">
              	 <div class="card border shadow-sm rounded-3">
                  <img src="img/listing/1.jpg" class="card-img-top rounded-3 p-3" alt="...">
                  <div class="card-body p-2 border-top">
                     <p class="card-text m-0 d-flex align-items-center">Hero Beer <i class="bi bi-megaphone ms-auto"></i></p>
                  </div>
                  <div class="card-body p-2 border-top">
                     <p class="card-text m-0 d-flex align-items-center">In Stock - 65</p>
                  </div>
               </div>
            </div>
	  
	  ';*/
	  
	  
      //$(singleDiv).appendTo('#stocklist');
	  //var div = document.createElement("div");
      //div.innerHTML = 'Name: ' + childData.firstName + ' ' + childData.firstName;
     // mainContainer.appendChild(div);
      
      });
    }
	
	
    //, {
    //   onlyOnce: true
    //}
    );
	
	


  //});
