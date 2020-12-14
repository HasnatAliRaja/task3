import React, { Component } from "react";
import "./searchPage.css";
import { Link } from "react-router-dom";

class Search extends Component {
  constructor({ match }) {
    super();
    this.state={books:[]}
    console.log("match",match);
    this.fetchBooks(match);
  }

  fetchBooks = (match) => {
      let keyWords = match.params.words
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${keyWords}&maxResults=20`
    )
      .then((response) => {
          console.log("Got response")
        if (response.status === 200) {
            response.json().then(response=>{this.setState({books: response.items},console.log("Books",this.state.books))})
        }
        else alert("Status !== 200, got ",response.status);
      });
     
  };
  render() {
    return (<div className="containerGrid">{this.state.books.map(bookCard=><Link to={`/details/${bookCard.id}`}><Card key={bookCard.id}image={bookCard.volumeInfo.imageLinks.smallThumbnail} title={bookCard.volumeInfo.title} authors={bookCard.volumeInfo.authors}/></Link>)}</div>);
  }
}

const Card = (props) => {
  return <div className="bookCard"><img src={props.image} />
  <span>{props.title}</span>
  <h6>{props.authors?props.authors[0]:" "}</h6>
  </div>;
};

export default Search;
