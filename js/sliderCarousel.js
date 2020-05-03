'use strict';

class SliderCarousel{
  constructor({
    main, 
    wrap, 
    next,
    prev,
    infinity = false,
    position = 0,
    slidesToShow = 2,
  }){
    this.main = document.querySelector(main);
    this.wrap = document.querySelector(wrap);
    this.slides = document.querySelector(wrap).children;
    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);
    this.slidesToShow = slidesToShow;
    
    
    this.properties = {
      position,
      infinity,
      widhtSlide: Math.floor(100 / this.slidesToShow),
      maxPosition: this.slides.length - this.slidesToShow
    };

  }


  // Запуск карусели
  init() {
    this.addSliderClass();
    this.addStyle();

    if (this.next && this.prev){
      this.controlSlider();
    } else {
      this.addArrows();
      this.controlSlider();
    }    
  }

  addSliderClass() {
    this.main.classList.add('my-slider');
    this.wrap.classList.add('my-slider__wrap');
    for ( const item of this.slides) {
      item.classList.add('my-slider__item');
    }
  }

  addStyle() {
    const style = document.createElement('style');
    style.id = 'sliderCarousel-style';
    style.textContent = `
      .my-slider {
        overflow: hidden !important; 
      }

      .my-slider__wrap {
        display: flex !important;
        transition: transform 0.5s !important;
        will-change: transform !important;
      }

      .my-slider__item {
        border: none;
        margin: 0 !important;
        flex: 0 0 ${this.properties.widhtSlide}% !important;
      }
    `;
    document.head.appendChild(style);
  }

  controlSlider() {
    this.next.addEventListener('click', this.nextSlide.bind(this));
    this.prev.addEventListener('click', this.prevSlide.bind(this));
  }

  nextSlide() {
    if (this.properties.infinity || this.properties.position < this.properties.maxPosition) {
      ++this.properties.position;
      console.log(this.properties.position);
      if (this.properties.position > this.properties.maxPosition) {
        this.properties.position = 0
      }
      this.wrap.style.transform = `translateX(-${this.properties.position * this.properties.widhtSlide}%)`;
      
    }
    
  }

  prevSlide() {
    if (this.properties.infinity || this.properties.position > 0){
      --this.properties.position;
      console.log(this.properties.position);
      if (this.properties.position < 0) {
        this.properties.position = this.properties.maxPosition
      }
      this.wrap.style.transform = `translateX(-${this.properties.position * this.properties.widhtSlide}%)`;
    }
    
  }

  addArrows() {
    this.prev = document.createElement('button');
    this.next = document.createElement('button');

    this.prev.className = 'my-slider__prev';
    this.next.className = 'my-slider__next';

    this.main.appendChild(this.prev);
    this.main.appendChild(this.next);


    const style = document.createElement('style');
    style.textContent = `
      .my-slider__prev,
      .my-slider__next{
        margin: 0 10px;
        border: 20px solid transparent;
        background: transparent;
        outline: none;
        cursor: pointer;
      }

      .my-slider__next{
        border-left-color: #FF6C6C;
      }
      .my-slider__prev{
        border-right-color: #FF6C6C;
      }

      .my-slider__next:hover{
        border-left-color: rgba(255, 108, 108, 0.9);
      }
      .my-slider__prev:hover{
        border-right-color: rgba(255, 108, 108, 0.9);
      }
    `;
    document.head.appendChild(style);
  }
}
