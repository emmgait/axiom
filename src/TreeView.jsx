import React, { useEffect } from "react";
// Styles
import "./TreeView.css";

function TreeView({ policyTree }) {
  useEffect(() => {
    const listItems = document.querySelectorAll("li");
    // Adding event listener on the li tags, as they represent the tree nodes
    listItems.forEach((list) =>
      list.addEventListener("click", handleClick, { capture: false })
    );

    // Cleaning up event listeners
    return () => {
      listItems.forEach((list) =>
        list.removeEventListener("click", handleClick, { capture: false })
      );
    };
  });

  const handleClick = (event) => {
    // Stopping event propagation
    event.stopPropagation();
    event.currentTarget.classList.toggle("shrink");
  };

  // Sanitizing values - splitting them and mapping them in a span tag
  const policyTreeValues = (value) => {
    if (!value) return;
    // assumption that description will not include ":" character
    if (!value.includes(":")) {
      return <span>{value}</span>;
    } else {
      const cleanedUpValues = value.replace(/>/g, "").split(" ");

      return cleanedUpValues.map((value, index) => {
        return <span key={index}>@{value}</span>;
      });
    }
  };

  // Checking if there is a policy attribute and returning key value pairs
  const policyTreeAttributes = (attribute) => {
    if (Object.keys(attribute).length === 0) return;
    return (
      <span>
        @{Object.keys(attribute)} : {Object.values(attribute)}
      </span>
    );
  };

  // Nested Children rendered function.
  const childrenRenderer = (xmlEntry) => {
    return (
      <li className="tree-node">
        {xmlEntry.name}

        <div className="policy-details">
          {policyTreeValues(xmlEntry.value)}
          {policyTreeAttributes(xmlEntry.attributes)}
        </div>

        {/* If there are any children repeat the same function */}
        {xmlEntry.children.length > 0 && (
          <ul>
            {xmlEntry.children.map((item) => {
              return item.children && childrenRenderer(item);
            })}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="tree-view">
      {policyTree && (
        // Displaying initial object attributes
        <ul>
          <li className="tree-node">
            {policyTree.name}

            <div className="policy-details">
              {policyTreeValues(policyTree.value)}
              {policyTreeAttributes(policyTree.attributes)}
            </div>
          </li>

          {/* Displaying children attributes */}
          {policyTree.children &&
            policyTree.children.map((item) => {
              return childrenRenderer(item);
            })}
        </ul>
      )}
    </div>
  );
}

export default TreeView;
