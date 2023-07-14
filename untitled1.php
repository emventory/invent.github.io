<script>
	  
        	//let stocklist = document.getElementById('stocklist');
			
			let sellingbox_id = document.getElementById('sellingbox-id');
			
			
			let homeproductdiv = document.createElement('div');
			//stocklist.id = 'content';
			homeproductdiv.className = 'card border shadow-sm rounded-3';
			
			let image = document.createElement("img");
			image.src = "img/listing/1.jpg";
			image.className = 'card-img-top rounded-3 p-3';
			
			homeproductdiv.appendChild(image);
			
			let card_body_top = document.createElement('div');
			card_body_top.className = 'class="card-body p-2 border-top';
			
			
			let paragraph = document.createElement('p');
			paragraph.className = 'card-text m-0 d-flex align-items-center';
			
			let productName = document.createTextNode('Hero Beer');
			paragraph.appendChild(productName);
			
			let list_bi_Icon = document.createElement('li');
			list_bi_Icon.className = 'bi bi-megaphone ms-auto';
			
			paragraph.appendChild(list_bi_Icon);
			
			
			
			
			card_body_top.appendChild(paragraph);
			
			
			
			
			
			homeproductdiv.appendChild(card_body_top);
			
			
			

			// create a new heading and add it to the div
			//let h2 = document.createElement('h2');
			//h2.textContent = 'Add h2 element to the div';
			sellingbox_id.appendChild(homeproductdiv);

			// add div to the document
			//document.body.appendChild(div);
    </script>