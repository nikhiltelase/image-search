var form = document.getElementById("form");
var keyword = document.getElementById("keyword");
var loadMore = document.getElementById("loadmore");
var allImageContainer = document.getElementById("allImageContainer");
var searchLoader = document.getElementById("searchLoader");
var moreLoader = document.getElementById("moreLoader");
var showError = document.getElementById("showError");


const clientId = "LfJX1YXR2ivnAyUARlX41CGwfwtueJ1L2oXzKXiPK0U"

var pages = 1;
var query ;

//get images from upsplash.com using api call
async function getImages() {
    query = keyword.value;
    console.log(query.length)
    if (query.length == 0){
        showError.innerText = "Enter a input for search images"
        //loader
        searchLoader.style.display = "none";
        moreLoader.style.display = "none";
    }else{
        try {
            let response = await fetch(`https://api.unsplash.com/search/photos?page=${pages}&query=${query}&client_id=${clientId}&per_page=10`);
            console.log(response);
            let allData = await response.json();
            let result = allData.results;
            // not found error
            console.log(result.length)
            if (result.length == 0){
                console.log("no found");
                showError.innerText = "Image Not Found";
    
            }
            
            result.forEach((imageData) => {
                console.log(imageData);
                let imgDiv = document.createElement("div");
                imgDiv.classList.add("image-container");
    
                let img = document.createElement("img");
                img.classList.add("image");
                img.src = imageData.urls.small;
                imgDiv.appendChild(img);
    
                let downloadBtn = document.createElement("button");
                downloadBtn.classList.add("download-btn");
                downloadBtn.innerHTML = `<img src="download-2-line.png" alt="">`;
                downloadBtn.addEventListener("click", () => {
                    downloadImage(imageData.urls.full, imageData.id);
                });
                imgDiv.appendChild(downloadBtn);
    
                allImageContainer.appendChild(imgDiv);
            });
        } catch (error) {
            console.log(error)
            showError.innerText = "Error: Check your network or Reconnecting to Wi-Fi";
        } finally{
            //loader
            searchLoader.style.display = "none";
            moreLoader.style.display = "none";
        }
    }

    
    

}

// download image 
function downloadImage(url, id) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            let a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `${id}.jpg`;
            a.click();
            URL.revokeObjectURL(a.href);
        })
        .catch(error => console.error('Error downloading the image:', error));
}

//form submit event
form.addEventListener("submit", (e) => {
    e.preventDefault();
    searchLoader.style.display = "block";

    allImageContainer.innerHTML = "";
    showError.innerHTML = "";

    pages = 1;  // Reset pages to 1 when a new search is submitted
    getImages();
});

//load more images
loadMore.addEventListener("click", () => {
    pages++;
    moreLoader.style.display = "block"
    getImages();
});
