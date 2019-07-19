function stilllog(tab){
	
	fetch("https://thawing-beach-89294.herokuapp.com/me",{
		method:"GET",
		headers:new Headers({"Authorization": "Bearer "+localStorage.getItem('accessToken')}),
	})
	.then((res)=>res.json())
	.then((data)=>{
		//console.log(data);
		if (data.status === 200){
		const  {user}  = data.description;
		//console.log(user);
		
	 dsession = user;
		sessionStorage.setItem('myId',dsession.id);
		sessionStorage.setItem('myEmail',dsession.email);

		
		if (window.location.pathname == "/automart/index.html" || window.location.pathname == "/automart") {
document.getElementById("notloged").style.display = "none";
   document.getElementById("fpintab").classList.replace("show","hide"); document.getElementById("nowloged").style.display = "block";
   document.getElementById("profilename").innerHTML = dsession.name+" "+dsession.lname;
   document.getElementById("spinn").innerHTML = "Email: "+dsession.email;
   document.getElementById("fpinn").innerHTML = "Address: "+dsession.address;
   setTimeout(()=>rightSlide("tpin"),1000);
  }else{
		sessionStorage.setItem('myId',dsession.id);
		sessionStorage.setItem('myEmail',dsession.email);
		console.log(sessionStorage.getItem('myEmail'));
				document.getElementById("userspace").innerHTML = "<a href='index.html'><img src='image/uicon.jpg' width='25px' >"+dsession.email+"</a>";
  	var stroom = 0;
var stoopt = stroom + 3;
  shhowmyads(dsession.email,stroom,stoopt);
 if(tab === 3) showmyorder(dsession.id,stroom,stoopt,0);
if(tab === 4) showmyoffers(dsession.id,stroom,stoopt,0);
}
}else{
	console.log("not logged in")
	
}
paginateallcars(0);
		
	})
	.catch((e)=>console.log(e))
		
}


function showmyorder(myid,showstart,showend,state){
	let apiprefix = `/order?`;
	apiprefix += `&buyer=${myid}`
	fetch(apiprefix,{
		method:"GET",
		headers:new Headers({"Content-Type": "application/json; charset=UTF-8","Authorization": "Bearer "+localStorage.getItem('accessToken')})
	})
	.then((res)=>res.json())
	.then((data)=>{
		if(data.status === 200){
		if(state === 0)	document.getElementById("mypendingo").innerHTML = "";	
		else
		document.getElementById("mypendingo").innerHTML = "<div style='height:100px;width:50%'><div class='roller'></div></div>";	
if(showend > data.data.length)
showend = data.data.length;

document.getElementById("seesmore").innerHTML = "";

if(data.data.length > 3){
	if(data.data.length > showend)
document.getElementById("seesmore").innerHTML += `<a onclick='showmyorder(${myid},${showstart + 3},${showend +3},1)' class='next'><img src="image/whiteicon/next.png" width="15px"></a>`;

if(showstart > 0){
	let nstrt = showstart - 3;
	let nend = nstrt + 3;
document.getElementById("seesmore").innerHTML += `<a onclick='showmyorder(${myid},${nstrt},${nend},1)' class='prev'><img src="image/whiteicon/back.png" width="15px"></a>`;
}
}
document.getElementById("mypendingo").innerHTML = "";	
			for(let t=showstart; t < showend; t++){
				const { id,buyer,car_id,amount,price_offered, status,created_on,manufacturer,model } = data.data[t];
				if(status == "pending"){
				var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
				
				let inmyorder = "<div class='orderlist'>"
							
							+"<div class='slanted'></div>"
						 +"<span class='manu'>"+manufacturer+" "+model+"</span><hr/>"
						 +"<span class='carcond' id='rey"+id+"'>Price: "+formatter.format(amount)+"</span>" 
						 +"<span id='clo"+id+"'  class='closes' onclick='closepo(this.id)'>&#10006</span><span class='hide' id='cloo"+id+"'>"
						 +"<form id='editpo"+id+"' method='POST' onsubmit='return editpo(this.id)'>"
+"<input id='edited"+id+"' class='orderinp' type='number' value='"+price_offered+"' >"
+"<button id='editp"+id+"' class='updatebut' type='submit' >update price</button>"
+"<div class='fn'></div>"
+"</form>"
+"</span>"
+"<div id='epo"+id+"' class='aref' tabindex='0' onclick='editop(this.id)' >Edit Price</div>"
						+"</div>"
						+"<br/>";
						
	document.getElementById("mypendingo").innerHTML += 	inmyorder;				
				}
				
			}
			if(state !== 0)
			document.getElementById("mypendingo").scrollIntoView({block:"start",behavior:"smooth"})
			
			
		}
	})
	.catch((e)=>console.log(e))
	
}


