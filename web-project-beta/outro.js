gsap.registerPlugin(ScrollTrigger);

// Debug: Add a simple GSAP animation to test if GSAP works
// This should move the quote immediately on page load
// Remove or comment out after testing
// gsap.to(".quote", { x: 150, duration: 1 });

// Add markers for ScrollTrigger debugging
// This will show start/end points on the page

gsap.to(".quote", {
    x: 150, // Move 150px to the right
    scrollTrigger: {
        trigger: ".contact-info",
        start: "top 80%", //starts when section enters viewport
        scrub: true, // Animation tied to scroll position
        markers: true // Show markers for debugging
    }
});