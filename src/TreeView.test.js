import React from "react";
import { render } from "@testing-library/react";
// Component
import TreeView from "./TreeView";

test("renders XML data", () => {
  const data = {
    name: "policyXML",
    attributes: {},
  };

  const { getByText } = render(<TreeView policyTree={data} />);

  expect(getByText("policyXML")).toBeInTheDocument();
});
