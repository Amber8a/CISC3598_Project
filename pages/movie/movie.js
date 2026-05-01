import { supabase } from '../../supabase.js'

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

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

if (movieId) {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`)
    .then(res => res.json())
    .then(movie => {

      document.getElementById("title").innerText = movie.title;
      document.getElementById("desc").innerText = movie.overview;

      if (movie.poster_path) {
        document.getElementById("poster").src =
          `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      }

      const trailer = movie.videos?.results?.find(
        v => v.type === "Trailer" && v.site === "YouTube"
      );

      if (trailer) {
        const iframe = document.createElement("iframe");
        iframe.width = "560";
        iframe.height = "315";
        iframe.src = `https://www.youtube.com/embed/${trailer.key}`;
        iframe.allowFullscreen = true;

        document.getElementById("trailer").appendChild(iframe);
      }
    })
    .catch(() => {
      document.getElementById("title").innerText = "Error loading movie";
    });
}