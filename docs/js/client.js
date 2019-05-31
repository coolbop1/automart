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
		sessionStorage.setItem('psession', JSON.stringify(data.description.user));
		const dsession = JSON.parse(sessionStorage.getItem('psession'));
//document.getElementById('indexads').innerHTML = data.description.user.email;
if (window.location.pathname == "/index.html" || window.location.pathname == "/") {
document.getElementById("notloged").style.display = "none";
    document.getElementById("nowloged").style.display = "block";
  document.getElementById("user").disabled = true;
  document.getElementById("pwd").disabled = true;
  document.getElementById("logg").disabled = true;
  }else{	document.getElementById("userspace").innerHTML = dsession.email;
 	document.getElementById("carposter").value = dsession.email;
}
 
		},function(xhr){
			
			
		}
)}










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
			
			/*/create session///
			if(sessionStorage.student) { student= JSON.parse(sessionStorage.getItem('student')); 
			
			}else{ 
			student=[]; 
			
			} student.push(data); sessionStorage.setItem('student', JSON.stringify(student)); 
/////////////*/

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







/////{{{{{{{{///Post car}}}}}}}}}//////{}

function pcad(path, success, error) { 
	var xhwr = new XMLHttpRequest(); 
	xhwr.onreadystatechange = function() {
		if (xhwr.readyState === XMLHttpRequest.DONE) {
			if (xhwr.status === 200) { 
  	if (success) success(JSON.parse(xhwr.responseText)); 
			} else { 
  	if (error) error(xhwr); 
			} 
		} 
	}; 
	var pcman =	document.getElementById("pcman").value;
	var pcmodel =	document.getElementById("pcmodel").value;
	var pccolor =	document.getElementById("pccolor").value;
	var pces =	document.getElementById("pces").value;
	var pprice =	document.getElementById("pprice").value;
	var x = document.getElementsByName("stateocar");
var i;
for (i = 0; i < x.length; i++) {
   if(x[i].checked == true)
var lookfor = i
}
	var stateocar =	 x[lookfor].value;
		var pcpics =	document.getElementById("pcpics").value;
		var posterem = document.getElementById("carposter").value;
	
	xhwr.open("POST", path, true);
	xhwr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	var inputValus = `{"pcman" : "${pcman}" , "pcmodel" : "${pcmodel}","pccolor" : "${pccolor}" , "pces" : "${pces}", "pprice" : "${pprice}","stateocar" : "${stateocar}" , "pcpics" : "${pcpics}","pcposter":"${posterem}"}`;
	xhwr.send(inputValus);
}

function postcar(){
	
	console.log(	'tried')
	pcad("/car", function(data) {
	document.getElementById("regsuccess").innerHTML = data.message; 
		document.getElementById("regsuccess").style.display = "block";
		document.getElementById("regsuccess").scrollIntoView({block: "center"});
		document.getElementById("pcman").value = "";
		document.getElementById("pcmodel").value = "";
		document.getElementById("pccolor").value = "";
		document.getElementById("pces").value = "";
		document.getElementById("pprice").value = "";
		
			document.getElementById("pcpics").value = "";

		setTimeout("succesregs()", 2000);
	},
	function(xhr) {
 	var keys = JSON.parse(xhr.responseText);
		document.getElementById("regwarning").innerHTML = "Encounter error, please try again"; 
		document.getElementById("regwarning").style.display = "block";
		document.getElementById("regwarning").scrollIntoView({block: "center"});
		setTimeout("warnreg()", 3000);
 	console.error(xhr); } );

	return false;
}



/////////////{/{{/{{{//////////{{}}}}}}}}}


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




//////////////cloudinary upload image and get the path//////////



const cloudName = 'coolbop';
const unsignedUploadPreset = 'lmxbyuah';

var fileSelect = document.getElementById("fileSelect"),
  fileElem = document.getElementById("fileElem");

fileSelect.addEventListener("click", function(e) {
  if (fileElem) {
    fileElem.click();
  }
  e.preventDefault(); // prevent navigation to "#"
}, false);

// ************************ Drag and drop ***************** //
function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

dropbox = document.getElementById("dropbox");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  var dt = e.dataTransfer;
  var files = dt.files;

  handleFiles(files);
}

// *********** Upload file to Cloudinary ******************** //
function uploadFile(file) {
  var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  var xhr = new XMLHttpRequest();
  var fd = new FormData();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  // Reset the upload progress bar
   document.getElementById('progress').style.width = 0;
  
  // Update progress (can be used to show progress indicator)
  xhr.upload.addEventListener("progress", function(e) {
    var progress = Math.round((e.loaded * 100.0) / e.total);
    document.getElementById('progress').style.width = progress + "%";

    console.log(`fileuploadprogress data.loaded: ${e.loaded},
  data.total: ${e.total}`);
  });

  xhr.onreadystatechange = function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // File uploaded successfully
      var response = JSON.parse(xhr.responseText);
      // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
      var url = response.secure_url;
      // Create a thumbnail of the uploaded image, with 150px width
      var tokens = url.split('/');
      tokens.splice(-2, 0, 'w_150,c_scale');
      var img = new Image(); // HTML5 Constructor
      img.src = tokens.join('/');
      img.alt = response.public_id;
      document.getElementById('gallery').appendChild(img);
  document.getElementById('pcpics').value = img.src;   
    }
  };

  fd.append('upload_preset', unsignedUploadPreset);
  fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
  fd.append('file', file);
  xhr.send(fd);
}

// *********** Handle selected files ******************** //
var handleFiles = function(files) {
  for (var i = 0; i < files.length; i++) {
    uploadFile(files[i]); // call the function to upload the file
  }
};



//////////////////////////////////////////////////////