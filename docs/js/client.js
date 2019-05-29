//register///////////
function register(path, success, error) { 
	var xhr = new XMLHttpRequest(); 
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) { 
  	if (success) success(JSON.parse(xhr.responseText)); 
			} else { 
  	if (error) error(xhr); 
			} 
		} 
	}; 
	var remail =	document.getElementById("regemail").value;
	var rfname =	document.getElementById("regfname").value;
	var rlname =	document.getElementById("reglname").value;
	var rpwd =	document.getElementById("regpwd").value;
	var radd =	document.getElementById("regadd").value;
	xhr.open("POST", path, true);
	xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	var inputVal = `{"email" : "${remail}" , "first_name" : "${rfname}","last_name" : "${rlname}" , "password" : "${rpwd}", "address" : "${radd}"}`;
	xhr.send(inputVal);
}



function signup(){
	register("/auth/signup", function(data) {
	window.localStorage.setItem('accessToken', data.data.token);	document.getElementById("regsuccess").innerHTML = "Welcome!! "+data.data.first_name+" registration successful. <br/>Preparing dashboard in 2 sec..."; 
		document.getElementById("regsuccess").style.display = "block";
		document.getElementById("regsuccess").scrollIntoView({block: "center"});
		document.getElementById("regemail").value = "";
		document.getElementById("regfname").value = "";
		document.getElementById("reglname").value = "";
		document.getElementById("regadd").value = "";
		document.getElementById("regpwd").value = "";
		setTimeout("succesregs()", 2000);
	},
	function(xhr) { 
 	var keys = JSON.parse(xhr.responseText);
		document.getElementById("regwarning").innerHTML = "Someone already signup with the email :"+keys.email+" please enter another."; 
		document.getElementById("regwarning").style.display = "block";
		document.getElementById("regwarning").scrollIntoView({block: "center"});
		setTimeout("warnreg()", 3000);
 	console.error(xhr); } );

	return false;
}
function succesregs(){
	document.getElementById("regsuccess").innerHTML = ""; 
	document.getElementById("regsuccess").style.display = "none";
	window.location ="postad.html";
}
function warnreg(){
	document.getElementById("regwarning").innerHTML = ""; 
	document.getElementById("regwarning").style.display = "none";
}










///////////{{{SIGN IN}}}
function signin(path, success, error) { 
	var xhrl = new XMLHttpRequest(); 
	xhrl.onreadystatechange = function() {
		if (xhrl.readyState === XMLHttpRequest.DONE) {
			if (xhrl.status === 200) { 
  	if (success) success(JSON.parse(xhrl.responseText)); 
			} else { 
  	if (error) error(xhrl); 
			} 
		} 
	}; 
		var lusern =	document.getElementById("user").value;
	var lpass =	document.getElementById("pwd").value;
	xhrl.open("POST", path, true);
	xhrl.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	var inputVald = `{"user" : "${lusern}" , "pass" : "${lpass}"}`;
	xhrl.send(inputVald);
}
function login(){
	signin("/auth/signin", function(data) {
		window.localStorage.setItem('accessToken', data.data.token);	document.getElementById("logsuccess").innerHTML = data.message;
		//window.localStorage.getItem('accessToken');
		document.getElementById("logsuccess").style.display = "block";
		document.getElementById("logsuccess").scrollIntoView({block:"center"});

		setTimeout(function(){
			
			//create session///
			if(sessionStorage.student) { student= JSON.parse(sessionStorage.getItem('student')); 
			
			}else{ 
			student=[]; 
			
			} student.push(data); sessionStorage.setItem('student', JSON.stringify(student)); 
//////////////

 	window.location ="postad.html";
		}, 3000);
	},
	function(xhrl) { 
 	var keys = JSON.parse(xhrl.responseText);
		document.getElementById("logwarning").innerHTML = keys.back;
		document.getElementById("logwarning").style.display = "block";
		document.getElementById("logwarning").scrollIntoView({block:"center"});
		setTimeout(function(){
			document.getElementById("logwarning").innerHTML = "";
			document.getElementById("logwarning").style.display = "none";
		}, 2000);
		console.error(xhrl);
 
 	}	)
 	return false;
	}
	
/////{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}










//login
function loadJSON(path, success, error) { 
	var xhr = new XMLHttpRequest(); 
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) { 
  	if (success) success(JSON.parse(xhr.responseText)); 
			} else { 
  	if (error) error(xhr); 
			} 
		} 
	}; 
	xhr.open("GET", path, true);
	xhr.send();
}
function logins(){
	var usern =	document.getElementById("user").value;
	var passw =	document.getElementById("pwd").value;
	loadJSON(`/login/${usern}/${passw}`, function(data) {
	window.localStorage.setItem('accessToken', data.token);	document.getElementById("logsuccess").innerHTML = window.localStorage.getItem('accessToken'); 
		document.getElementById("logsuccess").style.display = "block";
		document.getElementById("logsuccess").scrollIntoView({block:"center"});

		setTimeout(function(){
			
			//create session///
			if(sessionStorage.student) { student= JSON.parse(sessionStorage.getItem('student')); 
			
			}else{ 
			student=[]; 
			
			} student.push(data); sessionStorage.setItem('student', JSON.stringify(student)); 
//////////////

 	window.location ="postad.html";
		}, 3000);
	},
	function(xhr) { 
		var keys = JSON.parse(xhr.responseText);
		document.getElementById("logwarning").innerHTML = keys.back;
		document.getElementById("logwarning").style.display = "block";
		document.getElementById("logwarning").scrollIntoView({block:"center"});
		setTimeout(function(){
			document.getElementById("logwarning").innerHTML = "";
			document.getElementById("logwarning").style.display = "none";
		}, 2000);
		console.error(xhr); } );
	return false;
}







function checklogin(path, success, error) { 
	var xhr = new XMLHttpRequest(); 
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) { 
  	if (success) success(JSON.parse(xhr.responseText)); 
			} else { 
  	if (error) error(xhr); 
			} 
		} 
	}; 
	xhr.open("GET", path, true);
	xhr.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('accessToken'));
	xhr.send();
}

function stilllog(){	
	checklogin(`/me`, function(data) {
		
//document.getElementById('indexads').innerHTML = data.description.user.email;
if (window.location.pathname == "/index.html" || window.location.pathname == "/") {
document.getElementById("notloged").style.display = "none";
    document.getElementById("nowloged").style.display = "block";
  document.getElementById("user").disabled = true;
  document.getElementById("pwd").disabled = true;
  document.getElementById("logg").disabled = true;
  }else{	document.getElementById("userspace").innerHTML = data.description.user.email;
  
}

		},function(xhr){
			
			
		}
)}