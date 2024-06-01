# Image Search Website

## Project Overview

This project is an interactive image search website that leverages the Unsplash API to fetch and display high-quality images. Users can search for images using keywords, download images, copy image URLs, and get quick search suggestions. The website also loads popular images by default and includes loaders and error handling for an enhanced user experience.

## Features

- **Image Search**: Search for images using keywords such as "wallpapers," "nature," "technology," etc.
- **Download Images**: Download high-quality images directly to your device with a simple click.
- **Copy Image URL**: Copy the URL of any image for easy sharing.
- **Suggestions Button**: Quick search suggestions to make finding images faster and more intuitive.
- **Load Popular Images**: Automatically loads popular images when the page is first accessed.
- **Loaders and Spinners**: Visual feedback with loaders to indicate when images are being fetched.
- **Error Handling**: Robust error handling to provide clear feedback in case of network issues or no search results.
- **Responsive Design**: Fully responsive design ensures a seamless experience across all devices.
- **Smooth Animations**: Enhanced user experience with smooth animations and transitions using Tailwind CSS.

## Tech Stack

- **HTML**: For the website structure.
- **CSS**: Tailwind CSS for modern styling and responsiveness.
- **JavaScript**: For API integration, interactivity, and DOM manipulation.
- **API**: Unsplash API for fetching beautiful, high-quality images.

## Installation and Setup

1. **Clone the Repository**
    ```sh
    git clone https://github.com/nikhiltelase/image-search.git
    ```
2. **Navigate to the Project Directory**
    ```sh
    cd image-search-website
    ```
3. **Open `index.html` in Your Browser**
    You can simply open the `index.html` file in your preferred web browser to see the website in action.

## Usage

1. **Search for Images**
    - Enter a keyword in the search bar and press "Search" to fetch images related to the keyword.
    - Popular keywords include "wallpapers," "nature," "technology," etc.

2. **Download Images**
    - Click on the download button below any image to download it to your device.

3. **Copy Image URL**
    - Click on the copy button below any image to copy its URL to the clipboard.

4. **Use Suggestions**
    - Click on any suggestion button to quickly search for images related to that keyword.

5. **Load More Images**
    - Click the "Load More" button to fetch additional images related to your search.

## Project Structure

```
image-search-website/
│
├── index.html           # The main HTML file
├── style.css            # CSS file for styling
├── script.js            # JavaScript file for interactivity and API integration
├── download-2-line.png  # Image for the download button
└── icons8-copy-24.png   # Image for the copy button
```

## API Integration

This project uses the Unsplash API to fetch images. To use the API, a `client_id` is required. This ID is included in the API requests to authenticate and authorize access to the Unsplash API.

```javascript
const clientId = "YOUR_UNSPLASH_API_KEY";
```

Replace `YOUR_UNSPLASH_API_KEY` with your actual Unsplash API key.

## Contributions

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/image-search-website/issues).

## License

This project is open source and available under the [MIT License](LICENSE).

---

Thank you for checking out this project! If you have any questions or feedback, please don't hesitate to reach out.

