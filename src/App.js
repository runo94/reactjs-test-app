import React from 'react';
import Header from './Header';
import { BrowserRouter as Router, Route} from "react-router-dom";

import './App.css';
import CardsListMovie from './CardsListMovie';
import MoviePage from './MoviePage'

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        data: null,
        page: 1,
        totalCount: 0,
        listIds: null
    }
  }

  getNowPlayingMovies = (pageNumber) => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US&page=${pageNumber}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                //'Content-Type': 'application/json'
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" // otherwise $_POST is empty
            },
        })
        .then(response => response.json())
        .then(json => {          
            this.setState({
                data: json,
                totalCount: json.total_results,
                page: pageNumber
            })
            const listIDs = []; 
            json.results.map(result => {
              listIDs.push(result.id); 
              this.setState({listIds: listIDs}
            )})
        })
        
  }

  handlePageChange(pageNumber) {
    this.getNowPlayingMovies(pageNumber);
  }

  componentDidMount() {
      this.getNowPlayingMovies(this.state.page);
  }

  render(){    
    return (
      <Router>
        <div>
          <Header/>
          <Route path="/" exact render={(props) => <CardsListMovie {...props} pagesChange={this.getNowPlayingMovies} moviesList={!!this.state.data && this.state.data} pageNumber={this.state.page} totalCount={this.state.totalCount}/>} />
          <Route path="/movie/:id" render={(props) => <MoviePage {...props}  pagesChange={this.getNowPlayingMovies} listIDs={!!this.state.listIds && this.state.listIds} currPage={this.state.page}/>} />
        </div>
      </Router>
    );
  }
}
            

export default App;
