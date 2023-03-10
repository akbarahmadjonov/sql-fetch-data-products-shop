const form = document.querySelector(".form");
const productName = document.querySelector(".product-name");
const productPrice = document.querySelector(".product-price");
const productDescr = document.querySelector(".product-descr");
const file = document.querySelector(".file");
const list = document.querySelector(".list");
const editButton = document.querySelector(".product-edit");
const deleteButton = document.querySelector(".product-delete");
const removeToken = document.querySelector(".nav-token");
const output = document.querySelector(".output");
const editModal = document.querySelector(".edit-modal");
// Template
const listTemplate = document.querySelector(".listTemplate").content;
// Local Data
const localData = localStorage.getItem("token");
// Fragment
let fragment = document.createDocumentFragment();

// Edit modal
const formEdit = document.querySelector(".form-edit");
const fileEdit = document.querySelector(".file-edit");
const productNameEdit = document.querySelector(".product-name-edit");
const productPriceEdit = document.querySelector(".product-price-edit");
const productDescrEdit = document.querySelector(".product-descr-edit");
const removeModal = document.querySelector(".removeModal");
// Edit modal

removeToken.addEventListener("click", () => {
  localStorage.removeItem(localData);
  window.location.replace("register.html");
});

// Upload img
imgInp.onchange = (evt) => {
  let [file] = imgInp.files;
  if (file) {
    output.src = URL.createObjectURL(file);
  }
};
// Upload img

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
    clonedTemplate.querySelector(".product-edit").dataset.productId = item.id;
    clonedTemplate.querySelector(".product-delete").dataset.productId = item.id;

    fragment.appendChild(clonedTemplate);
  });
  node.appendChild(fragment);
};

async function getProductsFromSQL() {
  const response = await fetch("http://localhost:5000/product", {
    method: "GET",
    headers: {
      Authorization: localData,
    },
  });
  const data = await response.json();
  renderProduct(data, list);
}

getProductsFromSQL();

form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const formData = new FormData();
  const img = file.files[0];

  formData.append("product_name", productName.value);
  formData.append("product_desc", productDescr.value);
  formData.append("product_img", img);
  formData.append("product_price", productPrice.value);

  console.log(img);
  fetch("http://localhost:5000/product", {
    method: "POST",
    headers: {
      Authorization: localData,
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
  getProductsFromSQL();
});

const deleteProduct = (id) => {
  fetch(`http://localhost:5000/product/${id}`, {
    method: "DELETE",
    headers: { Authorization: localData },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        getProductsFromSQL();
      }
    })
    .catch((err) => console.log(err));
};

const editProduct = (id) => {
  editModal.classList.toggle("d-none");
  formEdit.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const formData = new FormData();
    const img = fileEdit.files[0];

    formData.append("product_name", productNameEdit.value);
    formData.append("product_desc", productDescrEdit.value);
    formData.append("product_img", img);
    formData.append("product_price", productPriceEdit.value);

    fetch(`http://localhost:5000/product/${id}`, {
      method: "PUT",
      headers: {
        // "Content-Type": "application/json",
        Authorization: localData,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          getProductsFromSQL();
        }
      })
      .catch((err) => console.log(err));
  });
};
removeModal.addEventListener("click", () => {
  editModal.classList.toggle("d-none");
});

list.addEventListener("click", (evt) => {
  if (evt.target.matches(".product-delete")) {
    const productId = evt.target.dataset.productId;
    deleteProduct(productId);
  }

  if (evt.target.matches(".product-edit")) {
    const productId = evt.target.dataset.productId;
    editProduct(productId);
  }
});
