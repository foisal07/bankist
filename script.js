'use strict';

const nav = document.querySelector('.nav');
const navLinkContainer = document.querySelector('.nav__links');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const s1 = document.getElementById('section--1');

const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnLearnMore = document.querySelector('.btn--scroll-to');

///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (const btns of btnsOpenModal) {
  btns.addEventListener('click', openModal);
}

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Smooth Scorlling Learn More to Section 1

// click learn more addevenlisteners> find the section coordinates > scroll to the position

// const s1CoordsTop = s1.getBoundingClientRect().top + window.pageYOffset;

btnLearnMore.addEventListener('click', () =>
  // window.scrollTo({ left: 0, top: s1CoordsTop, behavior: 'smooth' })

  // Modern Solution doesn't works for old browsers
  s1.scrollIntoView({ behavior: 'smooth' })
);

///////////////////////////////////////
// Smooth Scrolling Menu Link To Section (Event Delegation)

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

navLinkContainer.addEventListener('click', e => {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// Tabbed Component

const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabContents = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');

  // Exit if clicked other places in tab container not button
  if (!clicked) return;

  // Active tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Show content
  tabContents.forEach(tabContent =>
    tabContent.classList.remove('operations__content--active')
  );

  const contentId = clicked.dataset.tab;

  document
    .querySelector(`.operations__content--${contentId}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
// Menu Hover Effects

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('nav').querySelectorAll('.nav__link');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });

    const logo = link.closest('nav').querySelector('img');
    logo.style.opacity = this;
  }
};

// addEventlistener expect a function not a function value (i.e handleHover(e, 0.5)) would have provided so we use bind as it creates a new function by copying the function that it was called on with the specified this value.In case more arguments we will pass on an array in the bind argument.

nav.addEventListener('mouseover', handleHover.bind('0.5'));
nav.addEventListener('mouseout', handleHover.bind('1'));

///////////////////////////////////////
// Sticky Nav: IntersectObserver API

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const sticky = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(sticky, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

///////////////////////////////////////
// Revealing Section Header On Scroll: IntersectObserver API

const sections = document.querySelectorAll('.section');

const reveal = function (entries) {
  const [entry] = entries;
  // after intial load some parts of section 1 was intersecting and firing the section hidden remove
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  sectionObserver.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(reveal, {
  root: null,
  threshold: 0.1,
});

sections.forEach(section => {
  // section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

///////////////////////////////////////
// Lazy Load Image On Scroll: IntersectObserver API

const lazyImages = document.querySelectorAll('.lazy-img');
const lazyIm = document.querySelector('.lazy-img');

const loadImg = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace lazy image source with original image
  entry.target.src = entry.target.dataset.src;

  // Remove filter (i.e lazy-img class) once the images are done loading

  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  imgObserver.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

lazyImages.forEach(lazyImg => {
  imgObserver.observe(lazyImg);
});

///////////////////////////////////////
//Slider
const slideContainer = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
const dotContainer = document.querySelector('.dots');
const singleDot = document.querySelectorAll('.dots__dot');

let curSlide = 0;
const maxSlide = slides.length;

const createDot = () => {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = slide => {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

// Move slide
const moveSlide = slide => {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${(i - slide) * 100}%)`;
  });
};

// Next Slide
const nxtSlide = () => {
  curSlide === maxSlide - 1 ? (curSlide = 0) : curSlide++;
  moveSlide(curSlide);
  activateDot(curSlide);
};

// Previous Slide
const prevSlide = () => {
  curSlide === 0 ? (curSlide = maxSlide - 1) : curSlide--;
  moveSlide(curSlide);~
  activateDot(curSlide);
};

const init = function () {
  createDot();
  activateDot(0);
  moveSlide(0);
};

init();

btnRight.addEventListener('click', nxtSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowUp') nxtSlide();
  if (e.key === 'ArrowDown') prevSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot'));
  const { slide } = e.target.dataset;
  moveSlide(slide);
  activateDot(slide);
});
