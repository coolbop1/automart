function logout(){
localStorage.clear();
window.location = ""
}
	const myToken = window.localStorage.getItem('accessToken');
	
if(myToken){
stilllog();

}else{

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
 
   // console.log(userAllInfo[0].name);
    
    }else{
  /*  if(window.location.pathname == "/" || window.location.pathname == "/index.html")	{
    	
    }else{
    window.location = "index.html";
    }*/
    }
    function dashboard(){
window.location = "postad.html";
}
    