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

const phoneInput = document.getElementById("phone");

phoneInput.addEventListener("input", (e) => {
  const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
  let formatted = "";
  if (digits.length === 0) {
    formatted = "";
  } else if (digits.length <= 1) {
    formatted = `+${digits}`;
  } else if (digits.length <= 4) {
    formatted = `+${digits[0]} (${digits.slice(1)}`;
  } else if (digits.length <= 7) {
    formatted = `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4)}`;
  } else {
    formatted = `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  e.target.value = formatted;
});

document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value.replace(/\D/g, "");
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMsg");

  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { firstName, lastName } } });

  if (error) {
    errorMsg.textContent = error.message;
    return;
  }

  await supabase.from("profiles").insert({
    profile_id: data.user.id,
    firstName,
    lastName,
    email,
    phone
  });

  window.location.href = "../../index.html";
});
