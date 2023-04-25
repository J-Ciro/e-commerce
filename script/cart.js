
let localStorageCart = JSON.parse(localStorage.getItem("carrito"));
let URL_COMPRAS = 'http://localhost:3000/compras/';
const tableBody = document.querySelector('.table-body');
let itemsSelected =[];
const logo = document.querySelector(".logo")
const favorites = document.querySelector(".favorites")
const invoiceContainer = document.querySelector('.show-invoice')




logo.addEventListener("click", () =>{
    window.location.href = "../index.html"
  })
  
favorites.addEventListener("click", () => {
    window.location.href = "../pages/wishlist.html"
  
  })

 
  const postShoppingCart = async (url, data) => {
    try {
      const response = await axios.post(url, data);
      return response;
      
    } catch (error) {
      console.log(error);
      return [];
    }
  };



const showCartProducts = (container, cartItems) => {
container.innerHTML = '';

cartItems.forEach(product => {
    container.innerHTML += `
    <tr class="m-2">
    <td width='10%'>
      <div>
        <img src="../${product.img}" alt="" srcset="" width="104px" class="p-2">
      </div>
    </td>
    <td width='13.6%'>
      <div>
        <h6 class='product-name fw-bold product-properties''>${product.name}</h6>
        <span class='fw-semibold product-properties'>Sold By: </span><span class='bg-grey'>Fresho</span><br>
        <span class='fw-semibold product-properties'>Weight: </span><span class='bg-grey'>${product.weight}</span>
      </div>
    </td>
    <td width='13.6%'>
      <h6 class='bg-grey'>Price</h6>
      <span class='fw-medium'>$${product.price}</span><br>
      <span class='color-green fw-semibold' >You save: </span><span class='color-green fw-semibold'>$${product.discount}</span>
    </td>
    <td width='13%'>
      <h6 class= 'bg-grey'>Qty</h6>
      <div class='container-add-remove d-flex flex-wrap align-items-center justify-content-between' >
      <button type="button" class='btn-remove'><span class="material-symbols-outlined add-icon"  data-remove="${product.barcode}" id="remove-${product.barcode}"  name='res-${product.barcode}'>
    remove
    </span></button>
    <span add-number="number" name="">
    ${product.cantidad > 0 && product.quantity ? product.cantidad : 'Add'}
    </span>
        <button type="button" class='btn-add'><span class="material-symbols-outlined add-icon fw-5 " data-add="${product.barcode}"  name="${product.barcode}">
        add
      </span></button>
      
      </div>
      <br>
    </td>
    <td width='13%'>
      <h6 class='bg-grey'>Total</h6>
      <span class='fw-semibold '>$${product.cantidad ? product.cantidad * product.price : 0}</span>
    </td>
    <td width='13%'>
      <h6 class='bg-grey'>Action</h6>
      <span class='color-green'>Save for later</span><br>
      <button class='text-danger remove-span' data-btn-remove=${product.barcode}>Remove</button>
      
    </td>
  </tr>
    
    `
});


}

const showInvoice = (container, cartItems) => {
    let total = 0


    container.innerHTML = '';

    cartItems.forEach(item => {
        total += parseInt(item.cantidad) * parseInt(item.price)   
        container.innerHTML = `
        
        <div class="form__money">
        <ul>
      <li>
        <span>Subtotal</span>
        <span class="price sub-total">$0</span>
      </li>
      <li>
        <span>Coupon Discount</span>
        <span class="price-discount">(-) 0.00</span>

      </li>
      <li>
        <span>Shipping</span>
        <span class="price">$0</span>

      </li>
    </ul>
    </div>
   <div class="form__total">
    <h3 class="total-currency">Total (USD)</h3>
    <span class="total-payment">$</span>
   </div>
   <div class="form__buttons">
    <button type="button" data-bs-toggle="modal" data-bs-target="#payment-prompt" class="btn-buy">Process To Checkout</button>
    <button type="button" class="btn-return" id='btn-back'>Return To Shopping</button>
  </div>
        `


    });
const subTotal = document.querySelector('.sub-total')
 const printTotal = document.querySelector('.total-payment')
  console.log(printTotal)
  printTotal.innerText = `$${total} USD`
  subTotal.innerText = `$${total} USD`
}


