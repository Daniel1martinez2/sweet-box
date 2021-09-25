import {colors} from './colors.js';
import {createSlide} from './slide.js';
import {DUMMY_DATA} from './DUMMY_DATA.js'; 
import {sliderContainer, animaWrapper} from './domElements.js'; 

// set up our state
let isDragging = false; 
let startPos = 0; //es la pos del mouse () en el eje x
let currentTranslate = 0; 
let prevTranslate = 0; 
let animationID; 
let currentIndex = 0; 

//Using the data array to create the elements and adding each one to the dom
export const renderSlides = async () => {

  DUMMY_DATA.forEach((slide, index) => {
    const currentSlide = createSlide(slide); 
    sliderContainer.appendChild(currentSlide);
    currentSlide.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)]; 
    
    const slideImage = currentSlide.querySelector('img')
    // disable default image drag
    slideImage.addEventListener('dragstart', (e) => e.preventDefault())
    // touch events
    currentSlide.addEventListener('touchstart', touchStart(index))
    currentSlide.addEventListener('touchend', touchEnd)
    currentSlide.addEventListener('touchmove', touchMove)
    // mouse events
    currentSlide.addEventListener('mousedown', touchStart(index))
    currentSlide.addEventListener('mouseup', touchEnd)
    currentSlide.addEventListener('mousemove', touchMove)
    currentSlide.addEventListener('mouseleave', touchEnd)
  
  });
}; 




// make responsive to viewport changes
window.addEventListener('resize', setPositionByIndex)

// prevent menu popup on long press
window.oncontextmenu = function (event) {
  event.preventDefault()
  event.stopPropagation()
  return false
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
}

// use a HOF so we have index in a closure
function touchStart(index) {
  
  return function (event) {
    currentIndex = index
    startPos = getPositionX(event)
    // console.log(startPos);
    isDragging = true
    animationID = requestAnimationFrame(animation)
    sliderContainer.classList.add('grabbing')
  }
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event)
    // console.log(currentPosition);
    currentTranslate = prevTranslate + currentPosition - startPos 
  }
}

function touchEnd() {
  cancelAnimationFrame(animationID)
  isDragging = false
  const movedBy = currentTranslate - prevTranslate

  // if moved enough negative then snap to next slide if there is one
  if (movedBy < -100 && currentIndex < DUMMY_DATA.length - 1) currentIndex += 1

  // if moved enough positive then snap to previous slide if there is one
  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1

  setPositionByIndex()

  sliderContainer.classList.remove('grabbing')
  if(currentIndex === DUMMY_DATA.length - 1){
    animaWrapper.classList.add('hidden')
  }else{
    animaWrapper.classList.remove('hidden')
  }
}

function animation() {
  setSliderPosition()
  if (isDragging) requestAnimationFrame(animation)
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth
  prevTranslate = currentTranslate
  setSliderPosition()
}

function setSliderPosition() {
  sliderContainer.style.transform = `translateX(${currentTranslate}px)`
}