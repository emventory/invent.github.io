
var tbody = document.getElementById("tbody1");
var teid = document.getElementById("tid");

function AddItemToTable(qty,item,price){

      let trow = document.createElement("tr");

      let qtyTd = document.createElement("td");
      qtyTd.classList.add ('quantity', 'small', 'text-center');

      let itemTd = document.createElement("td");
      itemTd.classList.add ('description', 'small', 'text-center');

      let totalTd = document.createElement("td");
      totalTd.classList.add ('price', 'small', 'text-center');

      qtyTd.innerHTML = qty;
      itemTd.innerHTML = item;
      totalTd.innerHTML = price;
      
      trow.appendChild(qtyTd);
      trow.appendChild(itemTd);
      trow.appendChild(totalTd);

      tbody.appendChild(trow);

}
     // Import the functions you need from the SDKs you need
     import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
     import { getDatabase, set, get, ref ,query, child, onValue, limitToFirst, 
         limitToLast, orderByChild,equalTo,update, startAt, endAt, endBefore, startAfter 
     } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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
     // Initialize Firebase
     const app = initializeApp(firebaseConfig);

     const db = getDatabase();

     function AddAllItemsToTable(theItems){
         //TheStudent.reverse();
        // stdNo = 0;
         tbody.innerHTML = "";

         theItems.forEach(element => {
             AddItemToTable(element.product_qty,element.product_id,element.total_amount);
         });
     }

     
     function GetAllDataOnce(){
         const Query = query(ref(db,"sales"), orderByChild("t_id"),equalTo(tid));

         get(Query)
         .then((snapshot) =>{
             var items = [];

             snapshot.forEach(childSnapshot => {
               items.push(childSnapshot.val());
             });
             AddAllItemsToTable(items);
         });
         
     }


     //window.onload = GetAllDataOnce;

