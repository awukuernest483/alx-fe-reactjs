import React, { useState, useEffect } from "react";

const RecipeDetail = () => {
      const [recipes, setRecipes] = useState([]);
    
      useEffect(() => {
        fetch("/src/data.json")
          .then((res) => res.json())
          .then((data) => setRecipes(data))
          .catch((err) => console.error("Error loading recipes:", err));
      }, []);
  return (
    <div>
        

    </div>
    
  )
}

export default RecipeDetail