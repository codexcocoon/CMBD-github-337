const accordion = document.querySelectorAll(".accordion");
const head = document.querySelectorAll(".head");
const details = document.querySelectorAll(".details");

head.forEach((h, i) => {
  h.addEventListener("click", () => {
    head.forEach((head, ind) => {
      if (i === ind) {
        head.classList =
          "head w-96 p-3 font-bold bg-black text-white relative before:content-['-'] before:absolute before:top-0 before:right-0 before:h-full before:aspect-square before:grid before:place-content-center before:text-white";
        details[ind].classList =
          "details px-3 py-3 max-h-max overflow-hidden transition-all duration-300";
      } else {
        head.classList =
          "head w-96 p-3 font-bold text-black hover:bg-gray-500 hover:text-white relative before:content-['+'] before:absolute before:top-0 before:right-0 before:h-full before:aspect-square before:grid before:place-content-center before:text-black";
        details[ind].classList =
          "details px-3 py-0 max-h-0 overflow-hidden transition-all duration-300";
      }
    });
  });
});
