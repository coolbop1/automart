function stilllog(){
	
	fetch("/api/v1/me",{
		method:"GET",
		headers:new Headers({"Authorization": "Bearer "+localStorage.getItem('accessToken')}),
	})
	.then((res)=>res.json())
	.then((data)=>{
		console.log(data);
		if (data.status === 200){
		const  {user}  = data.description;
		console.log(user);
		
		const dsession = user;
		if (window.location.pathname == "/UI/index.html" || window.location.pathname == "/UI/" || window.location.pathname == "/index.html" || window.location.pathname == "/") {
document.getElementById("notloged").style.display = "none";
   document.getElementById("fpintab").classList.replace("show","hide"); document.getElementById("nowloged").style.display = "block";
   document.getElementById("profilename").innerHTML = dsession.name+" "+dsession.lname;
   document.getElementById("spinn").innerHTML = "Email: "+dsession.email;
   document.getElementById("fpinn").innerHTML = "Address: "+dsession.address;
   setTimeout(()=>rightSlide("tpin"),1000);
  }else{			document.getElementById("userspace").innerHTML = "<a href='index.html'><img src='image/uicon.jpg' width='25px' >"+dsession.email+"</a>";
}
}else{
	console.log("not logged in")
}
		
	})
	.catch((e)=>console.log("error"))
		
}





