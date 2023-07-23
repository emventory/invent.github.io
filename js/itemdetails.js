
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
  import { getDatabase, set, ref ,push, child, onValue,query,orderByChild,equalTo,get,update} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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
  
  // Get a reference to the database service
  const db = getDatabase();

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  var stdNo = 0;
  var salesTBody = document.getElementById("salesTBody");
  var to = 0;
  function AddItemToTable(productsid,productsname){
      let trow = document.createElement("tr");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
    
      const Query = query(ref(db,"sales"), orderByChild("product_id"),equalTo(productsid));

      get(Query)
      .then((snapshot) =>{
          //var sales = [];
  var sumcount = 0;
          snapshot.forEach(childSnapshot => {
            
            sumcount += childSnapshot.val().product_qty;

            if(sumcount > 0){
                td1.innerHTML = productsname;
                td2.innerHTML = sumcount;
                trow.appendChild(td1);
                trow.appendChild(td2);
                
            }
            
          });
          //AddAllItemsToTable(sales);
          to+=sumcount;
              console.log(to); 
              document.getElementById("totalSales").innerHTML = "TOTAL SALES TODAY = " +to+" ITEMS"; 
      });

      salesTBody.appendChild(trow);

  }

  function AddAllItemsToTable(theStocks){
    //theStocks.reverse();
      //stdNo = 0;
      salesTBody.innerHTML = "";

      theStocks.forEach(element => {
          AddItemToTable(element.product_id,element.product_name);
      });
  }

  
  function GetAllDataOnce(){

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
      
    today = yyyy + '-' + mm + '-' + dd;
    console.log(today);
    const status = 1;
    const Query = query(ref(db,"stock"), orderByChild("status"),equalTo(status));

    get(Query)
    .then((snapshot) =>{
        var stock = [];

        snapshot.forEach(childSnapshot => {
          stock.push(childSnapshot.val());
        });
        AddAllItemsToTable(stock);
    });
    
}

document.getElementById('restock').addEventListener('click', (e)=>{

  if (window.confirm('Are You Sure To Restock?')) {


        var restockValue = document.getElementById('restockValue').value;

        var oldstockH = document.getElementById('oldstockH').value;

        var productId = document.getElementById('pIdH').value;

        var productName = document.getElementById("pNameH").value;

        var newStockValue = Number(restockValue) + Number(oldstockH);


        update(ref(db,"stock/"+productName), {

          stock_qty:newStockValue,


        }).then(()=>{
          alert("Restock Successfully Done!");

          window.open('stock.html', "_self");

        }).catch((error)=>{
          alert("Restock Not Successfully Done!");
        });




        console.log(restockValue);
        console.log(oldstockH);
        console.log(productId);



  } else {
    window.open("", "_self");
  }



});

//window.onload = GetAllDataOnce;

  