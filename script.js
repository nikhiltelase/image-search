const form = document.getElementById("form");
const searchInput = document.getElementById("searchInput");
const loadMore = document.getElementById("loadmore");
const allImageContainer = document.getElementById("allImageContainer");
const searchLoader = document.getElementById("searchLoader");
const moreLoader = document.getElementById("moreLoader");
const showError = document.getElementById("showError");
const suggestionsList = document.querySelectorAll(".suggestions button");

const bigImage = document.getElementById("bigImage");
const bigImageContainer = document.getElementById("bigImageContainer");
const cancelBigImage = document.getElementById("cancel");

const clientId = "LfJX1YXR2ivnAyUARlX41CGwfwtueJ1L2oXzKXiPK0U";

let pages = 1;
let query = "";

cancelBigImage.addEventListener("click", () => {
    bigImageContainer.style.display = "none";
});
bigImage.addEventListener("click", () => {
    bigImageContainer.style.display = "none";
});

async function getImages() {
    query = searchInput.value.trim();

    if (!query) {
        showError.innerText = "Enter a input for search images";
        searchLoader.style.display = "none";
        moreLoader.style.display = "none";
        return;
    }

    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?page=${pages}&query=${query}&client_id=${clientId}&per_page=12`);
        const allData = await response.json();
        const result = allData.results;

        if (result.length === 0) {
            showError.innerText = "Image Not Found";
            searchLoader.style.display = "none";
            moreLoader.style.display = "none";
            return;
        }

        result.forEach((imageData) => {
            const imgDiv = document.createElement("div");
            imgDiv.classList.add("image-container");

            const img = document.createElement("img");
            img.classList.add("image");
            img.src = imageData.urls.small;
            img.addEventListener("click", () => {
                bigImage.src = imageData.urls.full;
                bigImageContainer.style.display = "flex";
            });
            imgDiv.appendChild(img);

            const downloadBtn = document.createElement("button");
            downloadBtn.classList.add("download-btn");
            downloadBtn.innerHTML = `<img src="download-2-line.png">`;
            downloadBtn.addEventListener("click", async () => {
                downloadBtn.innerHTML = "Downloading...";
                const downloadSuccess = await downloadImage(imageData.urls.raw, imageData.id);
                downloadBtn.innerHTML = downloadSuccess ? "Downloaded" : "Error";
            });
            imgDiv.appendChild(downloadBtn);

            const copyBtn = document.createElement("button");
            copyBtn.classList.add("copy-btn");
            copyBtn.innerHTML = `<img src="icons8-copy-24.png">`;
            copyBtn.addEventListener("click", () => {
                copyImageUrl(imageData.urls.full);
                copyBtn.innerHTML = "Copied";
                setTimeout(() => {
                    copyBtn.innerHTML = `<img src="icons8-copy-24.png">`;
                }, 3000);
            });
            imgDiv.appendChild(copyBtn);

            allImageContainer.appendChild(imgDiv);
        });
    } catch (error) {
        showError.innerText = "Error: Check your network or Reconnecting to Wi-Fi";
    } finally {
        searchLoader.style.display = "none";
        moreLoader.style.display = "none";
    }
}

async function downloadImage(url, id) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${id}.jpg`;
        a.click();
        URL.revokeObjectURL(a.href);
        return true;
    } catch (error) {
        return false;
    }
}

function copyImageUrl(imageUrl) {
    const tempInput = document.createElement('textarea');
    tempInput.value = imageUrl;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(tempInput);
}

function searchImages() {
    searchLoader.style.display = "block";
    allImageContainer.innerHTML = "";
    showError.innerHTML = "";
    pages = 1;
    getImages();
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    searchImages();
});

suggestionsList.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        searchInput.value = e.target.innerText;
        searchImages();
    });
});

loadMore.addEventListener("click", () => {
    pages++;
    moreLoader.style.display = "block";
    getImages();
});

searchInput.value = "popular";
getImages();

const goTopBtn = document.getElementById("goTopBtn");
let lastScrollTop = 0;

window.onscroll = function () {
    const st = window.scrollY || document.documentElement.scrollTop;
    goTopBtn.style.display = st < lastScrollTop ? "block" : "none";
    lastScrollTop = st <= 0 ? 0 : st;
};

goTopBtn.onclick = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
};
