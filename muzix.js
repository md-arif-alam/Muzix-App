console.log("welcome to the Spotify Clone");
//Variable Initialization
 let songIndex=0;
 let audioElement = new Audio('songplay/song1.mp3');
//  let pausenow= document.getElementById('pausenow');
//  let seeking = false;
 let songprogressBar= document.getElementById('songprogressBar');
 let curtimetext =document.getElementById('curtimetaxt');
 let durtimetext =document.getElementById('durTimetxt');
 let gif= document.getElementById('gif');
 let mastersongname= document.getElementById('mastersongname');
 let songItems= Array.from(document.getElementsByClassName('songItem'));
//  let gif2= document.getElementById('gif2');
 let gif3= document.getElementById('gfeq');
//  songprogressBar.addEventListener("mousedown",function(event){seeking=true;
//   seek(event);});
//  songprogressBar.addEventListener("mousemove",function(event){seek(event);});
//  songprogressBar.addEventListener("mouseup",function(){seeking=false;});
 audioElement.addEventListener("timeupdate",function(){seektimeupdate();});

let songs=[
    {songName:"Let me love you",filePath:"songplay/song1.mp3",coverPath:"covers/cover1.webp"},
    {songName:"We don't talk anymore",filePath:"songplay/song2.mp3",coverPath:"covers/cover2.webp"},
    {songName:"Shape of You",filePath:"songplay/song3.mp3",coverPath:"covers/cover3.webp"},
    {songName:"See you again",filePath:"songplay/song4.mp3",coverPath:"covers/cover4.jpeg"},
    {songName:"Perfect",filePath:"songplay/song5.mp3",coverPath:"covers/cover5.jpeg"},
    {songName:"Believer",filePath:"songplay/song6.mp3",coverPath:"covers/cover6.jpg"},
    {songName:"Despacito",filePath:"songplay/song7.mp3",coverPath:"covers/cover7.jpeg"},
    {songName:"Faded--",filePath:"songplay/song8.mp3",coverPath:"covers/cover8.jpeg"},
    {songName:"Blank space",filePath:"songplay/song9.mp3",coverPath:"covers/cover9.jpeg"},
    {songName:"Dil Diyan Gallan",filePath:"songplay/song10.mp3",coverPath:"covers/cover11.jpg"},
    {songName:"Ilahi",filePath:"songplay/song11.mp3",coverPath:"covers/cover21.jpg"}
]

songItems.forEach((element,i)=> {
    // console.log(element,i)
    element.getElementsByTagName("img")[0].src= songs[i].coverPath;
    element.getElementsByClassName("songname").innerText= songs[i].songName;
    // element.getElementsByTagName("span")[0].add=songs[i].gifpath;
});

// play/pause handle
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('f-play-circle');
        masterPlay.classList.add('f-pause-circle');
        gif3.style.opacity=1;
        gif.style.opacity=1;
    }  
    else{
        audioElement.pause();
        masterPlay.classList.remove('f-pause-circle');
        masterPlay.classList.add('f-play-circle');
        gif3.style.opacity=0;
        gif.style.opacity=0;
    }    
})
     
     
// Event listener

// audioElement.addEventListener("timeupdate",()=>{
//     progress =(audioElement.currentTime/audioElement.duration)*100;
//     songprogressBar.value = progress;
//     let min = Math.floor(progress / 60);
//     let sec = Math.floor(progress % 60);
//     if(sec < 10){
//         sec = `0${sec}`;  
//     }
//     let total_time = `${min}:${sec}`;
//     current_time.textContent =`${total_time}`;

// })

songprogressBar.addEventListener('change',()=>{
    audioElement.currentTime = songprogressBar.value*audioElement.duration/100;
   
})

