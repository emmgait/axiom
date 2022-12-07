import React, { useRef } from "react";
// Styles
import "./FileUpload.css";

function CustomFileInput(props) {
  const inputRef = useRef(null);

  // Instantiating a File reader to asynchronously read the contents of file
  const reader = new FileReader();

  const XMLParser = require("react-xml-parser");

  const handleUploadClick = () => {
    // Redirecting the click to the hidden input element
    inputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (!e.target.files) {
      return;
    }

    // Starts reading the contents of the file
    reader.readAsText(e.target.files[0]);

    reader.onloadend = (evt) => {
      // Getting the result
      const readerData = evt.target.result;

      // Parting the string as an XMLDocument
      const xmlParsed = new XMLParser().parseFromString(readerData);

      // Passing the result the the main in order to display the Tree of the XML
      props.getXmlTree(xmlParsed);
    };
  };

  return (
    <div className="file-input">
      <button className="primary-button" onClick={handleUploadClick}>
        Upload XML file
      </button>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="text/xml"
      />
    </div>
  );
}

export default CustomFileInput;
