
const URL_PRODUCTS = 'http://localhost:3000/productos/'
const URL_FAVORITE = 'http://localhost:3000/favoritos/'
const logo = document.querySelector(".logo");
const cartItems = document.querySelector('#cart-items');
let containerCart = document.querySelector('.container-cart')
const favorites = document.querySelector(".favorites")


let favoriteList = [];
let itemsSelected = [];



let localStorageCart = JSON.parse(localStorage.getItem("carrito"))
let newLocalStorageCart = [];



console.log(localStorageCart)

logo.addEventListener("click", () =>{
  window.location.href = "../index.html"
})

favorites.addEventListener("click", () => {
  window.location.href = "../pages/wishlist.html"
  
})



const containerFavorite = document.querySelector('.containerProducts');

const getFavoriteData = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
    }catch(error){
      console.log(error);
      return [];
    } 
  };

  const deleteFavoriteProduct = async (url) => {
    try {
      const response = await axios.delete(url);
      return response;
    } catch (error) {
      console.log(error);
      return [];
      
  }
  }


  const showFavProducts = (container, favorite) => {
   container.innerHTML = '';

   favorite.forEach(fav => {
    container.innerHTML += `
    <section class="card  col-4  n-ppost animate__animated animate__bounceIn border-0  bg-gray " style="width: 23.8%;" >
    
                <div class="div-delete">
                    <button type="button" class="btn-delete animate__animated animate__pulse" data-bs-custom-class="custom-tooltip" data-bs-placement="top" title="Delete">
                        <span class="material-symbols-outlined" id="eliminar-btn" remove-fav="${fav.id}">close</span>
                      </button>
                    </div>
                
                    <div class="options d-flex gap-3 position-absolute" name="">
                   
                    <span class="buttons__opti items">
                    
            
                    </span>
                  </div>
                  <figure class="p-1 mb-0 figures" >
                    <img src="../${fav.img}" alt="" srcset="" />
                  </figure>
                  <span class="card__h">${fav.name}</span>
                  <span class="card__price">$ ${fav.price} <span class="card__discount">$ ${fav.discount}</span></span>
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
                    <button type="button"><span class="material-symbols-outlined add-icon"  data-remove="${fav.barcode}" barcode="remove-${fav.barcode}"  name='res-${fav.barcode}'>
                    remove
                    </span></button>
                    <div barcode="numeros">
                    <span add-number="number" name="">
                    ${fav.cantidad > 0 && fav.quantity ? fav.cantidad : 'Add'}
                    </span>
                    
                    </div>
                      <button type="button" "><span class="material-symbols-outlined add-icon" data-add="${fav.barcode}"  name="${fav.barcode}">
                        add
                      </span></button>
                      </span>
                      
                  </div>
                </section>
    `;
   });



  }
  
  const showShoppingCart =  (container, cartProducts) => {
   
    container.innerHTML = '';
    let total = 0
 
    cartProducts.forEach(product => {
   
       total += parseInt(product.cantidad) * parseInt(product.price)     
 
       container.innerHTML += `
       <section class="shopping-products mb-2 d-flex justify-content-around ">
         <img src="../${product.img}" alt="" srcset="" width="64px" style="background-color: #f8f8f8;" class="p-1 rounded">
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

 
 document.addEventListener('click', async (event) => {
  const buyProducts = document.querySelector('#view-cart')
  const checkout = document.querySelector('.btn-checkout')
  const adminLogin = document.querySelector('#account')
  buyProducts.addEventListener("click", () => {
    window.location.href = "./cart.html"
  
  })
  checkout.addEventListener("click", () => {
    window.location.href = "./cart.html"
  
  })

  adminLogin.addEventListener("click", () => {
    window.location.href = "./login.html"
  })

  


  event.preventDefault();
  const btnSum = event.target.getAttribute('data-add');  
  const btnRes = event.target.getAttribute('data-remove');
 
  const btnDelete = event.target.getAttribute(`remove-fav`);

  if (btnSum) {
    
    const index = favoriteList.findIndex(item => item.barcode == parseInt(btnSum))
    favoriteList[index].cantidad += 1;
      console.log(favoriteList)
      console.log(index)
    let containerCart = document.querySelector('.container-cart')
    itemsSelected = favoriteList.filter(product => product.cantidad >= 1)
    newLocalStorageCart.push(itemsSelected[index])
    // if (itemsSelected[index].id ==! localStorageCart[index] ) {
      
    // }
      console.log('ITEM SELECTED:',itemsSelected[index])
      // console.log(newLocalStorageCart)
      localStorageCart.push(newLocalStorageCart[index]);
      // console.log('CARRITO QUE PERMITE AGREGAR OTRO MAS DE FAVORITOS', localStorageCart)
     localStorage.setItem('carrito', JSON.stringify(localStorageCart))
    const toastLiveExample = document.getElementById('addToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
      toastBootstrap.show()

    
    showFavProducts(containerFavorite, favoriteList)
    showShoppingCart(containerCart, localStorageCart)

    
    cartItems.innerText = localStorageCart.length  
 
  // restar productos al carrito
  }else if(btnRes){
    
    const index = favoriteList.findIndex(item => item.barcode == parseInt(btnRes))
    let containerCart = document.querySelector('.container-cart')
    const toastLiveExample = document.getElementById('removeToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show()
    
    if (favoriteList[index].cantidad >= 1) {
      favoriteList[index].cantidad -= 1;
      console.log(favoriteList)
      
    }
    itemsSelected = favoriteList.filter(product => product.cantidad >= 1)
    showFavProducts(containerFavorite, favoriteList)
    showShoppingCart(containerCart, localStorageCart)
    cartItems.innerText = itemsSelected.length
  }

  

  const index = parseInt(btnDelete)
  console.log(index)
  console.log(favoriteList)
  
  if (index) {
    deleteFavoriteProduct(`${URL_FAVORITE}${index}`)
  }

 })

 localStorage.setItem('carrito', JSON.stringify(newLocalStorageCart))
 document.addEventListener('DOMContentLoaded', async () => {
   favoriteList = await getFavoriteData(URL_FAVORITE)
   showFavProducts(containerFavorite, favoriteList )
   showShoppingCart(containerCart, localStorageCart)
   cartItems.innerText = localStorageCart.length  
    localStorage.setItem('carrito', JSON.stringify(localStorageCart))
  })
  
  console.log('carrito', localStorageCart)