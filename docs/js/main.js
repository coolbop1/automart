function openpassf(){
	document.getElementById("retrievebut").innerHTML="Change Password";
document.getElementById("changepasbut").classList.replace("show","hide");
document.getElementById("firstpass").classList.replace("hide","show");
document.getElementById("secpass").classList.replace("hide","show");
}
function forgopass(){	document.getElementById("signinform").classList.replace("show","hide");
	document.getElementById("retrieveform").classList.replace("hide","show")
document.getElementById("backbut").classList.replace("hide","show")
}
function backtotab(){
document.getElementById("retrievebut").innerHTML="Get Password";	document.getElementById("changepasbut").classList.replace("hide","show");
document.getElementById("firstpass").classList.replace("show","hide");
document.getElementById("secpass").classList.replace("show","hide");
	
	document.getElementById("backbut").classList.replace("show","hide")
document.getElementById("retemail").value = "";	document.getElementById("signinform").classList.replace("hide","show");
	document.getElementById("retrieveform").classList.replace("show","hide")
}
function editpot(thisid){
	let theid = thisid;
	let replace2 = theid.replace("editpo","edited");
let fret = document.getElementById(replace2).value;	sessionStorage.setItem('peditprice',fret);
}



function opennav(){

		if(document.getElementById("topnav").style.display == false || document.getElementById("topnav").style.display == "none" ){
		document.getElementById("topnav").style.display = "block"; 
		document.getElementById("pmenu").innerHTML = "&#10006";
		document.getElementById("touchlist").classList.replace("hide","show");
		document.body.style.overflow = "hidden";
	}else if(document.getElementById("topnav").style.display == "block"){
		document.getElementById("topnav").style.display = "none";
		document.getElementById("pmenu").innerHTML = "<img src='image/menu.png' >";
		document.getElementById("touchlist").classList.replace("show","hide");
		document.body.style.overflow = "auto";

		
	}
	else{
		document.getElementById("topnav").style.display = "none";
		document.getElementById("pmenu").innerHTML = "<img src='image/menu.png' >";
		document.getElementById("touchlist").classList.replace("show","hide");
		document.body.style.overflow = "auto";

	}
	

}
function opennavs(){
	if(document.getElementById("topnav").style.display == "block"){
document.getElementById("topnav").style.display = "none";
		document.getElementById("pmenu").innerHTML = "<img src='image/menu.png' >";
		}
}
function rightSlide(slideid) {
	 opennavs();
	 document.getElementById("touchlist").classList.replace("show","hide");
	 document.body.style.overflow = "auto";

	var elem = document.getElementById(slideid+"tab"); 
	//elem.style.opacity= 1;
	if(slideid == "fpin"){
		let elems = document.getElementById("spintab");
		let lems = document.getElementById("tpintab");
			
			elems.classList.replace("righttab", "righttabs");
			lems.classList.replace("righttab", "righttabs");
			elem.classList.replace("righttabs", "righttab");
			elem.classList.replace("tab", "tabtab");
			elems.classList.replace("tabtab", "tab");
			lems.classList.replace("tabtab", "tab");
			elem.classList.replace("hide", "show");
			elems.classList.replace("show", "hide");
			lems.classList.replace("show", "hide");
			document.getElementById("fpin").style.background ="#bf3f3f";
			document.getElementById("spin").style.background ="inherit";
			document.getElementById("tpin").style.background ="inherit";

	}else if(slideid == "spin"){
		let elems = document.getElementById("fpintab");
		let lems = document.getElementById("tpintab");
		elems.classList.replace("righttab", "righttabs");
			lems.classList.replace("righttab", "righttabs");
			elem.classList.replace("righttabs", "righttab");
			elem.classList.replace("tab", "tabtab");	
			elems.classList.replace("tabtab", "tab");
			lems.classList.replace("tabtab", "tab");
			elem.classList.replace("hide", "show");
			elems.classList.replace("show", "hide");
			lems.classList.replace("show", "hide");
			document.getElementById("fpin").style.background ="inherit";
	document.getElementById("spin").style.background ="#bf3f3f";
	document.getElementById("tpin").style.background ="inherit";
		
	}else{
		let elems = document.getElementById("fpintab");
		let lems = document.getElementById("spintab");
		elems.classList.replace("righttab", "righttabs");
			lems.classList.replace("righttab", "righttabs");
			elem.classList.replace("righttabs", "righttab");
			elem.classList.replace("tab", "tabtab");
			elems.classList.replace("tabtab", "tab");
			lems.classList.replace("tabtab", "tab");
			elem.classList.replace("hide", "show");
			elems.classList.replace("show", "hide");
			lems.classList.replace("show", "hide");
	document.getElementById("tpin").style.background ="#bf3f3f";
	document.getElementById("spin").style.background ="inherit";
	document.getElementById("fpin").style.background ="inherit";

	}

}


