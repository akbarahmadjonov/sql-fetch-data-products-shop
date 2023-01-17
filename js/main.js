let localData = localStorage.getItem("token");

if (!localData) {
  window.location.replace("login.html");
}
