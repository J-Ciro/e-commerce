let datosAdmin = JSON.parse(sessionStorage.getItem('user'))
const showAdminName = document.querySelector('.admin-name');
const URL_PRODUCTS = 'http://localhost:3000/productos/'
const URL_PUCHARSES = 'http://localhost:3000/compras/'
const tableBody = document.querySelector('#table-body')
const btnPucharses = document.querySelector('#btn-pucharses')
const viewAll = document.querySelector('.btn-view-all')
const btnDelete = document.querySelector('.btn-delete')

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


    



const showUserName = (container, userName) => {

        container.innerHTML += `
        <div class='bg-green p-1 rounded'>
        <span class="text-white fs-4">Bienvenido</span>
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
    <td>
    <span class="badge badge-danger btn-delete">Delete</span>
  </td>
   
    <td><span class="material-symbols-outlined">
    more_horiz
    </span></td>
</tr>

    
    `    
});


}


const showUsersPucharses = (container, pucharses) => {
    container.innerHTML = '';
    pucharses.forEach(user => {
         
        container.innerHTML += `
        <tr>
        <td>${user.id}</td>
    <td><span class="material-symbols-outlined">
    person
    </span></td>
    <td>${user.name}</td>
    <td>${user.address}</td> 
    <td>${user.phone}</td>    
    <td></td>                     
    <td>
    <span class="badge badge-danger btn-delete">Delete</span>
  </td>
   
    <td><span class="material-symbols-outlined">
    more_horiz
    </span></td>
</tr>
        `
    });

}



btnPucharses.addEventListener('click', async() => {
    userPucharses = await getProductsData(URL_PUCHARSES)
    console.log('HICE CLOCK')

    showUsersPucharses(tableBody, userPucharses)
})

viewAll.addEventListener('click', () => {
    showCurrentProducts(tableBody , allProducts)
})

// btnDelete.addEventListener('click', () => {
//     console.log('ELIMINAR')
// })


document.addEventListener('DOMContentLoaded', async  () => {
    allProducts = await getProductsData(URL_PRODUCTS)
    showUserName(showAdminName,datosAdmin)
   showCurrentProducts(tableBody , allProducts)

})