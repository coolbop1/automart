
//register///////////

function register(path, success, error) { 
	var xhr = new XMLHttpRequest(); 
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 201) { 
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

	document.getElementById("regg").disabled = true;
	document.getElementById("regg").innerHTML = '<center><div class="spinning"></div></center>';
	
	
	
	
	register("/api/v1/auth/signup", function(data) {
	
	setTimeout(()=>{
	document.getElementById("regsuccess").innerHTML = data.message;
	document.getElementById("regsuccess").classList.replace("hide","show");
	document.getElementById("regemail").value = "";
		document.getElementById("regfname").value = "";
		document.getElementById("reglname").value = "";
		document.getElementById("regadd").value = "";
		document.getElementById("regpwd").value = "";
		setTimeout("succesregs()", 2000);
	}, 1000);},
	function(xhr) { 
 	var keys = JSON.parse(xhr.responseText);
		document.getElementById("regwarning").innerHTML = keys.msg; 
		document.getElementById("regwarning").classList.replace("hide","show");
		setTimeout("warnreg()", 2000);
 	console.error(xhr); } );
	
	
	
	return false;
}




function succesregs(){
  document.getElementById("regsuccess").classList.replace("show","hide");
	document.getElementById("regsuccess").innerHTML = ""; 	
	window.location ="postad.html";
}
function warnreg(){

	document.getElementById("regg").innerHTML = 'register';
	document.getElementById("regg").disabled = false;
	document.getElementById("regwarning").classList.replace("show","hide");
	document.getElementById("regwarning").innerHTML = ""; 	
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
	var inputVald = `{"email" : "${lusern}" , "password" : "${lpass}"}`;
	xhrl.send(inputVald);
}
function login(){
	document.getElementById("logg").disabled = true;
	document.getElementById("logg").innerHTML = '<center><div class="spinning"></div></center>';
	signin("/api/v1/auth/signin", function(data) {
	setTimeout(function(){
	document.getElementById("regsuccess").innerHTML = data.message;
    document.getElementById("regsuccess").classList.replace("hide","show");	
		document.getElementById("regsuccess").scrollIntoView({block:"center"});
	}, 1000);

		setTimeout(function(){
 	window.location ="postad.html";
		}, 3000);},
	function(xhrl) { 
 	var keys = JSON.parse(xhrl.responseText);
		document.getElementById("regwarning").innerHTML = keys.msg;
		document.getElementById("regwarning").classList.replace("hide","show");
		
		setTimeout(function(){
			document.getElementById("regwarning").classList.replace("show","hide");
			document.getElementById("logg").disabled = false;
			document.getElementById("logg").innerHTML = "login";
			document.getElementById("regwarning").innerHTML = "";
			
		}, 2000);
		console.error(xhrl);
 
 	}	)
	
 	return false;
	}
	
/////{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}







/////{{{{{{{{///Post car}}}}}}}}}//////{}


function postcar(){
	document.getElementById("postcarad").disabled = true;
	document.getElementById("postcarad").innerHTML = '<center><div class="spinning"></div></center>';
	setTimeout(function(){
	document.getElementById("regsuccess").innerHTML = "<center style='color:red'>MOCK CLIENT RESPONSE</center> Car posted succesfully"; 
		document.getElementById("regsuccess").style.display = "block";
		document.getElementById("regsuccess").scrollIntoView({block: "center"});
		document.getElementById("pcman").value = "";
		document.getElementById("pcmodel").value = "";
		document.getElementById("pccolor").value = "";
		document.getElementById("pces").value = "";
		document.getElementById("pprice").value = "";
		
			document.getElementById("pcpics").value = "";

		setTimeout("succesregs()", 2000);
	},1000)

	return false;
}



/////////////{/{{/{{{//////////{{}}}}}}}}}



/////{{{{{{{{/// purchase order}}}}}}}}}//////{}

function postorder(){
	document.getElementById("postcarorder").disabled = true;
	document.getElementById("postcarorder").innerHTML = '<center><div class="spinning"></div></center>';
	setTimeout(function(){
	
	document.getElementById("regsuccess").innerHTML = "<center style='color:red'>MOCK CLIENT RESPONSE</center> Purchase oder posted succesfully.check back for sellers response"; 
	document.getElementById("regsuccess").classList.replace("hide","show");
	document.getElementById("regsuccess").scrollIntoView({block: "center"});
		setTimeout(function (){
			document.getElementById("regsuccess").classList.replace("show","hide");
			document.getElementById("runorder").classList.replace("hide","show");
	document.getElementById("unpickedform").classList.replace("hide","show");
	document.getElementById("pickedform").classList.replace("show","hide");
			document.getElementById("pomanid").value = "";	
			document.getElementById("orderimg").innerHTML = "";
			document.getElementById("ncarcond").innerHTML = "";  
			document.getElementById("pomanu").value = "";
			document.getElementById("pocolor").value = "";
			document.getElementById("poprice").value = "";
			document.getElementById("showpprice").innerHTML = "";
			document.getElementById('poprice').disabled = true;
			document.getElementById('postcarorder').disabled = true;
			document.getElementById("postimg").scrollIntoView({block:"start",behavior:"smooth"})
		},3000)
	},1000);

	return false;
}



/////////////{/{{/{{{//////////{{}}}}}}}}}/









