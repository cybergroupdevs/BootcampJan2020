function login(){
    window.location.href = "./admin/index.html";
    }
document.getElementById("button").addEventListener("click",getToken)
function getToken(){

    var Sno=parseInt(document.getElementById("inputid").value);
    var Username=document.getElementById("inputName").value;
    var Email=document.getElementById("inputEmail").value;
    var Password=document.getElementById("inputPassword").value;
    
    
    var json= {
        "Sno":Sno,
        "Name":Username,
        "Email":Email,
        "Password":Password
    };
    console.log(json);
    //sendHTTPReq('POST', "http://localhost:3000/employees/login", json).then(x => func() );
    var xhr= new XMLHttpRequest();
     var url="http://localhost:3000/employees/login";
     xhr.open('POST', url,true);
     xhr.responseType='json';
     xhr.setRequestHeader('Content-type','application/json');
     console.log(JSON.stringify(json));
      xhr.onload = () => {
         console.log(xhr.status);
         //var jwtToken = xhr.response.token;

   };
    xhr.send(JSON.stringify(json));
}
//saving token in local storage
function saveToken(token){
    if(typeof Storage !=="undefined"){
        localStorage.setItem("JWTtoken",token);
    }
    else{
        console.log("Browser doesn't support");
    }
    decodeToken(token);
}

//for decoding the token

function decodeToken (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log(jsonPayload);
    return JSON.parse(jsonPayload);
}
