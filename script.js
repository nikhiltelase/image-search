var form = document.getElementById("form");
var searchInput = document.getElementById("searchInput");
var loadMore = document.getElementById("loadmore");
var allImageContainer = document.getElementById("allImageContainer");
var searchLoader = document.getElementById("searchLoader");
var moreLoader = document.getElementById("moreLoader");
var showError = document.getElementById("showError");
var suggestionsList = document.querySelectorAll(".suggestions button");

//handling big image
var bigImage = document.getElementById("bigImage");
var bigImageContainer = document.getElementById("bigImageContainer");
var cancelBigImage = document.getElementById("cancel");
cancelBigImage.addEventListener("click", () => {
    bigImageContainer.style.display = "none";
})
bigImage.addEventListener("click", () => {
    bigImageContainer.style.display = "none";
})

const clientId = "LfJX1YXR2ivnAyUARlX41CGwfwtueJ1L2oXzKXiPK0U"

var pages = 1;
var query = "";


//get images from upsplash.com using api call
async function getImages() {
    query = searchInput.value;

    if (query.length == 0){
        showError.innerText = "Enter a input for search images"
        //loader
        searchLoader.style.display = "none";
        moreLoader.style.display = "none";
    }else{
        try {
            let response = await fetch(`https://api.unsplash.com/search/photos?page=${pages}&query=${query}&client_id=${clientId}&per_page=12`);
            let allData = await response.json();
            let result = allData.results;
            // not found error
            if (result.length == 0){
                showError.innerText = "Image Not Found";
            }
            
            result.forEach((imageData) => {
                // console.log(imageData.urls)

                //create a div they contain img, dowload-btn, copy-btn 
                let imgDiv = document.createElement("div");
                imgDiv.classList.add("image-container");

                //img-tag create and add eventListener
                let img = document.createElement("img");
                img.classList.add("image");
                img.src = imageData.urls.small ;
                img.addEventListener("click", () => {
                    bigImage.src = imageData.urls.full ;
                    bigImageContainer.style.display = "flex";
                    
                })
                imgDiv.appendChild(img);

                //download button create and add eventListener
                let downloadBtn = document.createElement("button");
                downloadBtn.classList.add("download-btn");
                downloadBtn.innerHTML = `<img src="download-2-line.png">`;
                downloadBtn.addEventListener("click", () => {
                    downloadBtn.innerHTML = "Downloding"
                    let downloadSucees = downloadImage(imageData.urls.full, imageData.id);
                    if (downloadSucees){
                        downloadBtn.innerHTML = "Downloaded";
                    }else{
                        downloadBtn.innerHTML = "Error"
                    }     
                });
                imgDiv.appendChild(downloadBtn);

                  //copy button create and add eventListener
                let copyBtn = document.createElement("button");
                copyBtn.classList.add("copy-btn");
                copyBtn.innerHTML = `<img src="icons8-copy-24.png">`;
                copyBtn.addEventListener("click", () => {
                    copyBtn.innerHTML = "copied"
                    setTimeout(() => {
                        copyBtn.innerHTML = `<img src="icons8-copy-24.png">`;
                    }, 3000);

                    copyImageUrl(imageData.urls.full)
                })
                imgDiv.appendChild(copyBtn);

                // add img-div into image container
                allImageContainer.appendChild(imgDiv);
            });
        } catch (error) {
            showError.innerText = "Error: Check your network or Reconnecting to Wi-Fi";
        } finally{
            //loader
            searchLoader.style.display = "none";
            moreLoader.style.display = "none";
        } 
    }
}

// download image 
async function downloadImage(url, id) {
    try {
        let response = await fetch(url);
        let blob = await response.blob();
        let a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${id}.jpg`;
        a.click();
        URL.revokeObjectURL(a.href);
        return true;
    } catch (error) {
        return false;
    }
}

// copy image usl 
function copyImageUrl(imageUrl){
     // Create a temporary textarea element to hold the URL
     var tempInput = document.createElement('textarea');
     tempInput.value = imageUrl;
     document.body.appendChild(tempInput);

     // Select the text in the textarea
     tempInput.select();
     tempInput.setSelectionRange(0, 99999); // For mobile devices

     // Copy the text to the clipboard
     document.execCommand('copy');

     // Remove the temporary textarea element
     document.body.removeChild(tempInput);
}

//get new image by search input
function searchImages() {
    searchLoader.style.display = "block";
    allImageContainer.innerHTML = "";
    showError.innerHTML = "";
    pages = 1;  // Reset pages to 1 when a new search is submitted
    getImages()    
}

//search on form submit 
form.addEventListener("submit", (e) => {
    e.preventDefault();
    searchImages();


})
// search by suggentions
suggestionsList.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        let buttonTxt = e.target.innerText;
        searchInput.value = buttonTxt;   
        searchImages();

    })
})

//load more images
loadMore.addEventListener("click", () => {
    pages++;
    moreLoader.style.display = "block"
    getImages()    
});

// home page images
searchInput.value = "popular";
getImages();



// AUTO SCROLL JAVASCRIPT
/* script.js */
let goTopBtn = document.getElementById("goTopBtn");
let lastScrollTop = 0;

// When the user scrolls up, show the button
window.onscroll = function() {
    let st = window.scrollY || document.documentElement.scrollTop;
    if (st < lastScrollTop) {
        goTopBtn.style.display = "block";
    } else {
        goTopBtn.style.display = "none";
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
};

// When the user clicks on the button, scroll to the top of the document
goTopBtn.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

