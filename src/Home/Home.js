import React, { Component } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      input: "",
      open: false,
      startIndex: 10,
    };

    //bindinds
    this.handleChange = this.handleChange.bind(this);
  }

  viewDetails = (e) => {
    console.log(e.value);
  };
  handleChange = (e) => {
    this.setState(
      {
        input: e.target.value,
      },
      this.fetchBooks
    );
    if (e.target.value == "") {
      this.setState((state) => ({
        ...state,
        open: false,
      }));
    }
  };

  onLoadClick = () => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${
        this.state.input
      }&projection=lite&maxResults=10&startIndex=${this.state.startIndex + 10}`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(
          "Start Index",
          this.state.startIndex,
          "Calculated",
          this.state.startIndex + 10
        );
        this.setState((state) => ({
          ...state,
          books: [...state.books, ...response.items],
        }));
      })
      .catch();
    this.setState((state) => ({
      ...state,
      startIndex: state.startIndex + 10,
    }));
  };

  fetchBooks = () => {
    if (this.state.input) {
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${this.state.input}&projection=lite&maxResults=10`
      ).then((response) => {
        if (response.status === 200) {
          response.json().then((response) => {
            this.setState((state) => ({ ...state, books: response.items }));
          });
        } else alert("Status !== 200");
      });
    }
  };
  setSearchBar = (e) => {};

  render() {
    return (
      <div>
        <div className="searchBoxContainer">
          <div className="searchBoxDiv">
            <input
              className="searchField"
              value={this.state.input}
              placeholder="Enter Book Name...."
              onInput={() =>
                this.setState({
                  open: true,
                })
              }
              // onBlur={() => setOpen(false)}
              onChange={this.handleChange}
            ></input>
            <button className="searchButton">Search</button>
          </div>

          {this.state.open && this.state.books !== undefined && (
            <div className="suggestionsBoxContainer">
              <div className="suggestionsBox">
                {(this.state.books == undefined &&
                  this.state.books.length == 0) && (
                  <div className="suggestion">Not Found</div>
                )}
                {this.state.books != undefined &&
                  this.state.books.map((book) => (
                    <div
                      className="suggestion"
                      key={book.id}
                      onClick={this.setSearchBar}
                      value={
                        book.volumeInfo !== undefined &&
                        book.volumeInfo.title !== undefined
                          ? book.volumeInfo.title
                          : "failed"
                      }
                    >
                      {book.volumeInfo !== undefined &&
                      book.volumeInfo.title !== undefined ? (
                        <Link
                          className="routerLinks"
                          to={`/details/${book.id}`}
                        >
                          {book.volumeInfo.title}
                        </Link>
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                <button className="loadMoreButton" onClick={this.onLoadClick}>Load More</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
