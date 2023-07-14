// JavaScript Document

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js'
import { getDatabase, ref, push, onValue, remove} from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js'

const appSettings = {
	databaseURL : "https://testcrud-22792-default-rtdb.firebaseio.com/"
	}
const app = initializeApp(appSettings);
//console.log(app);

const database = getDatabase(app);
//const shoppingListInDb = ref(database,"shoppingList");


function save(){
	
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	var username = document.getElementById('username').value;
	var commentsomething = document.getElementById('commentsomething').value;
	var favfood = document.getElementById('favfood').value;
	alert("Record Saved");
	database.ref('users/' + username).set({
	
		email : email,
		password : password,
		username : username,
		commentsomething : commentsomething,
		favfood : favfood
	
	});
	
	alert("Record Saved");

}

//function get(){
	

//}

//function update(){
	

//}

//function delete(){
	

//}