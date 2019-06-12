import React, {Component} from 'react';
import './App.css';
import Movie from './Movie';


class App extends Component {

    state = {}

    componentWillMount() {

    }

    componentDidMount() {
        this._getMovies();
    }

    /**
     * 리액트는 내부 함수가 많기 때문에
     * 리액트 자체 함수인지 내가 만든 함수인지 확인하기 위하여
     * _를 함수명 앞에 붙여주는게 좋다.
     */
    _renderMovies = () => { // 컴포넌트의 index는 이용하지 않는것이 좋다. 왜냐 느리니까!
        const movies = this.state.movies.map(movie => {
            console.log(movie)
            return <Movie
                title={movie.title_english}
                poster={movie.large_cover_image}
                key={movie.id}
                genres={movie.genres}
                synopsis={movie.synopsis}
            />
        })
        return movies

    }

    _getMovies = async () => {  // await: 성공 실패 여부를 떠나 끝나기를 기다리다 끝나면 this._callApi를 실행한다.
        const movies = await this._callApi();
        this.setState({
            movies  // state 에 callApi 에서 반환한 json 타입의 데이터가 저장된다.
        })
    }

    _callApi = () => {
        return fetch("https://yts.lt/api/v2/list_movies.json?sort_by=download_count")
            .then(response => response.json()) // 위의 작업이 끝나면: 성공적이 수행이 아니라 그냥 작업이 끝나면 결과값을 넣는다. response 는 이름을 바꿔도 상관없다.
            .then(json => json.data.movies) // 위 작업의 결과값
            .catch(err => console.log(err)); // 모던 javaScript : 에러가 나면 console에 보여준다.
    };


    render() {
        const {movies} = this.state
        return (
            <div className={movies ? "App" : "App--loading"}>
                {this.state.movies ? this._renderMovies() : "Loading"}
            </div>
        );
    }
}

export default App;
