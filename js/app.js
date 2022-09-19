const getProductsData = async () => {
  const url = `https://fakestoreapi.com/products`;
  const res = await fetch(url);
  const data = await res.json();
  sentToFilter(data, "");
};
const sentToFilter = (data, filter) => {
  const products = document.getElementById("products");
  const selectCategories = document.getElementById("selectCategories");
  let categoryArray = [];
  data.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card bg-slate-800 shadow-xl";
    card.innerHTML = `
      <figure>
              <img
                src="${product.image}"
                alt="${product.title}"
                class="w-full h-[400px] object-contain"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${product.title}</h2>
              <h3 class="capitalize text-blue-500">${product.category}</h3>
              <p>${product.description.slice(0, 40)}</p>
              <div class="card-actions flex justify-between">
                <h3 class="text-2xl text-white font-semibold">$${
                  product.price
                }</h3>
                <button class="btn btn-primary bg-blue-600 border-blue-600">
                  Buy Now
                </button>
              </div>
            </div>
      `;
    products.appendChild(card);

    // category js here
    if (categoryArray.indexOf(product.category) === -1) {
      categoryArray.push(product.category);
    }
  });
  categoryArray.forEach((category) => {
    const options = document.createElement("option");

    options.innerHTML = `${category}`;
    selectCategories.appendChild(options);
  });
};
// filtering products by category
function filterCat(event) {
  let x = event.target.value;
  console.log(x);
}

getProductsData();
