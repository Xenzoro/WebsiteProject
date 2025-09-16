// Track scroll position for desktop navbar
let lastScrollY = window.scrollY;
const navbar = document.getElementById("navbar");
const THRESHOLD = 8;

window.addEventListener("scroll", function() {
    const current = window.scrollY;
    if (current <= 0) {
        navbar.classList.remove("hidden-navbar");
    } else if (current - lastScrollY > THRESHOLD) {
        navbar.classList.add("hidden-navbar");
    } else if (lastScrollY - current > THRESHOLD) {
        navbar.classList.remove("hidden-navbar");
    }
    lastScrollY = current;
});

const hamburger = document.getElementById("hamburger");
const mobileNavbar = document.getElementById("mobile-navbar");

// Hamburger click: toggle mobile navbar, hide/show desktop navbar
hamburger.addEventListener("click", function(event) {
    event.stopPropagation();
    const isHidden = mobileNavbar.classList.contains("hidden-navbar");
    mobileNavbar.classList.toggle("hidden-navbar");
    if (isHidden) {
        navbar.classList.add("hidden-navbar"); // Hide desktop when showing mobile
    } else {
        navbar.classList.remove("hidden-navbar"); // Show desktop when hiding mobile
    }
});

// Click outside mobile navbar: hide mobile navbar, show desktop navbar
document.addEventListener("click", function(event) {
    const isNavbar = mobileNavbar.contains(event.target);
    const isHamburger = hamburger.contains(event.target);
    if (!isNavbar && !isHamburger && !mobileNavbar.classList.contains("hidden-navbar")) {
        mobileNavbar.classList.add("hidden-navbar");
        navbar.classList.remove("hidden-navbar");
    }
});