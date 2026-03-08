// DARK MODE

document.getElementById("dark").addEventListener("change", () => {
  document.body.classList.toggle("dark");
});


// BOOK DATA

let allBooks = [];


fetch("data/books.json")
.then(res => res.json())
.then(books => {

allBooks = books;

renderBooks(allBooks);

});



// RENDER BOOKS FUNCTION

function renderBooks(books){

const grid = document.getElementById("books");
const featured = document.getElementById("featured");

grid.innerHTML = "";
featured.innerHTML = "";

let featuredFound = false;

books.forEach(book => {

if(book.featured && !featuredFound){

featured.innerHTML = `

<img src="${book.image}">

<div>

<h2>${book.title}</h2>

<p>${book.category}</p>

<a class="btn" href="${book.link}">Explore Book</a>

</div>

`;

featuredFound = true;

}
else{

grid.innerHTML += `

<div class="card">

<img src="${book.image}">

<h3>${book.title}</h3>

<p>${book.category}</p>

<a class="btn" href="${book.link}">Explore</a>

</div>

`;

}

});

}


// SEARCH FUNCTION

const searchInput = document.querySelector(".search");

searchInput.addEventListener("input", () => {

const query = searchInput.value.toLowerCase();

const filtered = allBooks.filter(book =>

book.title.toLowerCase().includes(query) ||
book.category.toLowerCase().includes(query)

);

const grid = document.getElementById("books");

if(filtered.length === 0){

grid.innerHTML = `

<div style="grid-column:1/-1;text-align:center;padding:40px">

<h3>Coming Soon</h3>

<p>We will let you know when it arrives.</p>

</div>

`;

document.getElementById("featured").innerHTML = "";

}

else{

renderBooks(filtered);

}

});

// Disable right click

document.addEventListener("contextmenu", function(e){
  e.preventDefault();
});


// Disable copy

document.addEventListener("copy", function(e){
  e.preventDefault();
});


// Disable text selection

document.addEventListener("selectstart", function(e){
  e.preventDefault();
});


// Disable keyboard shortcuts like Ctrl+C

document.addEventListener("keydown", function(e){

if(e.ctrlKey && (e.key === "c" || e.key === "u" || e.key === "x")){
  e.preventDefault();
}

});
