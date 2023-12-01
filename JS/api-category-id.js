export async function getCategoryId(categoryId) {
  const url = categoryId
    ? `https://www.rainy-days.no/wp-json/wp/v2/posts?categories=${categoryId}`
    : "https://www.rainy-days.no/wp-json/wp/v2/posts/?per_page=30";

  const response = await fetch(url);
  const result = await response.json();

  if (response.ok) {
    return result;
  } else {
    throw new Error("Failed to fetch posts!");
  }
}
