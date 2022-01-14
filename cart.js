let cart = JSON.parse(localStorage.getItem("cart"))
? JSON.parse(localStorage.getItem("cart"))
: []

console.log(cart)

// READ
function readCars(cars) {
    document.querySelector("#badge").innerHTML = cart.length;
    document.querySelector("#cart").innerHTML = "";
    cars.forEach((car, position) => {
        document.querySelector("#cart").innerHTML += `
        <div class="card">
        <img src="${car.img}" class="card-img-top" alt="${car.title}">
        <div class="card-body">
          <h5 class="card-title">${car.title}</h5>
          <p class="card-text">R${car.price}</p>
          <button type="button" class="btn btn-danger" onclick="deleteCart(${position})">
          <i class="material-icons">remove_shopping_cart</i>
          </button>
          </div>
          </div>
          `;
        });
        console.log(cars)
    }
        readCars(cart);

          //DELETE

  function deleteCart(position) {
    let confirmation = confirm(
      "Are you sure you want to delete the selected car?"
    );
  
    if (confirmation) {
      cart.splice(position, 1);
      document.querySelector("#badge").innerHTML = cart.length;
      localStorage.setItem("cart", JSON.stringify(cart));
      readCars(cart);
    }
  }


