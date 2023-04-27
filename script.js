const backdrop = document.querySelector(".backdrop");
const aside = document.querySelector("aside");
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.querySelector("aside button.close");

const openMenu = () => {
  backdrop.classList.add("active");
  aside.classList.add("active");
};

const closeMenu = () => {
  backdrop.classList.remove("active");
  aside.classList.remove("active");
};

menuBtn.addEventListener("click", e => {
  e.preventDefault();
  openMenu();
});

closeBtn.addEventListener("click", e => {
  e.preventDefault();
  closeMenu();
});

backdrop.addEventListener("click", e => {
  if (e.target === backdrop) {
    closeMenu();
  }
});

let lastScrollPosition = 0;
let lastCentered = 0;
let onWayTo = null;

const handleScroll = () => {
  const direction =
    window.pageYOffset - lastScrollPosition > 0 ? "down" : "up";
  const sections = [...document.querySelectorAll("section")];

  if (onWayTo === null) {
    const destIndex =
      direction === "up" ? lastCentered - 1 : lastCentered + 1;
    if (destIndex >= 0 && destIndex < sections.length) {
      onWayTo = destIndex;
      window.scroll(0, sections[destIndex].offsetTop);
    }
  }

  sections.forEach((section, index) => {
    if (window.pageYOffset === section.offsetTop) {
      lastCentered = index;
      section.classList.add("active");
      if (onWayTo === index) {
        onWayTo = null;
      }
    } else {
      section.classList.remove("active");
    }
  });

  lastScrollPosition = window.pageYOffset;
};

window.addEventListener("scroll", handleScroll);
