import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Recipe App</h1>
      <nav className="space-x-4">
        <Link
          to="/recipes"
          className="text-blue-500 hover:underline"
        >
          View Recipes
        </Link>
        <Link
          to="/add-recipe"
          className="text-blue-500 hover:underline"
        >
          Add Recipe
        </Link>
      </nav>
    </div>
  );
};

export default Homepage;
