gsap.registerPlugin(ScrollTrigger);


//this file controls animations for contactMe files. or my contact me section on the bottom of my page.
gsap.to(".contact-info", {
    x: 365,
    y: 200,
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
(function emailHoverAnimation()
    {
    //this passes in .email-address class to a variable that can be used for this function
    let emailAddress = document.querySelector(".email-address");

    //actual animation that will be played on hover
        let animation = gsap.to(".email-address",
        {
            paused: true,
            scale: (1.3)

        });
    // this detects if there is a mouse on that element, if there is it plays the animation, if not it reverses it.
    emailAddress.addEventListener("mouseenter",
    () => animation.play())
    emailAddress.addEventListener("mouseleave",
    () => animation.reverse());
    })();

(function getInTouchHoverAnimation()
    {
    let getInTouch = document.querySelector(".contact-info");
    let animation2 = gsap.to(".contact-info",
        {
            paused: true,
            scale: (1.6),
            x: 374,
            y: 227

        });
    getInTouch.addEventListener("mouseenter",
    () => animation2.play())
    getInTouch.addEventListener("mouseleave",
    () => animation2.reverse());
    })();

(function profilePic2HoverAnimation()
    {
    let ProfilePic2 = document.querySelector(".second-profile-pic");
    let animation3 = gsap.to(".second-profile-pic",
        {
            paused: true,
            scale: (1.4),
            x: -150

        });
    ProfilePic2.addEventListener("mouseenter",
    () => animation3.play())
    ProfilePic2.addEventListener("mouseleave",
    () => animation3.reverse());
    })();

