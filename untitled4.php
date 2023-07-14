<!DOCTYPE html>
<html>
<body>

<?php
$str = "Who's Peter Griffin's mother?";
echo $str . " This is not safe in a database query.<br>";
echo addslashes($str) . " This is safe in a database query.<br>";

echo str_replace("'", "", $str);
?> 


<div class="bg-white shadow-sm my-3 p-3">
    <div class="card od-card border-0">
       <div class="d-flex bag-item">
          <div class="bag-item-right w-100">
             <div class="card-body pe-0 py-0">
                <p class="card-text mb-0 mt-1 text-black"><h6>${item.product_name}</h6></p>
                
                <small class="text-muted"><i class="bi bi-shop me-1"></i> Unit Price</small>
                
                <h4 class="card-title mt-2 text-black fw-bold">&#8358;${item.unit_price}</h4>
                
                /////////////////////////////////
                <div class="d-flex align-items-center justify-content-between gap-3">
                   
                   <div class="quantity-btn">
                   
                      <div class="text-muted small mb-1">Quantity</div>
                      
                      <div class="input-group input-group-sm border rounded overflow-hiddem">
                      
                         <div class="btn btn-light text-success minus border-0 bg-white" onclick = "changeNumberOfUnits('minus',${item.product_id})"><i class="bi bi-dash"></i></div>
                         <input type="text" class="form-control text-center box border-0" value="${item.numberOfUnits}" placeholder aria-label="Example text with button addon">
                         <div class="btn btn-light text-success plus border-0 bg-white" onclick = "changeNumberOfUnits('plus',${item.product_id})"><i class="bi bi-plus"></i></div>
                      </div>
                      
                   </div>
                   
                   
                </div>
                
                /////////////////////////////////////////////
                
             </div>
          </div>
       </div>
    </div>
 </div>

</body>
</html>
