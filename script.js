console.log("less fing go")

let currentsong = new Audio();
let songs;

function sectomin(seconds) {
    // Calculate minutes and seconds
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;

    // Format the result as "minutes:seconds"
    var result = minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
    
    return result;
}


async function getsongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text()
    // console.log(response)

    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    // console.log(as)
    let songs = []

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs
}

const playMusic = (track, pause = false)=>{
    // let audio = new Audio("/songs/" + track)
    currentsong.src = "/songs/" + track + ".mp3"
    currentsong.play()
    document.querySelector(".songinfo").innerHTML = track
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function main() {

    songs = await getsongs()
    console.log(songs)
    // playMusic(songs[0].replaceAll("%20", " ").replaceAll(".mp3", ""), pause = true)



    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `
        <li class="corner">
                            <img src="music-icon.svg" alt="" class="invert">
                            <div class="info">
                                <div>${song.replaceAll("%20", " "). replaceAll(".mp3", "")}</div>
                                <div></div>
                            </div>
                            <div class="playnow">
                            <span>Play now</span>
                            <img src="play.svg" alt="" class="invert playhov">
                            </div>
                        
        
        
        </li>`;

    }

 
    //Attach an event listener to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {

        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
            play.src = "pause.svg"

        })
    });

    //Add eventlistener to play, pause and next
    play.addEventListener ("click", () => {
        if (currentsong.paused) {
            currentsong.play()
            play.src = "pause.svg"
        }

        else{
            currentsong.pause()
            play.src = "play.svg"
        }
    })

    //Add elent listener for time update

    currentsong.addEventListener("timeupdate", () => {
        // console.log(currentsong.currentTime, currentsong.duration)
        document.querySelector(".songtime").innerHTML = `${sectomin(parseInt(currentsong.currentTime))} / ${sectomin(parseInt(currentsong.duration))}`
        document.querySelector(".circle").style.left = (currentsong.currentTime/currentsong.duration)*100 + "%"
    })

    
    //Add an event listener to seekbaar
    document.querySelector(".seekbar").addEventListener ("click", (e) => {
        let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100
        document.querySelector(".circle").style.left = percent + "%"
        // console.log((e.offsetX/e.target.getBoundingClientRect().width) * 100 + "%")
        currentsong.currentTime = currentsong.duration * percent / 100
    })

    //Add Event listener to open Hamburger
    document.querySelector(".hamburger").addEventListener ("click", ()=> {
        document.querySelector(".left").style.left = "0"        
    })

    //Add event listener to close hamburger
    // document.querySelector(".right").addEventListener ("click", () => {
    //     document.querySelector(".left").style.left = "-100"
    // })
   
    document.querySelector(".close").addEventListener ("click", ()=> {
        document.querySelector(".left").style.left = "-160%"        
    })

    //Add an event listener to revious and next
    next.addEventListener ("click", () => {
        let index = songs.indexOf(currentsong.src.split("/songs/")[1])
        let infir = songs.indexOf(songs[0])
        // console.log(songs[0])
        // console.log(currentsong.src.split("/songs/")[1])
        // console.log(index)
        // console.log(songs[0])
        if(index+1 > length)
        {
            playMusic(songs[index+1].replaceAll("%20", " ").replaceAll(".mp3", ""))
            console.log(songs[index+1].replaceAll("%20", " ").replaceAll(".mp3", ""))
        }
        else{
            index = infir
            playMusic(songs[infir].replaceAll("%20", " ").replaceAll(".mp3", ""))
            console.log(songs[infir].replaceAll("%20", " ").replaceAll(".mp3", ""))
        }
    })

    previous.addEventListener("click", () => {
        let index = songs.indexOf(currentsong.src.split("/songs/")[1])
        
        if(index-1 >= 0)
        {
            playMusic(songs[index-1].replaceAll("%20", " ").replaceAll(".mp3", ""))
            console.log(songs[index-1].replaceAll("%20", " ").replaceAll(".mp3", ""))
        }
    })
}

main()