document.addEventListener('click', (event)=> {

    const btnBack = document.querySelector('#btn-back')

    btnBack.addEventListener("click", () => {
        window.location.href = "../index.html"
      })

    event.preventDefault();
    const btnSum = event.target.getAttribute('data-add');  
    const btnRes = event.target.getAttribute('data-remove');
    const index = localStorageCart.findIndex(item => item.barcode == parseInt(btnSum))
    
    const btnRemove = event.target.getAttribute('data-btn-remove')


    if (btnRemove) {
        const nuevoValor = localStorageCart.filter((item) => item.barcode !== parseInt(btnRemove));
        localStorage.setItem("carrito", JSON.stringify(nuevoValor));
        showCartProducts(tableBody, localStorageCart)
        window.location.reload();

    }


    if (btnSum) {
    const toastLiveExample = document.getElementById('addToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show()
        
    localStorageCart[index].cantidad += 1;

    itemsSelected = localStorageCart.filter(product => product.cantidad >= 1)
      console.log('Items selected', itemsSelected)
      
      localStorage.setItem("carrito", JSON.stringify(itemsSelected));
      showCartProducts(tableBody, localStorageCart)
      showInvoice(invoiceContainer, localStorageCart)
    // showShoppingCart(containerCart, itemsSelected)

    
    // cartItems.innerText = itemsSelected.length  
    
    // restar productos al carrito
}else if(btnRes){
    
    const index = localStorageCart.findIndex(item => item.barcode == parseInt(btnRes))
    // let containerCart = document.querySelector('.container-cart')
    const toastLiveExample = document.getElementById('removeToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show()
    
    if (localStorageCart[index].cantidad >= 1) {
        localStorageCart[index].cantidad -= 1;
        console.log(localStorageCart)
        localStorage.setItem("carrito", JSON.stringify(itemsSelected));
    }

    itemsSelected = localStorageCart.filter(product => product.cantidad >= 1)
    showCartProducts(tableBody, localStorageCart)
    showInvoice(invoiceContainer, localStorageCart)
    // showShoppingCart(containerCart, itemsSelected)
    // cartItems.innerText = itemsSelected.length
}
// let index = localStorageCart.findIndex(item => item.barcode == parseInt(btnRes))



})




const btnCheckout = document.querySelector('.btn-pay');

btnCheckout.addEventListener("click", (event) => {
    btnBuy(localStorageCart);

 
})


const btnBuy = (products) => {
    let name = document.getElementById('user-name').value;
    let address = document.getElementById('user-address').value
    let phone = document.getElementById('user-phone').value
    let id = 0;

    const regex = /^\s*$|^\s+/;
    const formInputs = form.querySelectorAll("input");
    console.log(formInputs[0])
    let i = 0;
  
    while (i < formInputs.length) {
      if (regex.test(formInputs[i].value)) {
        alert("Por favor, llene todos los campos del formulario");
        return; // Si hay campos vacíos, no se guarda nada en el array
      }
      i++;
    }
   const userData = {
    id:Date.now(),
    name: name,
    address: address,
    phone: phone,
    products: products
   }
   setTimeout(() => {
     postShoppingCart(URL_COMPRAS, userData)
     window.location.href = '../index.html'
    
  }, 900);
  
  Swal.fire({
    title: 'Thank You!',
    text: 'Succesfull Purcharse',
    icon: 'success',
    
  })
  
}






document.addEventListener('DOMContentLoaded', () => {
    showCartProducts(tableBody, localStorageCart)
    showInvoice(invoiceContainer, localStorageCart)

})


