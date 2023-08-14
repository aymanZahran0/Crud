
var productNameInput = document.getElementById('productNameInput');
var productPriceInput = document.getElementById('productPriceInput');
var productDescInput = document.getElementById('productDescInput');
var productCategoryInput = document.getElementById('productCategoryInput');
var searchInput = document.getElementById('searchInput');
var submit = document.getElementById('submit');
var productsContainer = [];

var mood = 'create';
var tmp;

//zbon adim
if (localStorage.getItem('products') != null) {
    productsContainer = JSON.parse(localStorage.getItem('products'));//not null
    displayProducts();
}

function addProduct() {
   
        // if(validateProductName() == true){
            var product = {
                name: productNameInput.value,
                price: productPriceInput.value,
                category: productCategoryInput.value,
                desc: productDescInput.value,
            }
            if(mood == 'create'){
                productsContainer.push(product);//1000
                localStorage.setItem('products', JSON.stringify(productsContainer))  
                clearForm()
                displayProducts();

            }
            else{
                productsContainer[tmp] = product;
                mood = 'create';
                submit.innerHTML ='Add Product';
                localStorage.setItem('products', JSON.stringify(productsContainer)) 
                clearForm()
                displayProducts();
            }
                //  }
        // else{
        //     window.alert('invalid productName');
        // }
        
     
}


function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
}


function displayProducts() {

    var cartoona = ``;
    for (var i = 0; i < productsContainer.length; i++) {
        cartoona += `<tr>
        <td>${i}</td>
        <td>${productsContainer[i].name}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].category}</td>
        <td>${productsContainer[i].desc}</td>
        <td><button onclick=" deleteProduct(${i})" class="btn btn-sm btn-outline-danger">delete</button> </td>
        <td><button onclick=" updateProduct(${i})" class="btn btn-sm btn-outline-warning">update</button> </td>
      </tr>`
    }
    document.getElementById('tableBody').innerHTML = cartoona;
}

function deleteProduct(deletedIndex){
    productsContainer.splice(deletedIndex,1);
    localStorage.setItem('products', JSON.stringify(productsContainer))
    displayProducts();
}
function searchProducts(searchTerm){
    var cartoona = ``;
    for(var i=0; i<productsContainer.length;i++)
    {
        if(productsContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase())==true)
        {
            cartoona += `<tr>
            <td>${i}</td>
            <td>${productsContainer[i].name}</td>
            <td>${productsContainer[i].price}</td>
            <td>${productsContainer[i].category}</td>
            <td>${productsContainer[i].desc}</td>
            <td><button onclick=" deleteProduct(${i})" class="btn btn-sm btn-outline-danger">delete</button> </td>
            <td><button class="btn btn-sm btn-outline-warning">update</button> </td>
          </tr>`

        }

    }
    document.getElementById('tableBody').innerHTML=cartoona;

}

function updateProduct(i){

    productNameInput.value = productsContainer[i].name;
    productPriceInput.value = productsContainer[i].price;
    productDescInput.value = productsContainer[i].desc;
    productCategoryInput.value = productsContainer[i].category;
    submit.innerHTML ='Update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0
    })


}
//  function validateProductName(){
//     var regex = /^[A-Z][a-z]{2;7}$/
//     if(regex.test(productNameInput.value)==true)
//     {
//         return true;
//     }
//     else{
//         return false;
//     }
//  }