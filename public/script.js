// https://www.w3schools.com/jsref/event_ondragstart.asp
// kanban board - drag and drop tasks
document.addEventListener("dragstart", function (event) {
    event.dataTransfer.setData("task", event.target.id);
});

document.addEventListener("dragover", function (event) {
    event.preventDefault();
});

document.addEventListener("drop", function (event) {
    event.preventDefault();
    if (event.target.className == "taskCol") {
        const data = event.dataTransfer.getData("task");
        event.target.appendChild(document.getElementById(data));
    }
});

// delete tasks
const taskDelete = document.querySelectorAll(".delete");

taskDelete.forEach((x) => {
    x.addEventListener("click", () => {
        x.parentElement.style.display = "none";
    });
});

// Add task details popup
// https://www.w3schools.com/howto/howto_css_modals.asp
const popup = document.getElementById("taskDetails");
const addTask = document.getElementById("addTask");
const popupClose = document.getElementsByClassName("popupClose")[0];

addTask.onclick = function () {
    popup.style.display = "block";
}

popupClose.onclick = function () {
    popup.style.display = "none";
}

// Create task 
const taskSubmit = document.getElementById("taskSubmit");

taskSubmit.addEventListener("click", createTask);

function createTask() {
    const taskDiv = document.createElement("div");

    const taskTitle_val = document.getElementById("taskTitle").value;
    const taskDesc_val = document.getElementById("taskDesc").value;
    const taskPriority_val = document.getElementById("taskPriority").value;
    const taskDueDate_val = document.getElementById("taskDueDate").value;
    const taskTime_val = document.getElementById("taskTime").value;

    const taskTitle = document.createTextNode(taskTitle_val);
    const taskDesc = document.createTextNode(taskDesc_val);
    const taskPriority = document.createTextNode(taskPriority_val);
    const taskDueDate = document.createTextNode(taskDueDate_val);
    const taskTime = document.createTextNode(taskTime_val);

    taskDiv.appendChild(taskTitle);
    const br = document.createElement("br");
    taskDiv.appendChild(br);

    taskDiv.appendChild(taskDesc);
    taskDiv.appendChild(br.cloneNode());

    taskDiv.appendChild(taskPriority);
    taskDiv.appendChild(br.cloneNode());

    taskDiv.appendChild(taskDueDate);
    taskDiv.appendChild(br.cloneNode());

    taskDiv.appendChild(taskTime);

    taskDiv.classList.add("task");
    taskDiv.setAttribute("draggable", "true");

    const close = document.createElement("span");
    const closeIcon = document.createTextNode("\u00D7");
    close.classList.add("delete");
    close.appendChild(closeIcon);

    taskDiv.appendChild(close);

    noStatus.appendChild(taskDiv);

    close.addEventListener("click", () => {
        close.parentElement.style.display = "none";
    });

    // new task drag and drop
    taskDiv.addEventListener("dragstart", function (event) {
        event.dataTransfer.setData("task", event.target.id);
    });

    taskDiv.addEventListener("dragover", function (event) {
        event.preventDefault();
    });

    taskDiv.addEventListener("drop", function (event) {
        event.preventDefault();
        if (event.target.className == "taskCol") {
            var data = event.dataTransfer.getData("task");
            event.target.appendChild(taskDiv.getElementById(data));
        }
    });

    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDesc").value = "";
    document.getElementById("taskPriority").value = "";
    document.getElementById("taskDueDate").value = "";
    document.getElementById("taskTime").value = "";
    taskDetails.classList.remove("active");
}

// open and close sidebar functions following W3 School How TO - Collapse Sidebar Tutorial:
// https://www.w3schools.com/howto/howto_js_collapse_sidebar.asp 
// REMEMBER TO APA REFERENCE^^^
function openFeat() {
    document.querySelector(".features").style.width = "300px";
}

function closeFeat() {
    document.querySelector(".features").style.width = "0";
}