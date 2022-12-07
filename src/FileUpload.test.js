import React from "react";
import { render, screen } from "@testing-library/react";
// Component
import FileUpload from "./FileUpload";

test("renders an upload button", () => {
  render(<FileUpload />);
  const linkElement = screen.getByTestId("submit-button");
  expect(linkElement).toBeInTheDocument();
});

test("renders file input field", () => {
  render(<FileUpload />);
  const linkElement = screen.getByTestId("file-input");
  expect(linkElement).toBeInTheDocument();
});
