const apiKey = "c6f53294eb93291556ada55eb06616ea";
const url = `https://api.themoviedb.org/3/movie/top_rated?language=ko&page=1`;
const test = document.querySelector(".test");

// 데이터를 가져오는 함수 -> toprated
function fetchMovies(query = "") {
    // 기본 URL
    let apiUrl = url;

    // 검색어가 있을 경우, 검색 URL로 변경
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
            displayMovies(data.results);  // 데이터를 화면에 표시
            console.log(data.results);
        })
        .catch(error => {
            console.error("Error fetching movies:", error);
        });
}


// 데이터를 화면에 렌더링하는 함수
function displayMovies(movies) {
    movieList.innerHTML = '';  // 기존 영화 목록을 비운다

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

// 페이지 로드 시 API 호출
fetchMovies();

//검색기능
const search = document.querySelector(".search");
let timeoutId;
search.addEventListener("input", () => { //입력 이벤트
    clearTimeout(timeoutId); // 기존 타이머 제거

    timeoutId = setTimeout(() => {
        const query = search.value.trim();  // 입력된 검색어
        if (query) {
            fetchMovies(query);  // 검색어가 있으면 해당 검색어로 영화 검색
        } else {
            fetchMovies();  // 검색어가 없으면 인기 영화 목록을 가져옴
        }
    }, 300); // 300ms 대기 후 실행
});




//모달(클릭시 세부정보 -details)
function showDetails(movieId) {
    const modal = document.getElementById("movieModal");
    const movieTitle = document.getElementById("movieTitle");
    const moviePoster = document.getElementById("moviePoster");
    const movieOverview = document.getElementById("movieOverview");
    const movieReleaseDate = document.getElementById("movieReleaseDate");
    const movieVote = document.getElementById("movieVote");

    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=c6f53294eb93291556ada55eb06616ea&language=ko`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // 모달에 영화 세부 정보 채우기
            movieTitle.textContent = data.title;
            moviePoster.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
            movieOverview.textContent = `영화소개: ${data.overview}`;
            movieReleaseDate.textContent = `출시일: ${data.release_date}`;
            movieVote.textContent = `평점: ${data.vote_average} (${data.vote_count}명)`;
            modal.style.display = "block";
        })
        .catch(error => {
            console.error("Error fetching movie details:", error);
        });
}

const closeModal = document.querySelector(".closeBtn");
closeModal.addEventListener("click", () => {
    const modal = document.getElementById("movieModal");
    modal.style.display = "none";
});
