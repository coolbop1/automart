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
	elem.style.opacity= 1;
	if(slideid == "fpin"){
		let elems = document.getElementById("spintab");
			elems.classList.replace("show", "hide");
			elem.classList.replace("hide", "show");
			elem.classList.replace("righttabs", "righttab");
			document.getElementById("fpin").style.background ="#bf3f3f";
			document.getElementById("spin").style.background ="inherit";

	}else if(slideid == "spin"){
		let elems = document.getElementById("fpintab");
		elems.classList.replace("show", "hide");
		elem.classList.replace("hide", "show");
		elem.classList.replace("righttabs", "righttab");
	document.getElementById("fpin").style.background ="inherit";
	document.getElementById("spin").style.background ="#bf3f3f";
	

	}

	
	/*if(slideid == "fpin"){
		let elems = document.getElementById("spintab");
		elems.style.top = "435px";
		document.getElementById(slideid).style.pointerEvents = "none"; 
		document.getElementById("spin").style.pointerEvents = "none"; 
document.getElementById("fpin").style.background ="#bf3f3f";
document.getElementById("spin").style.background ="inherit";
	}else if(slideid == "spin"){
		let elems = document.getElementById("fpintab");
		elems.style.top = "500px";
		document.getElementById(slideid).style.pointerEvents = "none"; 
		document.getElementById("fpin").style.pointerEvents = "none"; 
		document.getElementById("fpin").style.background ="inherit";
document.getElementById("spin").style.background ="#bf3f3f";
	}
	elem.className = "righttab";
	var pos = 435;
	var id = setInterval(frame, 1/100);
	function frame() {
		if (pos == 0) {
			clearInterval(id);
			document.getElementById("spin").style.pointerEvents = "auto"; 
			document.getElementById("fpin").style.pointerEvents = "auto"; 
      
		} else {
			pos--; 
			//elem.style.top = pos + 'px'; 
			elem.style.top = pos + "px"; 
		}
	}
	setTimeout(function(){
		document.getElementById("signs").scrollIntoView({block:'start',behavior:'smooth'});
	},1000);
	*/
	
}
function closetab(){
	document.getElementById("spintab").classList.replace("show", "hide"); 
	document.getElementById("fpintab").classList.replace("show", "hide"); 
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
	
	
	document.getElementById("navsord").style.background ="inherit";
document.getElementById("navmad").style.background ="#bf3f3f";
document.getElementById("navsad").style.background ="inherit";
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
	
	
	document.getElementById("navsord").style.background ="inherit";
document.getElementById("navmad").style.background ="inherit";
document.getElementById("navsad").style.background ="#bf3f3f";
	
}
function showorder(){
opennavs();
document.getElementById("touchlist").classList.replace("show","hide");
document.body.style.overflow = "auto";

document.getElementById("myadsti").innerHTML = "Place Order"
document.getElementById("myadsti").style.display ="block";	
document.getElementById("prequest").style.display = "block";
	document.getElementById("posted").style.display = "none";
	document.getElementById("postform").style.display = "none";
  document.getElementById("navsord").style.background ="#bf3f3f";
document.getElementById("navmad").style.background ="inherit";
document.getElementById("navsad").style.background ="inherit";
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
function opensingle(thisid){
	document.getElementById("inoverlay").innerHTML=document.getElementById(thisid).innerHTML;
	document.body.style.overflow = "hidden";	
	document.getElementById("overlay").style.display = "block";
	
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
	let theid = thisid;
	let replace1 = theid.replace("orderbut","");
	let replace2 = theid.replace("orderbut","single");
	let replace3 = theid.replace("orderbut","smanu");
	let replace4 = theid.replace("orderbut","scolor");
	let replace5 = theid.replace("orderbut","scond");
	let replace6 = theid.replace("orderbut","samount");
	sessionStorage.setItem('chooseorder', replace1);
	sessionStorage.setItem('chooseordermanu', replace3);
	sessionStorage.setItem('chooseordercolor', replace4);
	sessionStorage.setItem('chooseordercond', replace5);
	sessionStorage.setItem('chooseorderamount', replace6);
	sessionStorage.setItem('chooseorderimg', replace2);
	sessionStorage.setItem('pagetab', 'order');
	if(window.location.pathname == "/postad.html"){
		
		life();
		} else {
	window.location = "postad.html";
	}
	
}
life();
function life(){
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
document.getElementById("pomanid").value = dtabid;	document.getElementById("orderimg").innerHTML = document.getElementById(dtabimg).innerHTML; 
	document.getElementById("pomanu").value = document.getElementById(dtabmanu).innerHTML;
	document.getElementById("pocolor").value = document.getElementById(dtabcolor).innerHTML;
document.getElementById("poprice").value = document.getElementById(dtabamount).innerHTML;
document.getElementById("showpprice").innerHTML = document.getElementById(dtabamount).innerHTML;

document.getElementById('poprice').disabled = false;
document.getElementById('postcarorder').disabled = false;
if(document.getElementById(dtabcond).innerHTML == "new"){
		document.getElementById("ncarcond").innerHTML = 'New:<input type="radio" class="radioinput" value="new"  name="postateocar"  checked>';
	} else {
		document.getElementById("ncarcond").innerHTML = 'Used:<input type="radio" class="radioinput" value="used"  name="postateocar"  checked>';
	}
	showorder();

document.getElementById("orderimg").style.display = "block";	document.getElementById("prequest").scrollIntoView({block:'start',behavior:'smooth'});
	setTimeout(function (){
		sessionStorage.clear('chooseorder');
		sessionStorage.clear('pagetab');
	
	},2000)
}
}
/*function login(){
document.getElementById("fpintab").style.display = "none";
}*/