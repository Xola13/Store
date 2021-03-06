let cars = JSON.parse(localStorage.getItem("cars"))
? JSON.parse(localStorage.getItem("cars")):

[
    {
        title: "Bmw 325i",
        category: "Sedan",
        price: 250000,
        img: "https://cdn.bmwblog.com/wp-content/uploads/2019/08/E30-BMW-M3-test-drive-95.jpg"
    },
    {
        title: "Bmw 750 Li",
        category: "Sedan",
        price: 1250000,
        img: "https://www.carmag.co.za/wp-content/uploads/2019/04/eev4q5g0x5lzc1pv.jpg"
    },
    {
        title: "Bmw 8 series",
        category: "Cabriolet",
        price: 1550000,
        img: "https://cdn.motor1.com/images/mgl/rgBGY/s1/2019-bmw-8er-cabriolet.jpg"
    },
    {
        title: "Bmw M4",
        category: "Cabriolet",
        price: 850000,
        img: "https://cdn.bmwblog.com/wp-content/uploads/2020/09/BMW-M4-Cabrio-render.png"
    },
    {
        title: "Bmw X7 doubble cab",
        category: "Bakie",
        price: 2250000,
        img: "https://drive-my.com/wp-content/uploads/2019/08/Sid_2020-bmw-x7-pick-up.jpg"
    },
    {
        title: "Bmw Z4 ",
        category: "Cabriolet",
        price: 950000,
        img: "https://cdn.motor1.com/images/mgl/wzYbN/s1/2020-bmw-z4-by-ac-schnitzer.webp"
    },
    {
        title: "Bmw i8",
        category: "Sport",
        price: 1560000,
        img: "https://www.motortrend.com/uploads/sites/5/2010/11/35153148.jpeg.jpg"
    },
    {
        title: "Bmw i9 M",
        category: "Sport",
        price: 3500000,
        img: "https://www.autocar.co.uk/sites/autocar.co.uk/files/images/car-reviews/first-drives/legacy/bmw_i9_mag_final.jpg"
    },
    {
        title: "Bmw van",
        category: "Mini-van",
        price: 1000000,
        img: "https://i.pinimg.com/736x/4a/ab/1c/4aab1c9c7473ca7f085e165b8f2c56aa.jpg"
    },
];

let cart = JSON.parse(localStorage.getItem("cart"))
? JSON.parse(localStorage.getItem("cart"))
: []
//READ

function readCars(cars) {
  document.querySelector("#badge").innerHTML = cart.length;
    document.querySelector("#cars").innerHTML = "";
    cars.forEach((car, position) => {
        document.querySelector("#cars").innerHTML += `
        <div class="card">
        <img src="${car.img}" class="card-img-top" alt="${car.title}">
        <div class="card-body">
          <h5 class="card-title">${car.title}</h5>
          <p class="card-text">R${car.price}</p>
          <input type="number" min=1 value=1 id="addToCartCar${position}" style="width:45px" >
          <button type="button" class="btn btn-secondary" onclick="addToCartCar(${position})">
          <i class="material-icons">add_shopping_cart</i>
          </button>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editCar${position}" >
          <i class="material-icons">edit</i>
          </button>
          <button type="button" class="btn btn-danger" onclick="deleteCar(${position})" >
          <i class="material-icons">delete_forever</i>
          </button>

           
              <div
                class="modal fade"
                id="editCar${position}"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Edit ${car.title}
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div class="mb-3">
                        <label for="editTitle${position}" class="form-label">Title</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editTitle${position}"
                          id="editTitle${position}"
                          value="${car.title}"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="editCategory${position}" class="form-label">Category</label>
                        <select
                          class="form-select"
                          name="editCategory${position}"
                          id="editCategory${position}"
                        >
                          <option value="Sedan">Sedan</option>
                          <option value="Cabriolet">Cabriolet</option>
                          <option value="Bakkie">Bakkie</option>
                          <option value="Sport">Sport</option>
                          <option value="Mini-van">Mini-van</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label for="editPrice${position}" class="form-label">Price</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editPrice${position}"
                          id="editPrice${position}"
                          value="${car.price}"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="editImg${position}" class="form-label">Image URL</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editImg${position}"
                          id="editImg${position}"
                          value="${car.img}"
                        />
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                        onclick="updateCar(${position})"
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </div>
    `;
    
    });
}

readCars(cars);

//CREATE

function createCar() {
    let title = document.querySelector("#addTitle").value;
    let category = document.querySelector("#addCategory").value;
    let price = document.querySelector("#addPrice").value;
    let img = document.querySelector("#addImg").value;
  
    try {
      if (!title || !price || !img) throw new Error("Please fill in all fields");
      cars.push({
        title,
        category,
        price,
        img,
      });
      localStorage.setItem("cars", JSON.stringify(cars));
      readCars(cars);
    } catch (err) {
      alert(err);
    }
  }

  // UPDATE

  function updateCar(position) {
    let title = document.querySelector(`#editTitle${position}`).value;
    let category = document.querySelector(`#editCategory${position}`).value;
    let price = document.querySelector(`#editPrice${position}`).value;
    let img = document.querySelector(`#editImg${position}`).value;
  
    try {
      if (!title || !price || !img) throw new Error("Please fill in all fields");
      cars[position] = {
        title,
        category,
        price,
        img,
      };
      localStorage.setItem("cars", JSON.stringify(cars));
      readCars(cars);
    } catch (err) {
      alert(err);
    }
  }

  //DELETE

  function deleteCar(position) {
    let confirmation = confirm(
      "Are you sure you want to delete the selected car?"
    );
  
    if (confirmation) {
      cars.splice(position, 1);
      localStorage.setItem("cars", JSON.stringify(cars));
      readCars(cars);
    }
  }


  //ADD TO CART

  // function AddToCart(position) {
  //   cart.push(cars[position]);
  //   console.log(cart);
  //   localStorage.setItem("cart", JSON.stringify(cart))
  // }

function addToCartCar(position) {
  let qty = document.querySelector(`#addToCartCar${position}`).value;
  alert(`Added ${qty} to cart`);
  cart.push({...cars[position],qty});
  document.querySelector("#badge").innerHTML = cart.length;
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart)
  readCars(cars)
  }
  
  // SORT BY CATEGORY
function sortCategory() {
  let category = document.querySelector("#sortCategory").value;

  if (category == "All") {
    return readCars(cars);
  }

  let foundCars = cars.filter((car) => {
    return car.category == category;
  });

  readCars(foundCars);
  console.log(foundCars);
}

// SORT BY NAME

function sortName() {
  let direction = document.querySelector("#sortName").value;

  let sortedCars = cars.sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  if (direction == "descending") sortedCars.reverse();
  console.log(sortedCars);
  readCars(cars);
}

// SORT BY PRICE

function sortPrice() {
  let direction = document.querySelector("#sortPrice").value;

  let sortedCars = cars.sort((a, b) => a.price - b.price);

  console.log(sortedCars);

  if (direction == "descending") sortedCars.reverse();
  readCars(sortedCars);
}
