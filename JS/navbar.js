const navbar = document.querySelector(".navbar");

navbar.innerHTML = `<div class="navContainer sticky">
<div class="navToggle"><ion-icon name="menu-outline" class="menu"></ion-icon></div>
<a href="/index.html" class="logoDiv"><img class="logoImg"src="/images/logo.png" alt="My personal "web&dev" logo."/></a>
<div class="navList">
<ul>
<li><a href="/html/blog.html">Blog</a></li>
<li><a href="/html/about.html">About</a></li>
<li><a href="/html/contact.html">Contact</a></li>
<li><a class="btnMenu">Chat me</a></li>
</ul></div>
</div>`;
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".navToggle");
  const navList = document.querySelector(".navList");

  menuToggle.addEventListener("click", () => {
    console.log("Menu button clicked!");
    navList.classList.toggle("navList");
  });
});
