주요 기능 소개(tmdb.js)

- fetchMovies -> 검색창의 내용이 null인 상태가 default입니다. 
query라는 변수로 검색창의 내용을 받아와서 url의 파라미터에 할당됩니다. 
displayMovies함수를 내부에서 호출합니다

- displayMovies -> fetchMovies에서 api호출결과로 받은 정보가 매개변수로 들어갑니다.
class가 'movie-card'인 html태그를 생성하여 화면에 나오는 영화정보 카드를 생성하였습니다.

- 디바운싱 -> 검색창의 input이벤트를 발생할때마다 setTimeout을 통해 300밀리세컨드 후에 fetchMovies함수를 호출합니다.
디바운싱 부분의 상단에 clearTimeout을 호출하여 사용자가 검색창의 내용을 변경하면 기존 fetchMovies작업이 중단되게 하였습니다.

- 모달 -> 모달의 경우 css가 가장 중요하게 작용되는 부분입니다. z-index나 display부분을 신경 쓰시면 좋겠습니다
관심 목록에 추가하기 버튼의 경우 isLiked라는 함수가 반환한 값에 의해 내부 텍스트가 달라집니다.

- getLikedMovies ->favaoriteMovie라는 키워드로된 값을 불러옵니다
불러온값이 있으면 json파싱하고, 없으면 빈배열을 반환합니다. -> 로컬스토리지는 문자열형태만 저장가능하기때문에 이렇게 해야합니다.

- addMovie -> 관심목록에 새로운 영화를 추가시킵니다. 그냥 값을 추가하는게 아닌 저장소의 값을 json파싱해서 가져오고
그 객체에 새로운 값을 추가한뒤 문자화시켜서 다시 저장소에 저장 시킵니다. 위와 같은 이유입니다.

-removeMovie -> addMovie와 같은 원리로 동작합니다.

주요 기능 소개(tmdbFavorites.js)
- getLikedMovies -> tmdb.js의 함수와 동일 합니다.

- removeFavorites -> tmdb.js의 removeMovie함수와 동일 합니다.

- displayFavoriteMovies ->  tmdb.js의 displayMovies함수와 유사합니다.
