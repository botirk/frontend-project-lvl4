
export const makeFullScreen = (el) => {
  el.style.height = `${window.innerHeight - 1 - el.offsetTop}px`;
  if (el.parentElement != null) makeFullScreen(el.parentElement);
};