function showmyoffers(myid,showstart,showend,state){
	let apiprefix = `/order?`;
	apiprefix += `&seller=${myid}`;
	apiprefix += `&status=pending`;
	fetch(apiprefix,{
		method:"GET",
		headers:new Headers({"Content-Type": "application/json; charset=UTF-8","Authorization": "Bearer "+localStorage.getItem('accessToken')})
	})
	.then((res)=>res.json())
	.then((data)=>{
		if(data.status === 200){
		if(state === 0)	document.getElementById("moff").innerHTML = "";	
		else
		document.getElementById("moff").innerHTML = "<div style='height:100px;width:50%'><div class='roller'></div></div>";	
if(showend > data.data.length)
showend = data.data.length;

document.getElementById("seessmore").innerHTML = "";

if(data.data.length > 3){
	if(data.data.length > showend)
document.getElementById("seessmore").innerHTML += `<a onclick='showmyoffers(${myid},${showstart + 3},${showend +3},1)' class='next'><img src="image/whiteicon/next.png" width="15px"></a>`;

if(showstart > 0){
	let nstrt = showstart - 3;
	let nend = nstrt + 3;
document.getElementById("seessmore").innerHTML += `<a onclick='showmyoffers(${myid},${nstrt},${nend},1)' class='prev'><img src="image/whiteicon/back.png" width="15px"></a>`;
}
}
document.getElementById("moff").innerHTML = "";	
			for(let t=showstart; t < showend; t++){
				const { id,buyer,car_id,amount,price_offered, status,created_on,manufacturer,model } = data.data[t];
			
				var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
				
				let inmyorder = "<div class='orderlisted'>"
						 +"<span class='manu'>"+manufacturer+" "+model+"</span><hr/>"
						 +"<span class='carcond' id='reyt"+id+"'>Price:"+formatter.format(amount)+"</span>" 
						 +"<span id='clot"+id+"'  class='closes' onclick='closepot(this.id)'>&#10006</span>"
 +"<span class='hide' id='cloot"+id+"'>"
+"<div class='lefts'><a >Contact Buyer</a></div>"
+"<br/>"
+"Price offered:"+formatter.format(price_offered)
+"<br/>"
+"<button id='accpo"+id+"' onclick='acceptorder(this.id)'  class='padsbuttons' type='submit' >accept</button><button id='rejpo"+id+"' onclick='rejectorder(this.id)'  class='padsbuttons' type='submit' >reject</button>"
+"<div class='fn'></div>"
+"</span>"
+"<div id='vpo"+id+"' class='aref' tabindex='0' onclick='viewop(this.id)' >&nbsp;view&nbsp;</div>"
						+"</div>"
						+"<br/>";
						
	document.getElementById("moff").innerHTML += 	inmyorder;				
				
				
			}
			if(state !== 0)
			document.getElementById("moff").scrollIntoView({block:"start",behavior:"smooth"})
			
		}
	})
	.then((f)=>seenorder(myid))
	.catch((e)=>console.log(e))
	
}







function seenorder(myid){
	let apiprefix = `/order?`;
	apiprefix += `&seller=${myid}`;
	apiprefix += `&statuses=pending`;
	fetch(apiprefix,{
		method:"GET",
		headers:new Headers({"Content-Type": "application/json; charset=UTF-8","Authorization": "Bearer "+localStorage.getItem('accessToken')})
	})
	.then((res)=>res.json())
	.then((data)=>{
		if(data.status === 200){
			document.getElementById("mmoff").innerHTML = "";	

let showstart=0;
let showend=3;			
if(showend > data.data.length)
showend = data.data.length;


document.getElementById("mmoff").innerHTML = "";	
			document.getElementById("mmoff").scrollIntoView({block:"start",behavior:"smooth"})
			for(let t=showstart; t < showend; t++){
				const { id,buyer,car_id,amount,price_offered, status,created_on,manufacturer,model } = data.data[t];
			
				var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
				
				let inmyorder = "<div class='orderlistee'>";
				if(status == "accepted"){
				inmyorder +=" <span class='leftss'>"+status+"</span>";
				}
				inmyorder +="&nbsp; &nbsp; &nbsp;<span class='manu'>"+manufacturer+" "+model+"</span><hr/>"
						 +"<span class='carcond' >Price: "+formatter.format(price_offered)+"</span> </div>"
						+"<br/>";
						
	document.getElementById("mmoff").innerHTML += 	inmyorder;				
				
				
			}
			
		}
	})
	.catch((e)=>console.log(e))
	
}







