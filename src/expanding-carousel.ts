import EmblaCarousel, { type EmblaOptionsType } from 'embla-carousel';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

import { getAssertedHtmlElement, getAssertedHtmlElements } from './utils/util';

const mm = gsap.matchMedia();

gsap.registerPlugin(Flip);

/**
 * Register Embla Carousel Plugins
 */
const allCarouselWrappers = getAssertedHtmlElements('.exp-carousel-wrapper');

for (const emblaNode of allCarouselWrappers) {
  const startIndexParsed = Number.parseInt(emblaNode.dataset.startIndex || '');
  const startIndex = Number.isNaN(startIndexParsed) ? 0 : startIndexParsed;

  const options: EmblaOptionsType = {
    loop: false,
    align: 'center',
    breakpoints: {
      '(min-width: 992px)': { watchDrag: false },
    },
    startIndex,
    slides: getAssertedHtmlElements('.exp-slide', emblaNode),
  };
  const emblaApi = EmblaCarousel(emblaNode, options);

  /**
   * Elements
   */
  const slideNodes = emblaApi.slideNodes();
  const nextButtons = Array.from(document.querySelectorAll<HTMLElement>('.exp-button.is-next'));
  const prevButtons = Array.from(document.querySelectorAll<HTMLElement>('.exp-button.is-prev'));

  /**
   * States
   */
  let activeSlideIndex = 1;
  let activeSlideElement: HTMLElement | undefined = undefined;

  /**
   * Functions
   */

  const setActiveSlide = (slideElIndex: number) => {
    if (slideElIndex === activeSlideIndex) return;

    // Elements
    const slideEl = slideNodes.at(slideElIndex)!;

    const slideContentEl = getAssertedHtmlElement('.exp-slide-content', slideEl);
    const slideElVideo = slideEl.querySelector<HTMLVideoElement>('video');
    const prevActiveSlideVideo = activeSlideElement?.querySelector<HTMLVideoElement>('video');
    const prevActiveSlideContent = activeSlideElement
      ? getAssertedHtmlElement('.exp-slide-content', activeSlideElement)
      : undefined;

    // Scroll to the current active slide
    emblaApi.scrollTo(slideElIndex);

    let flipState: Flip.FlipState | undefined = undefined;

    mm.add('(min-width: 992px)', () => {
      // Gsap Flip State
      flipState = Flip.getState(slideNodes, { props: 'flex' });
    });

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

    let matchedMedia: boolean = false;

    mm.add('(min-width: 992px)', () => {
      matchedMedia = true;
      if (flipState)
        Flip.from(flipState, {
          duration: 0.4,
          ease: 'power1.inOut',
          onComplete: () => {
            gsap.fromTo(
              slideContentEl,
              {
                x: '100%',
                opacity: 0,
                visibility: 'hidden',
              },
              {
                x: '0%',
                opacity: 1,
                visibility: 'visible',
              }
            );
          },
        });
    });

    if (!matchedMedia) {
      gsap.fromTo(
        slideContentEl,
        {
          x: '100%',
          opacity: 0,
          visibility: 'hidden',
        },
        {
          x: '0%',
          opacity: 1,
          visibility: 'visible',
        }
      );

      // if (prevActiveSlideContent)
      //   gsap.to(prevActiveSlideContent, {
      //     visibility: 'hidden',
      //   });
    }
    // Reassign the active slide
    activeSlideElement = slideEl;
    activeSlideIndex = slideElIndex;

    if (!slideElVideo) return;

    slideElVideo.play();
  };

  /**
   * Register event listeners in a loop
   */
  for (let i = 0; i < slideNodes.length; i++) {
    const slideEl = slideNodes.at(i)!;

    const slideContentEl = getAssertedHtmlElement('.exp-slide-content', slideEl);

    const slideElVideo = slideEl.querySelector<HTMLVideoElement>('video');

    // Play the video at first page load, if it exists on active slide
    if (slideEl.classList.contains('is-active')) {
      slideElVideo?.play();
      activeSlideElement = slideEl;
      activeSlideIndex = i;
      slideContentEl.style.visibility = 'visible';
    } else {
      slideContentEl.style.visibility = 'hidden';
    }

    slideEl.addEventListener('click', () => {
      mm.add('(min-width: 992px)', () => {
        setActiveSlide(i);
      });
    });
  }

  for (const nextButton of nextButtons) {
    nextButton.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeSlideIndex >= slideNodes.length - 1) return;

      setActiveSlide(activeSlideIndex + 1);
    });
  }

  for (const prevButton of prevButtons) {
    prevButton.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeSlideIndex === 0) return;

      setActiveSlide(activeSlideIndex - 1);
    });
  }

  emblaApi.on('select', (evt) => {
    const activeSlideIndex = evt.internalEngine().index.get();
    setActiveSlide(activeSlideIndex);
  });
}
