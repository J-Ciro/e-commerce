import listProducts from './script.js';
console.log(listProducts, "PRODUCTOS DEL IMPORT");


document.addEventListener("click", (event) => {
    const productsAdd = event.target.getAttribute("data-add");
    console.log(productsAdd);
    if (productsAdd == "add") {
    const id = event.target.getAttribute("id")
    console.log(id);
    }
  });
  
