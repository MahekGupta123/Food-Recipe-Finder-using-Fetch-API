function getRecipe() {
    const food = document.getElementById('foodInput').value.trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "";
  
    if (!food) {
      resultDiv.innerHTML = `<p class="error">Please enter a food name.</p>`;
      return;
    }
  
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`)
      .then(response => response.json())
      .then(data => {
        const meals = data.meals;
  
        if (meals && meals.length > 0) {
          let recipeHTML = "";
  
          meals.forEach(meal => {
            recipeHTML += `
              <div class="recipe-card">
                <h2>${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                <p><strong>Category:</strong> ${meal.strCategory}</p>
                <p><strong>Instructions:</strong> ${meal.strInstructions.substring(0, 200)}...</p>
              </div>
            `;
          });
  
          resultDiv.innerHTML = recipeHTML;
        } else {
          resultDiv.innerHTML = `<p class="error">No recipes found for "${food}".</p>`;
        }
      })
      .catch(error => {
        console.error(error);
        resultDiv.innerHTML = `<p class="error">Something went wrong. Please try again later.</p>`;
      });
  }
  