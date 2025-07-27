import { useState } from 'react'
import './App.css'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeList from './components/RecipeList'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeDetails from './components/RecipeDetails';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div>
        <RecipeList/>
        <AddRecipeForm />
      </div>
      <Routes>
        <Route path="/recipes/:recipeId" element={<RecipeDetailsWrapper />} />
      </Routes>
    </Router>
  )
}

// Wrapper to extract recipeId from URL and pass to RecipeDetails
import { useParams } from 'react-router-dom';
function RecipeDetailsWrapper() {
  const { recipeId } = useParams();
  return <RecipeDetails recipeId={recipeId} />;
}

export default App
