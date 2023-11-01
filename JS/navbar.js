const navbar = document.querySelector(".navbar");

navbar.innerHTML = `<div class="navContainer">
<div class="navToggle"><ion-icon name="menu-outline" class="menu"></ion-icon></div>
<a href="/index.html" class="logoDiv"><img class="logoImg"src="/images/logo.png" alt="Logo"/></a>
<div class="navList showNavList">
<a href="/html/blog.html">Posts</a>
<a href="/html/about.html">About</a>
<a href="/html/contact.html">Contact</a></div>
<div><button class="button-main sizeBtn">Log in</button></div>

</div>`;

const menuToggle = document.querySelector(".menu");
const navList = document.querySelector(".navList");

menuToggle.addEventListener("click", () => {
  if (navList.classList.contains("hideNavList")) {
    navList.classList.remove("hideNavList");
    navList.classList.add("showNavList");
  } else {
    navList.classList.remove("showNavList");
    navList.classList.add("hideNavList");
  }
});
