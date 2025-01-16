const apiKey = "c6f53294eb93291556ada55eb06616ea";
const url = `https://api.themoviedb.org/3/movie/top_rated?language=ko&page=1`;
const test = document.querySelector(".test");

const goToFavoritesButton = document.getElementById("goToFavorites");

goToFavoritesButton.addEventListener("click", function () {
    window.location.href = "tmdbFavorite.html";
});

// 데이터를 가져오는 함수 -> toprated
function fetchMovies(query = "") {
  
    let apiUrl = url;


    if (query) {
        apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=ko&page=1`;
    }

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmY1MzI5NGViOTMyOTE1NTZhZGE1NWViMDY2MTZlYSIsIm5iZiI6MTczNjMxNTY4MC43ODksInN1YiI6IjY3N2UxMzIwMzRhNGU3NWU0OTdhZmQyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I4ktmb_2DgmmA2oq8NuC6fNSnxDpRji6P6orrI94sLc",
        },
    };



    fetch(apiUrl, options)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results);
        });
}


function displayMovies(movies) {
    movieList.innerHTML = '';

    if (movies.length === 0) {
        movieList.innerHTML = '<p>검색된 영화가 없습니다.</p>';
        return;
    }

    movies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}" onclick="showDetails(${movie.id})">
            <div class="movie-info">
                <h2 class="movie-title">${movie.title} ${"(" + movie.original_language.toUpperCase() + ")"}</h2>
                <div class="movie-meta">
                    <p>평점: ${movie.vote_average} (${movie.vote_count}명)</p>
                    <p>출시일: ${movie.release_date}</p>
                </div>
            </div>
        `;
        movieList.appendChild(movieCard);
    });
}


fetchMovies();




//검색기능
const search = document.querySelector(".search");
let timeoutId;
search.addEventListener("input", () => { //입력 이벤트
    clearTimeout(timeoutId); // 기존 타이머 제거

    timeoutId = setTimeout(() => {
        const query = search.value.trim();
        if (query) {
            fetchMovies(query);
        } else {
            fetchMovies();
        }
    }, 300);
});




//모달
function showDetails(movieId) {
    const modal = document.getElementById("movieModal");
    const movieTitle = document.getElementById("movieTitle");
    const moviePoster = document.getElementById("moviePoster");
    const movieOverview = document.getElementById("movieOverview");
    const movieReleaseDate = document.getElementById("movieReleaseDate");
    const movieVote = document.getElementById("movieVote");
    const movieAddButton = document.getElementById("movieAdd");

    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=ko`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            movieTitle.textContent = data.title;
            moviePoster.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
            movieOverview.textContent = `영화소개: ${data.overview}`;
            movieReleaseDate.textContent = `출시일: ${data.release_date}`;
            movieVote.textContent = `평점: ${data.vote_average} (${data.vote_count}명)`;

            modal.style.display = "block";


            const likedMovies = getLikedMovies();
            const isLiked = likedMovies.some(function(movie){
                return  movie.id === movieId
            });

            if (isLiked) {
                movieAddButton.innerText = "제거하기";
            } else {
                movieAddButton.innerText = "관심 목록에 추가하기";
            }


            movieAddButton.onclick = () => {
                const movie = {
                    id: data.id,
                    title: data.title,
                    poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
                };

                if (isLiked) {
                    removeMovie(movieId);
                    movieAddButton.innerText = "관심 목록에 추가하기";
                } else {
                    addMovie(movie);
                    movieAddButton.innerText = "제거하기";
                }
            };
        });
}


const closeModal = document.querySelector(".closeBtn");

closeModal.addEventListener("click", () => {
    const modal = document.getElementById("movieModal");
    modal.style.display = "none";
});







function getLikedMovies() {
    const likedMovies = localStorage.getItem("favaoriteMovie");
    return likedMovies ? JSON.parse(likedMovies) : [];
}

function isExists(movieId) {
    const likedMovies = getLikedMovies();
    return likedMovies.some(movie => movie.id === movieId);
}

function addMovie(movie) {
    const likedMovies = getLikedMovies();
    likedMovies.push(movie);
    localStorage.setItem("favaoriteMovie", JSON.stringify(likedMovies));
}


function removeMovie(movieId) {
    let likedMovies = getLikedMovies();
    likedMovies = likedMovies.filter(movie => movie.id !== movieId);
    localStorage.setItem("favaoriteMovie", JSON.stringify(likedMovies));
}
