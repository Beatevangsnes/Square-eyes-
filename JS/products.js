const resultContainer = document.querySelector(".result");
const url = "https://cms.beatiz.com/wp-json/wc/store/products";

async function getVideos() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    resultContainer.innerHTML = "";
    let moviesContainer = null;
    let counter = 0;

    data.forEach((video, index) => {
      const { images, name, prices } = video;
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
      <a href="product-details.html?id=${video.id}"> <div class="card-image-container">
        <img class="card-image" src="${images[0].src}" />
        </div>
        <div class="card-content">
          <h2 class="card-title">${name}</h2>
          <p class="card-price">${prices.price} kr</p>
        </div></a>
        `;
      counter++;

      if (video.id === 21) {
        const featuredContainer = document.createElement("div");
        featuredContainer.classList.add("featured-container");
        featuredContainer.innerHTML = `
          <div class="featured-img">
            <a href="product-details.html?id=${video.id}">
            <img src="${images[0].src}" />
            </a>
          </div>
          <div class="featured-offer">
            <h1>SPECIAL OFFER!</h1>
          <div>
          <div class="featured-title">
            <h2>${name}</h2>
          </div>
          <div class="featured-price">
            <p class="regular-price">${prices.regular_price} kr</p>
            <p>${prices.price} kr</p>
          </div>
          <div class="buy-card">
            <div class="btn"><a href="/checkout.html">Buy now</a></div>
          </div>
          `;  

        resultContainer.insertBefore(featuredContainer, resultContainer.firstChild);
      }

      if (counter % 4 === 1) {
        moviesContainer = document.createElement("div");
        moviesContainer.classList.add("movies-container");

        let title = "";

        if (index < 4) {
          title = "Popular now";
        } else if (index < 8) {
          title = "New Releases";
        } else if (index < 12) {
          title = "Action";
        }

        const titleContainer = document.createElement("div");
        titleContainer.classList.add("title-container");
        const titleElement = document.createElement("h1");
        titleElement.innerText = title;
        titleContainer.appendChild(titleElement);

        resultContainer.appendChild(titleContainer);
        resultContainer.appendChild(moviesContainer);
      }

      moviesContainer.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    resultContainer.innerHTML = "Error: " + error.message;
  }
}

getVideos();
