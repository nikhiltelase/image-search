var form = document.getElementById("form");
var keyword = document.getElementById("keyword");
var loadMore = document.getElementById("loadmore");
var imageContainer = document.getElementById("imageContainer");

const clientId = "LfJX1YXR2ivnAyUARlX41CGwfwtueJ1L2oXzKXiPK0U"

var pages = 1;

async function getImages() {
    let response = await fetch(`https://api.unsplash.com/search/photos?page=${pages}&query=${keyword.value}&client_id=${clientId}&per_page=10`);
    let data = await response.json();
    let result = data.results;

    result.forEach((data) => {
        let imgDiv = document.createElement("div");
        imgDiv.classList.add("image-container");

        let img = document.createElement("img");
        img.classList.add("image");
        img.src = data.urls.small;
        imgDiv.appendChild(img);

        let downloadBtn = document.createElement("button");
        downloadBtn.classList.add("download-btn");
        downloadBtn.innerHTML = `<img src="download-2-line.png" alt="">`;
        downloadBtn.addEventListener("click", () => {
            downloadImage(data.urls.full, data.id);
        });
        imgDiv.appendChild(downloadBtn);

        imageContainer.appendChild(imgDiv);
    });
}

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

form.addEventListener("submit", (e) => {
    e.preventDefault();
    imageContainer.innerHTML = "";
    pages = 1;  // Reset pages to 1 when a new search is submitted
    getImages();
});

loadMore.addEventListener("click", () => {
    pages++;
    getImages();
});
