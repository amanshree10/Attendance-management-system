

document.querySelector("#form").addEventListener("submit", submitFun);


function submitFun(elme) {
    elme.preventDefault();
    username = document.querySelector("#name").value;
    password =  document.querySelector("#password").value;

    if (username == "Basant" && password == "basant") {
       
        window.location.href = "student.html";
    }
    else if(username == "Aman" && password == "aman"){
        window.location.href = "student.html";
    }
    else if(username == "Ashutosh" && password == "ashutosh"){
        window.location.href = "student.html";
    }
     else {
        alert("Invalid username or password");
        document.querySelector("#form").reset();
    }

}



