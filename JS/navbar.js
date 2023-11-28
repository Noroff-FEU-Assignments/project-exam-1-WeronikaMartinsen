const navbar = document.querySelector(".navbar");

navbar.innerHTML = `<div class="navContainer sticky">
<a href="/index.html" class="logoDiv"><img class="logoImg"src="/images/newLogo.png" alt="My personal "web&dev" logo."/></a>
<div class="navList">
<ul class="linkList">
<li><a href="/index.html">Home</a></li>
<li><a href="/html/blog.html">Blog</a></li>
<li><a href="/html/about.html">About</a></li>
<li><a id="navLinkColor"class="btn-nav" href="/html/contact.html">Contact me</a></li>
</ul></div><div class="navToggle"><ion-icon name="menu-outline" class="menu"></ion-icon></div>
</div>`;
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".navToggle");
  const linkList = document.querySelector(".navList");
  const menuIcon = document.querySelector(".menu");

  menuToggle.addEventListener("click", () => {
    linkList.classList.toggle("active");
    if (linkList.classList.contains("active")) {
      menuIcon.setAttribute("name", "close-outline");
    } else {
      menuIcon.setAttribute("name", "menu-outline");
    }
  });
});
