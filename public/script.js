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


// open and close sidebar functions following W3 School How TO - Collapse Sidebar Tutorial:
// https://www.w3schools.com/howto/howto_js_collapse_sidebar.asp 
// REMEMBER TO APA REFERENCE^^^
function openFeat() {
    document.querySelector(".features").style.width = "300px";
}

function closeFeat() {
    document.querySelector(".features").style.width = "0";
}