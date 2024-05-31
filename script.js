var form = document.getElementById("form");
var keyword = document.getElementById("keyword");
var loadMore = document.getElementById("loadmore");
var imageContainer = document.getElementById("imageContainer");


const clientId = "LfJX1YXR2ivnAyUARlX41CGwfwtueJ1L2oXzKXiPK0U"

var pages = 1;

async function getImages(){
    let response = await fetch(`https://api.unsplash.com/search/photos?page=${pages}&query=${keyword.value}&client_id=${clientId}&per_page=10'`);
    let data = await response.json();
    let result = data.results;


    // console.log(result)
    result.forEach((data) => {
        // console.log(data.urls.small)
        let img = document.createElement("img");
        img.classList.add("image")
        img.src = data.urls.small
        imageContainer.appendChild(img)
        // console.log(keyword.value)
    });    
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    imageContainer.innerHTML = ""
    getImages()
})

loadMore.addEventListener("click", () => {
    pages++;
    getImages()
})