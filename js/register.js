const form = document.querySelector(".form");
const username = document.querySelector(".username");
const phone = document.querySelector(".phone");
const email = document.querySelector(".email");
const password = document.querySelector(".password");

form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  fetch("http://localhost:5000/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_name: username.value,
      phone: phone.value,
      email: email.value,
      password: password.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.replace("index.html");
      }
    })
    .catch((err) => console.log(err));
});