/////{{{{{{{{///update price of purchase order}}}}}}}}}//////{}


function editpo(thisid){
	let theid = thisid;
	let replace1 = theid.replace("editpo","")
	let replace2 = theid.replace("editpo","editp")
	document.getElementById(replace2).disabled = true;
	document.getElementById(replace2).innerHTML = '<center><div class="spinning"></div></center>';
	setTimeout(function(){
	
	document.getElementById("regsuccess").innerHTML = "<center style='color:red'>MOCK CLIENT RESPONSE</center> Order price edited succesfully "; 
		document.getElementById("regsuccess").classList.replace("hide","show");
		document.getElementById("regsuccess").scrollIntoView({block: "center"});
		
		setTimeout(function (){
			document.getElementById("regsuccess").classList.replace("show","hide");
			document.getElementById(replace2).disabled = false;
	document.getElementById(replace2).innerHTML = 'update price';
			closepo("clo"+replace1);
		},3000)
	},1000)
	
	return false;
}



/////////////{/{{/{{{//////////{{}}}}}}}}}/








/////{{{{{{{{///mark car as sold}}}}}}}}}//////{}
function marksold(thisid){
	let theid = thisid;
	let replace1 = theid.replace("soldbut","")
	let replace2 = theid.replace("soldbut","soldmask");
	document.getElementById(replace2).style.display = "table";
	document.getElementById(replace2).innerHTML = "<center><div style='position:absolute;top: calc(50% - 10.5px);right: calc(50% - 10.5px);' class='spinning'></div></center>"; 
	setTimeout(()=>{
		document.getElementById("regsuccess").innerHTML = "<center style='color:red'>MOCK CLIENT RESPONSE</center> Car marked as sold"; 
		document.getElementById("regsuccess").classList.replace("hide","show");
		document.getElementById("regsuccess").scrollIntoView({block: "center"});
		setTimeout(function (){
			document.getElementById("regsuccess").classList.replace("show","hide");
		markssold(theid);
		},2000)
	}, 1000)
	return false;
}



/////////////{/{{/{{{//////////{{}}}}}}}}}/







/////{{{{{{{{///seller change price of ad}}}}}}}}}//////{}

function editadprice(thisid){
	let theid = thisid;
	let replace1 = theid.replace("editap","")
	let replace2 = theid.replace("editap","edita")
	
	
	document.getElementById(replace2).innerHTML = "<center><div class='spinning'></div></center>"; 

	setTimeout(function (){
		document.getElementById("regsuccess").innerHTML = "<center style='color:red'>MOCK CLIENT RESPONSE</center> Car price changed succesfully";  
		document.getElementById("regsuccess").classList.replace("hide","show");
		document.getElementById("regsuccess").scrollIntoView({block: "center"});
		setTimeout(function (){
		closedit("cl"+replace1);	document.getElementById("regsuccess").classList.replace("show","hide");
		document.getElementById(replace2).innerHTML = "Update price";
		closedit("cl"+replace1);
		},2000)
	},1000);
	
	return false;
}



/////////////{/{{/{{{//////////{{}}}}}}}}}/





/////{{{{{{{{///buyers report car ad}}}}}}}}}//////{}

function confirmrep(thisid){
	let theid = thisid;
	let replace1 = theid.replace("reportfor","");
	
	
		document.getElementById("rr"+replace1).style.display ="none";
		document.getElementById("reportwhy"+replace1).value ="";		
		document.getElementById("ralert"+replace1).innerHTML = '<center><div class="spinning"></div></center>';
		document.getElementById("ralert"+replace1).style.display ="block";
	setTimeout(function(){
		document.getElementById("ralert"+replace1).innerHTML = "<center style='color:red'>MOCK CLIENT RESPONSE</center> Report sent and will be reviwed"; 
		document.getElementById("ralert"+replace1).scrollIntoView({block: "center"});
		setTimeout(function (){
			document.getElementById("rr"+replace1).style.display ="none";
			document.getElementById("ralert"+replace1).style.display ="none";
		},3000)
	}, 1000);
	
	return false;
}



/////////////{/{{/{{{//////////{{}}}}}}}}}/
















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
	window.localStorage.setItem('accessToken', data.token);	document.getElementById("regsuccess").innerHTML = window.localStorage.getItem('accessToken'); 
		document.getElementById("regsuccess").style.display = "block";
		document.getElementById("regsuccess").scrollIntoView({block:"center"});

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
		document.getElementById("regwarning").innerHTML = keys.back;
		document.getElementById("regwarning").style.display = "block";
		document.getElementById("regwarning").scrollIntoView({block:"center"});
		setTimeout(function(){
			document.getElementById("regwarning").innerHTML = "";
			document.getElementById("regwarning").style.display = "none";
		}, 2000);
		console.error(xhr); } );
	return false;
}




//////////////cloudinary upload image and get the path//////////

if(window.location.pathname == "/UI/postad.html"){

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

	//console.log(`fileuploadprogress data.loaded: ${e.loaded}  data.total: ${e.total}`);
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
			let itcontain = document.getElementById('gallery').firstChild;
			document.getElementById('gallery').insertBefore(img, itcontain);
			//document.getElementById('gallery').appendChild("<br/>");
  document.getElementById('pcpics').value += img.src+"<>";   
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


}
//////////////////////////////////////////////////////