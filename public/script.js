// kanban board - use event listeners to drag and drop tasks
// track when task card is dragged
document.addEventListener("dragstart", function (event) {
    event.dataTransfer.setData("task", event.target.id);
});
// track when task card is moving while dragged
// prevent default to allow card to enter/be dropped into column/drop target
document.addEventListener("dragover", function (event) {
    event.preventDefault();
});
// confirms drop target and appends (drops) task to the column
document.addEventListener("drop", function (event) {
    event.preventDefault();
    if (event.target.className == "taskCol") {
        const data = event.dataTransfer.getData("task");
        event.target.appendChild(document.getElementById(data));
    }
});

// finds and gives option to delete all elements with class delete within the task divs
const taskDelete = document.querySelectorAll(".delete");

taskDelete.forEach((x) => {
    x.addEventListener("click", () => {
        x.parentElement.style.display = "none";
    });
});

// Add task details popup/modal
// display was set to none with css - here changes display so the modal can pop up
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
    // create new task div
    const taskDiv = document.createElement("div");
    // get all values from user input
    const taskTitle_val = document.getElementById("taskTitle").value;
    const taskDesc_val = document.getElementById("taskDesc").value;
    const taskPriority_val = document.getElementById("taskPriority").value;
    const taskDueDate_val = document.getElementById("taskDueDate").value;
    const taskTime_val = document.getElementById("taskTime").value;
    // create text of user input
    const taskTitle = document.createTextNode(taskTitle_val);
    const taskDesc = document.createTextNode(taskDesc_val);
    const taskPriority = document.createTextNode(taskPriority_val);
    const taskDueDate = document.createTextNode(taskDueDate_val);
    const taskTime = document.createTextNode(taskTime_val);
    // append all created text to new task div with line break separating each line of text
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
    // create delete option in new task div
    const close = document.createElement("span");
    const closeIcon = document.createTextNode("\u00D7");
    close.classList.add("delete");
    close.appendChild(closeIcon);

    taskDiv.appendChild(close);
    noStatus.appendChild(taskDiv);
    // event listener deletes task div
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
    // create new column div
    var newColumn = document.createElement("div");
    newColumn.style.width = "85%";
    // create new status element with existing styles from css
    var newStatus = document.createElement("h3");
    newStatus.style.cssText += "padding:10px;background-color:white;color:#323232";
    newStatus.style.borderRadius = "10px";
    newStatus.style.cssText += "display:flex;justify-content:center";
    // heading for new column
    var headingText = document.createTextNode("Status");
    // create new task column div with existing styles from css
    var newTaskCol = document.createElement("div");
    newTaskCol.style.cssText += "margin-top:10px;padding:10px;width:auto;height:90%;background-color:#606060";
    newTaskCol.style.borderRadius = "10px";
    // get kanban board div
    var kanbanBoard = document.getElementById("kanbanBoard");

    // append all newly created elements together
    newStatus.appendChild(headingText);
    newColumn.appendChild(newStatus);
    newColumn.appendChild(newTaskCol);
    // and finally append to the big kanban board div
    kanbanBoard.appendChild(newColumn);
}

// features sliding panel
// display for sliding panel "features" was to 0 in css
// these functions make the div expand and shrink back to 0
function openMusic() {
    document.querySelector(".features").style.width = "300px";
}

function closeFeat() {
    document.querySelector(".features").style.width = "0";
}

// music player 
// get all relevant nodes from html
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

// define the index of songs and which to start from in the array
let song_index = 0;
let songPlaying = false;

// create variable storing songs details in an array to be called
const songs = [
    {
        img: 'music/shelter.jpg',
        music: 'music/shelter.mp3',
        name: 'Shelter',
        artist: 'Madeon'
    },
    {
        img: 'images/down.jpg',
        music: 'music/Down (feat. Grey).mp3',
        name: 'Falling Down',
        artist: 'Ace (feat. Grey)'
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

// play and pause songs, add/remove to switch between play and pause icons
function songPlayPause() {
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

// tracks length of song index (increase or decrease) in order to move onto other songs 
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