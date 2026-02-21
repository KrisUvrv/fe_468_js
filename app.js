const LOGOS = [
  {
    src: './images/cat1.svg',
    alt: 'brand logo 1',
  },
  {
    src: './images/cat2.svg',
    alt: 'brand logo 2',
  },
  {
    src: './images/cat3.svg',
    alt: 'brand logo 3',
  },
  {
    src: './images/cat4.svg',
    alt: 'brand logo 4',
  },
  {
    src: './images/cat5.svg',
    alt: 'brand logo 5',
  },
  {
    src: './images/cat6.svg',
    alt: 'brand logo 6',
  },
  {
    src: './images/cat7.svg',
    alt: 'brand logo 7',
  },
  {
    src: './images/cat8.svg',
    alt: 'brand logo 8',
  },
  {
    src: './images/cat1.svg',
    alt: 'brand logo 1',
  },
  {
    src: './images/cat2.svg',
    alt: 'brand logo 2',
  },
  {
    src: './images/cat3.svg',
    alt: 'brand logo 3',
  },
  {
    src: './images/cat4.svg',
    alt: 'brand logo 4',
  },
  {
    src: './images/cat5.svg',
    alt: 'brand logo 5',
  },
  {
    src: './images/cat6.svg',
    alt: 'brand logo 6',
  },
  {
    src: './images/cat7.svg',
    alt: 'brand logo 7',
  },
  {
    src: './images/cat8.svg',
    alt: 'brand logo 8',
  },
];

const state = {
  screenWidth: window.innerWidth,
  isShowAll: false,
  imagesCountCache: 0,
};

const calcSlidesPerView = () => {
  const width = state.screenWidth;

  const minW = 330;
  const maxW = 768;

  const minSlides = 1.2;
  const maxSlides = 3;

  const clampedWidth = Math.min(Math.max(width, minW), maxW);

  const percent = (clampedWidth - minW) / (maxW - minW);
  const value = minSlides + percent * (maxSlides - minSlides);

  return Math.round(value / 0.01) * 0.01;
}

const swiperWrapper = document.getElementById('swiper-wrapper');

const swiperSlides = LOGOS.map((logo) => {
  const swiperSlide = document.createElement('div');
  swiperSlide.className = 'swiper-slide';

  const slide = document.createElement('img');
  slide.src = logo.src;
  slide.alt = logo.alt;

  swiperSlide.appendChild(slide);
  return swiperSlide;
});
swiperWrapper.append(...swiperSlides);

const swiper = new Swiper('.swiper', {
  slidesPerView: calcSlidesPerView(),
  watchOverflow: true,
  speed: 1000,
  loop: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },
});

const renderMobile = () => {
  swiper.params.slidesPerView = calcSlidesPerView();
};

const getVisibleLogosCount = () => {
  if (state.isShowAll) return LOGOS.length;
  if (state.screenWidth >= 1120) return 8;
  if (state.screenWidth >= 768) return 6;

  return LOGOS.length;
}

const brandsContainer = document.getElementById('logos');
const btn = document.getElementById('btn');
const icon = document.getElementById('btnIcon');
const text = document.getElementById('btnText');

const renderDesktop = () => {

  const newCount = getVisibleLogosCount();
  if (newCount === state.imagesCountCache) {
    return;
  }

  brandsContainer.innerHTML = '';
  const images = LOGOS.slice(0, newCount).map((logo) => {
    const image = document.createElement("img");
    image.src = logo.src;
    image.alt = logo.alt;
    return image;
  });
  brandsContainer.append(...images);
  state.imagesCountCache = newCount;
}

const render = () => {
  if (state.screenWidth < 768) {
    renderMobile();
  } else {
    renderDesktop();
  }
};

btn.addEventListener('click', () => {
  state.isShowAll = !state.isShowAll;
  if (state.isShowAll) {
    icon.src = "./images/arrows_collapse.svg";
    text.innerText = 'Скрыть';
  } else {
    icon.src = "./images/arrows_show.svg";
    text.innerText = 'Показать все';
  }
  render();
});

window.addEventListener('resize', () => {
  state.screenWidth = window.innerWidth;
  render();
});

render();
