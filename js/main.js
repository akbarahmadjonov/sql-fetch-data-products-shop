let localData = localStorage.getItem("token");
let list = document.querySelector(".list");
const productName = document.querySelector(".product-name");
const productPrice = document.querySelector(".product-price");
const productDescr = document.querySelector(".product-descr");
const listTemplate = document.querySelector(".listTemplate").content;

let fragment = document.createDocumentFragment();

if (!localData) {
  window.location.replace("login.html");
}

const renderProduct = (array, node) => {
  node.innerHTML = "";

  array.forEach((item) => {
    let clonedTemplate = listTemplate.cloneNode(true);
    clonedTemplate.querySelector(".product-img").src =
      "http://localhost:5000/" + item.product_img;
    clonedTemplate.querySelector(".product-name").innerHTML = item.product_name;
    clonedTemplate.querySelector(".product-price").innerHTML =
      item.product_price;
    clonedTemplate.querySelector(".product-descr").innerHTML =
      item.product_desc;

    fragment.appendChild(clonedTemplate);
  });
  node.appendChild(fragment);
};

async function getProductsFromSQL() {
  const response = await fetch("http://localhost:5000/product", {
    headers: {
      Authorization: localData,
    },
  });
  const data = await response.json();
  renderProduct(data, list);
}

getProductsFromSQL();
