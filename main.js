import { supabase } from './supabase.js'

const { data: { session } } = await supabase.auth.getSession();
const isLoggedIn = !!session;

document.querySelectorAll(".logged-in-item").forEach(el => el.style.display = isLoggedIn ? "flex" : "none");
document.querySelectorAll(".logged-out-item").forEach(el => el.style.display = isLoggedIn ? "none" : "flex");

const accountBtn = document.getElementById("accountBtn");
const accountDropdown = document.getElementById("accountDropdown");
const accountCaret = document.getElementById("accountCaret");

accountBtn.addEventListener("click", (e) => {
  const isOpen = accountDropdown.classList.toggle("open");
  accountCaret.classList.toggle("open", isOpen);
  e.stopPropagation();
});

document.addEventListener("click", () => {
  accountDropdown.classList.remove("open");
  accountCaret.classList.remove("open");
});

if (isLoggedIn) {
  document.getElementById("logoutBtn").addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "index.html";
  });
}

const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

arrows.forEach((arrow, i) => {
  const list = movieLists[i];
  const items = list.querySelectorAll(".movie-list-item");
  let currentIndex = 0;
  arrow.addEventListener("click", () => {
    const itemWidth = items[0].offsetWidth + 30; 
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

const watchButtons = document.querySelectorAll(".movie-list-item-button, .featured-button");

watchButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const movieItem = btn.closest("[data-id]");
    const movieId = movieItem.getAttribute("data-id");

    window.location.href = `pages/movie/movie.html?id=${movieId}`;
  });
});