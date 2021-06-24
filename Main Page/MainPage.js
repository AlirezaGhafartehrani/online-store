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
let itemsPerPage = 15;
let goods = document.getElementsByClassName("good");
let totalPages = Math.ceil(goods.length / itemsPerPage);
let firstPage = "page1";
let lastPage = "page" + totalPages.toString();
let currentPage = "page1";

window.onload = function () {
    init(true);
}

function init(good) {
    if (good) {
        initGoods(40);
    }
    goods = document.getElementsByClassName("good");
    totalPages = Math.ceil(goods.length / itemsPerPage);
    lastPage = "page" + totalPages.toString();
    initPages();
    disPage();
    changePage("page1");
}


function createGood(src, alt, title, category, price) {
    let goodContainer = document.getElementById("goods-grid-container");

    let good = document.createElement("div");
    good.setAttribute("class", "good");

    let image = document.createElement("img");
    image.setAttribute("src", src);
    image.setAttribute("alt", alt);
    image.setAttribute("class", "good-image");
    good.appendChild(image);

    let titleElement = document.createElement("p");
    titleElement.setAttribute("class", "good-title");
    let text1 = document.createTextNode(title.toString());
    titleElement.appendChild(text1);
    good.appendChild(titleElement);

    let categoryElement = document.createElement("p");
    categoryElement.setAttribute("class", "good-category");
    let text2 = document.createTextNode(category.toString());
    categoryElement.appendChild(text2);
    good.appendChild(categoryElement);

    let divider = document.createElement("hr");
    divider.setAttribute("class", "solid-divider");
    good.appendChild(divider);

    let purchase = document.createElement("div");
    purchase.setAttribute("class", "good-purchase");

    let priceElement = document.createElement("p");
    priceElement.setAttribute("class", "good-price");
    let text3 = document.createTextNode(price.toString());
    priceElement.appendChild(text3);
    purchase.appendChild(priceElement);

    let button = document.createElement("button");
    button.setAttribute("class", "purchase-button");
    let text4 = document.createTextNode("خرید محصول");
    button.appendChild(text4);
    purchase.appendChild(button);

    good.appendChild(purchase);

    goodContainer.appendChild(good);

}

function initGoods(n) {
    for (let i = 0; i < n / 4; i++) {
        createGood("pic/bag.png", "bag image", "کوله پشتی خردلی", "دسته بندی یک", "10,000 تومان")
    }
    for (let i = n / 4; i < n / 2; i++) {
        createGood("pic/bag.png", "bag image", "کوله پشتی خردلی", "دسته بندی یک", "20,000 تومان")
    }
    for (let i = n / 2; i < (n * (3 / 4)); i++) {
        createGood("pic/bag.png", "bag image", "کوله پشتی خردلی", "دسته بندی یک", "30,000 تومان")
    }
    for (let i = (n * (3 / 4)); i < n; i++) {
        createGood("pic/bag.png", "bag image", "کوله پشتی خردلی", "دسته بندی یک", "40,000 تومان")
    }
}


function initPages() {
    if (totalPages > 1) {
        let paginationSection = document.getElementById("pagination-section");
        let nextPage = document.getElementById("next-page");
        let oldButtons = document.querySelectorAll(".pagination-button:not(.primary-button)");
        oldButtons.forEach(element => element.parentNode.removeChild(element));

        for (let i = 2; i < totalPages + 1; i++) {
            let button = document.createElement("a");
            button.setAttribute("class", "pagination-button");
            let newId = "page" + i.toString();
            button.setAttribute("id", newId);
            button.setAttribute("title", newId);
            button.onclick = function () {changePage(newId);};
            let text = document.createTextNode(i.toString());
            button.appendChild(text);
            paginationSection.insertBefore(button, nextPage);
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


function setItemPerPage(n) {
    itemsPerPage = n;
    for (let i = 10; i < 21; i += 5) {
        let button = document.getElementById("items" + i.toString());
        button.classList.remove("active-button");
    }
    let active = document.getElementById("items" + n.toString());
    active.classList.add("active-button");
    init(false);
}

function changePage(page) {
    currentPage = page;
    let pageNumber = parseInt(currentPage[4]) - 1;
    disPage();
    let otherButtons = document.getElementsByClassName("pagination-button");
    for (let i = 0; i < otherButtons.length; i++) {
        otherButtons[i].classList.remove("active-button");
    }
    let clickedButton = document.getElementById(page);
    clickedButton.classList.add("active-button");


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