import EmblaCarousel, { type EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

import { getAssertedHtmlElement } from './utils/util';

/**
 * Register Embla Carousel Plugins
 */
const emblaNode = getAssertedHtmlElement('.embla');
const options: EmblaOptionsType = { loop: false, align: 'center', skipSnaps: true };
const plugins = [Autoplay()];
const emblaApi = EmblaCarousel(emblaNode, options, plugins);

/**
 * States
 */
const slideNodes = emblaApi.slideNodes();
let activeSlideElement: HTMLElement | undefined = undefined;

/**
 * Functions
 */

/**
 * Register event listeners in a loop
 */
for (let i = 0; i < slideNodes.length; i++) {
  const slideEl = slideNodes.at(i)!;

  const slideContentEl = getAssertedHtmlElement('.slide__content-wrapper', slideEl);

  const slideElVideo = slideEl.querySelector<HTMLVideoElement>('video');

  // Play the video at first page load, if it exists on active slide
  if (slideEl.classList.contains('is-active')) {
    slideElVideo?.play();
    activeSlideElement = slideEl;
  } else {
    slideContentEl.style.visibility = 'hidden';
  }

  slideEl.addEventListener('click', () => {
    // Elements
    const prevActiveSlideVideo = activeSlideElement?.querySelector<HTMLVideoElement>('video');
    const prevActiveSlideContent = activeSlideElement
      ? getAssertedHtmlElement('.slide__content-wrapper', activeSlideElement)
      : undefined;

    // Scroll to the current active slide
    emblaApi.scrollTo(i);

    // Gsap Flip State
    const flipState = Flip.getState(slideNodes, { props: 'flex' });

    // Remove the previous active slide and pause it's video
    activeSlideElement?.classList.remove('is-active');
    prevActiveSlideVideo?.pause();

    if (prevActiveSlideContent)
      gsap.to(prevActiveSlideContent, {
        x: '100%',
        opacity: 0,
      });

    // Add the active class and play the video
    slideEl.classList.add('is-active');

    Flip.from(flipState, {
      duration: 0.4,
      ease: 'power1.inOut',
      onComplete: () => {
        gsap.fromTo(
          slideContentEl,
          {
            x: '100%',
            opacity: 0,
          },
          {
            x: '0%',
            opacity: 1,
            visibility: 'visible',
          }
        );
      },
    });

    // Reassign the active slide
    activeSlideElement = slideEl;

    if (!slideElVideo) return;

    slideElVideo.play();
  });
}
