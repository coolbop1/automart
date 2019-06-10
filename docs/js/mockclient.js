
//register///////////


function signup(){
    document.getElementById("regsuccess").innerHTML = "<center style='color:red'>MOCK CLIENT RESPONSE</center>Welcome!! registration successful. <br/>Preparing dashboard in 2 sec..."; 
		document.getElementById("regsuccess").style.display = "block";
		document.getElementById("regsuccess").scrollIntoView({block: "center"});
		document.getElementById("regemail").value = "";
		document.getElementById("regfname").value = "";
		document.getElementById("reglname").value = "";
		document.getElementById("regadd").value = "";
		document.getElementById("regpwd").value = "";
		setTimeout("succesregs()", 2000);
	
	return false;
}
function succesregs(){
    document.getElementById("regsuccess").classList.replace("show","hide");
	document.getElementById("regsuccess").innerHTML = ""; 	
	window.location ="postad.html";
}
function warnreg(){
	document.getElementById("regwarning").innerHTML = ""; 
	document.getElementById("regwarning").classList.replace("show","hide");	
}










///////////{{{SIGN IN}}}

function login(){
	document.getElementById("logsuccess").innerHTML = "<center style='color:red'>MOCK CLIENT RESPONSE</center>Logged in successfully";
    document.getElementById("logsuccess").classList.replace("hide","show");	
    document.getElementById("logsuccess").scrollIntoView({block:"center"});

		setTimeout(function(){
 	window.location ="postad.html";
		}, 3000);
	
 	return false;
	}
	
/////{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}







/////{{{{{{{{///Post car}}}}}}}}}//////{}


function postcar(){

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

	return false;
}



/////////////{/{{/{{{//////////{{}}}}}}}}}



/////{{{{{{{{/// purchase order}}}}}}}}}//////{}

function postorder(){
	
	
	document.getElementById("regsuccessy").innerHTML = "<center style='color:red'>MOCK CLIENT RESPONSE</center> Purchase oder posted succesfully.check back for sellers response"; 
	document.getElementById("regsuccessy").classList.replace("hide","show");
	document.getElementById("regsuccessy").scrollIntoView({block: "center"});
		setTimeout(function (){
			document.getElementById("regsuccessy").classList.replace("show","hide");
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
	

	return false;
}



/////////////{/{{/{{{//////////{{}}}}}}}}}/









/////{{{{{{{{///update price of purchase order}}}}}}}}}//////{}


function editpo(thisid){
	let theid = thisid;
	let replace1 = theid.replace("editpo","")
	
	
	document.getElementById("regsuccessu").innerHTML = "<center style='color:red'>MOCK CLIENT RESPONSE</center> Order price edited succesfully "; 
		document.getElementById("regsuccessu").classList.replace("hide","show");
		document.getElementById("regsuccessu").scrollIntoView({block: "center"});
		
		setTimeout(function (){
			document.getElementById("regsuccessu").classList.replace("show","hide");
			closepo("clo"+replace1);
		},3000)
	
	return false;
}



/////////////{/{{/{{{//////////{{}}}}}}}}}/








/////{{{{{{{{///mark car as sold}}}}}}}}}//////{}
function marksold(thisid){
	let theid = thisid;
	let replace1 = theid.replace("soldbut","")
		document.getElementById("regsuccessi").innerHTML = "<center style='color:red'>MOCK CLIENT RESPONSE</center> Car marked as sold"; 
		document.getElementById("regsuccessi").classList.replace("hide","show");
		document.getElementById("regsuccessi").scrollIntoView({block: "center"});
		setTimeout(function (){
			document.getElementById("regsuccessi").classList.replace("show","hide");
		markssold(theid);
		},2000)
	return false;
}



/////////////{/{{/{{{//////////{{}}}}}}}}}/







/////{{{{{{{{///seller change price of ad}}}}}}}}}//////{}

function editadprice(thisid){
	let theid = thisid;
	let replace1 = theid.replace("editap","")
	
	
	
		document.getElementById("regsuccessi").innerHTML = "<center style='color:red'>MOCK CLIENT RESPONSE</center> Car price changed succesfully";  
		document.getElementById("regsuccessi").classList.replace("hide","show");
		document.getElementById("regsuccessi").scrollIntoView({block: "center"});
		setTimeout(function (){
		closedit("cl"+replace1);	document.getElementById("regsuccessi").classList.replace("show","hide");
		closedit("cl"+replace1);
		},2000)
	
	return false;
}



/////////////{/{{/{{{//////////{{}}}}}}}}}/





/////{{{{{{{{///buyers report car ad}}}}}}}}}//////{}

function confirmrep(thisid){
	let theid = thisid;
	let replace1 = theid.replace("reportfor","");
	
	
	
		document.getElementById("rr"+replace1).style.display ="none";
		document.getElementById("reportwhy"+replace1).value ="";
		document.getElementById("ralert"+replace1).innerHTML = "<center style='color:red'>MOCK CLIENT RESPONSE</center> Report sent and will be reviwed"; 
		document.getElementById("ralert"+replace1).style.display ="block";
		document.getElementById("ralert"+replace1).scrollIntoView({block: "center"});
		setTimeout(function (){
			document.getElementById("rr"+replace1).style.display ="none";
			document.getElementById("ralert"+replace1).style.display ="none";
		},3000)
	
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

if(window.location.pathname == "/postad.html"){

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