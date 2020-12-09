import React, { Component } from "react";
import "./Detail.css";

class Detail extends Component {
  constructor({ match }) {
    super();
    this.state = {
      book: {},
      id: match.params.id,
    };
    console.warn("Constructor Called", match.params.id);
    this.fetchItem(match);
  }
  fetchItem = async (match) => {
    console.warn("Fetch Called", match);
    let id = match.params.id;
    console.log("(D", id);
    await fetch(`https://www.googleapis.com/books/v1/volumes/` + id).then(
      (response) => {
        response.json().then((neoResponse) => {
          console.log(neoResponse, "Hello");

          this.setState({
            book: neoResponse,
          });
          console.log("Hello", this.state.book);
          return neoResponse;
        });
      }
    );
  };
  componentDidMount() {
    console.warn("Did mount Called");
    console.log("Details Component Did Mount Hurray", this.state.book);
  }

  render() {
    console.warn("Render Called");
    return (
      <div>
        {(this.state.book !== undefined &&
        this.state.book.volumeInfo !== undefined) ? (
          <div>
            {this.state.book.volumeInfo !== undefined ? (
              <h1>{this.state.book.volumeInfo.title}</h1>
            ) : (
              ""
            )}
            <img
              src={
                this.state.book.volumeInfo !== undefined && this.state.book.volumeInfo.imageLinks !== undefined
                  ? this.state.book.volumeInfo.imageLinks.small
                  : ""
              }
            ></img>
            <p className="description">
              {this.state.book.volumeInfo !== undefined
                ? this.state.book.volumeInfo.description
                : ""}
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Detail;
