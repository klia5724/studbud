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

// add task column
document.getElementById("addCol").addEventListener("click", addColumn);

function addColumn() {
    var newColumn = document.createElement("div");
    newColumn.style.width = "85%";

    var newStatus = document.createElement("h3");
    newStatus.style.cssText += "padding:10px;background-color:white;color:#323232";
    newStatus.style.borderRadius = "10px";
    newStatus.style.cssText += "display:flex;justify-content:center";

    var headingText = document.createTextNode("new column");

    var newTaskCol = document.createElement("div");
    newTaskCol.style.cssText += "margin-top:10px;padding:10px;width:auto;height:90%;background-color:#606060";
    newTaskCol.style.borderRadius = "10px";

    var kBoard = document.getElementById("kanbanBoard");

    newStatus.appendChild(headingText);
    newColumn.appendChild(newStatus);
    newColumn.appendChild(newTaskCol);
    kBoard.appendChild(newColumn);
}

// open and close sidebar functions following W3 School How TO - Collapse Sidebar Tutorial:
// https://www.w3schools.com/howto/howto_js_collapse_sidebar.asp 
// REMEMBER TO APA REFERENCE^^^
function openMusic() {
    document.querySelector(".features").style.width = "300px";
}

function closeFeat() {
    document.querySelector(".features").style.width = "0";
}

// music player 

const nowPlaying = document.querySelector('.nowPlaying');
const songCover = document.querySelector('.songCover');
const songTitle = document.querySelector('.songTitle');
const songArtist = document.querySelector('.songArtist');

const iconPrev = document.querySelector('.songPrev');
const iconPlayPause = document.querySelector('.songPlayPause');
const iconNext = document.querySelector('.songNext');

const musicSeeker = document.querySelector('.musicSeeker');
const audio = document.getElementById('audio');
const currentSong = document.createElement('audio');

let song_index = 0;
let songPlaying = false;
let updateTimer;

const songs = [
    {
        img : 'music/shelter.jpg',
        music : 'music/shelter.mp3',
        name : 'Shelter',
        artist : 'Madeon'
    },
    {
        img : 'images/down.jpg',
        music : 'music/Down (feat. Grey).mp3',
        name : 'Falling Down',
        artist : 'Ace (feat. Grey)'
    }
];

loadSong(song_index);

function loadSong(song_index) {
  currentSong.src = songs[song_index].music;
  currentSong.load();

    songCover.style.backgroundImage = "url(" + songs[song_index].img + ")";
    songTitle.textContent = songs[song_index].name;
    songArtist.textContent = songs[song_index].artist;
}

function songPlayPause(){
    songPlaying ? pauseSong() : playSong();
}

function playSong() {
  currentSong.play();
  songPlaying = true;
  iconPlayPause.innerHTML = '<i class="bx bx-pause bx-lg"></i>';
}

function pauseSong() {
  currentSong.pause();
  songPlaying = false;
  iconPlayPause.innerHTML = '<i class="bx bx-play bx-lg"></i>';
}

function prevSong() {
  song_index--;

  if (song_index < 0) {
    song_index = songs.length - 1;
  }

  loadSong(song_index);
  playSong();
}

function nextSong() {
  song_index++;

  if (song_index > songs.length - 1) {
    song_index = 0;
  }

  loadSong(song_index);
  playSong();
}