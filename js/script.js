const axios = require('axios');

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

// get token

async function getData () {

  axios({
    method: 'post',
    url: 'https://api.im.am/test/register',
    data: {
      "uuid": "465a4fafa45sfa46"
    },
    headers : {
      "Content-Type" : "multipart/form-data",
      "Accept" : "*/*",
    }
  });








  // const req = await fetch('https://api.im.am/test/register', {
  //   method: 'POST',
  //   headers: {
      // "Content-Type" : "multipart/form-data",
      // "Accept" : "*/*",
  //   },
  //   body: JSON.stringify({
  //     "uuid": "465a4fafa45sfa46"
  //   }),
  // });
}

await getData();
