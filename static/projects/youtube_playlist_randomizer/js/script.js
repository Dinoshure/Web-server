var controls = document.getElementById("controls");
var videoArea = document.getElementById("video-area");
var controlPlayPrev = document.getElementById("playPrev");
var controlPlayNext = document.getElementById("playNext");
var AddUrlTitle = document.getElementById("addURLh1");
var btnGetVideos = document.getElementById("btnGetVideos");
var videoArea = document.getElementById("video-area");
var upNext = document.getElementById("up-next");
var html = document.getElementById("html");
var header = document.getElementById("header");
var videoList = document.getElementById("video-list");
var playPrevOff = controlPlayPrev.getBoundingClientRect().width;
var playNextWidth = controlPlayNext.getBoundingClientRect().width;
var addUrlInputWidth = 700;
var btnGetVideosWidth = 400;
var videoIds = [];
var bodyRect;
var playerId;

window.onload = checkCookie();

function responsive() {
    bodyRect = document.body.getBoundingClientRect()
    if(bodyRect.width <= btnGetVideosWidth + 10) {
        btnGetVideos.style.width = bodyRect.width - 10 + "px";
    } else {
        btnGetVideos.style.width = btnGetVideosWidth + "px";
    }
    
    if(bodyRect.width >= 1020) {
        AddUrlTitle.innerHTML = "ENTER THE PLAYLIST URL HERE";
    }
    
    if(bodyRect.width <= 1020) {
        AddUrlTitle.innerHTML = "ENTER PLAYLIST URL";
    }
    
    if(bodyRect.width <= 650) {
        AddUrlTitle.innerHTML = "ENTER URL";
    }
    
    if(bodyRect.width <= 355) {
        AddUrlTitle.innerHTML = "URL";
    }
    
    if(bodyRect.width <= addUrlInputWidth + 50) {
        url.style.width = bodyRect.width - 50 + "px";
    } else {
        url.style.width = addUrlInputWidth + "px";
    }
    
    if(bodyRect.width <= 640) {
        videoArea.style.height = bodyRect.width/1.77777778 + "px";
        controls.style.width = bodyRect.width - 2 + "px";
        controls.style.top = "100%";
    } else {
        controls.style.width = "640px";
        videoArea.style.height = "360px";
    }
    
    if(loaded) {
        playerId = document.getElementById("player");
        if(bodyRect.width <= 640) {
            playerId.style.width = bodyRect.width - 2 + "px";
            playerId.style.top =  "0%";
            playerId.style.height = bodyRect.width/1.77777778 + "px";
        } else {
            playerId.style.width = "640px";
            playerId.style.height = "360px";
        }
    }
    
    var playNextOff = controls.getBoundingClientRect().width - playNextWidth;
    var controlButtonDiff = playPrevOff - playNextOff;
    if(controlButtonDiff >= -300) {
        controlPlayPrev.innerHTML = "◀";
        controlPlayNext.innerHTML = "▶"
    } else {
        controlPlayPrev.innerHTML = "◀ Play Previous";
        controlPlayNext.innerHTML = "Play Next ▶";   
    }
}

function resizeHeader() {
    if(html.scrollTop > 0) {
        var height = 160 - html.scrollTop;
        
        header.style.height = height + "px";
        
        if(header.getBoundingClientRect().height < 120) {
            header.style.height = "120px";
        }
    } else {
        header.style.height = "160px";
    }
}

function playNext() {
    player.seekTo(10000000000);
}

function playPrev() {
    if(videoIndex >= 2) {
        videoIndex--;
    }
    
    if(videoIds[videoIndex - 1][0] == "") {
        player.loadVideoById(videoIds[0][0]);
    } else {
        player.loadVideoById(videoIds[videoIndex - 1][0]);
    }
    
    upNext.innerHTML = "UP NEXT: " + videoIds[videoIndex][1];
}

//Credit too Mike Bostock for this shuffle function --> https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

var playlistId;

function getVideos(playlistURL) {
    console.log(playlistURL);
    var request = new XMLHttpRequest();
    request.open("GET", "get_videos?playlist=" + playlistURL, true);
    request.onload = function() {
        videoIds = request.response;
        
        if(videoIds == "ERR: PLAYLIST NOT FOUND") {
            alert("ERROR: PLAYLIST NOT FOUND! MAKE SURE THE URL IS VALID");
            return;
        }
        
        videoIds = videoIds.split("SPLITINTOIDANDTITLE");
        videoIds = shuffle(videoIds);
        
        for(i = 0; i < videoIds.length; i++) {
            if(videoIds[i] == "") {
                videoIds.splice(i, 1);
            }
        }
        
        for(i = 0; i < videoIds.length; i++) {
            videoIds[i] = videoIds[i].split("SPLITIDSANDTITLE");
        }
        
        player.loadVideoById(videoIds[0][0]);
        controls.style.display = "inline";
        upNext.style.display = "inline";
        upNext.innerHTML = "UP NEXT: " + videoIds[1][1];
        createList(videoIds);
        
        for(i = 0; i < videoIds.length; i++) {
            if(videoIds[i].length == 1) {
                playlistId = videoIds[i][0];
            }
        }
    };
    request.send();
}

var tag, firstScriptTag;
function loadAPI() {
    tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: "THE CAKE IS A LIE",
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

var loaded = false;

function onPlayerReady(event) {
    event.target.playVideo();
    loaded = true;
    if(noCookie) {
        getVideos(document.getElementById('url').value);
    } else {
        getVideos(checkCookie());
    }
}

var videoIndex = 1;

function onPlayerStateChange(event) {
    if(videoIndex <= 1) {
        controlPlayPrev.style.display = "none";
    } else {
        controlPlayPrev.style.display = "inline-block";
    }
    
    if (event.data == YT.PlayerState.ENDED) {
        if(videoIndex >= videoIds.length - 1) {
            videoIds = shuffle(videoIds);
            videoIndex = 0;
            createList(videoIds);
        }
        
        updateUpNext();
        
        player.loadVideoById(videoIds[videoIndex][0]);
        videoIndex++;
    }
}

function updateUpNext() {
    if(videoIndex >= videoIds.length - 2) {
        upNext.innerHTML = "END OF PLAYLIST - IT WILL LOOP AGAIN";
    } else {
        upNext.innerHTML = "UP NEXT: " + videoIds[videoIndex + 1][1];   
    }
}

function createList(arr) {
    while(videoList.hasChildNodes()) {
        videoList.removeChild(videoList.firstChild);
    }
    
    for(i = 0; i < arr.length; i++) {
        var a = document.createElement("a");
        var aText = document.createTextNode(i + 1 + " - " + arr[i][1]);
        a.appendChild(aText);
        a.title = "Play this video: " + arr[i][1];
        a.id = "play-video" + i;
        a.href = "#";
        a.setAttribute("onclick", "jumpToVideo(event, i);")
        videoList.appendChild(a);
    }
}

function jumpToVideo(e, index) {
    videoIndex = parseInt(e.target.id.replace("play-video", ""));
    player.loadVideoById(videoIds[videoIndex][0]);
    updateUpNext();
    videoIndex++;
}

function setCookie(name, id, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    console.log(expires);
    document.cookie = name + "=" + id + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var id = getCookie("PLID");
    console.log(id);
    if (id != "") {
        noCookie = false;
        console.log(noCookie);
        loadAPI();
        url.value = id;
        
        return id;
    } else {
        setCookie("PLID", document.getElementById('url').value, 365);
    }
}