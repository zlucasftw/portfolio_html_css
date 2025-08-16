document.addEventListener("DOMContentLoaded", function() {
    const body = document.querySelector("body");
    body.classList.add("loaded");
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
