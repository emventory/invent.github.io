// JavaScript Document
    


if(sessionStorage.getItem("u_level") == "admin"){
    console.log("You are admin");
    
    
    document.getElementById('navDiv').innerHTML = `
    <nav id="main-nav">
       <ul>
          <li>
             <a href="#" class="bg-success sidebar-user d-flex align-items-center py-4 px-3 border-0 mb-0">
                <img src="img/profile.png" class="img-fluid me-3">
                <div class="text-white">
                   <h6 class="mb-0">eMVentory</h6>
                   <small>emcodinstech@gmail.com</small><br>
                   <span class="f-10 text-white-50">Version 1.00</span>    
                </div>
             </a>
          </li>
          <li>
             <a href="sales.html"><i class="bi bi-bar-chart-line me-2"></i> Sales</a>
          </li>
          <li>
             <a href="stock.html"><i class="bi bi-file-break me-2"></i> Stock Inventory</a>
          </li>
          <li>
             <a href="transactions.html"><i class="bi bi-ui-checks-grid me-2"></i> Transactions</a>
          </li>
          <li>
             <a href="salesreps.html"><i class="bi bi-person-lines-fill me-2"></i> Sales Reps</a>
          </li>
          <li><a href="manage.html"><i class="bi bi-person-bounding-box me-2"></i> Manage</a></li>
          <li><a href="settings.html"><i class="bi bi-gear me-2"></i> Settings</a></li>
          <li><a href="#" onClick="logout()"><i class="bi bi-power me-2"></i> Sign Out</a></li>
       
       </ul>

    
       <ul class="bottom-nav">
          <li class="email">
             <a class="text-success nav-item text-center" href="main.html" tabindex="0" role="menuitem">
                <p class="h5 m-0"><i class="icofont-ui-home text-success"></i></p>
                Home
             </a>
          </li>
          <li class="github">
             <a href="notice.html" class="nav-item text-center" tabindex="0" role="menuitem">
                <p class="h5 m-0"><i class="bi bi-megaphone-fill"></i></p>
                Notice
             </a>
          </li>
          <li class="ko-fi">
             <a href="help.html" class="nav-item text-center" tabindex="0" role="menuitem">
                <p class="h5 m-0"><i class="icofont-support-faq"></i></p>
                Help
             </a>
          </li>
       </ul>
    </nav>
    `;
  }
  else if(sessionStorage.getItem("u_level") == "Basic"){
    console.log("You are basic");
    
    
    document.getElementById('navDiv').innerHTML = `
    <nav id="main-nav">
       <ul>
          <li>
             <a href="#" class="bg-success sidebar-user d-flex align-items-center py-4 px-3 border-0 mb-0">
                <img src="img/profile.png" class="img-fluid me-3">
                <div class="text-white">
                   <h6 class="mb-0">eMVentory</h6>
                   <small>emcodinstech@gmail.com</small><br>
                   <span class="f-10 text-white-50">Version 1.00</span>    
                </div>
             </a>
          </li>
          <li>
             <a href="sales.html"><i class="bi bi-bar-chart-line me-2"></i> Sales</a>
          </li>
          <li>
             <a href="stock.html"><i class="bi bi-file-break me-2"></i> Stock Inventory</a>
          </li>
          <li>
             <a href="transactions.html"><i class="bi bi-ui-checks-grid me-2"></i> Transactions</a>
          </li>
          <li>
             <a href="salesreps.html"><i class="bi bi-person-lines-fill me-2"></i> Sales Reps</a>
          </li>
          <li><a href="#" onClick="logout()"><i class="bi bi-power me-2"></i> Sign Out</a></li>
       
       </ul>

    
       <ul class="bottom-nav">
          <li class="email">
             <a class="text-success nav-item text-center" href="main.html" tabindex="0" role="menuitem">
                <p class="h5 m-0"><i class="icofont-ui-home text-success"></i></p>
                Home
             </a>
          </li>
          <li class="github">
             <a href="notice.html" class="nav-item text-center" tabindex="0" role="menuitem">
                <p class="h5 m-0"><i class="bi bi-megaphone-fill"></i></p>
                Notice
             </a>
          </li>
          <li class="ko-fi">
             <a href="help.html" class="nav-item text-center" tabindex="0" role="menuitem">
                <p class="h5 m-0"><i class="icofont-support-faq"></i></p>
                Help
             </a>
          </li>
       </ul>
    </nav>
    `;
  }