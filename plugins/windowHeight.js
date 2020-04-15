function setDocHeight() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`);
};

addEventListener('resize', setDocHeight)
addEventListener('scroll', setDocHeight)
addEventListener('orientationchange', setDocHeight)
document.addEventListener('DOMContentLoaded', setDocHeight, false);