// DARK MODE

document.getElementById("dark").addEventListener("change", () => {
  document.body.classList.toggle("dark");
});


// GLOBAL BOOK STORAGE

let allBooks = [];


// LOAD BOOK DATA

fetch("data/books.json")
  .then(res => res.json())
  .then(data => {

    allBooks = data.books;

    renderBooks(allBooks);

  });


// RENDER BOOKS

function renderBooks(books){

const grid = document.getElementById("books");
const featured = document.getElementById("featured");

grid.innerHTML = "";
featured.innerHTML = "";

let featuredShown = false;

books.forEach(book => {

if(book.featured && !featuredShown){

featured.innerHTML = `

<img src="${book.image}">

<div>

<h2>${book.title}</h2>

<p>${book.category}</p>

<a class="btn" href="${book.link}" target="_blank">Explore Book</a>

</div>

`;

featuredShown = true;

}
else{

grid.innerHTML += `

<div class="card">

<img src="${book.image}">

<h3>${book.title}</h3>

<p>${book.category}</p>

<a class="btn" href="${book.link}" target="_blank">Explore</a>

</div>

`;

}

});

}


// SEARCH

const searchInput = document.querySelector(".search");
const trendingSection = document.getElementById("trending-section");
searchInput.addEventListener("input", () => {

const query = searchInput.value.toLowerCase();
if(query.length > 0){
trendingSection.style.display = "none";
}else{
trendingSection.style.display = "block";
}
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


// DISABLE RIGHT CLICK

document.addEventListener("contextmenu", e => e.preventDefault());


// DISABLE COPY

document.addEventListener("copy", e => e.preventDefault());


// DISABLE TEXT SELECTION

document.addEventListener("selectstart", e => e.preventDefault());


// DISABLE SHORTCUTS

document.addEventListener("keydown", function(e){

if(e.ctrlKey && (e.key === "c" || e.key === "u" || e.key === "x")){
  e.preventDefault();
}

});
