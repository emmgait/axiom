import React, { useState } from "react";
// Components
import FileUpload from "./FileUpload";
import TreeView from "./TreeView";
// Styles
import "./App.css";

function App() {
  const [xmlTree, setXmlTree] = useState();

  const getXmlTree = (data) => {
    setXmlTree(data);
  };

  return (
    <main>
      <div className="container">
        <div className="row">
          <FileUpload getXmlTree={getXmlTree} />
          <TreeView policyTree={xmlTree} />
        </div>
      </div>
    </main>
  );
}

export default App;
