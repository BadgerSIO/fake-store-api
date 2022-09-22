//common fucntion for creating product cards
const createCards =(product)=>{
  const card = document.createElement("div");
  card.className = "card shadow-lg";
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
}


//common function
const getProductsData = async (cat) => {
  const url = `https://fakestoreapi.com/products`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  sentToFilter(data, cat);
};
// setting the category filter 
const setCategory = (data,cat)=>{
  const selectCategories = document.getElementById("selectCategories");
  let categoryArray = [];
  data.forEach(product=>{
    if (categoryArray.indexOf(product.category) === -1) {
      categoryArray.push(product.category);
    }
  });
  if(cat){
    for(i=0;i<categoryArray.length;i++){
      selectCategories.removeChild(selectCategories.lastChild);
    }
  }
  
  categoryArray.forEach((category) => {
    const options = document.createElement("option");
    options.innerHTML = `${category}`;
    selectCategories.appendChild(options);
  });
}
// Showing product inside ui 
const sentToFilter = (data, cat) => {
  const products = document.getElementById("products");

  // product filtering 
  if(cat){
    products.innerHTML='';
    const newData = data.filter(product=>product.category==cat)
    newData.forEach(product=>{
      createCards(product);
    })
    return;
  }
  data.forEach((product) => {
   createCards(product); 
  });
  //setCategory function calling
  setCategory(data,cat);
  
};
// filtering products by category
function filterCat(event) {
  let x = event.target.value;
  getProductsData(x);
}

getProductsData();