function acceptorder(thisid){
	
	let theid = thisid.replace("accpo","");
//alert(theid);
	document.getElementById(thisid).innerHTML = '<center><div class="spinning"></div></center>';
	document.getElementById(thisid).disabled = true;
	fetch("https://thawing-beach-89294.herokuapp.com/order/status/"+theid,{
		method:"PATCH",
		headers:new Headers({"Content-Type": "application/json; charset=UTF-8","Authorization": "Bearer "+localStorage.getItem('accessToken')})
	})
	.then((res)=>res.json())
	.then((data)=>{
		if(data.status === 200){
			const { message }=data;
			document.getElementById("regsuccess").innerHTML = message; 
		document.getElementById("regsuccess").classList.replace("hide","show");
		document.getElementById("regsuccess").scrollIntoView({block: "center"});
		
		setTimeout(function (){
			document.getElementById("regsuccess").classList.replace("show","hide");
			document.getElementById(thisid).innerHTML = "accept";
			document.getElementById(thisid).disabled = false;
			showoffer();

		},3000)

		}else{
			const { error } = data;
			document.getElementById("regwarning").innerHTML = error;
		document.getElementById("regwarning").classList.replace("hide","show");
		
		setTimeout(function(){
			document.getElementById("regwarning").classList.replace("show","hide");
			document.getElementById(thisid).innerHTML = "accept";
			document.getElementById(thisid).disabled = false;
			document.getElementById("regwarning").innerHTML = "";
			
		}, 2000);
				
			}
	})
	.catch((e)=>console.log(e))
	
	
}








	function shhowmyads(myemail,showstart,showend){
	let emailquery =`https://thawing-beach-89294.herokuapp.com/car?`;
emailquery +=`&email=${myemail}`;

	fetch(emailquery,{
		method:"GET",
		headers:new Headers({"Content-Type": "application/json; charset=UTF-8","Authorization": "Bearer "+localStorage.getItem('accessToken')})
	})
	.then((res)=>res.json())
	.then((data)=>{
		if(data.status === 200 && data.data.length > 0){
		if(showend > data.data.length)
		showend = data.data.length;
			document.getElementById("myadds").innerHTML = "";

			document.getElementById("moreorless").innerHTML ="";
			
			if(data.data.length > 3){
	
	if(showend < data.data.length)	document.getElementById("moreorless").innerHTML +=`<div onclick="shhowmyads('${myemail}',${showstart+3},${showend+3})" class='next'><img src="image/whiteicon/next.png" width="20px"></div>`;
	
	
if((showstart-3) >= 0){
document.getElementById("moreorless").innerHTML +=`<div onclick="shhowmyads('${myemail}',${showstart-3},${showstart})" class='prev'><img src="image/whiteicon/back.png" width="20px"></div>`;
}
	if(showstart !== 0)	document.getElementById("myadds").scrollIntoView({block:"start",behavior:"smooth"})
	
	}
			
			
			for(let md=showstart; md < showend; md++){
				
					const { id,email,owner,created_on,manufacturer,model,price,state,engine_size,body_type,image_url,status } = data.data[md];
			var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});



////////{one car}//{{{/////}}}////{{}}
var lonecar = 	"<div class='adsbox'>";
	if(status == "available"){
				lonecar	+="<div id='soldmask"+id+"' class='sold'><span>SOLD!</span></div>";
				}
						else{
					 	lonecar	+="<div id='soldmask"+id+"' class='solds'><span>SOLD!</span></div>";
					 	}
							lonecar	+="<div class='imgcontain'><a id='single"+id+"' onclick='opensingle(this.id,0)' href'#'><img src='"+image_url.split("<>")[0].replace("w_150,c_scale/","")+"'></a>";
								if(status == "available"){
										lonecar +="<div class='mark'>"
									+"<button class='pintab' onclick='marksold(this.id)' id='soldbut"+id+"'>mark as sold</button>"
									+"</div>"
									
										+"<div class='priceedit'>"
									+"<center>"
									
					 +"<form id='editap"+id+"' method='POST' onsubmit='return  editadprice(this.id)'>"
										+"<input type='number' value='"+price+"' class='sedit' id='sedit"+id+"'>"
			+"<button id='edita"+id+"' type='submit' class='pintabw hide'>Update price</button></form>"
			+"<button id='ep"+id+"' class='pintab ep' onclick='pedit(this.id)'>Edit price</button><center><span id='cl"+id+"'  class='cl' onclick='closedit(this.id)'>&#10006</span></center>"
								+"</div>";}
								
									
								lonecar += "</div>"
							
							+"<div class='orangetablev'>"
							+"<div class='intp'>"
								+"<div class='dinsyd'>"
									+"<span class='manu'>"+manufacturer+" "+model+"</span>"
									+"<hr/>"
									+"<span class='carcond'>"
										+"Condition &nbsp;:&nbsp;"+state
										+"</span>"
									+"</div>"
									+"<div class='pricein'>"
									+"PRICE"
										+"<br/>"
										+formatter.format(price)
										+"</div>"
							+"<div class='slant'>"
								+"</div>"
							+"</div>"
							+"</div>";


document.getElementById("myadds").innerHTML += lonecar ;



/////{{{{/////{{{/////////}}}////////}}}}


				
			}
			
		}
		
	})
	.catch((e)=>console.log(e))
	
}


