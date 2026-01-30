// Track scroll position for desktop navbar
let lastScrollY = window.scrollY;
const navbar = document.getElementById("navbar");
const THRESHOLD = 8;
const hamburger = document.getElementById("hamburger");
const mobileNavbar = document.getElementById("mobile-navbar");

// Initialize navbar visibility on page load
(function initNavbar() {
    const isMobile = window.innerWidth <= 1400;
    if (isMobile) {
        navbar.classList.add("hidden-navbar");
        navbar.style.display = "none";
        navbar.style.visibility = "hidden";
    }
})();

(function navBarOnScroll(){
    window.addEventListener("scroll", function() {
        const current = window.scrollY;
        const isMobile = window.innerWidth <= 800;

        // On mobile, always keep desktop navbar hidden - no exceptions
        if(isMobile){
            navbar.classList.add("hidden-navbar");
            navbar.style.display = "none";
            navbar.style.visibility = "hidden";
            lastScrollY = current;
            return;
        }

        const mobileActive = !mobileNavbar.classList.contains("hidden-navbar");

        if (mobileActive) {
            navbar.style.display = "none";
            return;
        }
        if (current <= 0) {
            navbar.classList.remove("hidden-navbar");
            mobileNavbar.classList.add("hidden-navbar");
            navbar.style.display = "flex";
            navbar.style.visibility = "visible";
        } else if (current - lastScrollY > THRESHOLD) {
            navbar.classList.add("hidden-navbar");
            navbar.style.display = "flex";
        } else if (lastScrollY - current > THRESHOLD) {
            navbar.classList.remove("hidden-navbar");
            navbar.style.display = "flex";
            navbar.style.visibility = "visible";
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
    const isMobile = window.innerWidth <= 800;

    mobileNavbar.classList.toggle("hidden-navbar");

    // Only manage desktop navbar visibility if not on mobile
    if (!isMobile) {
        if (isHidden) {
            navbar.classList.add("hidden-navbar"); // Hide desktop when showing mobile
        } else {
            navbar.classList.remove("hidden-navbar"); // Show desktop when hiding mobile
        }
    } else {
        // Ensure desktop navbar stays hidden on mobile
        navbar.classList.add("hidden-navbar");
        navbar.style.display = "none";
    }
});
})();
// out of bounds hamburger navbar
(function OOBHamburgerNavBar() {
// Click outside mobile navbar: hide mobile navbar, show desktop navbar
document.addEventListener("click", function(event) {
    const isNavbar = mobileNavbar.contains(event.target);
    const isHamburger = hamburger.contains(event.target);
    const isMobile = window.innerWidth <= 800;

    if (!isNavbar && !isHamburger && !mobileNavbar.classList.contains("hidden-navbar")) {
        mobileNavbar.classList.add("hidden-navbar");

        // Only show desktop navbar if not on mobile
        if (!isMobile) {
            navbar.classList.remove("hidden-navbar");
        } else {
            navbar.classList.add("hidden-navbar");
            navbar.style.display = "none";
        }
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
            // Force desktop navbar hidden on mobile
            navbar.classList.add("hidden-navbar");
            navbar.style.display = "none";
            navbar.style.visibility = "hidden";
        } else {
            // On desktop, show/hide based on mobile menu state
            navbar.style.display = mobileActive ? "none" : "flex";
            navbar.style.visibility = mobileActive ? "hidden" : "visible";
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
