// slide show - start

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active-dot");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active-dot");
}

setInterval(plusSlides, 7000, 1); // every 7 sec

// slideshow - end

// pagination - start
let currentPage = "page1";
window.onload = function () {
    disPage()
}

function disPage() {
    if (currentPage == "page1") {
        let button = document.getElementById("prev-page");
        button.classList.add("disable-page")
    } else {
        let button = document.getElementById("prev-page");
        button.classList.remove("disable-page");
    }
    if (currentPage == "page3") {
        let button = document.getElementById("next-page");
        button.classList.add("disable-page")
    } else {
        let button = document.getElementById("next-page");
        button.classList.remove("disable-page");
    }
}

function changePage(page) {
    currentPage = page;
    disPage();
    let otherButtons = document.getElementsByClassName("pagination-button");
    for (let i = 0; i < otherButtons.length; i++) {
        otherButtons[i].classList.remove("active-page")
    }
    let clickedButton = document.getElementById(page);
    clickedButton.classList.add("active-page")
}

function prevPage() {
    if (currentPage != "page1") {
        let tmp = currentPage[4];
        tmp = parseInt(tmp) - 1;
        currentPage = "page" + tmp.toString();
        changePage(currentPage);
    }

}

function nextPage() {
    if (currentPage != "page3") {
        let tmp = currentPage[4];
        tmp = parseInt(tmp) + 1;
        currentPage = "page" + tmp.toString();
        changePage(currentPage);
    }
}

// pagination - end