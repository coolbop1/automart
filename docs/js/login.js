function logout(){
localStorage.clear();
window.location = "index.html"
}
	const myToken = window.localStorage.getItem('accessToken');
	
if(myToken){
stilllog();

}else{
console.log("notlogin")
paginateallcars(0)
}
var userSession = sessionStorage.getItem('student');
   // console.log('userSession: ', JSON.parse(userSession));
     const userAllInfo = JSON.parse(userSession);
     if(userSession){
     	userIid = userAllInfo[0].id;
     	 userIfname = userAllInfo[0].name;
     	 userIlname = userAllInfo[0].lname;
     	userIemail = userAllInfo[0].email;
     	 userIaddress = userAllInfo[0].address;
 
   console.log(userAllInfo[0].name);
    
    }else{
  /*  if(window.location.pathname == "/" || window.location.pathname == "/index.html")	{
    	
    }else{
    window.location = "index.html";
    }*/
    }
    function dashboard(){
    	document.getElementById("tpin").style.background ="inherit";
window.location = "postad.html";
}
    