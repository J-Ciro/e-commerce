let datosAdmin = JSON.parse(sessionStorage.getItem('user'))
const showAdminName = document.querySelector('.admin-name');
const URL_PRODUCTS = 'http://localhost:3000/productos'
const URL_PUCHARSES = 'http://localhost:3000/compras/'
const tableBody = document.querySelector('#table-body')
const btnPucharses = document.querySelector('#btn-pucharses')
const viewAll = document.querySelector('.btn-view-all')
const btnDelete = document.querySelector('.btn-delete')
const containerForm = document.querySelector('.modify-product')
const containerAdd = document.querySelector('.modal-add')
const btnLogout = document.querySelector('#btn-logout')
const btnAddProduct = document.querySelector('.btn-add-product')

if (datosAdmin === '' || datosAdmin === null) {
  alert('Porfavor Inicia Sesion')
  setTimeout(function(){
    window.location.href = "./login.html";
  }, 200);
}



console.log(btnPucharses)
console.log(tableBody)
let allProducts;
let userPucharses;

const getProductsData = async (url) => {
    try {
      const { data } = await axios.get(url);
      return data;
      }catch(error){
        console.log(error);
        return [];
      } 
      
    };


   const deleteData = async (url) => {
       try {
         const { data } = await axios.delete(url);
         return data;
         }catch(error){
           console.log(error);
           return [];
         } 
    
       };
    
        const updateData = async (url, dataToUpdate) => {
          try {
            const { data } = await axios.put(url, dataToUpdate);
            return data;
            }catch(error){
              console.log(error);
              return [];
            } 
            
          };

          const newProduct = async (url, newData) => {
            try {
              const { data } = await axios.post(url, newData);
              return data;
              }catch(error){
                console.log(error);
                return [];
              } 
              
            };


    
const showUserName = (container, userName) => {

        container.innerHTML += `
        <div class='bg-green p-1 rounded'>
        <span class="text-white fs-4">Bienvenido | </span>
        <span class='text-white'> ${userName.username}</span>
        </div>
        `;      
}

const showCurrentProducts = (container, products) => {
container.innerHTML= '';

products.forEach(product => {
  container.innerHTML +=`
<tr>
<td>${product.barcode}</td>
<td><a href="#"><img src="../${product.img}" width="42px" alt="Avatar"></a></td>
    <td>${product.name}</td>
    <td>$${product.price}</td> 
    <td>
   
    ${product.category}
   
    </td>    
    <td>${product.quantity} u</td>                     
    <td class="span-remove">
    <span class="badge badge-danger btn-delete" data-erase='${product.id}'>Delete</span>
  </td>
   
    <td><button class="material-symbols-outlined btn-actualizar border-0 rounded" data-toggle="modal"  data-target="#staticBackdrop" data-update="${product.barcode}" id="btn-options-${product.barcode} ">
    more_horiz
    </button></td>
</tr>    
    `
    
  })
  
  document.addEventListener('click', (event) => {
  let itemToRemove = event.target.getAttribute('data-erase')
  if (itemToRemove) {
    deleteData(`${URL_PRODUCTS}/${itemToRemove}`);
  }
});

}


const showUsersPucharses = (container, pucharses) => {
    container.innerHTML = '';

const logo = document.querySelector('#packages')
const id = document.querySelector('#id')
const address = document.querySelector('#price')
const phone = document.querySelector('#category')
const product = document.querySelector('#quantity')

id.innerText = '';
logo.innerText = '#';
address.innerText = 'Address';
phone.innerText = 'Phone Number'
product.innerText = 'Products'

    pucharses.forEach(user => {
         
        container.innerHTML += `
        <tr>
        <td><span class="material-symbols-outlined">
          person
          </span>
        </td>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.address}</td>
        <td>${user.phone}</td>
        <td></td>
        <td>
          <span class="badge badge-danger btn-delete">Delete</span>
        </td>
        <td><span class="material-symbols-outlined">
          more_horiz
          </span>
        </td>
      </tr>
        `
    });

}


const showEditForm = (container, product) => {

      container.innerHTML = `
      <div id='form-container'>
      <form class='form-form' add-id=${product.barcode}>
      <div class=''>
        <figure class='rounded'>
          <img src="../${product.img}" width='64px'>
        </figure>
      </div>
      <div class="form-group">
        <label for="product-name">Name</label>
        <input type="text" class="form-control" id="product-name" aria-describedby="emailHelp" placeholder="${product.name}">
      </div>
      <div class="form-group">
        <label for="product-price">Price</label>
        <input type="text" class="form-control" id="product-price" placeholder="$${product.price}">
      </div>
      <div class="form-group">
      <fieldset disabled>
        <label for="category">Category</label>
        <input type="text" class="form-control" placeholder="${product.category}">
      </div>
      <div class="form-group">
        <label for="product-cantidad">Cantidad</label>
        <input type="text" class="form-control" id="product-cantidad" placeholder="${product.quantity}">
      </div>
      <button type="button" class="btn btn-primary btn-submit" data-submit='${product.barcode}'>Submit</button>
    </form>
    </div>
      `
      document.addEventListener('click', (e) => {
        const btnSubmit = e.target.getAttribute('data-submit')
        const productSelected = allProducts.find(item => item.barcode === parseInt(btnSubmit));
        let name = document.getElementById('product-name').value
        let price = document.getElementById('product-price').value
        let cantidad = document.getElementById('product-cantidad').value
        if (!name || !price || !cantidad) {
          alert("Los campos están vacíos. Por favor, llénelos antes de continuar.");
        } else {
          if(productSelected){
             updateProduct(productSelected, name, price, cantidad);
          }
        }
  
        console.log(productSelected)
        console.log(name)
        console.log(price)
        console.log(cantidad)
      })
    }
    


