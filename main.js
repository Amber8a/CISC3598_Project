const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

arrows.forEach((arrow, i) => {
  const list = movieLists[i];
  const items = list.querySelectorAll(".movie-list-item");
  let currentIndex = 0;
  arrow.addEventListener("click", () => {
    const itemWidth = items[0].offsetWidth + 30; // width + margin
    const ratio = Math.floor(window.innerWidth / itemWidth);
    const maxIndex = items.length - ratio;
    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0; 
    }
    list.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  });
});

