showtask();
var addtaskinput = document.getElementById("addtaskinput");
var addtaskbtn = document.getElementById("addtaskbtn");

addtaskbtn.addEventListener("click", function () {
    addtaskinputval = addtaskinput.value;
    if (addtaskinputval.trim() != 0) {
        var inputTask = localStorage.getItem("localtask");
        if (inputTask == null) {
            taskObj = [];
        } else {
            taskObj = JSON.parse(inputTask);
        }
        taskObj.push(addtaskinputval);
        localStorage.setItem('localtask', JSON.stringify(taskObj));
    }
    addtaskinput.value = '';
    showtask();
})

function showtask() {
    var inputTask = localStorage.getItem("localtask");
    if (inputTask == null) {
        taskObj = [];
    } else {
        taskObj = JSON.parse(inputTask);
    }
    var tableList = '';
    var addedtasklist = document.getElementById("addedtasklist");
    taskObj.forEach((item, index) => {
        tableList +=
            `<tr>
        <th scope="row">${index + 1}</th>
        <td>${item}</td>
        <td>
          <button type="button" class="text-primary" onclick="editTask(${index})">
            <i class="fa fa-edit"></i>
            Edit
          </button>
        </td>
        <td>
          <button type="button" class="text-danger" onclick="deleteItem(${index})">
            <i class="fa fa-trash"></i>
            Delete
          </button>
        </td>
        <td></td>
      </tr>`
    });
    addedtasklist.innerHTML = tableList
}


function editTask(index) {
    var saveindex = document.getElementById("saveindex");
    var addtaskbtn = document.getElementById("addtaskbtn");
    var savetaskbtn = document.getElementById("savetaskbtn");
    saveindex.value = index;
    var inputTask = localStorage.getItem("localtask");
    var taskObj = JSON.parse(inputTask);
    addtaskinput.value = taskObj[index];
    addtaskbtn.style.display = "none";
    savetaskbtn.style.display = "block";
}


var savetaskbtn = document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click", function () {
    var addtaskbtn = document.getElementById("addtaskbtn");
    var inputTask = localStorage.getItem("localtask");
    var saveindex = document.getElementById("saveindex").value;
    var taskObj = JSON.parse(inputTask);
    taskObj[saveindex] = addtaskinput.value;
    addtaskbtn.style.display = "block";
    savetaskbtn.style.display = "none";
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    addtaskinput.value = '';
    showtask();
})


function deleteItem(index) {
    var inputTask = localStorage.getItem("localtask");
    var taskObj = JSON.parse(inputTask);
    taskObj.splice(index, 1);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask();
}

var deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click", function () {
    var addtaskbtn = document.getElementById("addtaskbtn");
    var savetaskbtn = document.getElementById("savetaskbtn");
    var inputTask = localStorage.getItem("localtask");
    var taskObj = JSON.parse(inputTask);
    if (inputTask == null) {
        taskObj = [];
    } else {
        taskObj = JSON.parse(inputTask);
        taskObj = [];
    }
    addtaskbtn.style.display = "block";
    savetaskbtn.style.display = "none";
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask();
})

var searchtextbox = document.getElementById("searchtextbox");
searchtextbox.addEventListener("input", function () {
    let trList = document.querySelectorAll("tr");
    Array.from(trList).forEach(function (item) {
        let searchedText = item.getElementsByTagName("td")[0].innerText;
        let searchtextboxval = searchtextbox.value;
        let search = new RegExp(searchtextboxval, 'gi');
        if (searchedText.match(search)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    })
})