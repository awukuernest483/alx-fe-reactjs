import React, { useState, useEffect } from "react";

const Homepage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/src/data.json")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Error loading recipes:", err));
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Recipes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="border rounded-xl shadow p-3 sm:p-4 bg-white transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              {recipe.title}
            </h2>
            {recipe.image && (
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-32 sm:h-40 object-cover rounded mb-3"
              />
            )}
            <p className="text-gray-600 text-sm sm:text-base">
              {recipe.ingredients?.slice(0, 3).join(", ")}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
