const searchBtn = document.getElementById("searchBtn");
const recipeContainer = document.getElementById("recipeContainer");

searchBtn.addEventListener("click", () => {

    const recipeName =
    document.getElementById("searchInput").value;

    if(recipeName === ""){
        alert("Please enter a recipe name");
        return;
    }

    getRecipes(recipeName);

});

async function getRecipes(recipeName){

    const url =
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`;

    try{

        const response = await fetch(url);
        const data = await response.json();

        recipeContainer.innerHTML = "";

        if(data.meals === null){

            recipeContainer.innerHTML =
            "<h2 style='color:white;text-align:center;'>No recipes found</h2>";

            return;
        }

        data.meals.forEach(meal => {

            recipeContainer.innerHTML += `
            
            <div class="recipe-card">

                <img src="${meal.strMealThumb}" alt="Recipe">

                <div class="recipe-info">

                    <h3>${meal.strMeal}</h3>

                    <p><strong>Category:</strong> ${meal.strCategory}</p>

                    <p><strong>Area:</strong> ${meal.strArea}</p>

                    <button onclick="showRecipe('${meal.idMeal}')">
    View Details
</button>
                </div>

            </div>
            `;
        });

    }
    catch(error){

        alert("Something went wrong");

    }

}

async function showRecipe(id){

    const response =
    await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    const data = await response.json();

    const meal = data.meals[0];

    document.getElementById("modalTitle").innerText =
    meal.strMeal;

    document.getElementById("modalImage").src =
    meal.strMealThumb;

    document.getElementById("modalInstructions").innerText =
    meal.strInstructions;

    document.getElementById("recipeModal").style.display =
    "flex";
}

document.getElementById("closeBtn")
.addEventListener("click", () => {

    document.getElementById("recipeModal").style.display =
    "none";

});