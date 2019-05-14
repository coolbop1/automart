function rightSlide(slideid) {
  document.getElementById("forsearch").style.left = "200px";  
  var elem = document.getElementById(slideid+"tab"); 
  if(slideid == "fpin"){
  let elems = document.getElementById("spintab");
   elems.style.top = "435px";
    document.getElementById(slideid).style.pointerEvents = 'none'; 
    document.getElementById("spin").style.pointerEvents = 'none'; 
 }else if(slideid == "spin"){
  let elems = document.getElementById("fpintab");
   elems.style.top = "500px";
   document.getElementById(slideid).style.pointerEvents = 'none'; 
    document.getElementById("fpin").style.pointerEvents = 'none'; 
 }
 elem.className = "righttab"
  var pos = 435;
  var id = setInterval(frame, 1/100);
  function frame() {
    if (pos == 0) {
      clearInterval(id);
      document.getElementById("spin").style.pointerEvents = 'auto'; 
      document.getElementById("fpin").style.pointerEvents = 'auto'; 
      
    } else {
      pos--; 
     //elem.style.top = pos + 'px'; 
      elem.style.top = pos + 'px'; 
    }
  }
}
function closetab(){
  document.getElementById("spintab").style.top = '500px'; 
  document.getElementById("fpintab").style.top = '500px'; 
  document.getElementById("forsearch").style.left = "27.5%"; 
}
function showmyads(){
	document.getElementById("posted").style.display ="block";	
  document.getElementById("postform").style.display = "none";	
  document.getElementById("profiletab").style.display = "none";	
  document.getElementById("prequest").style.display = "none";  
}
function showpostad(){
document.getElementById("postform").style.display = "block";
document.getElementById("profiletab").style.display = "block";
document.getElementById("posted").style.display = "none";
document.getElementById("prequest").style.display = "none";
	
}
function showorder(){
document.getElementById("prequest").style.display = "block";
document.getElementById("profiletab").style.display = "block";
document.getElementById("posted").style.display = "none";
document.getElementById("postform").style.display = "none";
  
}
function pedit(clickedbox){
	let but = clickedbox;
	let rep = but.replace('ep','edit');	
	let repcl =	but.replace('ep','cl');				 document.getElementById(rep).style.display = "block";
document.getElementById(repcl).style.display = "block";	document.getElementById(clickedbox).innerHTML = "update price"
}
function closedit(clsbox){
	let but = clsbox;
	let rep = but.replace('cl','edit');	
	let repcl =	but.replace('cl','ep');	
	document.getElementById(rep).style.display = "none";
document.getElementById(clsbox).style.display = "none";	document.getElementById(repcl).innerHTML = "edit price"
}
function editop(thisid){
let eid = thisid;
let leid = eid.replace('epo','rey');
let meid = eid.replace('epo','edited');
let cleid = eid.replace('epo','clo');
document.getElementById(leid).style.display = "none";
document.getElementById(meid).style.display = "block";
document.getElementById(cleid).style.display = "block";
document.getElementById(eid).innerHTML = "Update Price"
}
function closepo(thisid){
let eid = thisid;
let leid = eid.replace('clo','rey');
let meid = eid.replace('clo','edited');
let cleid = eid.replace('clo','epo');
document.getElementById(leid).style.display = "block";
document.getElementById(meid).style.display = "none";
document.getElementById(eid).style.display = "none";
document.getElementById(cleid).innerHTML = "Edit Price"

}