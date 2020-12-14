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
      <div className="detailsContainer">
        {this.state.book !== undefined &&
        this.state.book.volumeInfo !== undefined ? (
          <div className="contentMain">
            <img
              className="bookImage"
              src={
                this.state.book.volumeInfo !== undefined &&
                this.state.book.volumeInfo.imageLinks !== undefined
                  ? this.state.book.volumeInfo.imageLinks.small
                  : "The Image could not be loaded"
              }
            ></img>
            <div>
              {this.state.book.volumeInfo !== undefined ? (
                <h2 className="bookName">{this.state.book.volumeInfo.title}</h2>
              ) : (
                ""
              )}
              {this.state.book.volumeInfo.authors!==undefined&&(<p className="authors">
                {this.state.book.volumeInfo.authors.map((author) => (
                  <p>{author}</p>
                ))}
              </p>)}
              <hr className="divider"></hr>
              <div
                className="description"
                dangerouslySetInnerHTML={{
                  __html:
                    this.state.book.volumeInfo !== undefined
                      ? this.state.book.volumeInfo.description
                      : "",
                }}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Detail;
