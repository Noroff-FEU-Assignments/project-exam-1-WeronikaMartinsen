import { showLoadingIndicator, hideLoadingIndicator } from "./functions.js";

import { filterPostsByCategory } from "./blog.js";

const categoriesLink = "https://www.rainy-days.no/wp-json/wp/v2/categories";

async function getCategories() {
  showLoadingIndicator();
  const response = await fetch(categoriesLink);
  const result = await response.json();
  if (response.ok) {
    hideLoadingIndicator();
    return result;
  } else {
    throw new Error("Failed to fetch!");
  }
}

async function displayCategories() {
  try {
    const categories = await getCategories();
    const categoriesContainer = document.querySelector(".categories");

    categoriesContainer.innerHTML = "";
    categories.forEach((category) => {
      const categoryList = document.createElement("div");
      categoryList.className = "categoryList";
      categoryList.innerHTML = `<div>
    <ul>
      <li class="category-item" data-category-id="${category.id}">${category.name}</li>
      </ul>
      </div>    
      `;

      categoriesContainer.appendChild(categoryList);

      const categoryItem = categoryList.querySelector(".category-item");
      categoryItem.addEventListener("click", () => {
        const categoryId = category.id;
        filterPostsByCategory(categoryId);
      });
    });
  } catch (error) {
    console.log("Failed to fetch categories.");
  }
}
displayCategories();
