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
  }

  
  handleChange = (e) => {

    console.log("handle Change called!",this);
    if(e.keyCode=== 13 ){
      console.log("you pressed enter!!!")
      this.btn.click();
      return false;
    }
    this.setState(
      {
        input: e.target.value,
      },
      this.fetchBooks
    );
    if (e.target.value === "") {
      this.setState({
        open: false,
        books: [],
        input: "",
      });
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
          books: [...state.books, ...response.items],
        }));
      })
      .catch();
    this.setState({
      startIndex: this.state.startIndex + 10,
    });
  };

  fetchBooks = () => {
    if (this.state.input) {
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${this.state.input}&projection=lite&maxResults=10`
      ).then((response) => {
        if (response.status === 200) {
          response.json().then((response) => {
            this.setState({ books: response.items });
          });
        } else alert("Status !== 200");
      });
    }
  };
  setSearchBar = (e) => {};

  render() {
    console.log("RenderCalled")
    let {input,books,startIndex,open} = this.state;
    return (
      <div>
        <div className="searchBoxContainer">
          <div className="searchBoxDiv">
            <input
              className="searchField"
              value={input}
              placeholder="Enter Book Name...."
              
              onInput={()=>this.setState({open:true})}
              // onBlur={() => this.setState({Open:false})}
              //Destructuring !
              onChange={this.handleChange}
            ></input>
            <Link
              to={`/search/${input.replace(/\s/g, "+")}`}
              className="searchLink"
            >
              <button
                key={input}
                disabled={(open&&input.length<=1)? true : false}
                ref={node => (this.btn = node)}
                className="searchButton"
              >
                Search
              </button>
            </Link>
          </div>

          {open && books !== undefined && (
            <div className="suggestionsBoxContainer">
              <div className="suggestionsBox">
                {books === undefined &&
                  books.length === 0 && (
                    <div className="suggestion">Not Found</div>
                  )}
                {books !== undefined &&
                  books.map((book) => (
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
                          to={{
                            pathname: `/details/${book.id}`,
                            state: {
                              book: book,
                            },
                          }}
                        >
                          {book.volumeInfo.title}
                        </Link>
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                {startIndex <= 40 && books!="" && (
                  <button className="loadMoreButton" onClick={this.onLoadClick}>
                    Load More
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
