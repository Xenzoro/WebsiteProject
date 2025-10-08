document.addEventListener("DOMContentLoaded", () => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const cardPositions = [
        { top: "30%", left: "55%" },
        { top: "20%", left: "25%" },
        { top: "50%", left: "10%" },
        { top: "60%", left: "40%" },
        { top: "30%", left: "30%" },
        { top: "60%", left: "60%" },
        { top: "20%", left: "50%" },
        { top: "60%", left: "10%" },
        { top: "20%", left: "40%" },
        { top: "45%", left: "55%" },
    ];

    const titlesContainer = document.querySelector(".h-scroll-titles");
    // change this next element based on how many titles i add
    const moveDistance = window.innerWidth * 3;

    const imagesContainer = document.querySelector(".h-scroll-images");
    const imageCount = 11; // this number will or can change depending on what images i add

    for (let i = 1; i <= imageCount; i++) {
        const card = document.createElement("div");
        card.className = `h-scroll-card h-scroll-card-${i}`;

        const img = document.createElement("img");
        img.src = `project-files/hScroll/img (${i}).jpeg`;
        img.alt = `Image ${i}`;
        card.appendChild(img);

        const position = cardPositions[(i - 1) % cardPositions.length]; // this lets us reuse positions
        card.style.top = position.top;
        card.style.left = position.left;

        imagesContainer.appendChild(card);
    }

    const cards = imagesContainer.querySelectorAll(".h-scroll-card");
    cards.forEach((card, index) => {
        gsap.set(card, {
            z: -50000,
            scale: 0,
        });
    });

    ScrollTrigger.create({
        trigger: ".h-scroll-section",
        start: "top top",
        end: `+=${window.innerHeight * 5}px`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
            const xPosition = -moveDistance * self.progress;
            gsap.set(titlesContainer, {
                x: xPosition,
            });

            const velocity = self.getVelocity();
            const normalizedVelocity = velocity / Math.abs(velocity) || 0;
            const maxOffset = 30;
            const currentSpeed = Math.min(Math.abs(velocity / 500), maxOffset);

            const isAtEdge = self.progress <= 0 || self.progress >= 1;

            document.querySelectorAll(".h-scroll-title").forEach((titleContainer, index) => {
                const title1 = titleContainer.querySelector(".title-1");
                const title2 = titleContainer.querySelector(".title-2");
                const title3 = titleContainer.querySelector(".title-3");

                if (isAtEdge) {
                    gsap.to([title1, title2], {
                        xPercent: -50,
                        x: 0,
                        duration: 0.3,
                        ease: "power2.out",
                        overwrite: true,
                    });
                } else {
                    const baseOffset = normalizedVelocity * currentSpeed;

                    gsap.to(title1, {
                        xPercent: -50,
                        x: `${baseOffset * 4}px`,
                        duration: 0.2,
                        ease: "power1.out",
                        overwrite: "auto",
                    });

                    gsap.to(title2, {
                        xPercent: -50,
                        x: `${baseOffset * 2}px`,
                        duration: 0.2,
                        ease: "power1.out",
                        overwrite: "auto",
                    });

                }

                gsap.set(title3, {
                    xPercent: -50,
                    x: 0,
                });
            });

            cards.forEach((card, index) => {
                const staggerOffset = index * 0.075;
                const scaledProgress = (self.progress - staggerOffset) * 3;
                const individualProgress = Math.max(0, Math.min(1, scaledProgress));
                const targetZ = index === cards.length - 1 ? 1500 : 2000;
                const newZ = -50000 + (targetZ + 50000) * individualProgress;
                const scaleProgress = Math.min(1, individualProgress * 10);
                const scale = Math.max(0, Math.min(1, scaleProgress));

                gsap.set(card, {
                    z: newZ,
                    scale: scale,
                });
            });
        },
    });
});
