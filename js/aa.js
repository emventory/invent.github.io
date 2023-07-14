
function getAllBasketDetails() {
    //console.clear();
    var m = JSON.parse(localStorage.getItem("CART"));
     m.forEach(function(key){
        
        window.open('aa.html?numberOfUnits='+key.numberOfUnits+'&product_id='+key.product_id, "_self");
        console.log(key.numberOfUnits +' '+ key.product_cat +' '+ key.product_name +' '+ key.product_id);
     })
  }

  