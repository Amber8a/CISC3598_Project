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
    window.location.href = "../../index.html";
  });
}
