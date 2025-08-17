import './App.css'
import HomePage from './components/Homepage';
import React from "react";
import ReactDOM from "react-dom/client";

function App() {

  return (
   <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  )
}

export default App
