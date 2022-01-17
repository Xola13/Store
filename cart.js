const cart = JSON.parse(localStorage.getItem("cart"))
? JSON.parse(localStorage.getItem("cart"))
: []

console.log(cart)

// READ
function readCars(cars) {
    document.querySelector("#badge").innerHTML = cart.length;
    document.querySelector("#cart").innerHTML = "";

let total = cart
 .reduce((total, car) => {
   return total += car.price * car.qty;
 }, 0)
 ;


    cars.forEach((car, position) => {
        document.querySelector("#cart").innerHTML += `
        <div class="card">
        <img src="${car.img}" class="card-img-top" alt="${car.title}">
        <div class="card-body">
          <h5 class="card-title">${car.title}</h5>
          <p class="card-text">Price: <span>R${car.price}<span> </p>
          <input type="number" style="width: 40px" min=1 id="remove${position}" value=${
            car.qty
          } onchange="updateCart(${position})" /><br><br>
          <p class="card-text">Total Cost: <span>R${
            parseInt(car.price) * parseInt(car.qty)
          }</span> </p>
          
          <button type="button" class="btn btn-danger" onclick="deleteCart(${position})">
          <i class="material-icons">remove_shopping_cart</i>
          </button>
          <button type="button" class="btn btn-primary" onclick="updateCart(${position})" >
          <i class="material-icons">update</i>
          </button>
          </div>
          </div>
          `;
        });
          showCartBadge();
        document.querySelector("#cart-footer").innerHTML += `
          <h3>Total cost: R${total}</h3>
          <button class="btn btn-primary btn-lg" onclick="checkout()">
          <i class="material-icons">check_circle</i>
          </button>
        `;
      }
     readCars(cart);
      //Update cart Badge

      function showCartBadge() {
        document.querySelector("#badge").innerHTML = cart ? cart.length : "";
      }

        


// UPDATE
function updateCart(position) {
  let qty = document.querySelector(`#remove${position}`).value;
  cart[position] = { ...cart[position], qty };
  localStorage.setItem("cart", JSON.stringify(cart));
   readCars(cart);
  console.log(cart)
}

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



// CHECKOUT
function checkout() {
  let total = cart
    .reduce((total, car) => {
      return total + car.price * car.qty;
    }, 0)
    ;
  try {
    if (parseInt(total) == 0) throw new Error("Nothing in cart");
    let confirmation = confirm(`Total payment needed: R${total}`);

    if (confirmation) {
      cart.length = 0;
      localStorage.removeItem("cart");
      readCars(cart);
    }
  } catch (err) {
    alert(err);
  }
}
 
