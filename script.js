function locomotiveScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
function cursorEffect() {
  let cursor = document.querySelector(".page1 .cursor");
  let page1 = document.querySelector(".page1");
  page1.addEventListener("mousemove", function (e) {
    gsap.to(cursor, {
      x: e.x,
      y: e.y,
    });
  });
  page1.addEventListener("mouseleave", function () {
    gsap.to(cursor, {
      scale: 0,
    });
  });
  page1.addEventListener("mouseenter", function () {
    gsap.to(cursor, {
      scale: 1,
    });
  });
}
function page2Effect() {
  let page2 = document.querySelector(".page2");
  let text = document.querySelectorAll(".page2 .text");
  let hr = document.querySelector(".page2 hr");
  gsap.from(text, {
    duration: 1,
    scrollTrigger: {
      trigger: page2,
      start: "15% bottom",
      end: "15% bottom",
      scroller: ".main",
      toggleActions: "play none reverse reset",
    },
    y: 300,
    stagger: 0.1,
    opacity: 1,
  });
  gsap.from(hr, {
    duration: 1,
    scrollTrigger: {
      trigger: page2,
      start: "15% bottom",
      scroller: ".main",
      toggleActions: "play none reverse reset",
    },
    width: 0,
  });
}
function page3Effect() {
  let page3top = document.querySelector(".page3-top");
  let page3topspan = document.querySelectorAll(".page3-top h2 span");
  gsap.from(page3topspan, {
    duration: 1,
    scrollTrigger: {
      trigger: page3top,
      start: "top bottom",
      end: "top bottom",
      scroller: ".main",
      toggleActions: "play none reverse reset",
    },
    y: 300,
    opacity: 0,
  });
}
if (gsap) {
  cursorEffect();
  locomotiveScroll();
  page2Effect();
  page3Effect();
}
