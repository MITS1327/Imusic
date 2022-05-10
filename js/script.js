// initialization variables
const searchBtn = document.querySelector('.nav__li_btn-search');
const searchInput = document.querySelector('.search__input');
const burger = document.querySelector('.burger');
const menu = document.querySelector('.profile__dropdown');
const profile = document.querySelector('.profile');
const playBtn = document.querySelector('.play');
const profileAvatar = document.querySelector('.profile__avatar');


// open search input
searchBtn.addEventListener('click', () => {

  searchInput.classList.toggle('input-active');

});


// open burger menu
burger.addEventListener('click', () => {

  profile.classList.toggle('menu-opened');
  menu.classList.toggle('is-dropdown');
  profileAvatar.classList.toggle('profile-active');

});


// player control
playBtn.addEventListener('click', () => {

  playBtn.classList.toggle('stop');

});
