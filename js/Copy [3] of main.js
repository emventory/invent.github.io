
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
	  
		let osahan_listing = document.getElementById('osahan_listing');
		let bobo = document.getElementById('bobo');
			
    const dbRef = ref(database, 'users/');

    onValue(dbRef, (snapshot) => { 
		
		//mainContainer.innerHTML = "";
       // $('#dataTbl td').remove();
    //var rowNum = 0;
      snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
	  
	  
	  	
			let text_dark_col_6 = document.createElement('div');
			text_dark_col_6.classList.add ('text-dark', 'col-6', 'px-0', 'border-bottom', 'border-end', 'position-relative');

      let list_item_gird = document.createElement('div');
      list_item_gird.classList.add('list_item_gird', 'm-0', 'bg-white', 'listing-item');

      let badge_bg_success_Span = document.createElement('span');
      badge_bg_success_Span.classList.add('badge', 'bg-success', 'm-3', 'position-absolute');
      let spanText = document.createTextNode('20% OFF');
      badge_bg_success_Span.appendChild(spanText);

      list_item_gird.appendChild(badge_bg_success_Span);


      let list_item_img = document.createElement('div');
			list_item_img.classList.add ('list-item-img', 'p-4');

      let image = document.createElement("img");
			image.src = "img/listing/1.jpg";
			image.classList.add ('img-fluid', 'p-3');

      list_item_img.appendChild(image);
      list_item_gird.appendChild(list_item_img);


      let tic_div = document.createElement("div");
      tic_div.classList.add ('tic-div', 'px-3', 'pb-3');

      let mb_1Para = document.createElement("p");
      mb_1Para.classList.add ('mb-1', 'text-black');

      let paraText = document.createTextNode(childData.firstName);
      mb_1Para.appendChild(paraText);
      tic_div.appendChild(mb_1Para);


      let card_titleH6 = document.createElement("h6");
      card_titleH6.classList.add ('card-title', 'mt-2', 'mb-3', 'text-success', 'fw-bold');

      let card_titleH6Text = document.createTextNode(childData.lastName.toUpperCase());
      card_titleH6.appendChild(card_titleH6Text);
      tic_div.appendChild(card_titleH6);


      let d_flex_div = document.createElement("div");
      d_flex_div.classList.add ('d-flex', 'align-items-center', 'justify-content-between', 'gap-1');

      let size_btn_div = document.createElement("div");
      size_btn_div.classList.add ('size-btn');


      let input_group_div = document.createElement("div");
      input_group_div.classList.add ('input-group');

      let btn_btn_lighta = document.createElement("a");
      btn_btn_lighta.classList.add ('btn','btn-light','btn-sm','border','d-flex');
      btn_btn_lighta.setAttribute('data-bs-toggle', 'modal');
      btn_btn_lighta.setAttribute('data-bs-target', '#exampleModala');

      let anchorText = document.createTextNode('800g');
      btn_btn_lighta.appendChild(anchorText);


      let anchor_span = document.createElement("span");
      let span_italics = document.createElement("i");
      span_italics.classList.add ('bi','bi-chevron-down','small','ms-2');

      anchor_span.appendChild(span_italics);
      btn_btn_lighta.appendChild(anchor_span);

      input_group_div.appendChild(btn_btn_lighta);

      size_btn_div.appendChild(input_group_div);

      d_flex_div.appendChild(size_btn_div);


      let no_class_div = document.createElement("div");

      let btn_btn_lightAdd = document.createElement("a");
      btn_btn_lightAdd.classList.add ('btn','btn-success','btn-sm','border-0','d-flex');

      let a_italics = document.createElement("i");
      a_italics.classList.add ('bi','bi-plus','me-2');


      let anchorItalicsText = document.createTextNode('ADD');

      btn_btn_lightAdd.appendChild(a_italics);
      btn_btn_lightAdd.appendChild(anchorItalicsText);


      d_flex_div.appendChild(btn_btn_lightAdd);


      tic_div.appendChild(d_flex_div);




      list_item_gird.appendChild(tic_div);
      //let productName = document.createTextNode(childData.firstName);
      //list_item_gird.appendChild(productName);

      

      text_dark_col_6.appendChild(list_item_gird);
      text_dark_col_6.after(bobo);
      osahan_listing.appendChild(text_dark_col_6);
      //			
//			istdiv.classList.add ('home-product');
//			
//			let homeproductdiv = document.createElement('div');
//			//stocklist.id = 'content';
//			homeproductdiv.classList.add ('card', 'border', 'shadow-sm', 'rounded-3');
//			
//			let image = document.createElement("img");
//			image.src = "img/listing/1.jpg";
//			image.classList.add ('card-img-top', 'rounded-3', 'p-3');
//			
//			homeproductdiv.appendChild(image);
//			
//			let card_body_top = document.createElement('div');
//			card_body_top.classList.add ('card-body', 'p-2', 'border-top');
//			
//			
//			let paragraph = document.createElement('p');
//			paragraph.classList.add ('card-text', 'm-0', 'd-flex', 'align-items-center');
//			
//			let productName = document.createTextNode(childData.firstName);
//			paragraph.appendChild(productName);
//			
//			let list_bi_Icon = document.createElement('i');
//			list_bi_Icon.classList.add ('bi', 'bi-megaphone', 'ms-auto');
//			
//			paragraph.appendChild(list_bi_Icon);
//			
//			
//			card_body_top.appendChild(paragraph);
//			
//			
//			
//			let card_body_top2 = document.createElement('div');
//			card_body_top2.classList.add ('card-body', 'p-2', 'border-top');
//			
//			
//			let paragraph2 = document.createElement('p');
//			paragraph2.classList.add ('card-text', 'm-0', 'd-flex', 'align-items-center');
//			
//			let productName2 = document.createTextNode(childData.lastName);
//			paragraph2.appendChild(productName2);
//			
//			
//			card_body_top2.appendChild(paragraph2);
//			
//			homeproductdiv.append(card_body_top,card_body_top2);
//			//homeproductdiv.append(card_body_top2);
//			
//			
//			istdiv.appendChild(homeproductdiv);
//
//			// create a new heading and add it to the div
//			//let h2 = document.createElement('h2');
//			//h2.textContent = 'Add h2 element to the div';
//			sellingbox_id.appendChild(istdiv);
			
			
			
			//let h6 = document.createElement('h6');
//			h6.classList.add ('mb-3', 'text-black', 'fw-bold');
//			
//			let itemsInStock = document.createTextNode('Items In Stock');
//			h6.appendChild(itemsInStock);
//			
//			
//			let bglight2Div = document.createElement('div');
//			bglight2Div.classList.add ('p-3', 'bg-light2');
//			
//			bglight2Div.appendChild(h6);
//			bglight2Div.appendChild(sellingbox_id);
			
			//document.body.appendChild(bglight2Div);
	  
	  
	  
	  
	  
	  
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
