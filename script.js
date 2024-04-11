"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
const renderCountry = function (data, className = "") {
  console.log(data);
  const html = `       
    <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${Object.values(data.name)[0]}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(data.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.values(data.currencies)[0].name
            }</p>
          </div>
      </article>`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  // countriesContainer.style.opacity = 1;
};
const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  // countriesContainer.style.opacity = 1;
};
///////////////////////////////////////
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener("load", function () {
//     console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//     <article class="country">
//           <img class="country__img" src="${data.flags.png}" />
//           <div class="country__data">
//             <h3 class="country__name">${Object.values(data.name)[0]}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)}</p>
//             <p class="country__row"><span>🗣️</span>${
//               Object.values(data.languages)[0]
//             }</p>
//             <p class="country__row"><span>💰</span>${
//               Object.values(data.currencies)[0].name
//             }</p>
//           </div>
//       </article>`;
//     countriesContainer.insertAdjacentHTML("beforeend", html);
//     countriesContainer.style.opacity = 1;
//   });
// };
// getCountryData("iran");
// getCountryData("japan");
// getCountryData("south korea");

///////////////////////////////////////
/*
const getCountryANDneighbour = function (country) {
  //ajax call country 1
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    renderCountry(data);
    //get neighbour country7
    const neighbour = data.borders;
    if (!neighbour) return;

    //ajax call country 2
    neighbour.forEach((el) => {
      const request2 = new XMLHttpRequest();
      request2.open("GET", `https://restcountries.com/v3.1/alpha/${el}`);
      request2.send();
      request2.addEventListener("load", function () {
        const [data2] = JSON.parse(this.responseText);
        console.log(data2);
        renderCountry(data2, "neighbour");
      });
    });
  });
};
// getCountryANDneighbour("iran");
// getCountryANDneighbour("japan");
getCountryANDneighbour("south korea");*/

//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

// const req = fetch("https://restcountries.com/v3.1/name/canada");
// console.log(req);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

const getCountryData = function (country) {
  //country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then((data) => {
      renderCountry(data[0]);
      if (!data[0].borders) return;
      const neighbour = data[0].borders[0];

      //country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then((response) => {
      if (!response) throw new Error("no neighbour found!");
      return response.json();
      console.log(response);
    })
    .then(([data]) => renderCountry(data, "neighbour"))
    .catch((error) => {
      console.error(error);
      renderError(`something went wrong ${error.message} try again!`);
    })
    // finally is done either way ejected or fullfiled(?).
    .finally(() => {
      countriesContainer.style.opacity = 1;
      // for loading circels
    });
};
// getCountryData("japan");

///////////////////////////////////////
//////////// SECTION Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

//PART 1

const whereAmI = function (lat, lng) {
  const req = fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${lat},${lng}&key=598f881e42784a6d8393b5644b724992`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(`something went wrong in response ${response.status}`);
      return response.json();
    })
    .then((data) => {
      data = data.results[0].components;
      console.log(`You are in ${data.city}, ${data.country}`);
      getCountryData(data.country);
    });
};
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

/*
console.log("test start");
setTimeout(() => console.log("0 sec timer", 0));
Promise.resolve("resolved promise 1").then((res) => console.log(res));
Promise.resolve("resolved promise 2").then((res) => {
  for (let i = 0; i < 100; i++) console.log(res);
});
console.log("test end");
*/

//////////// SECTION lottary promise
/*
// the function is called excuter
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log("lottering...");
  setTimeout(function () {
    if (Math.random() >= 0.5) resolve("You Win $");
    else reject(new Error("You lost your money"));
  }, 2000);
});
lotteryPromise
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

const wait = function (sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
};
wait(2)
  .then((res) => {
    console.log("i wated for 2 seconds");
    return wait(1);
  })
  .then((res) => console.log("i waited for 1 seconds"));

// a fullfiled promise
Promise.resolve("yeyyy").then((res) => console.log(res));
// or a rejected one
Promise.reject("NOOO god whyyyy whyyyyyyy").then((res) => console.log(res));
*/
/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    // (position) => resolve(position.coords),
    // (err) => reject(`sothings wrong! checkout ${err.message}!`)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

btn.addEventListener("click", () => {
  getPosition().then((position) => {
    // console.log(position);
    btn.style.opacity = 0;
    whereAmI(position.coords.latitude, position.coords.longitude);
  });
});
*/

///////////////////////////////////////

//////////// SECTION Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
C:\Users\ev221\Pictures\e-readerWall
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/
const imgClass = document.querySelector(".images");
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = imgPath;
    console.log(img);
    img.addEventListener("load", function () {
      imgClass.append(img);
      resolve(img);
    });
    img.addEventListener("error", function () {
      reject(new error("image not found"));
    });
  });
};
const wait = function () {
  return new Promise((resolve) => setTimeout(resolve, 2000));
};
// const images = function (imgPath) { };
let currimg;
createImage(`img/img-1.jpg`)
  .then((img) => {
    currimg = img;
  })
  .then(() => wait())
  .then(() => {
    currimg.style.display = "none";
    return createImage(`img/img-2.jpg`);
  })
  .then((img) => {
    currimg = img;
  })
  .then(() => wait())
  .then(() => {
    currimg.style.display = "none";
    return createImage(`img/img-3.jpg`);
  })
  .then((img) => {
    currimg = img;
  })
  .then(() => wait())
  .then(() => {
    currimg.style.display = "none";
  });