const updateProduct = (product, name, price, cantidad) => {

  product.name = name;
  product.price = parseInt(price);
  product.quantity = cantidad;
  console.log('PRODUCTO FINAL', product)

  updateData(`${URL_PRODUCTS}/${product.id}`, product)
  console.log('FUNCIONA EL ENBVIO DE DATOSD')

}


const createNewProduct = (product) => {
  newProduct(`${URL_PRODUCTS}`, product)
  console.log('FUNCIONA EL ENBVIO DE DATOSD')

}



const addNewProduct = (container) => {
  let id = allProducts.length ;
  container.innerHTML = `
  <div id=''>
  <form class='' add-id=>
  <div class=''>
    <figure class='rounded'>
      <img src="" width='64px'>
    </figure>
  </div>
  <div class="form-group">
  <fieldset disabled>
    <label for="product-id">Id</label>
    <input type="text" class="form-control" id="disabledInput" id="product-name" aria-describedby="emailHelp" placeholder="${id}">
  </div>
  <div class="form-group">
  <fieldset disabled>
    <label for="product-barcode">BarCode</label>
    <input type="text" class="form-control" id="disabledInput" id="product-name" aria-describedby="emailHelp" placeholder="${id}">
  </div>
  <div class="form-group">
    <label for="product-name">Name</label>
    <input type="text" class="form-control" id="product-name" aria-describedby="emailHelp" placeholder="">
  </div>
  <div class="form-group align-items-center">
  <label for="product-category">Category</label>
    <div class=" my-1">
      <label class="mr-sm-2 sr-only" for="product-category">Preference</label>
      <select class="custom-select mr-sm-2" id="product-category">
        <option selected>Choose...</option>
        <option value="Biscuits&Snacks">Biscuits & Snacks</option>
        <option value="Vegetables&Fruit">Vegetables & Fruit</option>
        <option value="Meats&SeaFood">Meats & SeaFood</option>
        <option value="Breakfast&Dairy">Breakfast & Dairy</option>
        <option value="FrozenFoods">Frozen Foods</option>
        <option value="Grocery&Staples">Grocery & Staples</option>
        <option value="alcohol">Alcohol</option>
      </select>
    </div>
  <div class="form-group">
    <label for="product-price">Price</label>
    <input type="text" class="form-control" id="product-price" placeholder="$">
  </div>
  <div class="form-group">
  <label for="product-price">Weight</label>
  <input type="text" class="form-control" id="product-weight" placeholder="">
</div>
  <div class="form-group">
    <label for="category">Quantity</label>
    <input type="text" class="form-control"  id="product-quantity" placeholder="">
  </div>
  <div class="form-group">
  <label for="category">Discount</label>
  <input type="text" class="form-control"  id="product-discount" placeholder="">
</div>
  <button type="button" class="btn btn-primary " data-newdata='new'>Submit</button>
</form>
</div>
  `;

  document.addEventListener('click', (event) => {
     const btnNewData =  event.target.getAttribute('data-newdata');
     let name = document.getElementById('product-name').value
     let price = document.getElementById('product-price').value
     let cantidad = document.getElementById('product-quantity').value
     let weight = document.getElementById('product-weight').value
     let discount = document.getElementById('product-discount').value
     let selectedValue = document.querySelector('#product-category').value;
     let id = allProducts.length ;
     let barcode = id;

    let newProduct = {
      "id":id,
      "barcode": barcode,
      "category": selectedValue,
      "name": name,
      "img": '',
      "weight": weight,
      "price": price,
      "discount": discount,
      "quantity": cantidad,
      "cantidad":0
    }
    if (!id || !barcode || !selectedValue|| !name|| !weight|| !price|| !cantidad) {
      alert("Los campos están vacíos. Por favor, llénelos antes de continuar.");
    } else {
    if(id){
      createNewProduct(newProduct)
    }
  
  }
  })





}



btnPucharses.addEventListener('click', async() => {
    userPucharses = await getProductsData(URL_PUCHARSES)
    console.log('HICE CLOCK')

    showUsersPucharses(tableBody, userPucharses)
})

viewAll.addEventListener('click', () => {
    showCurrentProducts(tableBody , allProducts)
})

btnLogout.addEventListener('click', () => {
  sessionStorage.clear()
  location.reload()
})



btnAddProduct.addEventListener('click', () => {
  addNewProduct(containerAdd)
})


document.addEventListener('click', (event) => {
  const index = event.target.getAttribute('data-update')
  const itemSelected = allProducts.find(item => item.barcode === parseInt(index));
  if (index) {
    showEditForm(containerForm, itemSelected )
    
    }

})



document.addEventListener('DOMContentLoaded', async  () => {
    allProducts = await getProductsData(URL_PRODUCTS)
    showUserName(showAdminName,datosAdmin)
    showCurrentProducts(tableBody , allProducts)
   

})