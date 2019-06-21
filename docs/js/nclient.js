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
	checklogin("/api/v1/me", function(data) {
		sessionStorage.setItem('psession', JSON.stringify(data.description.user));
		const dsession = JSON.parse(sessionStorage.getItem('psession'));
//console.log(data.description.user.email);
if (window.location.pathname == "/UI/index.html" || window.location.pathname == "/UI") {
document.getElementById("notloged").style.display = "none";
    document.getElementById("nowloged").style.display = "block";
  document.getElementById("user").disabled = true;
  document.getElementById("pwd").disabled = true;
  document.getElementById("logg").disabled = true;
  }else{	
		document.getElementById("userspace").innerHTML = dsession.email;
 
}
 
		},function(xhr){
			
			console.log("not keep")
		}
)}









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
	xhr.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('accessToken'));
	var inputVal = `{"email" : "${remail}" , "first_name" : "${rfname}","last_name" : "${rlname}" , "password" : "${rpwd}", "address" : "${radd}"}`;
	xhr.send(inputVal);
}






function signup(){

	document.getElementById("regg").disabled = true;
	document.getElementById("regg").innerHTML = '<center><div class="spinning"></div></center>';
	
	
	
	
	register("/api/v1/auth/signup", function(data) {
	window.localStorage.setItem('accessToken', data.data.token);
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
		document.getElementById("regwarning").innerHTML = keys.error; 
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


function succesregspc(){
  document.getElementById("postcarad").innerHTML = 'Post Car';
	document.getElementById("postcarad").disabled = false;
	window.location ="postad.html";
}
function warnregpc(){

	document.getElementById("postcarad").innerHTML = 'Post Car';
	document.getElementById("postcarad").disabled = false;
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
		
		window.localStorage.setItem('accessToken', data.data.token);
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
		document.getElementById("regwarning").innerHTML = keys.error;
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

function pcad(path, success, error) { 
	var xhwr = new XMLHttpRequest(); 
	xhwr.onreadystatechange = function() {
		if (xhwr.readyState === XMLHttpRequest.DONE) {
			if (xhwr.status === 201) { 
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
		
	
	xhwr.open("POST", path, true);
	xhwr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	xhwr.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('accessToken'));
	var inputValus = `{"manufacturer" : "${pcman}" , "model" : "${pcmodel}","body_type" : "${pccolor}" , "engine_size" : "${pces}", "price" : "${pprice}","state" : "${stateocar}","pics" : "${pcpics}"}`;
	xhwr.send(inputValus);
}



function postcar(){
document.getElementById("postcarad").disabled = true;	document.getElementById("postcarad").innerHTML = '<center><div class="spinning"></div></center>';
	
pcad("/api/v1/car", function(data) {	
	
	setTimeout(function(){
	document.getElementById("regsuccess").innerHTML = data.message; 
		document.getElementById("regsuccess").classList.replace("hide","show");	
		document.getElementById("pcman").value = "";
		document.getElementById("pcmodel").value = "";
		document.getElementById("pccolor").value = "";
		document.getElementById("pces").value = "";
		document.getElementById("pprice").value = "";
		
			document.getElementById("pcpics").value = "";

		setTimeout("succesregspc()", 1000);
	},1000)
},	
function(xhr) {
 	var keys = JSON.parse(xhr.responseText);
		document.getElementById("regwarning").innerHTML = keys.error; 
	
	document.getElementById("regwarning").classList.replace("hide","show");		
		setTimeout("warnregpc()", 3000);
 	console.error(xhr); } );
 	
	return false;
}



/////////////{/{{/{{{//////////{{}}}}}}}}}



/////{{{{{{{{/// purchase order}}}}}}}}}//////{}
function purchorder(path, success, error) { 
	var xhwr = new XMLHttpRequest(); 
	xhwr.onreadystatechange = function() {
		if (xhwr.readyState === XMLHttpRequest.DONE) {
			if (xhwr.status === 201) { 
  	if (success) success(JSON.parse(xhwr.responseText)); 
			} else { 
  	if (error) error(xhwr); 
			} 
		} 
	}; 
	
	
	var cariid =	document.getElementById("pomanid").value;
	var priceoffered =	document.getElementById("poprice").value;
		var originalamount =	document.getElementById("showpprice").innerText;
	
	
	xhwr.open("POST", path, true);
	xhwr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");	
	xhwr.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('accessToken'));
	var inputValus = `{"car_id" : ${cariid} ,"order_price" : ${priceoffered} , "status" : "pending", "amount" : ${originalamount}}`;
	xhwr.send(inputValus);
}




function postorder(){
	
	document.getElementById("postcarorder").disabled = true;
	document.getElementById("postcarorder").innerHTML = '<center><div class="spinning"></div></center>';
	purchorder("/api/v1/order", function(data) {
	setTimeout(function(){
	
	document.getElementById("regsuccess").innerHTML = data.message;
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
			document.getElementById("showppricec").innerHTML = "";
			document.getElementById('poprice').disabled = true;
			document.getElementById('postcarorder').disabled = true;
			document.getElementById("postimg").scrollIntoView({block:"start",behavior:"smooth"})
		},3000)
	},1000);
		},
	function(xhr) {
 	var keys = JSON.parse(xhr.responseText);
		document.getElementById("regwarning").innerHTML = keys.error
		document.getElementById("regwarning").classList.replace("hide","show");
		document.getElementById("regwarning").scrollIntoView({block: "center"});
		setTimeout(function (){
			document.getElementById("regwarning").classList.replace("show","hide");
		},3000)
	 //console.error(xhr); 
} );

	return false;
}



/////////////{/{{/{{{//////////{{}}}}}}}}}/









/////{{{{{{{{///update price of purchase order}}}}}}}}}//////{}
function putitin(thisid){
	let theid = thisid;
	let replace2 = theid.replace("editpo","edited");
var frets = document.getElementById(replace2).value;
sessionStorage.setItem('peditprice',frets);
}
function edpurchorder(path, success, error) { 
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


	
	var fret = sessionStorage.getItem('peditprice');
	
	xhwr.open("PATCH", path, true);
	xhwr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	xhwr.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('accessToken'));
	var inputValus = `{"order_price" : ${fret}}`;
	xhwr.send(inputValus);
}


function editpo(thisid){
	let theid = thisid;
	let replace1 = theid.replace("editpo","")
	let replace2 = theid.replace("editpo","editp")
	putitin(theid);
	document.getElementById(replace2).disabled = true;
	document.getElementById(replace2).innerHTML = '<center><div class="spinning"></div></center>';
	
	
	edpurchorder(`/api/v1/order/${replace1}/price`, function(data) {
	setTimeout(function(){
	
	document.getElementById("regsuccess").innerHTML = data.message; 
		document.getElementById("regsuccess").classList.replace("hide","show");
		document.getElementById("regsuccess").scrollIntoView({block: "center"});
		
		setTimeout(function (){
			document.getElementById("regsuccess").classList.replace("show","hide");
			document.getElementById(replace2).disabled = false;
	document.getElementById(replace2).innerHTML = 'update price';
			closepo("clo"+replace1);
		},3000)
	},1000)},
	function(xhr) {
 	var keys = JSON.parse(xhr.responseText);
		document.getElementById("regwarning").innerHTML = keys.error; 
		document.getElementById("regwarning").classList.replace("hide","show");
		document.getElementById("regwarning").scrollIntoView({block: "center"});
		setTimeout(function (){
			document.getElementById("regwarning").classList.replace("show","hide");
			document.getElementById(replace2).disabled = false;
			document.getElementById(replace2).innerHTML = 'update price';
			closepo("clo"+replace1);
		},3000)
 	console.error(xhr); } );
sessionStorage.clear('peditprice');
	
	return false;
}



/////////////{/{{/{{{//////////{{}}}}}}}}}/








/////{{{{{{{{///mark car as sold}}}}}}}}}//////{}
function markassold(path, success, error) { 
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
const dsession = JSON.parse(sessionStorage.getItem('psession'));
let owneremail = dsession.email;
xhwr.open("PATCH", path, true);
	xhwr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	xhwr.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('accessToken'));
	xhwr.send();
}



function marksold(thisid){
	let theid = thisid;
	let replace1 = theid.replace("soldbut","")
	let replace2 = theid.replace("soldbut","soldmask");
	document.getElementById(replace2).style.display = "table";
	document.getElementById(replace2).innerHTML = "<center><div style='position:absolute;top: calc(50% - 10.5px);right: calc(50% - 10.5px);' class='spinning'></div></center>"; 
	markassold(`/api/v1/car/${replace1}/status`, function(data) {
	setTimeout(()=>{
		document.getElementById("regsuccess").innerHTML = data.message; 
		document.getElementById("regsuccess").classList.replace("hide","show");
		document.getElementById("regsuccess").scrollIntoView({block: "center"});
		setTimeout(function (){
			document.getElementById("regsuccess").classList.replace("show","hide");
		markssold(theid);
		},2000)
	}, 1000)},
	function(xhr) {
 	var keys = JSON.parse(xhr.responseText);
		document.getElementById("regwarning").innerHTML = keys.error; 
		document.getElementById("regwarning").classList.replace("hide","show");
		document.getElementById("regwarning").scrollIntoView({block: "center"});
		setTimeout(function (){
			document.getElementById("regwarning").classList.replace("show","hide");
			document.getElementById(replace2).style.display = "none";
	document.getElementById(replace2).innerHTML = ""; 
	
		},2000)
 	console.error(xhr); } );
	return false;
}



/////////////{/{{/{{{//////////{{}}}}}}}}}/







/////{{{{{{{{///seller change price of ad}}}}}}}}}//////{}
function putitup(thisid){
	let theid = thisid;
	let replace2 = theid.replace("editap","sedit");
var frest = document.getElementById(replace2).value;
sessionStorage.setItem('seditprice',frest);
}
function upadprice(path, success, error) { 
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

const dnewprice = sessionStorage.getItem('seditprice');

xhwr.open("PATCH", path, true);
	xhwr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	xhwr.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('accessToken'));
	var inputValus = `{"price" : "${dnewprice}"}`;
	xhwr.send(inputValus);
}




