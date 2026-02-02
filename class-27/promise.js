const success = true;
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (success) {
      resolve("promise has resolved successfully");
    } else {
      reject("promise rejected successfully");
    }
  }, 3000);
});
myPromise
  .then((message) => {
    console.log(message);
  })
  .catch((err) => {
    console.error(err);
  });
