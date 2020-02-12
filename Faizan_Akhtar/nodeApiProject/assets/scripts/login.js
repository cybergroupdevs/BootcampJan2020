function loginSubmit(){
    var email = document.getElementById("uname").value;
    var passwrd = document.getElementById("pwd").value;

    var empLogin = {
        email: email,
        passwrd: passwrd,
    };
    console.log("Plain object"+empLogin);
    api(empLogin);
    //window.location.href = "./admin.html";
}

function parseJwt (jwtToken) {
    var base64Url = jwtToken.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    console.log(jsonPayload);
    printToken(JSON.parse(jsonPayload));
    return JSON.parse(jsonPayload);

};

function api(empLogin){
    let empObject = empLogin;
    const xhr = new XMLHttpRequest();
    const url = "http://localhost:4000/employees";
    xhr.open('POST', url);
    xhr.responseType = 'json';
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(JSON.stringify(empObject));
    xhr.onload = () => {
        
        let jwtToken = {};
        jwtToken = xhr.response.token;
        console.log("Response----"+jwtToken);
        parseJwt(jwtToken);
        saveToken(jwtToken)
    };
    xhr.onerror = (err) =>{
        console.log(err);
    };
    xhr.send(JSON.stringify(empObject));
}

function printToken(jsonPayload){
    console.log(jsonPayload);
}
function saveToken(jwtToken){
    if(typeof(Storage) != "undefined"){
        localStorage.setItem("JwtToken", jwtToken);
    } else {
        console.log("Local Storage not found")
    }
}