function editadprice(thisid){
	let theid = thisid;
	let replace1 = theid.replace("editap","")
	let replace2 = theid.replace("editap","edita")
	putitup(theid);	
	document.getElementById(replace2).innerHTML = "<center><div class='spinning'></div></center>"; 
	
	upadprice(`/api/v1/car/${replace1}/price`, function(data) {
	setTimeout(function (){
		document.getElementById("regsuccess").innerHTML = data.message;  
		document.getElementById("regsuccess").classList.replace("hide","show");
		document.getElementById("regsuccess").scrollIntoView({block: "center"});
		setTimeout(function (){
		closedit("cl"+replace1);	document.getElementById("regsuccess").classList.replace("show","hide");
		document.getElementById(replace2).innerHTML = "Update price";
		closedit("cl"+replace1);
		},2000)
	},1000);},
	function(xhr) {
 	var keys = JSON.parse(xhr.responseText);
		document.getElementById("regwarning").innerHTML = keys.error; 
		document.getElementById("regwarning").classList.replace("hide","show");
		document.getElementById("regwarning").scrollIntoView({block: "center"});
		setTimeout(function (){
		closedit("cl"+replace1);	
		document.getElementById("regwarning").classList.replace("show","hide");
		document.getElementById(replace2).innerHTML = "Update price";
		},2000)
 	console.error(xhr); } );
	
	return false;
}



