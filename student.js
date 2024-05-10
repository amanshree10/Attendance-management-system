document = document.getElementById("form1").addEventListener("submit", submitFun1);

var studentDataArr = [];


// Fetch student data from backend when the page loads
window.addEventListener('load', () => {
    fetch('http://localhost:3500/students')
        .then(response => response.json())
        .then(data => {
            studentDataArr = data;
            displayFun(studentDataArr);
        })
        .catch(error => console.error('Error fetching data:', error));
});


function submitFun1(e) {
    e.preventDefault();

    var name = document.getElementById("name").value;
    var number = document.getElementById("number").value;
    var city = document.getElementById("city").value;
    var rollNo = document.getElementById("rollNo").value;

    var studentObj = {
        name: name,
        number: number,
        city: city,
        rollNo: rollNo
    };

    // Send data to the server using fetch API
    fetch('http://localhost:3500/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentObj)
    })
    .then(response => response.json())
    .then(data => {
        // Process the response from the server
        alert(data.message); 
        document.querySelector("#form1").reset(); // Reset the form
        location.reload();
    })
    .catch(error => {
        console.error('Error submitting data:', error);
        // Handle error
        alert('Error submitting data: ' + error.message); // Display error message
    });
}

function displayFun(studentDataArr) {

    var count = 1;
    studentDataArr.map(function (item) {
    
        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        td1.innerHTML = count++
        var td2 = document.createElement("td");
        td2.innerHTML = item.name;
        var td3 = document.createElement("td");
        td3.innerHTML = item.adm_no;
        var td4 = document.createElement("td");
        td4.innerHTML = item.city;
        var td5 = document.createElement("td");
        td5.innerHTML = item.roll_no;
     
        
        var td6 = document.createElement("td");
        var btn1 = document.createElement("button");
        btn1.innerHTML = "P";
        
        btn1.addEventListener("click", function () {
            td6.innerHTML = "<button id='present'>Present</button>";
            updateStatus(item.id, 1); // Call function to update status to "Present"
        });
    
        var btn2 = document.createElement("button");
        btn2.innerHTML = "A";

        btn2.addEventListener("click", function () {
            td6.innerHTML = "<button id='absent'>Absent</button>";
            updateStatus(item.id, 2); // Call function to update status to "Absent"
        });



            if(item.attendance_status==1){
                td6.innerHTML = "<button id='present'>Present</button>";
            }else if(item.attendance_status == 2){
                td6.innerHTML = "<button id='absent'>Absent</button>";
            }else{
                td6.classList.add("td6");
                td6.append(btn1, btn2);
            }
            tr.append(td1, td2, td3, td4, td5, td6);

            document.querySelector("#tbody").append(tr);

        });



}
displayFun(studentDataArr);

function updateStatus(id,status) {
    var studentId = id;
    fetch(`http://localhost:3500/updateStatus`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ studentId:studentId ,status: status })
    })
    .then(response => response.json())
    .then(data => {
        // Handle response
        console.log(data);
    })
    .catch(error => {
        console.error('Error updating status:', error);
    });
}
