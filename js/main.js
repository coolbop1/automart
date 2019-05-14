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