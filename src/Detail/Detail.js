import React, { Component } from "react";
import "./Detail.css";

class Detail extends Component {
  constructor(props) {
    super();
    
  }

 

  render() {
    let {
      location: {
        state: { book },
      },
    } = this.props;
    console.log("this is inside render",book)
    console.warn("Render Called");
    return (
      <div className="detailsContainer">
        {book !== undefined && book.volumeInfo !== undefined ? (
          <div className="contentMain">
            <img
              className="bookImage"
              src={
               
                book.volumeInfo.imageLinks !== undefined
                  ? book.volumeInfo.imageLinks.thumbnail
                  : "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.colourbox.com%2Fpreview%2F10761451-no-possible.jpg&imgrefurl=https%3A%2F%2Fwww.colourbox.com%2Fvector%2Fno-possible-vector-10761451&tbnid=_97loBD9tna99M&vet=12ahUKEwjpiPiwut3tAhUTPhoKHdvDCx4QMygDegQIARBt..i&docid=8yyvQNFvUZ7dnM&w=800&h=541&q=no%20image%20possible&client=firefox-b-d&ved=2ahUKEwjpiPiwut3tAhUTPhoKHdvDCx4QMygDegQIARBt"
              }
            ></img>
            <div>
              
                <h2 className="bookName">{book.volumeInfo.title}</h2>
              
              {book.volumeInfo.authors !== undefined && (
                <p className="authors">
                  {book.volumeInfo.authors.map((author) => (
                    <p>{author}</p>
                  ))}
                </p>
              )}
              <hr className="divider"></hr>
              <div
                className="description"
                dangerouslySetInnerHTML={{
                  __html:
                    book.volumeInfo !== undefined
                      ? book.volumeInfo.description
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
