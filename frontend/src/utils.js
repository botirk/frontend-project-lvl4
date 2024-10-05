
export const makeFullScreen = (el) => {
  el.style.height = `${document.documentElement.clientHeight - 1 - el.offsetTop}px`;
  if (el.parentElement != null) makeFullScreen(el.parentElement);
};