function ddsort(){
	document.getElementById("indexads").scrollIntoView({"block":"start","behavior":"smooth"})
	document.getElementById("postedd").classList.replace("show", "hide");
		document.getElementById("findfilt").classList.replace("hide", "show");
	setTimeout(()=>{
		document.getElementById("postedd").classList.replace("hide", "show");
		
		document.getElementById("findfilt").classList.replace("show", "hide");
		stopfilter();
		},2000)
		

		
}
function openfilter(){
	var cliked = document.getElementById("pickload");
	var rquery = document.getElementById("mainsort");
	var bquery = document.getElementById("subsort");
	cliked.innerHTML = "<a onclick='stopfilter()'>&#10006 &nbsp;</a>";
	rquery.classList.replace("hide","show");
	bquery.classList.replace("hide","show");	
	
}
function stopfilter(){
		var cliked = document.getElementById("pickload");
	var rquery = document.getElementById("mainsort");
	var bquery = document.getElementById("subsort");
	cliked.innerHTML = "<a onclick='openfilter()'><img src='image/filter.png' width='20px'> Filter</a>";
		rquery.classList.replace("show","hide");
	bquery.classList.replace("show","hide");	
	
}
function closetab(){
backtotab();	document.getElementById("spintab").classList.replace("righttab", "righttabs");
document.getElementById("spintab").classList.replace("tabtab", "tab"); 
	document.getElementById("fpintab").classList.replace("righttab", "righttabs");
document.getElementById("fpintab").classList.replace("tabtab", "tab");
	document.getElementById("tpintab").classList.replace("righttab", "righttabs");
document.getElementById("tpintab").classList.replace("tabtab", "tab");

	//document.getElementById("forsearch").style.left = "27.5%"; 
}
function showpage(){
	setTimeout(() =>{
document.getElementById("loading").classList.replace("show", "hide") 
	}, 1000)
}
function showmyads(){
opennavs();
document.getElementById("touchlist").classList.replace("show","hide");
document.body.style.overflow = "auto";

document.getElementById("myadsti").innerHTML = "My Ads";
document.getElementById("myadsti").style.display ="block";
	document.getElementById("posted").style.display ="block";	
	document.getElementById("postform").style.display = "none";	
	document.getElementById("prequest").style.display = "none"; 
document.getElementById("poffered").style.display = "none";   
	
	
	document.getElementById("navsord").style.background ="inherit";
document.getElementById("navmad").style.background ="#bf3f3f";
document.getElementById("navsad").style.background ="inherit";
document.getElementById("navsoff").style.background ="inherit";
document.getElementById("myadsti").scrollIntoView({block:"start",behavior:"smooth"});
}
function showpostad(){
opennavs();
document.getElementById("touchlist").classList.replace("show","hide");
document.body.style.overflow = "auto";

document.getElementById("myadsti").innerHTML = "Create Ad"
document.getElementById("myadsti").style.display ="block";	
document.getElementById("posted").style.display = "none";
document.getElementById("postform").style.display = "block";
document.getElementById("prequest").style.display = "none";
document.getElementById("poffered").style.display = "none";  
	
	
	document.getElementById("navsord").style.background ="inherit";
document.getElementById("navmad").style.background ="inherit";
document.getElementById("navsad").style.background ="#bf3f3f";
document.getElementById("navsoff").style.background ="inherit";

document.getElementById("myadsti").scrollIntoView({block:"start",behavior:"smooth"});
	
}
function showorder(){
opennavs();
document.getElementById("touchlist").classList.replace("show","hide");
document.body.style.overflow = "auto";

document.getElementById("myadsti").innerHTML = "Place Order"
document.getElementById("myadsti").style.display ="block";	
document.getElementById("prequest").style.display = "block";
document.getElementById("poffered").style.display = "none";  
	document.getElementById("posted").style.display = "none";
	document.getElementById("postform").style.display = "none";
  document.getElementById("navsord").style.background ="#bf3f3f";
document.getElementById("navmad").style.background ="inherit";
document.getElementById("navsad").style.background ="inherit";
document.getElementById("navsoff").style.background ="inherit";

  stilllog(3);
  document.getElementById("myadsti").scrollIntoView({block:"start",behavior:"smooth"});
  
}

