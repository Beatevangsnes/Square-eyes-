const detailsContainer = document.querySelector(".details");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  detailsContainer.innerHTML = "No product ID found in URL";
} else {
  const url = "https://cms.beatiz.com/wp-json/wc/store/products/" + id;

  async function fetchSquareEyesData() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data); // display data in console
      // display data in HTML here
      detailsContainer.innerHTML = "";
      const details = document.createElement("div")
      details.classList.add("details-");
      detailsContainer.innerHTML = `
      <div class="card-title">
        <h1>${data.name}</h1>
      </div>
      <img class="card-image" src="${data.images[0].src}" />
      <div class="card-description">
        <p>${data.description}</p>
      </div>
      <div class="card-price">
        <p>${data.price_html} </p>

      </div>
      <div class="buy-card">
      <div class="btn"><a href="/checkout.html">Buy now</a></div>
      <div class="btn"><a href="/cart.html">Add to cart</a></div>
      </div>
      `;
      body.appendChild(details);

    } catch (error) {
      console.error(error);
    }
  }

  fetchSquareEyesData();
}
