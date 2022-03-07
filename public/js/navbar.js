const menuContainer = document.querySelector('.navbar-menu');
const menu = document.querySelector('.navbar-end');
const menuBtn = document.querySelector('.navbar-burger');

const toggleMenu = () => {
  const menuContainerHeight = menuContainer.getBoundingClientRect().height;
  const menuHeight = menu.getBoundingClientRect().height;

  if (menuContainerHeight === 0) {
    menuBtn.classList.add('is-active');
    menuContainer.style.height = `${menuHeight}px`;
  } else {
    menuContainer.style.height = 0;
    menuBtn.classList.remove('is-active');
  }
};

menuBtn.addEventListener('click', toggleMenu);
