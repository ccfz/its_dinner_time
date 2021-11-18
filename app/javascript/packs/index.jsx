import React from "react";
import { render } from "react-dom";
import Recipes from "../components/Recipes";

document.addEventListener("DOMContentLoaded", () => {
  render(
    <Recipes />,
    document.body.appendChild(document.createElement("div"))
  );
});