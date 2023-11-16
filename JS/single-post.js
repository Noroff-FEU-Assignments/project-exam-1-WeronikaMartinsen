import { showLoadingIndicator, hideLoadingIndicator } from "./functions.js";

const singlePostUrl = "https://www.rainy-days.no/?rest_route=/wp/v2/posts/82";

async function getPost() {
  showLoadingIndicator();
  const response = await fetch(singlePostUrl);
  const result = await response.json();
  if (response.ok) {
    hideLoadingIndicator();
    return result;
  } else {
    throw new Error("Fail to fetch");
  }
}
async function displayPost() {
  try {
    const post = await getPost();
    const singlePostContainer = document.querySelector(".singlePost");

    singlePostContainer.innerHTML = "";
    singlePostContainer.innerHTML = `<div class="postHomePage" id="postHomePageSection">
    <div class="firstBox">
    <h2 class="titleDecoration">${post.title.rendered}</h2>
    <a href="/html/blog-specific.html?id=${post.id}&title=${post.title.rendered}"><img class="postImage" src="${post.jetpack_featured_media_url}"></a></div>
    <div class="secondBox">
    <span>${post.excerpt.rendered}</span>
    <span class="italic">"This post changed my life. I think every mom should read it."</span>
  <div><ion-icon id="star" name="star"></ion-icon><ion-icon id="star" name="star"></ion-icon><ion-icon id="star" name="star"></ion-icon><ion-icon id="star" name="star"></ion-icon><ion-icon id="star"name="star"></ion-icon></div></div>
    </div>`;

    const postHomePageSection = document.getElementById("postHomePageSection");
    const postHomePage = document.querySelector(".postHomePage");

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            postHomePage.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(postHomePageSection);
  } catch (error) {
    showError("Failed to fetch posts. Please try again later.");
  }
}

displayPost();
