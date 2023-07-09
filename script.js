const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);















// const wrapper2 = document.querySelector(".wrapper2");
// const carousel2 = document.querySelector(".carousel2");
// const firstCardWidth2 = carousel.querySelector(".card2").offsetWidth;
// const arrowBtns2 = document.querySelectorAll(".wrapper2 i");
// const carouselChildrens2 = [...carousel2.children];

// let isDragging = false,
//   isAutoPlay = true,
//   startX,
//   startScrollLeft,
//   timeoutId;

// let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// carouselChildrens
//   .slice(-cardPerView)
//   .reverse()
//   .forEach((card) => {
//     carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
//   });

// carouselChildrens.slice(0, cardPerView).forEach((card) => {
//   carousel.insertAdjacentHTML("beforeend", card.outerHTML);
// });

// carousel.classList.add("no-transition");
// carousel.scrollLeft = carousel.offsetWidth;
// carousel.classList.remove("no-transition");

// arrowBtns.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
//   });
// });

// const dragStart = (e) => {
//   isDragging = true;
//   carousel.classList.add("dragging");
//   startX = e.pageX;
//   startScrollLeft = carousel.scrollLeft;
// };

// const dragging = (e) => {
//   if (!isDragging) return; // if isDragging is false return from here
//   carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
// };

// const dragStop = () => {
//   isDragging = false;
//   carousel.classList.remove("dragging");
// };

// const infiniteScroll = () => {
//   if (carousel.scrollLeft === 0) {
//     carousel.classList.add("no-transition");
//     carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
//     carousel.classList.remove("no-transition");
//   }
//   else if (
//     Math.ceil(carousel.scrollLeft) ===
//     carousel.scrollWidth - carousel.offsetWidth
//   ) {
//     carousel.classList.add("no-transition");
//     carousel.scrollLeft = carousel.offsetWidth;
//     carousel.classList.remove("no-transition");
//   }

//   clearTimeout(timeoutId);
//   if (!wrapper.matches(":hover")) autoPlay();
// };

// const autoPlay = () => {
//   if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
//   timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
// };
// autoPlay();

// carousel.addEventListener("mousedown", dragStart);
// carousel.addEventListener("mousemove", dragging);
// document.addEventListener("mouseup", dragStop);
// carousel.addEventListener("scroll", infiniteScroll);
// wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
// wrapper.addEventListener("mouseleave", autoPlay);
