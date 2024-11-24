import 'swiper/css/bundle';

import Swiper from 'swiper/bundle';

import { getAssertedHtmlElement } from './utils/util';

// Creating a new Swiper instance targeting the HTML element with the class "is-speakers"
new Swiper(getAssertedHtmlElement('.swiper'), {
  // Number of slides per view in the Swiper's container
  slidesPerView: 5,
  // Index number of the initial slide
  //   initialSlide: 2,
  // If true, the active slide will be centered
  centeredSlides: true,
  // If true, clicking on a slide will transition to it
  slideToClickedSlide: true,
  // CSS class name for the visible slides
  //   slideVisibleClass: 'swiper-slide-visible',
  // Distance between slides in px
  spaceBetween: 16,

  autoplay: true,

  slideActiveClass: 'active',

  speed: 400,

  loop: true,

  loopAddBlankSlides: false,
});
window.Webflow ||= [];
window.Webflow.push(() => {});

/*
 const swiper = new Swiper(".is-speakers", {
  // Number of slides per view in the Swiper's container
  slidesPerView: 6.5,
  // Index number of the initial slide
  initialSlide: 0,
  // If true, the active slide will be centered
  centeredSlides: true,
  // If true, clicking on a slide will transition to it
  slideToClickedSlide: true,
  // CSS class name for the visible slides
  slideVisibleClass: 'swiper-slide-visible',
  // Distance between slides in px
  spaceBetween: 16,
  // If true, enables continuous loop mode
  loop: true,
  // Could be 'horizontal' or 'vertical' (for vertical slider)
  direction:'horizontal',
  // Duration of transition between slides (in ms)
  speed: 400,
  // Defines how the Swiper should behave at different window widths
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 'auto',
      spaceBetween: 16
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 'auto',
      spaceBetween: 16
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 1,
      spaceBetween: 16
    },
    768: {
      spaceBetween: 16
    }
  },
  // Configures the autoplay feature of the Swiper
  autoplay: {
    // Sets the delay between transitions (in ms)
    delay: 3000,
    // Determines whether autoplay should stop after the user interacts with the slider
    disableOnInteraction: false,
  },
  // Sets up the navigation for the Swiper
  navigation: {
    // Specifies the HTML elements that should be used as the next and previous buttons
    nextEl: document.querySelector(".swiper-next"),
    prevEl: document.querySelector(".swiper-prev"),
  },
  // Defines event handlers for the Swiper
  on: {
    // Called when the Swiper is initialized
    init: function () {
      this.slides[this.activeIndex].querySelector('.speakers_card-content').classList.add('visible');
      this.slides[this.activeIndex].querySelector('.speakers_card-gradient').classList.add('visible');
    },
    // Called when the active slide changes
    slideChange: function () {
      this.slides.forEach(slide => {
        slide.querySelector('.speakers_card-content').classList.remove('visible');
        slide.querySelector('.speakers_card-gradient').classList.remove('visible');
      });
      this.slides[this.activeIndex].querySelector('.speakers_card-content').classList.add('visible');
      this.slides[this.activeIndex].querySelector('.speakers_card-gradient').classList.add('visible');
    },
  },
 });
});
 */
