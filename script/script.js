let products  = []

const URL_PRODUCTS = 'http://localhost:3000/productos/'
const productsContainer = document.querySelector('#containerProducts');


// Esto permitiría que los productos se muestren en la página en tiempo real,
// en lugar de tener que esperar a que se carguen todos los productos antes de mostrarlos.

const getProductsData = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
    }catch(error){
      console.log(error);
      return [];
    } 
    
  };




// Funcion que nos permite mostrar los productos
const showProducts = async (container, products) => {
  const firstSix = products.slice(0, 6);
  firstSix.forEach((product) => {
    const productElement = document.createElement('div');
    productElement.classList.add('card','col-4','n-ppost', 'animate__animated', 'animate__bounceIn');

  productElement.innerHTML = '';
    productElement.innerHTML += `
    <div class="options d-flex gap-3 position-absolute" name="${product.id}">
    <span class="buttons__opti items">
      <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip" data-bs-placement="top" title="Favorite">
        <span class="material-symbols-outlined heart">favorite</span>
      </button>
      <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip" data-bs-placement="top" title="View">
        <span class="material-symbols-outlined">autorenew</span>
      </button>
      <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip"  data-bs-placement="top" title="Hidde">
        <span class="material-symbols-outlined">visibility</span>
      </button>
    </span>
  </div>
  <figure class="p-1 mb-0 figures" >
    <img src="${product.img}" alt="" srcset="" />
  </figure>
  <span class="card__h">${product.name}</span>
  <span class="card__price">${product.price} <span class="card__discount">${product.discount}</span></span>
  <figure class="card__starts">
    <ul class="rating list-unstyled d-flex">
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
      </li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
      </li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
      </li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
      </li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
      </li>
    </ul>
    <span class="card__stock">In Stock</span>
  </figure>
  <div class="card__add">
    <span class="add__atom" id="add-item" >Add
    <button type="button"><span class="material-symbols-outlined add-icon" data-add="add" id="${product.id}">
      add
      </span></button>
  </span>
  </div>
    `;

    productsContainer.appendChild(productElement);


  });

}
// Funcion que nos permite filtrar los alimentos segun su categoria
const filterProducts = (products) => {

  const categories = ["all"];
  
  products.forEach((item) => {
    if (!categories.includes(item.category)) {
      categories.push(item.category);
    }
  });
  categories.forEach((item) => {
    const botonFiltrado = document.getElementsByName(item)[0];
    console.log(botonFiltrado);
  botonFiltrado.addEventListener("click", () => {
    productsContainer.innerHTML = '';
    const productsFiltered =
  item === "all"
    ? products.slice(0, 6) // muestra los primeros 6 elementos sin filtrar
    : products.filter((element) => element.category === item).slice(0, 6); // filtra y muestra los primeros 6 elementos
showProducts(productsContainer, productsFiltered);
  });
});
}

 
document.addEventListener("DOMContentLoaded", async () => {
  products = await getProductsData(URL_PRODUCTS);
  showProducts(productsContainer, products)  
  filterProducts(products);
});

let listProducts = await getProductsData(URL_PRODUCTS);
export default listProducts;