function signup(){
document.getElementById("regg").disabled = true;
document.getElementById("regg").innerHTML = '<center><div class="spinning"></div></center>';



var remail =	document.getElementById("regemail").value;
	var rfname =	document.getElementById("regfname").value;
	var rlname =	document.getElementById("reglname").value;
	var rpwd =	document.getElementById("regpwd").value;
	var radd =	document.getElementById("regadd").value;

fetch('/api/v1/auth/signup', { 
method: 'POST', 
headers : new Headers({"Content-Type": "application/json; charset=UTF-8"}), body:JSON.stringify({"email" : remail, "first_name" : rfname,"last_name" : rlname , "password" : rpwd, "address" : radd}) })
.then((res) => res.json()) 
.then((data) => {
		if (data.status === 201) { 
 			const { message } = data;
 				const { token } = data.data;
 				window.localStorage.setItem('accessToken', token);	document.getElementById("regsuccess").innerHTML = message;
	document.getElementById("regsuccess").classList.replace("hide","show");
	document.getElementById("regemail").value = "";
		document.getElementById("regfname").value = "";
		document.getElementById("reglname").value = "";
		document.getElementById("regadd").value = "";
		document.getElementById("regpwd").value = "";
	setTimeout("succesregs()", 2000);
			}else{
				const { error } = data;
				document.getElementById("regwarning").innerHTML = error; 
		document.getElementById("regwarning").classList.replace("hide","show");
		setTimeout("warnreg()", 2000); 
			} 
}) 
.catch((err)=>console.log(err));

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






function login(){
	document.getElementById("logg").disabled = true;
	document.getElementById("logg").innerHTML = '<center><div class="spinning"></div></center>';
		var lusern =	document.getElementById("user").value;
	var lpass =	document.getElementById("pwd").value;
	fetch("/api/v1/auth/signin", {
		method:"POST",
		headers : new Headers({"Content-Type":"application/json; charset=UTF-8"}),
		body:JSON.stringify({"email" : lusern , "password" : lpass})
	})
	.then((res)=>res.json())
	.then((data)=>{
		if (data.status === 200) {
		const { token } = data.data
		const { message } = data
		window.localStorage.setItem('accessToken', token);
	document.getElementById("regsuccess").innerHTML = message;
    document.getElementById("regsuccess").classList.replace("hide","show");	
		document.getElementById("regsuccess").scrollIntoView({block:"center"});


		setTimeout(function(){
 	window.location ="postad.html";
 		}, 1000);
		
			}else{
			const { error } = data;
			document.getElementById("regwarning").innerHTML = error;
		document.getElementById("regwarning").classList.replace("hide","show");
		
		setTimeout(function(){
			document.getElementById("regwarning").classList.replace("show","hide");
			document.getElementById("logg").disabled = false;
			document.getElementById("logg").innerHTML = "login";
			document.getElementById("regwarning").innerHTML = "";
			
		}, 2000);
				
			}
		
	})
	.catch((e)=>console.log(e));
	
	return false;
	}
	
	
	
	
	function retremail(){
let retemaill =	document.getElementById("retemail").value;	document.getElementById("retrievebut").disabled = true;
	document.getElementById("retrievebut").innerHTML = '<center><div class="spinning"></div></center>';
	let oldpass = document.getElementById("fpwd").value;
		let newpass = document.getElementById("spwd").value;
		if(oldpass == ""){
	getPassword();
	}else{
	changePassword();
	}
	function changePassword(){
	fetch("/api/v1/user/"+retemaill+"/reset_password",{
		method:"POST",
		headers:new Headers({"Content-Type":"application/json; charset=UTF-8"}),
		body:JSON.stringify({"current_password":oldpass,"new_password":newpass})
	})
	.then((res)=>res.json())
	.then((data)=>{
		if(data.status === 200){
			const { message }=data;
			seesuccess(message);
		}else{
			const { error }=data;
			seeerr(error);
		}
		
	})
	.catch((e)=>console.log("error"))
	}
	function getPassword(){
		fetch("/api/v1/user/"+retemaill+"/reset_password",{
			method:"POST",
			headers:new Headers({"Content-Type":"application/json; charset=UTF-8"})
		})
		.then((res)=>res.json())
		.then((data)=>{
			if(data.status === 200){
			const { message }=data;
			seesuccess(message);
		}else{
			const { error }=data;
			seeerr(error);
		}
		})
		.catch((e)=>console.log("error"))
		}
		function seesuccess(salert){
			document.getElementById("regsuccess").innerHTML = salert;
    document.getElementById("regsuccess").classList.replace("hide","show");	
		document.getElementById("regsuccess").scrollIntoView({block:"center"});
	

		setTimeout(function(){
			document.getElementById("regsuccess").classList.replace("show","hide");
			document.getElementById("retrievebut").disabled = false;
			document.getElementById("retrievebut").innerHTML = "Get password";
			document.getElementById("regsuccess").innerHTML = "";
 	backtotab();
		}, 3000);
		}
		function seeerr(salert){
			document.getElementById("regwarning").innerHTML = salert;
		document.getElementById("regwarning").classList.replace("hide","show");
		
		setTimeout(function(){
			document.getElementById("regwarning").classList.replace("show","hide");
			document.getElementById("retrievebut").disabled = false;
			document.getElementById("retrievebut").innerHTML = "Get password";
			document.getElementById("regwarning").innerHTML = "";
			
		}, 2000);
		}
	
	
	return false;
	}
	
	
	
	
	function postcar(){
document.getElementById("postcarad").disabled = true;	
document.getElementById("postcarad").innerHTML = '<center><div class="spinning"></div></center>';
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

fetch("/api/v1/car",{
	method:"POST",
	headers:new Headers({"Content-Type":"application/json; charset=UTF-8","Authorization":"Bearer "+localStorage.getItem('accessToken')}),
	body:JSON.stringify({"manufacturer" : pcman , "model" : pcmodel,"body_type" : pccolor , "engine_size" : pces, "price" : pprice,"state" : stateocar,"pics" : pcpics})
})
.then((res)=>res.json())
.then((data)=>{
	if (data.status === 201){
	const { message } = data;
	document.getElementById("regsuccess").innerHTML = message; 
		document.getElementById("regsuccess").classList.replace("hide","show");	
		document.getElementById("pcman").value = "";
		document.getElementById("pcmodel").value = "";
		document.getElementById("pccolor").value = "";
		document.getElementById("pces").value = "";
		document.getElementById("pprice").value = "";
		
			document.getElementById("pcpics").value = "";

		setTimeout("succesregspc()", 1000);
		}else{
			
			const { error }		= data;	document.getElementById("regwarning").innerHTML = error; 
				document.getElementById("regwarning").classList.replace("hide","show");		
		setTimeout("warnregpc()", 3000);
		}
})
.catch((e)=>console.log("error"))

return false
}





function postorder(){
	
	document.getElementById("postcarorder").disabled = true;
	document.getElementById("postcarorder").innerHTML = '<center><div class="spinning"></div></center>';
		var cariid =	document.getElementById("pomanid").value;
	var priceoffered =	document.getElementById("poprice").value;
		var originalamount =	document.getElementById("showpprice").innerText;
	
	fetch("/api/v1/order",{
		method:"POST",
		headers:new Headers({"Content-Type":"application/json; charset=UTF-8","Authorization":"Bearer "+localStorage.getItem('accessToken')}),
		body:JSON.stringify({"car_id" : cariid,"order_price" : priceoffered, "status" : "pending", "amount" : originalamount})
	})
	.then((res)=>res.json())
	.then((data)=>{
		if (data.status === 201){
			const { message } = data;
			document.getElementById("regsuccess").innerHTML = message;
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
			
	
	}else{
		const { error } = data;

document.getElementById("regwarning").innerHTML = error;
		document.getElementById("regwarning").classList.replace("hide","show");
		document.getElementById("regwarning").scrollIntoView({block: "center"});
		setTimeout(function (){
			document.getElementById("regwarning").classList.replace("show","hide");
			document.getElementById("postcarorder").disabled = false;
	document.getElementById("postcarorder").innerHTML = 'order';
		},3000)
	}
		
	})
	.catch((e)=>console.log("error"))
	
	
	return false;
	}
	
	
	
	
	
function editpo(thisid){
	let theid = thisid;
	let replace1 = theid.replace("editpo","")
	let replace2 = theid.replace("editpo","editp")
	let replace3 = theid.replace("editpo","edited");
var frets = document.getElementById(replace3).value;
	document.getElementById(replace2).disabled = true;
	document.getElementById(replace2).innerHTML = '<center><div class="spinning"></div></center>';
	fetch("/api/v1/order/"+replace1+"/price",{
		method:"PATCH",
		headers:new Headers({"Content-Type":"application/json; charset=UTF-8","Authorization":"Bearer "+localStorage.getItem('accessToken')}),
		body:JSON.stringify({"order_price":frets})
	})
	.then((res)=>res.json())
	.then((data)=>{
		if (data.status === 200) {
			const { message }=data;
			document.getElementById("regsuccess").innerHTML = message; 
		document.getElementById("regsuccess").classList.replace("hide","show");
		document.getElementById("regsuccess").scrollIntoView({block: "center"});
		
		setTimeout(function (){
			document.getElementById("regsuccess").classList.replace("show","hide");
			document.getElementById(replace2).disabled = false;
	document.getElementById(replace2).innerHTML = 'update price';
			closepo("clo"+replace1);
		},3000)
			}else{
				const { error }=data;
				document.getElementById("regwarning").innerHTML = error; 
		document.getElementById("regwarning").classList.replace("hide","show");
		document.getElementById("regwarning").scrollIntoView({block: "center"});
		setTimeout(function (){
			document.getElementById("regwarning").classList.replace("show","hide");
			document.getElementById(replace2).disabled = false;
			document.getElementById(replace2).innerHTML = 'update price';
			closepo("clo"+replace1);
		},3000);
				
			}
		
	})
	.catch((e)=>console.log("error"))
	
	
	return false
}





function marksold(thisid){
	let theid = thisid;
	let replace1 = theid.replace("soldbut","")
	let replace2 = theid.replace("soldbut","soldmask");
	document.getElementById(replace2).style.display = "table";
	document.getElementById(replace2).innerHTML = "<center><div style='position:absolute;top: calc(50% - 10.5px);right: calc(50% - 10.5px);' class='spinning'></div></center>";
	fetch("/api/v1/car/"+replace1+"/status",{
		method:"PATCH",
		headers:new Headers({"Authorization":"Bearer "+localStorage.getItem('accessToken')})
	}) 
	.then((res)=>res.json())
	.then((data)=>{
		if (data.status === 200) {
			const { message } = data;
			setTimeout(()=>{
					document.getElementById("regsuccess").innerHTML = message; 
		document.getElementById("regsuccess").classList.replace("hide","show");
		document.getElementById("regsuccess").scrollIntoView({block: "center"});
		setTimeout(function (){
			document.getElementById("regsuccess").classList.replace("show","hide");
		markssold(theid);
		},2000)
	}, 1000)
			
			}else{
				const { error } = data;
				document.getElementById("regwarning").innerHTML = error; 
		document.getElementById("regwarning").classList.replace("hide","show");
		document.getElementById("regwarning").scrollIntoView({block: "center"});
		setTimeout(function (){
			document.getElementById("regwarning").classList.replace("show","hide");
			document.getElementById(replace2).style.display = "none";
	document.getElementById(replace2).innerHTML = ""; 
	
		},2000)
				
			}
		
	})
	.catch((e)=>console.log("error"))
	
	return false;
	}
	
	
	
	
	
	function editadprice(thisid){
	let theid = thisid;
	let replace1 = theid.replace("editap","")
	let replace2 = theid.replace("editap","edita")
	let replace3 = theid.replace("editap","sedit");
var frest = document.getElementById(replace3).value;
	document.getElementById(replace2).innerHTML = "<center><div class='spinning'></div></center>";
	fetch("/api/v1/car/"+replace1+"/price",{
		method:"PATCH",
		headers:new Headers({"Content-Type":"application/json; charset=UTF-8","Authorization":"Bearer "+localStorage.getItem('accessToken')}),
		body:JSON.stringify({"price":frest})
	})
	.then((res)=>res.json())
	.then((data)=>{
		if(data.status === 200){
			const { message } = data;
			setTimeout(function (){
		document.getElementById("regsuccess").innerHTML = message;  
		document.getElementById("regsuccess").classList.replace("hide","show");
		document.getElementById("regsuccess").scrollIntoView({block: "center"});
		setTimeout(function (){
		closedit("cl"+replace1);	document.getElementById("regsuccess").classList.replace("show","hide");
		document.getElementById(replace2).innerHTML = "Update price";
		closedit("cl"+replace1);
		},2000)
	},1000);
			
		}else{
			const { error } = data;
			document.getElementById("regwarning").innerHTML = error; 
		document.getElementById("regwarning").classList.replace("hide","show");
		document.getElementById("regwarning").scrollIntoView({block: "center"});
		setTimeout(function (){
		closedit("cl"+replace1);	
		document.getElementById("regwarning").classList.replace("show","hide");
		document.getElementById(replace2).innerHTML = "Update price";
		},2000)
			
		}
	}) 
	
	
	return false;
	}
	
	
	
	
	
	function confirmrep(thisid){
	let theid = thisid;
	let replace1 = theid.replace("reportfor","");
	let replace2 = theid.replace("reportfor","reportwhy");
	let replace3 = theid.replace("reportfor","");

var fresty = document.getElementById(replace2).value;
	
		document.getElementById("rr"+replace1).style.display ="none";
		document.getElementById("reportwhy"+replace1).value ="";		
		document.getElementById("ralert"+replace1).innerHTML = '<center><div class="spinning"></div></center>';
		document.getElementById("ralert"+replace1).style.display ="block";
		fetch("/api/v1/flag/",{
			method:"POST",
			headers:new Headers({"Content-Type":"application/json; charset=UTF-8","Authorization":"Bearer "+localStorage.getItem('accessToken')}),
			body:JSON.stringify({"car_id" : replace3,"reason" : fresty,"description" : fresty})
		})
		.then((res)=>res.json())
		.then((data)=>{
			if(data.status === 201){
				const { message } = data;
				setTimeout(function(){
		document.getElementById("reportbut"+replace1).classList.replace("reporttab","reporttabs");
		document.getElementById("reportbut"+replace1).innerHTML ="reported";
		document.getElementById("ralert"+replace1).innerHTML = message; 
		document.getElementById("ralert"+replace1).scrollIntoView({block: "center"});
		setTimeout(function (){
			document.getElementById("rr"+replace1).style.display ="none";
			document.getElementById("ralert"+replace1).style.display ="none";
		},3000)
	}, 1000);
				
			}else{
				const { error } = data;
				
				document.getElementById("ralert"+replace1).innerHTML = error;
		setTimeout(function (){
			document.getElementById("rr"+replace1).style.display ="none";
			document.getElementById("ralert"+replace1).style.display ="none";
		},3000)
				
			}
			
		})
		.catch((e)=>console.log("error"))
		
		
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