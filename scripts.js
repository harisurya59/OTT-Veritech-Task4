document.addEventListener('DOMContentLoaded', () => {
    const movies = [
        { id: 1, title: "Movie 1", description: "Description for movie 1", image: "https://tse3.mm.bing.net/th?id=OIP.1umjRUVLTbPQCPVU_q1HPgHaK-&pid=Api&P=0&h=180" },
        { id: 2, title: "Movie 2", description: "Description for movie 2", image: "https://tse1.mm.bing.net/th?id=OIP.AkqQU6wiR_50f-Qd-jYA7wAAAA&pid=Api&P=0&h=180" },
        { id: 3, title: "Movie 3", description: "Description for movie 3", image: "https://tse1.mm.bing.net/th?id=OIP.c3VjSn9aWHYI-JidQavqcgHaK-&pid=Api&P=0&h=180" },
        { id: 1, title: "Movie 1", description: "Description for movie 1", image: "https://tse3.mm.bing.net/th?id=OIP.1umjRUVLTbPQCPVU_q1HPgHaK-&pid=Api&P=0&h=180" },
        { id: 2, title: "Movie 2", description: "Description for movie 2", image: "https://tse1.mm.bing.net/th?id=OIP.AkqQU6wiR_50f-Qd-jYA7wAAAA&pid=Api&P=0&h=180" },
        { id: 3, title: "Movie 3", description: "Description for movie 3", image: "https://tse1.mm.bing.net/th?id=OIP.c3VjSn9aWHYI-JidQavqcgHaK-&pid=Api&P=0&h=180" },
        { id: 1, title: "Movie 1", description: "Description for movie 1", image: "https://tse3.mm.bing.net/th?id=OIP.1umjRUVLTbPQCPVU_q1HPgHaK-&pid=Api&P=0&h=180" },
        { id: 2, title: "Movie 2", description: "Description for movie 2", image: "https://tse1.mm.bing.net/th?id=OIP.AkqQU6wiR_50f-Qd-jYA7wAAAA&pid=Api&P=0&h=180" },
        { id: 3, title: "Movie 3", description: "Description for movie 3", image: "https://tse1.mm.bing.net/th?id=OIP.c3VjSn9aWHYI-JidQavqcgHaK-&pid=Api&P=0&h=180" },
    ];

    const renderMovies = (sectionId, movies) => {
        const section = document.getElementById(sectionId);
        section.innerHTML = ''; // Clear existing movies
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.className = 'movie';
            movieElement.innerHTML = `
                <img src="${movie.image}" alt="${movie.title}">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-description">${movie.description}</div>
            `;
            movieElement.addEventListener('click', () => {
                localStorage.setItem('movieDetails', JSON.stringify(movie));
                window.location.href = 'details.html';
            });
            section.appendChild(movieElement);
        });
    };

    if (document.getElementById('trending')) {
        // Render movies in different sections on the homepage
        renderMovies('trending', movies);
        renderMovies('top-rated', movies);
        renderMovies('recommended', movies);
    }

    if (document.getElementById('movie-title')) {
        // Load movie details on the details page
        const movie = JSON.parse(localStorage.getItem('movieDetails'));
        if (movie) {
            document.getElementById('movie-poster').src = movie.image;
            document.getElementById('movie-title').textContent = movie.title;
            document.getElementById('movie-description').textContent = movie.description;
        }
    }

    // Handle sign-up form submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(signupForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password')
            };
            console.log('Sign Up Form Submitted', data);
            // Add backend functionality here
        });
    }

    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(loginForm);
            const data = {
                email: formData.get('email'),
                password: formData.get('password')
            };
            console.log('Login Form Submitted', data);
            // Add backend functionality here
        });
    }

    // Handle search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            const query = event.target.value.toLowerCase();
            const filteredMovies = movies.filter(movie => 
                movie.title.toLowerCase().includes(query) || 
                movie.description.toLowerCase().includes(query)
            );
            renderMovies('trending', filteredMovies);
            renderMovies('top-rated', filteredMovies);
            renderMovies('recommended', filteredMovies);
        });
    }
});
