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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Recipes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="border rounded-xl shadow p-4 bg-white"
          >
            <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
            {recipe.image && (
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}
            <p className="text-gray-600">
              {recipe.ingredients?.slice(0, 3).join(", ")}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
