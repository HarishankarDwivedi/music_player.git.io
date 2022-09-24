console.log("welcome to music player");
// initialize the variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay") 
let myprogressbar = document.getElementById("myprogressbar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songitems = Array.from(document.getElementsByClassName("songitems"));


let songs = [
    {songName: "Cheating on You", filePath: "songs/1.mp3", coverPath: "covers/Cheating_on_You.jpg"},
    {songName: "Bones", filePath: "songs/2.mp3", coverPath: "covers/Bones.jpg"},
    {songName: "High Hopes", filePath: "songs/3.mp3", coverPath: "covers/High Hopes.jpg"},
    {songName: "In_The_Dark", filePath: "songs/4.mp3", coverPath: "covers/In_the_Dark.webp"},
    {songName: "Industry Baby", filePath: "songs/5.mp3", coverPath: "covers/Industry Baby.jpg"},
    {songName: "No Vacancy", filePath: "songs/6.mp3", coverPath: "covers/No Vacancy.jpg"},
    {songName: "Swim", filePath: "songs/7.mp3", coverPath: "covers/Swim.jpg"},
    {songName: "Symphony", filePath: "songs/8.mp3", coverPath: "covers/Symphony.jpg"},
    {songName: "Take You Dancing", filePath: "9.mp3", coverPath: "covers/Take You Dancing.jpg"},
    {songName: "Too Young", filePath: "songs/10.mp3", coverPath: "covers/Too Young.jpg"},
]

songitems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// audioElement.play();

// handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0;
    }
})

// Listen to events
audioElement.addEventListener('timeupdate', ()=>{
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myprogressbar.value = progress;
})

myprogressbar.addEventListener("change",()=>{
    audioElement.currentTime = myprogressbar.value * audioElement.duration/100;
})

const makeAllPlays =  ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
    songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 9;
    }
    else{
    songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
})
