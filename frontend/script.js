document.addEventListener('DOMContentLoaded', async () => {
    if (document.getElementById('new-albums')) {
        loadNewAlbums();
    }
    if (document.getElementById('genres-list')) {
        loadGenres();
    }

    if (document.getElementById('searchForm')) {
        document.getElementById('searchForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const query = document.getElementById('query').value;
            const results = await searchMusic(query);
            displaySearchResults(results);
        });
    }

    if (document.getElementById('registerForm')) {
        document.getElementById('registerForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await response.json();
            if (response.ok) {
                alert('User registered successfully');
            } else {
                alert('Error registering user: ' + data.message);
            }
        });
    }

    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                alert('Login successful');
            } else {
                alert('Error logging in: ' + data.message);
            }
        });
    }
});

async function loadNewAlbums() {
    const response = await fetch('/music/new');
    const albums = await response.json();
    const container = document.getElementById('new-albums');
    albums.forEach(album => {
        const albumElement = document.createElement('div');
        albumElement.textContent = `${album.title} by ${album.artist}`;
        container.appendChild(albumElement);
    });
}

async function loadGenres() {
    const response = await fetch('/music/genres');
    const genres = await response.json();
    const container = document.getElementById('genres-list');
    genres.forEach(genre => {
        const genreElement = document.createElement('li');
        const genreLink = document.createElement('a');
        genreLink.href = `genre.html?genre=${genre}`;
        genreLink.textContent = genre;
        genreElement.appendChild(genreLink);
        container.appendChild(genreElement);
    });
}

async function searchMusic(query) {
    const response = await fetch(`/music/search?query=${query}`);
    return await response.json();
}

function displaySearchResults(results) {
    const container = document.getElementById('search-results');
    container.innerHTML = '';
    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.textContent = `${result.title} by ${result.artist}`;
        container.appendChild(resultElement);
    });
}
