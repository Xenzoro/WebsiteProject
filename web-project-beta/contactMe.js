gsap.registerPlugin(ScrollTrigger);

gsap.to(".contact-info", {
    x: 350,
    y: 150,
    duration: 1,
    scale: 1.5,
    scrollTrigger: {
        trigger: ".contact-info",
        start: "top 100%",
        end: "bottom 80%",
        scrub: true,
        // markers: true,
        toggleActions: "restart none none pause"
    }
});

gsap.to(".second-profile-pic",{
    x: -140,
    duration: 1,
    scale: 1.3,
    scrollTrigger: {
        trigger: ".second-profile-pic",
        start: "top 100%",
        end: "bottom 80%",
        scrub: true,
        // markers: true,
        toggleActions: "restart none none pause"
    }
});

gsap.to(" .contact-me-h",{
   x: -25,
   y: -75,
   duration: 1,
   scale: 1.2,
    scrollTrigger: {
        trigger: ".contact-me-h",
        start: "top 100%",
        end: "bottom 80%",
        scrub: true,
        // markers: true,
        toggleActions: "restart none none pause"
    }
});

gsap.to(" .email-address",{
    x: -20,
    y: 130,
    duration: 1,
    scale: 1.2,
     scrollTrigger: {
         trigger: ".email-address",
         start: "top 100%",
         end: "bottom 80%",
         scrub: true,
         // markers: true,
         toggleActions: "restart none none pause"
     }
});