function seek(event){
    if(audioElement.duration == 0){
        null
    } else{
        if(seeking){
            songprogressBar.value= event.clientX - songprogressBar.offsetLeft;
            let seekto = audioElement.duration * (songprogressBar.value / 100);
            audioElement.currentTime = seekto;
        }
    }
}
function seektimeupdate(){
    if(audioElement){
        let nt = audioElement.currentTime * (100 / audioElement.duration);
        songprogressBar.value = nt;
        var curmins = Math.floor(audioElement.currentTime / 60);
        var cursecs = Math.floor(audioElement.currentTime - curmins * 60);
        var durmins = Math.floor(audioElement.duration / 60);
        var dursecs  = Math.floor(audioElement.duration - durmins * 60);
        if(cursecs < 10){cursecs = "0" + cursecs}
        if(dursecs < 10){dursecs = "0" + dursecs}
        if(curmins < 10){curmins = "0" + curmins}
        if(dursecs < 10){dursecs = "0" + dursecs}
        curtimetext.innerHTML = curmins+":"+cursecs;
        durtimetext.innerHTML = durmins+":"+dursecs;
    }else{
        curtimetext.innerHTML = "00"+":"+"00";
        durtimetext.innerHTML = "00"+":"+"00";
    }
}

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemplay')).forEach((element)=>{
        // console.log(element.target);
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
            gif.style.opacity=0;
            gif3.style.opacity=0;

    })
}
Array.from(document.getElementsByClassName('songItemplay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
       makeAllPlays();
       songIndex = parseInt(e.target.id);
       e.target.classList.remove('fa-play-circle');
       e.target.classList.add('fa-pause-circle');
       gif.style.opacity=1;
       gif3.style.opacity=1;
       audioElement.src = `songplay/song${songIndex+1}.mp3`;
       mastersongname.innerText = songs[songIndex].songName;
       audioElement.currentTime = 0;
       audioElement.play();
       masterPlay.classList.remove('fa-play-circle');
       masterPlay.classList.add('fa-pause-circle');
       gif3.style.opacity=1;
       gif.style.opacity=1;
    //    audioElement.currentTime>1;
    //    audioElement.pause();
    //    e.target.classList.remove('fa-pause-circle');
    //    e.target.classList.add('fa-play-circle');
    //    gif.style.opacity=0;
    //    gif3.style.opacity=0; 
    
    }) 
   
})

document.getElementById('next').addEventListener('click',()=>{
  if(songIndex>=10){
     songIndex = 0;
  }
 else{
      songIndex +=1;
  }
   audioElement.src = `songplay/song${songIndex+1}.mp3`;
   mastersongname.innerText = songs[songIndex].songName;
   audioElement.currentTime = 0;
   audioElement.play();
   masterPlay.classList.remove('fa-play-circle');
   masterPlay.classList.add('fa-pause-circle');
   gif3.style.opacity=1;
   gif.style.opacity=1;
})

document.getElementById('previous').addEventListener('click',()=>{
  if(songIndex<=0){
     songIndex = 0;
  }
 else{
      songIndex -=1;
  }
   audioElement.src = `songplay/song${songIndex+1}.mp3`;
   mastersongname.innerText = songs[songIndex].songName;
   audioElement.currentTime = 0;
   audioElement.play();
   masterPlay.classList.remove('fa-play-circle');
   masterPlay.classList.add('fa-pause-circle');
   gif3.style.opacity=1;
   gif.style.opacity=1;
   
})
const makePause = ()=>{
    Array.from(document.getElementsByClassName('songItemplay')).forEach((element)=>{
        // console.log(element.target);
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
    })
}
audioElement.addEventListener("ended",function(e){
    songIndex++;
    if(songIndex<songs.length){
        audioElement.src=`songplay/song${songIndex+1}.mp3`;
        mastersongname.innerText = songs[songIndex].songName;
        audioElement.play();
        makePause();
    }    
    
})

if(window.innerWidth < 900){
    alert('OOPS !!!! this site will run smoothly on desktop..please switch to desktop mode')
}
    