///////////populate div with cars/////////
ddsort();

function paginateallcars(thestart){
	let sttrt = parseInt(thestart)
	var strom = sttrt;
var stopt = strom + 6;
if(strom !== 0)
document.getElementById("allcars").innerHTML = "<div style='height:100px;width:50%'><div class='roller'></div></div>";
populateallcars(strom,stopt);
}
function
 populateallcars(startfrom,stopat){
	 let sortmanu = document.getElementById("thesortmanu").value;
	 let sortbody = document.getElementById("thesortbody").value;
	 let sortstate = document.getElementById("thesortstate").value;
	 let sortmin = document.getElementById("thesortmin").value;
	 let sortmax = document.getElementById("thesortmax").value;

	let availablequery ="https://thawing-beach-89294.herokuapp.com/allcars?";
availablequery +="&status=available";
if(sortmanu  != "")
availablequery +="&manufacturer="+sortmanu;
if(sortbody  != "")
availablequery +="&body_type="+sortbody;
if(sortstate  != "")
availablequery +="&state="+sortstate;
if(sortmin  != "")
availablequery +="&min_price="+sortmin;
if(sortmax  != "")
availablequery +="&max_price="+sortmax;




const sessionId = sessionStorage.getItem('myId');

fetch(availablequery,{
	method:"GET",
	headers : new Headers({"Content-Type": "application/json; charset=UTF-8"})
})
.then((res)=>{ return res.json() })
.then((data)=>{
	if(data.status === 200 && data.data.length > 0){
		for(let jk=0; jk<data.data.length; jk++){
			const { manufacturer,body_type } = data.data[jk];
			document.getElementById("thesortmanu").innerHTML += `<option value="${manufacturer}">${manufacturer}</option>`;
			document.getElementById("thesortbody").innerHTML += `<option value="${body_type}">${body_type}</option>`;
		}

document.getElementById("allcars").innerHTML = "";

if(stopat > data.data.length)
stopat = data.data.length;

if(data.data.length > 6){
	document.getElementById("pagina").innerHTML = "";
	let pagenum = Math.ceil(data.data.length/6);
	
	for(let k=1; k<=pagenum; k++){
		if(k == 1)
		var kb = 0;
		else{
			var kb = k - 1;
			var kb = kb * 6;
		}
	if(k<6){	
	let inpagenub = `&nbsp;<a `;
	if(startfrom == kb)
	 inpagenub +=`style='color:blue;font-size:16;cursor:pointer' `;
	 else
	 inpagenub +=`style='color:white;cursor:pointer' `;
	 
	  inpagenub +=`onclick='paginateallcars(${kb})'>${k}</a>&nbsp; `;
	  document.getElementById("pagina").innerHTML +=inpagenub;
	  }
	else
	document.getElementById("pagina").innerHTML += "...";
	}
if(stopat < data.data.length)	document.getElementById("pagina").innerHTML +=`<div onclick='paginateallcars(${stopat})' class='next'><img src="image/whiteicon/next.png" width="20px"></div>`;
if((startfrom-6) >= 0){
	let setstart = startfrom-6;
document.getElementById("pagina").innerHTML +=`<div onclick='paginateallcars(${setstart})' class='prev'><img src="image/whiteicon/back.png" width="20px"></div>`;
}

if(startfrom !== 0)
			document.getElementById("allcars").scrollIntoView({block:"start",behavior:"smooth"})


}
		for(let i=startfrom ; i < stopat; i++){
			const { id,email,owner,created_on,manufacturer,model,price,state,engine_size,body_type,image_url,status } = data.data[i];
			var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

		var onecar ="<div class='adsbox'>"
							+"<div class='imgcontain'><a id='single"+id+"' onclick='opensingle(this.id,0)' href='#'><img src='"+image_url.split("<>")[0].replace("w_150,c_scale/","")+"'></a></div>";
							if(sessionId != owner){
						onecar +="<div class='ralerts' id='rr"+id+"'>"
									+"<form id='reportfor"+id+"' method='POST' onsubmit='return  confirmrep(this.id)'>"
										+"<textarea id='reportwhy"+id+"' class='ereport' placeholder='reason for reporting' ></textarea>"  
										+"<br/>"
										+"<button id='confirmr"+id+"' class='pintabw' type='submit'>submit</button>"
									+"</form>"
								+"</div>"
							+"<div id='ralert"+id+"' class='ralerts'>Thanks, your report is sent. It will be investigated and acted upon accordingly</div>"
							+"<div class='mark'>"
									+"<button class='reporttab' onclick='reportad(this.id)' id='reportbut"+id+"'>report</button>"
									+"</div>"
									+"<div class='marks'>"
									+"<spansessionId class='reporttaby' onclick='order(this.id)' id='orderbut"+id+"'><img src='image/icons/shopping-cart.png' height='20px'>order</span>"
									+"</div>";
									}
									
									
									
						onecar +="<div class='orangetablep'>"	
							+"<div class='intp'>"
								+"<div class='dinsyd'>"
									+"<span class='manu'>"+manufacturer+" "+model+"</span>"
									+"<hr/>"
									+"<span class='carcond'>"
										+"Condition &nbsp;:&nbsp; "+state
										+"</span>"
									+"</div>"
									+"<div class='pricein'>"
										+"PRICE"
										+"<br/>"
										+formatter.format(price)
										+"</div>"
							+"<div class='slant'>"
								+"</div>"
							+"</div>"
							+"</div>"
							+"<span class='hide' id='smanu"+id+"'>"+manufacturer+" "+model+"</span>"
							"<span class='hide' id='scolor"+id+"'>"+body_type+"</span>"
								+"<span class='hide' id='scond"+id+"'>"+state+"</span>"
							+"<span class='hide' id='samount"+id+"'>"+price+"</span>"
							
						+"</div>";	document.getElementById("allcars").innerHTML += onecar;
		}
	}else{
		document.getElementById("allcars").innerHTML = "NO car found please refresh";
	}
})
.then((b)=>sessionStorage.clear('myId'))
.catch((e)=>console.log(e))

}

