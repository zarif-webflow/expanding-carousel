import EmblaCarousel, { type EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';

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
 * Register event listeners in a loop
 */
for (let i = 0; i < slideNodes.length; i++) {
  const slideEl = slideNodes.at(i)!;

  const slideElVideo = slideEl.querySelector<HTMLVideoElement>('video');

  // Play the video at first page load, if it exists on active slide
  if (slideEl.classList.contains('is-active')) {
    slideElVideo?.play();
  }

  slideEl.addEventListener('click', () => {
    // Scroll to the current active slide
    emblaApi.scrollTo(i);

    // Remove the previous active slide and pause it's video
    activeSlideElement?.classList.remove('is-active');
    activeSlideElement?.querySelector<HTMLVideoElement>('video')?.pause();

    // Reassign the active slide
    activeSlideElement = slideEl;

    // Add the active class and play the video
    slideEl.classList.add('is-active');

    if (!slideElVideo) return;

    slideElVideo.play();
  });
}