function showoffer(){
opennavs();
document.getElementById("touchlist").classList.replace("show","hide");
document.body.style.overflow = "auto";

document.getElementById("myadsti").innerHTML = "My offers"
document.getElementById("myadsti").style.display ="block";	
document.getElementById("prequest").style.display = "none";
document.getElementById("poffered").style.display = "block";  
	document.getElementById("posted").style.display = "none";
	document.getElementById("postform").style.display = "none";
  document.getElementById("navsord").style.background ="inherit";
document.getElementById("navmad").style.background ="inherit";
document.getElementById("navsad").style.background ="inherit";
document.getElementById("navsoff").style.background ="#bf3f3f";
stilllog(4);
  document.getElementById("myadsti").scrollIntoView({block:"start",behavior:"smooth"});
}


function pedit(clickedbox){
	let but = clickedbox;
	let rep = but.replace("ep","sedit");	
	let repcl =	but.replace("ep","cl");	
	let repcla =	but.replace("ep","edita");	
	document.getElementById(repcla).classList.replace("hide","show");		 document.getElementById(rep).style.display = "block";
	document.getElementById(repcl).style.display = "block";	document.getElementById(clickedbox).style.display = "none";

}
function closedit(clsbox){
	let but = clsbox;
	let rep = but.replace("cl","sedit");	
	let repcl =	but.replace("cl","ep");
	let repcla =	but.replace("cl","edita");	
document.getElementById(repcla).classList.replace("show","hide");	
document.getElementById(rep).style.display = "none";
document.getElementById(clsbox).style.display = "none";	
document.getElementById(repcl).style.display= "block";
}
function editop(thisid){
	let eid = thisid;
	let leid = eid.replace("epo","rey");
	let meid = eid.replace("epo","edited");
	let cleid = eid.replace("epo","clo");
	let dleid = eid.replace("epo","cloo");
	document.getElementById(leid).style.display = "none";
	document.getElementById(meid).style.display = "block";
	document.getElementById(cleid).style.display = "block";
	document.getElementById(dleid).style.display = "block";
	document.getElementById(eid).innerHTML = "Update Price";
}
function viewop(thisid){
let eid = thisid;
let leid = eid.replace('vpo','reyt');
let cleid = eid.replace('vpo','clot');
let dleid = eid.replace("vpo","cloot");
document.getElementById(leid).style.display = "none";
document.getElementById(cleid).style.display = "block";
document.getElementById(dleid).style.display = "block";
}
function closepot(thisid){
	let eid = thisid;
	let leid = eid.replace("clot","reyt");
	let cleid = eid.replace("clot","vpo");
		let dleid = eid.replace("clot","cloot");
	document.getElementById(leid).style.display = "block";
	
	document.getElementById(eid).style.display = "none";
	document.getElementById(dleid).style.display = "none";

}
function closepo(thisid){
	let eid = thisid;
	let leid = eid.replace("clo","rey");
	let meid = eid.replace("clo","edited");
	let cleid = eid.replace("clo","epo");
		let dleid = eid.replace("clo","cloo");
	document.getElementById(leid).style.display = "block";
	document.getElementById(meid).style.display = "none";
	document.getElementById(eid).style.display = "none";
	document.getElementById(dleid).style.display = "none";
	document.getElementById(cleid).innerHTML = "Edit Price";

}
function markssold(thisid){
	let theid = thisid;
	let replace1 = theid.replace("soldbut","soldmask");
	document.getElementById(replace1).style.display = "table";
	document.getElementById(replace1).innerHTML = "<span>SOLD!</span>";
}
function reportad(thisid){
	let theid = thisid;

	let replace2 = theid.replace("reportbut","rr");

	document.getElementById(replace2).style.display = "block";
}
function confirmre(thisid){
	let theid = thisid.replace("confirmr","reportbut");
	let replace1 = thisid.replace("confirmr","ralert");
	let replace2 = thisid.replace("confirmr","rr");
	document.getElementById(replace2).style.display = "none";
	document.getElementById(replace1).style.display = "block";
	document.getElementById(theid).className = "reporttabs";
	document.getElementById(theid).innerHTML = "flagged";
	setTimeout(function(){
		document.getElementById(replace1).style.display = "none";
	}, 3000);
}
function cls(){	document.getElementById("overlay").style.display = "none";
document.body.style.overflow = "auto";
}
function opensingle(thisid,thisimage){
let theid = parseInt(thisid.replace("single",""));
let nextImage = thisimage+1
let prevImage = thisimage-1
	document.getElementById("inoverlay").innerHTML= "<div class='roller'></div>";
	document.body.style.overflow = "hidden";	
	document.getElementById("overlay").style.display = "block";
fetch("/allcars/"+theid,{
	method:"GET",
	headers : new Headers({"Content-Type": "application/json; charset=UTF-8"})
})
.then((res)=>res.json())
.then((data)=>{
	if(data.status === 200){
		const { id,email,owner,created_on,manufacturer,model,price,state,engine_size,body_type,image_url,status } = data.data[0];
		let imageArr = image_url.split("<>");
		let imagelength = imageArr.length-1;
	
		
			const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
document.getElementById("inoverlay").innerHTML="<div id='nextimage' onclick='opensingle(`single"+id+"`,"+nextImage+")' class='hide next'><img src='image/whiteicon/next.png' width='20px'></div><div id='previmage' onclick='opensingle(`single"+id+"`,"+prevImage+")' class='hide prev'><img src='image/whiteicon/back.png' width='20px'></div><img class='inoimg' src='"+imageArr[thisimage].replace("w_150,c_scale/","")+"'>";
document.getElementById("fmanudetail").innerHTML= manufacturer+" "+model;
document.getElementById("fstatedetail").innerHTML= state;
document.getElementById("fpricedetail").innerHTML= formatter.format(price);
document.getElementById("femaildetails").innerHTML= email;
	if(prevImage >= 0)
	document.getElementById("previmage").classList.replace("hide","show");
	else
	document.getElementById("previmage").classList.replace("show","hide");
	
	if(imagelength > 1 && nextImage < imagelength)
		document.getElementById("nextimage").classList.replace("hide","show");
		else
		document.getElementById("nextimage").classList.replace("show","hide")

	}
})
.catch((e)=>console.log(e));
	
}
function showsold(){
	document.getElementById("pickedtitle").innerHTML = "Sold";
	document.getElementById("soldbox").style.display = "block";
	document.getElementById("unsoldbox").style.display = "none";
	document.getElementById("reportedbox").style.display = "none";
}
function showunsold(){
	document.getElementById("pickedtitle").innerHTML = "Unsold";
	document.getElementById("soldbox").style.display = "none";
	document.getElementById("unsoldbox").style.display = "block";
	document.getElementById("reportedbox").style.display = "none";
}
function showreported(){
	document.getElementById("pickedtitle").innerHTML = "Reported";
	document.getElementById("soldbox").style.display = "none";
	document.getElementById("unsoldbox").style.display = "none";
	document.getElementById("reportedbox").style.display = "block";
}
function showallpost(){
	document.getElementById("pickedtitle").innerHTML = "All";
	document.getElementById("soldbox").style.display = "block";
	document.getElementById("unsoldbox").style.display = "block";
	document.getElementById("reportedbox").style.display = "block";
}
function deletead(thisid){
	let theid = thisid;
	let replace1 = theid.replace("deletebut","ads");
	document.getElementById(replace1).style.display = "none";
}
function order(thisid){
	document.getElementById(thisid).innerHTML = "<div class='spinning'></div>";
	
	let theid = thisid;
	let replace1 = theid.replace("orderbut","");
	fetch("/allcars/"+replace1,{
		method:"GET"
	})
	.then((res)=>res.json())
	.then((data)=>{
		if(data.status === 200 && data.data.length > 0){
		
			const { id,email,owner,created_on,manufacturer,model,price,state,engine_size,body_type,image_url,status } = data.data[0];
			
			
			sessionStorage.setItem('chooseorder',id);
	sessionStorage.setItem('chooseordermanu',manufacturer);
	sessionStorage.setItem('chooseordercolor', body_type);
	sessionStorage.setItem('chooseordercond', state);
	sessionStorage.setItem('chooseorderamount', parseInt(price));
	sessionStorage.setItem('chooseorderimg', image_url.split("<>")[0].replace("w_150,c_scale/",""));
	sessionStorage.setItem('pagetab', 'order');
			
			
			
			
		}
		
	})
	.then((e)=>toshoworder())
	.catch((e)=>console.log(e))
	//console.log(document.getElementById(replace6).innerHTML);
	//console.log(replace4);
	
	


	
	
}
function toshoworder(){
	window.location = "postad.html";
//console.log(sessionStorage.getItem('chooseordermanu'))	
}
life();
function life(){
		var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
	const dtab = sessionStorage.getItem('pagetab');
			const dtabimg = sessionStorage.getItem('chooseorderimg');
				const dtabmanu = sessionStorage.getItem('chooseordermanu');
				const dtabcolor = sessionStorage.getItem('chooseordercolor');
				const dtabcond = sessionStorage.getItem('chooseordercond');
				const dtabamount = sessionStorage.getItem('chooseorderamount');
const dtabid =sessionStorage.getItem('chooseorder');
if(sessionStorage.getItem('pagetab')){
	document.getElementById("runorder").classList.replace("show","hide");
	document.getElementById("unpickedform").classList.replace("show","hide");
	document.getElementById("pickedform").classList.replace("hide","show");
document.getElementById("pomanid").value = dtabid;	document.getElementById("orderimg").innerHTML = "<img src='"+dtabimg+"' >"; 
	document.getElementById("pomanu").value = dtabmanu;
	document.getElementById("pocolor").value = dtabcolor;
document.getElementById("poprice").value = parseInt(dtabamount);
document.getElementById("showpprice").innerHTML = dtabamount;

document.getElementById('poprice').disabled = false;
document.getElementById('postcarorder').disabled = false;
if(dtabcond == "new"){
		document.getElementById("ncarcond").innerHTML = 'New:<input type="radio" class="radioinput" value="new"  name="postateocar"  checked>';
	} else {
		document.getElementById("ncarcond").innerHTML = 'Used:<input type="radio" class="radioinput" value="used"  name="postateocar"  checked>';
	}


document.getElementById("orderimg").classList.replace("hide","show");
	document.getElementById("prequest").scrollIntoView({block:'start',behavior:'smooth'});
	setTimeout(function (){
		sessionStorage.clear('chooseorder');
		sessionStorage.clear('pagetab');
	
	},2000)
	showorder();
}
}
/*function login(){
document.getElementById("fpintab").style.display = "none";
}*/