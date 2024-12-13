const apiKey = 'aed27bee10b84d1fbec36db607599a34'; // Your API key
const searchButton = document.getElementById('searchrecipe');
const searchInput = document.getElementById('recipesearch');
const titleElement = document.getElementById('title');
const imageElement = document.getElementById('image');
const detailsElement = document.getElementById('details');
const resultContainer = document.getElementById('storeresults');
const briefContainer = document.getElementById('brief');

// Initially hide results
resultContainer.style.display = 'none';
briefContainer.style.display = 'none';

// Event listener for the search button
searchButton.addEventListener('click', async function () {
    const query = searchInput.value.trim();

    if (query === '') {
        alert('Please enter a search term!');
        return;
    }

    // Clear previous results
    titleElement.innerText = '';
    imageElement.src = '';
    detailsElement.innerText = '';

    try {
        const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        // Check if results are found
        if (data.results.length === 0) {
            alert('No recipes found. Please try another search term.');
            return;
        }

        // Display the first recipe's title, image, and details
        const recipe = data.results[0];
        titleElement.innerText = recipe.title;
        imageElement.src = recipe.image;
        imageElement.alt = recipe.title;
        detailsElement.innerText = 'Click for recipe details...';

        // Make the details clickable
        detailsElement.style.cursor = 'pointer';
        detailsElement.onclick = function () {
            const encodedTitle = encodeURIComponent(recipe.title);
            const recipeUrl = `https://spoonacular.com/recipes/${encodedTitle}-${recipe.id}`;
            window.open(recipeUrl, '_blank');
        };

        // Show the results container
        resultContainer.style.display = 'block';
        briefContainer.style.display = 'flex';
    } catch (error) {
        console.error('Error fetching recipe data:', error);
        alert('Failed to fetch recipe data. Please try again later.');
    }
});
