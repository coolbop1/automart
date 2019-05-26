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
		document.getElementById("regsuccess").innerHTML = "Welcome!! "+data.first_name+" registration successful. Opening login tab in 2 sec..."; 
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
	rightSlide("fpin");
}
function warnreg(){
	document.getElementById("regwarning").innerHTML = ""; 
	document.getElementById("regwarning").style.display = "none";
}