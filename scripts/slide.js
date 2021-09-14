export const createSlide = ({img, body}) => {
  const slide = document.createElement('div'); 
  slide.classList.add('slide'); 
  slide.innerHTML = (`
  <img src=${img}/> 
  <h3>${body}</h3>
  `); 
  return slide; 
}