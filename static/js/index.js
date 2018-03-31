var background = document.getElementById("background");
var bgNum = Math.floor(Math.random() * 4) + 1;
bgNum = bgNum.toString();
var bg = "bg_00" + bgNum + ".jpg";
background.style.backgroundImage = "url(/assets/backgrounds/" + bg + ")";

var img = new Image();
img.src = "/assets/backgrounds/bg_title.png"
var imgWidth, imgHeight;
img.onload = function() {
    imgWidth = img.width;
    imgHeight = img.height;

    var bgTitle = document.getElementById("bg-title");
    bgTitle.style.width = imgWidth + "px";
    bgTitle.style.height = imgHeight + "px";
}

var body = document.getElementById("body");
var html = document.getElementById("html");

function scrollAnimations() {
    headerSlide();
}

function headerSlide() {
    var header = document.getElementById("header");
    var buttons = document.getElementsByClassName("header-button");

    if(html.scrollTop > (window.innerHeight - 200)) {
        var opacity = (html.scrollTop - (window.innerHeight - 200)) / 100;
        var height = (html.scrollTop - (window.innerHeight - 200));

        header.style.background = "rgba(29, 33, 38," + opacity + ")";
        header.style.height = height + "px";

        if(header.offsetHeight > 62) {
            header.style.height = "62px";
        }

        for(i = 0; i < buttons.length; i++) {
            lineHeight = 150 - height;
            if(lineHeight >= 62) {
                buttons[i].style.lineHeight = lineHeight + "px";   
            } else if(lineHeight <= 62){
                buttons[i].style.lineHeight = "62px";
            }
        }

    } else {
        header.style.background = "rgba(29, 33, 38, 0)";
        header.style.height = "150px";
        for(i = 0; i < buttons.length; i++) {
            buttons[i].style.lineHeight = "150px";
        }
    }
}