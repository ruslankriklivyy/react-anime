const scrollTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollTop);
    window.scrollTo(0, c - c / 8);
  }
};

export default scrollTop;
