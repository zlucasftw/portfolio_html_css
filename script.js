document.addEventListener("DOMContentLoaded", function() {
    const body = document.querySelector("body");
    body.classList.add("loaded");


// TODO: Change the carousel functionality
/*     const carousel = document.querySelector("[data-carousel]");

    if (carousel) {
        const slides = carousel.querySelector("[data-slides]");
        const buttons = carousel.querySelectorAll("[data-carousel-button]");
        const slideCount = slides.children.length;
        const slidesToShow = 4;
        let currentIndex = 0;

        const maxIndex = Math.max(0, slideCount - slidesToShow);

        function updateCarousel() {
            Array.from(slides.children).forEach(slide => {
                slide.removeAttribute("data-active");
            });

            for (let i = currentIndex; i < currentIndex + slidesToShow && i < slideCount; i++) {
                slides.children[i].setAttribute("data-active", "");
            }

            slides.style.transform = `translateX(-${currentIndex * (100 / slidesToShow)}%)`;
        }
        
        updateCarousel();

        buttons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.dataset.carouselButton === "next" ? 1 : -1;

                currentIndex = Math.max(0, Math.min(currentIndex + direction, maxIndex));

                updateCarousel();
            });
        });
    } */
// TODO: Change the carousel functionality
});



const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        const slides = button
            .closest("[data-carousel]")
            .querySelector("[data-slides]");
    

        const activeSlide = slides.querySelector("[data-active]");
    
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;
        if (newIndex < 0) {
            newIndex =  slides.children.length - 1;
        }
        if (newIndex >= slides.children.length) {
            newIndex = 0;
        }

        slides.children[newIndex].dataset.active = true;
        delete activeSlide.dataset.active;
    });
});

setInterval(() => {
    const slides = document.querySelector("[data-slides]");

    let activeSlide = slides.querySelector("[data-active]");

    let index = [...slides.children].indexOf(activeSlide) + 1;

    if (index < 0) {
        index = slides.children.length - 1;
    }

    if (index >= slides.children.length) {
        index = 0;
    }

    slides.children[index].dataset.active = true;
    delete activeSlide.dataset.active;

}, 6500);

/* const navOpenButton = document.querySelector("#open__nav");
const navCloseButton = document.querySelector("#close__nav");

navOpenButton.addEventListener("click", () => {
    navOpenButton.setAttribute("aria-expanded", "true");
});

navCloseButton.addEventListener("click", () => {
    navCloseButton.setAttribute("aria-expanded", "false");
}); */

const navbar = document.getElementById("navbar");

function openSideBar() {
    navbar.classList.add("show");
}

function closeSideBar() {
    navbar.classList.remove("show");
}

const navOpenButton = document.getElementById("nav__open__button");
const navCloseButton = document.getElementById("nav__close__button");
const nav = document.querySelector('.nav');
const body = document.body;
const navLinks = document.querySelectorAll(".nav__menu__links .nav__link");

navOpenButton.addEventListener("click", () => {
    body.classList.add("nav__open");
    navOpenButton.setAttribute("aria-expanded", "true");
});

navCloseButton.addEventListener("click", () => {
    body.classList.remove("nav__open");
    navCloseButton.setAttribute("aria-expanded", "false");
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        body.classList.remove("show");
        body.classList.remove("nav__open");
        navOpenButton.setAttribute("aria-expanded", "false");
    });
})

