import EmblaCarousel, { type EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';

import { getAssertedHtmlElement } from './utils/util';

const emblaNode = getAssertedHtmlElement('.embla');
const options: EmblaOptionsType = { loop: false, align: 'center' };
const plugins = [Autoplay()];
const emblaApi = EmblaCarousel(emblaNode, options, plugins);

emblaApi.slideNodes().forEach((slideEl, i) => {
  slideEl.addEventListener('click', () => {
    console.log(`${i} clicked`);
    emblaApi.scrollTo(i);
  });
});
