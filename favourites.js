// get favourites heros id from local storage and store in an array
// stores the charcter id
var arr = JSON.parse(localStorage.getItem("favourites"));
console.log(arr);

// // function for show heros full details in a new page
// function showDetails(idnumber) {
//     localStorage.setItem("id", idnumber);
//     window.location = "index2.html";
// }

// function for remove hero from favourites, update localstorage and reload page
function removeHero(id) {
  var index = arr.indexOf(id);
  console.log(index);
  arr.splice(index, 1);
  console.log(arr);
  localStorage.setItem("favourites", JSON.stringify(arr));
  alert("your hero remove successfulled");
  location.reload();
}

//function for show all favourites heros in html page
let html = "";
html += "<div class='row g-5'>";
function fetchData() {
  for (let i = 0; i < arr.length; i++) {
    fetch(`https://www.superheroapi.com/api.php/586069776286026/${arr[i]}`)
      .then((response) => response.json())
      .then((data) => {
        html +=
          `
            <div class="col-4">
                <div class="card" style="width: 18rem; margin-top = 50px;">
                <img class="card-img-top" onclick="showDetails(${arr[i]})" src="${data.image.url}">
                <div class="card">
                    <span> <h5 class="card-title" onclick="">${data.name}` +
          "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
          `<i class="fa-solid fa-plus icon" onclick="removeHero(${arr[i]})" style:"align-items: right; cursor:pointer; font-family: "Font Awesome 6 Free";"></i></h5></span>
                </div>
                </div>
            </div> 
                    `;
      });
  }
}

setTimeout(() => {
  document.getElementById("cards-group").innerHTML = html;
}, 1000);