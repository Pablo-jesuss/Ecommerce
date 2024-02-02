// Cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// Open
cartIcon.onclick = () => {
  cart.classList.add("active");
};
// Close
closeCart.onclick = () => {
  cart.classList.remove("active");
};

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// Function

function ready() {
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
}

// Quantity Changes

var quantityInputs = document.getElementsByClassName("cart-quantity");
for (var i = 0; i < quantityInputs.length; i++) {
  var input = quantityInputs[i];
  input.addEventListener("change", quantityChanged);
}

// Add to Cart

var addCart = document.getElementsByClassName("add-cart");
for (var i = 0; i < addCart.length; i++) {
  var button = addCart[i];
  button.addEventListener("click", addCartClicked);
}

function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updatetotal();
}

function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  // cartShopBox.classList.add('cart-box')
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemsNames.length; i++) {
    alert("Você já adicionou este item ao carrinho");
  }
}

var cartBoxContent = `<img src="image/product2.jpg" alt="" class="cart-img" />
<div class="detail-box">
  <div class="cart-product-title">Fone via bluetooth</div>
  <div class="cart-price">R$ 300,00</div>
  <input type="number" value="1" class="cart-quantity" />
</div>
<!--Remove Cart-->
<i class="bx bxs-trash-alt cart-remove"></i>`;
// Remove cart

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}

// Update Total

function updatetotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;

  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(
      priceElement.innerText.replace("R$", "").replace(",", ".")
    );
    var quantity = parseFloat(quantityElement.value);

    total = total + price * quantity;
  }

  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("total-price")[0].innerText =
    "R$" + total.toFixed(2);
}