/////////////{/{{/{{{//////////{{}}}}}}}}}/





/////{{{{{{{{///buyers report car ad}}}}}}}}}//////{}
function seereason(thisid){
	let theid = thisid;
	let replace2 = theid.replace("reportfor","reportwhy");
	let replace3 = theid.replace("reportfor","");

var fresty = document.getElementById(replace2).value;
sessionStorage.setItem('reasonwhy',fresty);
sessionStorage.setItem('reportedcar',replace3);
}
function reportcarad(path, success, error) { 
	var xhwr = new XMLHttpRequest(); 
	xhwr.onreadystatechange = function() {
		if (xhwr.readyState === XMLHttpRequest.DONE) {
			if (xhwr.status === 201) { 
  	if (success) success(JSON.parse(xhwr.responseText)); 
			} else { 
  	if (error) error(xhwr); 
			} 
		} 
	};  

const ddry = sessionStorage.getItem('reasonwhy');
const ddrc = sessionStorage.getItem('reportedcar');

xhwr.open("POST", path, true);
	xhwr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	xhwr.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('accessToken'));
	var inputValus = `{"car_id" : "${ddrc}","reason" : "${ddry}","description" : "${ddry}"}`;
	xhwr.send(inputValus);
}


function confirmrep(thisid){
	let theid = thisid;
	let replace1 = theid.replace("reportfor","");
	seereason(theid);
	
		document.getElementById("rr"+replace1).style.display ="none";
		document.getElementById("reportwhy"+replace1).value ="";		
		document.getElementById("ralert"+replace1).innerHTML = '<center><div class="spinning"></div></center>';
		document.getElementById("ralert"+replace1).style.display ="block";
		
	
	
	reportcarad(`/api/v1/flag/`, function(data) {
	setTimeout(function(){
		document.getElementById("reportbut"+replace1).classList.replace("reporttab","reporttabs");
		document.getElementById("reportbut"+replace1).innerHTML ="reported";
		document.getElementById("ralert"+replace1).innerHTML = data.message; 
		document.getElementById("ralert"+replace1).scrollIntoView({block: "center"});
		setTimeout(function (){
			document.getElementById("rr"+replace1).style.display ="none";
			document.getElementById("ralert"+replace1).style.display ="none";
		},3000)
	}, 1000);},
	function(xhr) {
 	var keys = JSON.parse(xhr.responseText);
		document.getElementById("ralert"+replace1).innerHTML = keys.error;
		setTimeout(function (){
			document.getElementById("rr"+replace1).style.display ="none";
			document.getElementById("ralert"+replace1).style.display ="none";
		},3000)
 	console.error(xhr); } );
	
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