import './App.css';
import React, {useEffect, useState} from "react";
import Recipe from "./Recipe";

const App = () => {

  const APP_ID = "ad54f492";
  const APP_KEY = "9d949d86809e04aac08c9e2c50839021";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken'); // default value

  useEffect (() => {
    getRecipes();
  }, [query]);

  async function getRecipes() {
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    // console.log(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <div className = "App">
      <form onSubmit = {getSearch} className ='search-form'>
        <input className ='search-bar' type = 'text' value = {search} onChange= {updateSearch}/>
        <button className ='search-button' type = "submit"> Search </button>
      </form>
      <div className= 'recipes'>
        {recipes.map ((RECIPE, index) => (
          <Recipe 
          key = {RECIPE.recipe.calories + index}
          title = {RECIPE.recipe.label}
          calories = {RECIPE.recipe.calories}
          image = {RECIPE.recipe.image}
          ingredients = {RECIPE.recipe.ingredients}
          />
        ))}
      </div>

    </div>
  );
};


export default App;
