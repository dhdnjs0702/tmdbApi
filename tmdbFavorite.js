function getLikedMovies() {
    const likedMovies = localStorage.getItem("favaoriteMovie");
    return likedMovies ? JSON.parse(likedMovies) : [];
}


function displayFavoriteMovies() {
    const favoriteMovies = getLikedMovies();
    const favoriteMovieList = document.getElementById("favoriteMovieList");

    favoriteMovieList.innerHTML = ''; 

    if (favoriteMovies.length === 0) {
        favoriteMovieList.innerHTML = '<p>관심 목록에 영화가 없습니다.</p>';
        return;
    }

    favoriteMovies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">
            <div class="movie-info">
                <h2 class="movie-title">${movie.title}</h2>
                <p>영화 아이디: ${movie.id}</p>
                <button onclick="removeFavorites(${movie.id})">삭제</button>
            </div>
        `;
        favoriteMovieList.appendChild(movieCard);
    });
}


function removeFavorites(movieId) {
    let likedMovies = getLikedMovies();
    likedMovies = likedMovies.filter(function (movie) {
        return movie.id !== movieId;
    });
    localStorage.setItem("favaoriteMovie", JSON.stringify(likedMovies));
    displayFavoriteMovies(); 
}


displayFavoriteMovies();