////////////////////////////////////{{{{}}}}






function signup(){
document.getElementById("regg").disabled = true;
document.getElementById("regg").innerHTML = '<center><div class="spinning"></div></center>';



var remail =	document.getElementById("regemail").value;
	var rfname =	document.getElementById("regfname").value;
	var rlname =	document.getElementById("reglname").value;
	var rpwd =	document.getElementById("regpwd").value;
	var radd =	document.getElementById("regadd").value;

fetch('https://thawing-beach-89294.herokuapp.com/auth/signup', { 
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
	fetch("https://thawing-beach-89294.herokuapp.com/auth/signin", {
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
	fetch("https://thawing-beach-89294.herokuapp.com/user/"+retemaill+"/reset_password",{
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
		fetch("https://thawing-beach-89294.herokuapp.com/user/"+retemaill+"/reset_password",{
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

fetch("https://thawing-beach-89294.herokuapp.com/car",{
	method:"POST",
	headers:new Headers({"Content-Type":"application/json; charset=UTF-8","Authorization":"Bearer "+localStorage.getItem('accessToken')}),
	body:JSON.stringify({"manufacturer" : pcman , "model" : pcmodel,"body_type" : pccolor , "engine_size" : pces, "price" : pprice,"state" : stateocar,"image_url" : pcpics})
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
	
	fetch("https://thawing-beach-89294.herokuapp.com/order",{
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

document.getElementById("orderimg").classList.replace("show","hide");
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
	fetch("https://thawing-beach-89294.herokuapp.com/order/"+replace1+"/price",{
		method:"PATCH",
		headers:new Headers({"Content-Type":"application/json; charset=UTF-8","Authorization":"Bearer "+localStorage.getItem('accessToken')}),
		body:JSON.stringify({"price":frets})
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
	fetch("https://thawing-beach-89294.herokuapp.com/car/"+replace1+"/status",{
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
	fetch("https://thawing-beach-89294.herokuapp.com/car/"+replace1+"/price",{
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
		fetch("https://thawing-beach-89294.herokuapp.com/flag/",{
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

if(window.location.pathname == "/postad.html" || window.location.pathname == "/automart/postad.html"){

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