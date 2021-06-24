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
let itemsPerPage = 4;  // 15 is defualt, 4 is for testing
let goods = document.getElementsByClassName("good");
let totalPages = Math.ceil(goods.length / itemsPerPage);
let firstPage = "page1";
let lastPage = "page" + totalPages.toString();
let currentPage = "page1";

window.onload = function () {
    initPages();
    disPage();
    changePage("page1");
}

function initPages() {
    if (totalPages > 1) {
        let paginationSection = document.getElementById("pagination-section");
        let nextPage = document.getElementById("next-page");
        for (let i = 2; i < totalPages + 1; i++) {
            let button = document.createElement("a");
            button.setAttribute("class", "pagination-button");
            let newId = "page" + i.toString();
            button.setAttribute("id", newId);
            button.setAttribute("title", newId);
            button.onclick = function () {
                changePage(newId);
            };
            let text = document.createTextNode(i.toString());
            button.appendChild(text);
            paginationSection.insertBefore(button, nextPage);
            console.log(button.onclick)
        }
        for (let i = 0; i < goods.length; i++) {
            goods[i].classList.add("hidden-good");
        }
    }
}

function disPage() {
    if (currentPage == firstPage) {
        let button = document.getElementById("prev-page");
        button.classList.add("disable-page");
    } else {
        let button = document.getElementById("prev-page");
        button.classList.remove("disable-page");
    }
    if (currentPage == lastPage) {
        let button = document.getElementById("next-page");
        button.classList.add("disable-page");
    } else {
        let button = document.getElementById("next-page");
        button.classList.remove("disable-page");
    }
}

function changePage(page) {
    let pageNumber = parseInt(currentPage[4]) - 1;
    currentPage = page;
    disPage();
    let otherButtons = document.getElementsByClassName("pagination-button");
    for (let i = 0; i < otherButtons.length; i++) {
        otherButtons[i].classList.remove("active-page");
    }
    let clickedButton = document.getElementById(page);
    clickedButton.classList.add("active-page");


    if (goods.length > itemsPerPage) {
        let start = itemsPerPage * pageNumber;
        let end = start + itemsPerPage;

        if (end > goods.length) {
            end = goods.length;
        }

        for (let i = 0; i < goods.length; i++) {
            if (start <= i && i < end) {
                goods[i].classList.remove("hidden-good");
            } else {
                goods[i].classList.add("hidden-good");
            }
        }
    }

}

function prevPage() {
    if (currentPage != firstPage) {
        let tmp = currentPage[4];
        tmp = parseInt(tmp) - 1;
        currentPage = "page" + tmp.toString();
        changePage(currentPage);
    }

}

function nextPage() {
    if (currentPage != lastPage) {
        let tmp = currentPage[4];
        tmp = parseInt(tmp) + 1;
        currentPage = "page" + tmp.toString();
        changePage(currentPage);
    }
}

// pagination - end