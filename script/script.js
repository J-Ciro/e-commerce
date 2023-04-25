let products  = []
const URL_PRODUCTS = 'http://localhost:3000/productos/'
const URL_FAVORITE = 'http://localhost:3000/favoritos/'
const productsContainer = document.querySelector('#containerProducts');
const logo = document.querySelector(".logo")
const favorites = document.querySelector(".favorites")
const buyProducts = document.querySelector('#view-cart')
const checkout = document.querySelector('.btn-checkout')
const adminLogin = document.querySelector('#account')
let favorite = [];
let itemsSelected = [];
let localStorageCart = [];
let favoriteProducts = [];


logo.addEventListener("click", () =>{
  window.location.href = "../index.html"
})

favorites.addEventListener("click", () => {
  window.location.href = "../pages/wishlist.html"

})

buyProducts.addEventListener("click", () => {
  window.location.href = "../pages/cart.html"

})

checkout.addEventListener("click", () => {
  window.location.href = "../pages/cart.html"

})

adminLogin.addEventListener("click", () => {
  window.location.href = "../pages/login.html"
})





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

  const postFavoriteProducts = async (url, data) => {
    try {
      const response = await axios.post(url, data);
     
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  };


  const deleteFavoriteProduct = async (url, product) => {
    try {
      const response = await axios.delete(url, product);
      return response;
    } catch (error) {
      console.log(error);
      return [];
      
  }
  }



// Funcion que nos permite mostrar los productos
const showProducts = async (container, products, firstLoad='') => {
  container.innerHTML = '';
  const firstSix = products.slice(0, 6);
  firstSix.forEach((product) => {
    const productElement = document.createElement('section');
    productElement.classList.add('card','col-4','n-ppost');
    if (firstLoad) {
      productElement.classList.add('animate__animated', 'animate__bounceIn')
    }
    productElement.setAttribute('data-product', 'product')
  productElement.innerHTML = '';
    productElement.innerHTML += `
   
    <div class="options d-flex gap-3 position-absolute" name="">
    <div class="fav-${product.barcode}">
    
    </div>
   
    <span class="buttons__opti items">
    
      <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip" data-bs-placement="top" title="Favorite">
        <span class="material-symbols-outlined heart" data-favorite="${product.barcode}" barcode="favorite-${product.barcode}">favorite</span>
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
  <span class="card__price">$ ${product.price} <span class="card__discount">$ ${product.discount}</span></span>
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
  <span class="add__atom" barcode="add-item" >
    <button type="button"><span class="material-symbols-outlined add-icon"  data-remove="${product.barcode}" id="remove-${product.barcode}"  name='res-${product.barcode}'>
    remove
    </span></button>
    <div barcode="numeros">
    <span add-number="number" name="">
    ${product.cantidad > 0 && product.quantity ? product.cantidad : 'Add'}
    </span>
    
    </div>
      <button type="button" "><span class="material-symbols-outlined add-icon" data-add="${product.barcode}"  name="${product.barcode}">
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
    // console.log(botonFiltrado);
  botonFiltrado.addEventListener("click", () => {
    productsContainer.innerHTML = '';
   listProducts =
  item === "all"
    ? products.slice(0, 6) // muestra los primeros 6 elementos sin filtrar
    : products.filter((element) => element.category === item).slice(0, 6); // filtra y muestra los primeros 6 elementos
showProducts(productsContainer, listProducts);
  });
});
}

 
document.addEventListener("DOMContentLoaded", async () => {
  products = await getProductsData(URL_PRODUCTS);
  showProducts(productsContainer, products, true )  
  filterProducts(products);
  localStorage.setItem("carrito", JSON.stringify(itemsSelected));

});

let listProducts = await getProductsData(URL_PRODUCTS);
 export default listProducts;


 const showShoppingCart =  (container, cartProducts) => {
   
   container.innerHTML = '';
   let total = 0

   cartProducts.forEach(product => {
  
      total += parseInt(product.cantidad) * parseInt(product.price)     

      container.innerHTML += `
      <section class="shopping-products mb-2 d-flex justify-content-around ">
        <img src="${product.img}" alt="" srcset="" width="64px" style="background-color: #f8f8f8;" class="p-1 rounded">
      <div class="ms-3">        
       <span class="product-name">${product.name}</span><br>
       <span class=" product-cantidad">${product.cantidad}</span> x <span class="product-price">$ ${product.price}</span>     
      </div>
      </section> 
    `
  })
  const printTotal = document.querySelector('.total-price')
  console.log(printTotal)
  printTotal.innerText = `$${total} USD`
}

let listFavorites
// Escucha al darle click

document.addEventListener( 'click', async (event) => {  
  event.preventDefault();
  const btnSum = event.target.getAttribute('data-add');  
  const btnRes = event.target.getAttribute('data-remove');
  const cartItems = document.querySelector('#cart-items');
  console.log(localStorageCart)

    let favoriteProduct = event.target.getAttribute(`data-favorite`)
    
    if (favoriteProduct) {
      const favoriteObject = listProducts.find(item => item.barcode === parseInt(favoriteProduct));
      const containerFavorite = document.querySelector(`.fav-${favoriteObject.barcode}`);
      const existingIndex = favorite.findIndex(item => item.barcode === favoriteObject.barcode);
      

      listFavorites = await getProductsData(URL_FAVORITE);
      

    
      if (existingIndex === -1) {
        // Check if favoriteObject already exists in listFavorites
        const index = parseInt(favoriteProduct)
        const favoriteExists = listFavorites.some(item => item.barcode === favoriteObject.barcode);
        console.log(index)
        
        if (favoriteExists) {
          alert('Producto ya agregado!');
          console.log(listFavorites.id)
         deleteFavoriteProduct(`${URL_FAVORITE}/${favoriteObject.id}`, favoriteObject)
          
        } else {
          favorite.push(favoriteObject);
          favoriteProducts = favorite.filter((item, index) => favorite.indexOf(item) === index );
          containerFavorite.innerHTML = `
            <span class="material-symbols-outlined red-heart on animate__animated animate__bounceIn">
              favorite
            </span>
          `;
           postFavoriteProducts(URL_FAVORITE, favoriteObject);
           localStorage.setItem("favorite", JSON.stringify(listFavorites));
          
        }
      }
    }
  
// Agregar productos al carrito 
  if (btnSum) {
    
    const index = listProducts.findIndex(item => item.barcode == parseInt(btnSum))
    listProducts[index].cantidad += 1;
      console.log(listProducts)
      console.log(index)
    let containerCart = document.querySelector('.container-cart')
    itemsSelected = listProducts.filter(product => product.cantidad >= 1)
      console.log(itemsSelected)

 
    const toastLiveExample = document.getElementById('addToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
      toastBootstrap.show()

    
    showProducts(productsContainer, listProducts)
    console.log('LOCAL STORAGE CARRITO',localStorageCart)
    showShoppingCart(containerCart, itemsSelected)

    
    cartItems.innerText = itemsSelected.length  
 
  // restar productos al carrito
  }else if(btnRes){
    
    const index = listProducts.findIndex(item => item.barcode == parseInt(btnRes))
    let containerCart = document.querySelector('.container-cart')
    const toastLiveExample = document.getElementById('removeToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show()
    
    if (listProducts[index].cantidad >= 1) {
      listProducts[index].cantidad -= 1;
      console.log(listProducts)
      
    }
    itemsSelected = listProducts.filter(product => product.cantidad >= 1)
    showProducts(productsContainer, listProducts)
    showShoppingCart(containerCart, itemsSelected)
    cartItems.innerText = itemsSelected.length
  }
 
  localStorage.setItem("carrito", JSON.stringify(itemsSelected));

})

