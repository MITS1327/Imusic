// iffe in order not to litter in window(global object)

(async () => {

// initialization variables

const searchBtn = document.querySelector('.nav__li_btn-search');
const searchInput = document.querySelector('.search__input');
const burger = document.querySelector('.burger');
const menu = document.querySelector('.profile__dropdown');
const profile = document.querySelector('.profile');
const playBtn = document.querySelector('.play');
const profileAvatar = document.querySelector('.profile__avatar');
let audio;
let pause = false;


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

async function getToken () {

  // add http://localhost:8080/ before request P.S. thak u backend)

  const req = await fetch('http://localhost:8080/https://api.im.am/test/register', {

    method: 'POST',
    headers: {

      "Content-Type" : "multipart/form-data",
      "Accept" : "*/*",

    },
    body: JSON.stringify({

      "uuid": "465a4fafa45sfa46"

    }),

  });

  const res = await req.json();

  return res.token;
}

// get track list

async function getTrackList () {

  const token = await getToken();

  // add http://localhost:8080/ before request P.S. thak u backend)

  const requestTrackList = await fetch(`http://localhost:8080/https://api.im.am/test/get-tracks?token=${token}`);

  const trackList = await requestTrackList.json();

  return trackList;

}


// create track list and player
async function createHTML () {
  const listArr = await getTrackList();
  const list = document.querySelector('.track__list');
  const playerTrackArtist = document.querySelector('.player__track_artist');
  const playerTrackName = document.querySelector('.player__track_name');
  const playerTrackTime = document.querySelector('.moves__time');
  const prevMusic = document.querySelector('.prev');
  const nextMusic = document.querySelector('.next');
  const playBtn = document.querySelector('.play');

  // previous track

  prevMusic.addEventListener('click', () => {

    const currentTrack = listArr.find((obj) => {

      return obj.url === audio.src;

    });

    console.log(audio.src)

    const currentIndex = listArr.indexOf(currentTrack);
    console.log(currentIndex)
    const prevIndex = currentIndex - 1 !== -1 ? currentIndex - 1 : listArr.length - 1;
    playerTrackName.textContent = listArr[prevIndex].title;
    audio.src = listArr[prevIndex].url

    play();
  });

  // next track
  nextMusic.addEventListener('click', () => {

    const currentTrack = listArr.find((obj) => {

      return obj.url === audio.src;

    });

    const currentIndex = listArr.indexOf(currentTrack);
    console.log(currentIndex)
    const nextIndex = (currentIndex + 1) % listArr.length;
    playerTrackName.textContent = listArr[nextIndex].title;
    audio.src = listArr[nextIndex].url

    play();
  });


  // start and pause tracks from player
  playBtn.addEventListener('click', () => {
    pause = !pause

    if (audio && pause) {

      // pause = true;
      audio.pause();

    } else if (audio && !pause) {

      // pause = false;
      audio.play();

    }

  });


  listArr.forEach(el => {

    const trackLi = document.createElement('li');
    const trackLink = document.createElement('a');
    trackLink.classList.add('track__link');
    trackLi.classList.add('track__li_active');
    trackLi.classList.add('track__li');
    const trackDescriptionBlock = document.createElement('div');
    trackDescriptionBlock.classList.add('track__description_block');
    const trackName = document.createElement('h3');
    trackName.classList.add('track__name');
    const trackArtist = document.createElement('span');
    trackArtist.classList.add('track__artist');
    const trackTime = document.createElement('span');
    trackTime.classList.add('track__time');
    const trackAvatar = document.createElement('span');
    trackAvatar.classList.add('track__avatar');
    const trackDescription = document.createElement('p');
    trackDescription.classList.add('track__description');

    trackName.textContent = el.title;
    trackArtist.textContent = el.artist;
    trackTime.textContent = `/${Math.floor(el.play_time / 60)}:${el.play_time % 60}`;
    trackLi.id = el.id;


    // start track
    trackLi.addEventListener('click', (event) => {

      const theTarget = event.target;
      const currentObj = listArr.find( (obj) => {

        return +obj.id === +theTarget.id;

      });

      playerTrackName.textContent = currentObj.title;
      playerTrackArtist.textContent = currentObj.artist;
      playerTrackTime.textContent = `${Math.floor(currentObj.play_time / 60)}:${currentObj.play_time % 60}`;
      trackLi.id = currentObj.id;

      if (audio) {

        audio.src = el.url

      } else {

        audio = new Audio();
        audio.src = el.url;
        audio.autoplay = true;
        playBtn.classList.toggle('stop');

      }
    });

    trackDescription.append(trackArtist);
    trackDescription.append(trackTime);
    trackDescriptionBlock.append(trackName);
    trackDescriptionBlock.append(trackDescription);
    trackAvatar.append(trackLink);
    trackLi.append(trackAvatar);
    trackLi.append(trackDescriptionBlock);
    list.append(trackLi);

  });

  console.log(pause);

}

await createHTML ();
})();
