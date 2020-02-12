var logOutButton = document.getElementById("logOut");
var findAllEmployees = document.getElementById("allEmp");
var table = document.getElementById("adminTable");
var deleteEmployeeLink = document.getElementById("deleteOne");

var COLUMN_TO_DISPLAY = 7;

//inserts data into the table
function  drawTable(json) {
    let columnLength = COLUMN_TO_DISPLAY;

    for(let j=0; j<json.length; j++){
        let employee = json[j];
        let data = [j+1, 
                    employee.empName, 
                    employee.username, 
                    employee.empPhone, 
                    employee.empRole, 
                    employee.empAddress, 
                    employee.empProjectId
                ];
        let row = table.insertRow(j);        
        for(let i=0; i<columnLength; i++){
            let cell = row.insertCell(i);
            cell.innerHTML = data[i];
        }
    }
}

//Decode JWT and return the Payload in JSON Format
const jsonDecoder = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
};

//When the window is loaded onto the browser, then it will check whether a token presents or not.
//If token is present, it will decode it and fetch the Guy's name and paste it in the NAVBAR. Then it will call getAllEmployeeDetails()
//Else it will redirect the GUY back to LOGIN PAGE.
window.onload = () => {
    if (typeof(Storage) !== "undefined") {
        const token = localStorage.getItem("JwtTOKEN");
        if(token != null){
            var jsonPayload = jsonDecoder(token);
            document.getElementById("userName").innerHTML = jsonPayload.EmpName;
            getAllEmployeeDetails();
        }
        else{
            console.log("There is no JwtToken present");
            window.location.href = "./index.html";
        }
    } 
    else {
        alert("Sorry ! Your browser is not cool.");
    }
}

//Called when Logout button is pressed and then it deletes the Jwt and diverts the page back to LOGIN
const logOut = () => {
    if (typeof(Storage) !== "undefined") {
        localStorage.removeItem("JwtTOKEN");
        console.log("something is not working");
        window.location.href = "./index.html";
    } else {
        // Sorry! No Web Storage support..
        alert("Sorry ! Your browser is not cool.");
    }
}

//Sends the HTTP request and returns the promise. On resolve, xhr is returned, from which we can retrieve the response
const sendHTTPRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = 'json';
        if(data){
            xhr.setRequestHeader('Content-Type', 'application/json');
        }
        xhr.onload = () => {
            resolve(xhr);
        };
        xhr.onerror = () => {
            reject('Something went wrong');
        }
        xhr.send(JSON.stringify(data));
    });
    return promise;
}

//Deletes the employee and 
const deleteEmployeeDetails = () => {
    var username = prompt("Enter username you want to delete");
    if(username != null){
        data = {
            JwT: localStorage.getItem("JwtTOKEN"),
            Username: username
        };
        sendHTTPRequest("DELETE", "https://localhost:44305/api/Admin", data)
        .then((responseData) => {
            if(responseData.status == 200){
                alert("User Deleted");
                getAllEmployeeDetails();
            }
            else{
                alert("Some Error Occured "+responseData.status);
            }
        });
    }
};

function clearTableData() {
    var first = table.firstElementChild; 
        while (first) { 
            first.remove(); 
            first = table.firstElementChild; 
        } 
}

const getAllEmployeeDetails = () => {
    clearTableData();
    const reqBody = {
        "JwT": localStorage.getItem("JwtTOKEN")
    }
    sendHTTPRequest('POST', "https://localhost:44305/api/Admin/Employees", reqBody)
    .then((responseData) => {
        var res = responseData.response;
        if(res != null){
            drawTable(res);
        }
        else{
            localStorage.removeItem("JwtTOKEN");
            window.alert("Token is expired or Maybe is tampered! Please Login Again");
            window.location.href = "./index.html";
        }
    })
    .catch(err => {
        console.log(err);
    });
};

findAllEmployees.addEventListener('click', getAllEmployeeDetails);
logOutButton.addEventListener('click', logOut);
deleteEmployeeLink.addEventListener('click', deleteEmployeeDetails);
