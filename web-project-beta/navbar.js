// Track scroll position for desktop navbar
let lastScrollY = window.scrollY;
const navbar = document.getElementById("navbar");
const THRESHOLD = 8;
const hamburger = document.getElementById("hamburger");
const mobileNavbar = document.getElementById("mobile-navbar");


(function navBarOnScroll(){
    window.addEventListener("scroll", function() {
        const current = window.scrollY;
        const mobileActive = !mobileNavbar.classList.contains("hidden-navbar");
        const isMobile = window.innerWidth <= 800;
        if(isMobile){
            navbar.classList.add("hidden-navbar");
            return;h
        }
        if (mobileActive) {
            navbar.style.display = "none";
            return;
        }
        if (current <= 0) {
            navbar.classList.remove("hidden-navbar");
            mobileNavbar.classList.add("hidden-navbar");
            navbar.style.display = "flex";
        } else if (current - lastScrollY > THRESHOLD) {
            navbar.classList.add("hidden-navbar");
            navbar.style.display = "flex";
        } else if (lastScrollY - current > THRESHOLD) {
            navbar.classList.remove("hidden-navbar");
            navbar.style.display = "flex";
        }
        lastScrollY = current;
    });

})();

(function HamburgerNavBar() {
const hamburger = document.getElementById("hamburger");
const mobileNavbar = document.getElementById("mobile-navbar");
// const navbarRS =document.getElementById("navbar") might not need

// Hamburger click: toggle mobile navbar, hide/show desktop navbar
hamburger.addEventListener("click", function(event){
    // prevents the event from bubbling up to parent elements. Here it stops the click event on the hamburger
    // button from triggering the document-level click handler, which would otherwise close the mobile navbar immediately
    // after opening it.
    event.stopPropagation();
    // this is a boolean bc something can contain something or it cannot
    const isHidden = mobileNavbar.classList.contains("hidden-navbar");

    mobileNavbar.classList.toggle("hidden-navbar");
    if (isHidden) {
        navbar.classList.add("hidden-navbar"); // Hide desktop when showing mobile
    } else {
        navbar.classList.remove("hidden-navbar"); // Show desktop when hiding mobile
    }
});
})();
// out of bounds hamburger navbar
(function OOBHamburgerNavBar() {
// Click outside mobile navbar: hide mobile navbar, show desktop navbar
document.addEventListener("click", function(event) {
    const isNavbar = mobileNavbar.contains(event.target);
    const isHamburger = hamburger.contains(event.target);
    if (!isNavbar && !isHamburger && !mobileNavbar.classList.contains("hidden-navbar")) {
        mobileNavbar.classList.add("hidden-navbar");
        navbar.classList.remove("hidden-navbar");
    }
});

})();
//debounce resize event
let resizeTimeout;
window.addEventListener("resize", function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(() => {
        const isMobile = window.innerWidth <= 800;
        const mobileActive = !mobileNavbar.classList.contains("hidden-navbar");
        if (isMobile) {
            navbar.style.display = "none";
        } else {
            navbar.style.display = mobileActive ? "none" : "flex";
        }
    }, 200);
});

//
// function animateNavbarOnResize() {
//     const resize = window.innerWidth; // this should get the current width of the window
//     const navbar = document.getElementById("navbar"); //this
//
//     navbar.classList.add("hidden-navbar-rs");
//     setTimeout(() => {
//         navbar.classList.remove("hidden-navbar-rs");
//     }, 300); //match the transition duration
//
// }
// window.addEventListener("resize", animateNavbarOnResize);
