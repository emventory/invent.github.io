// JavaScript Document
// Your web app's Firebase configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js'
import { getDatabase, ref, push, onValue, remove, set} from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js'

const appSettings = {
	databaseURL : "https://testcrud-22792-default-rtdb.firebaseio.com/"
	}
const app = initializeApp(appSettings);
//console.log(app);

const database = getDatabase(app);
//const shoppingListInDb = ref(database,"shoppingList");


const saveElement = document.getElementById("saveElement");

const getUsername = document.getElementById("username");


saveElement.addEventListener("click", function(){

	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	var username = document.getElementById('username').value;
	var commentsomething = document.getElementById('commentsomething').value;
	var favfood = document.getElementById('favfood').value;
	
	set(ref(database, 'users/' + username),{
	
		email : email,
		password : password,
		username : username,
		commentsomething : commentsomething,
		favfood : favfood
	
	});
	
	alert("Record Saved");

}
);

//const message = document.querySelector('#message');


getUsername.addEventListener("input", function(){

	var userRef = ref(database, 'users/' + getUsername.value);
	
	onValue(userRef, function(snapshot){
		
		var data = snapshot.val();
		alert(data.email);
								 
	})
	
}
);


function get(){
	

}

function update(){
	

}

function deletes(){
	

}