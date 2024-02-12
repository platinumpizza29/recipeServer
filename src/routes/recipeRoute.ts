import {Elysia} from "elysia"
import {PrismaClient} from "@prisma/client"


const recipeRoute = new Elysia();
const prisma = new PrismaClient();

recipeRoute.get("/recipes/:page", async ({params})=>{
    //get all recipes
    //implement pagination
    const page = parseInt(params.page);
    const pageSize = 10;
    try {
        const recipes = await prisma.recipe.findMany({
            skip: (page-1) * pageSize,
            take: pageSize
        })
        //send total pages as well
        const totalRecipes = await prisma.recipe.count();
        const totalPages = Math.ceil(totalRecipes/pageSize);

        return {
            status:200,
            totalPages: totalPages,
            recipes: recipes
        }

    } catch (e) {
        console.log(e)
    }
});

//get a random recipe (I'm feeling lucky)
recipeRoute.get("/recipe/random", async ()=>{
    try {
        const totalRecipe = await prisma.recipe.count();

        //get random index
        const randomIndex = Math.floor(Math.random() * totalRecipe);

        //fetch random recipe
        const randomRecipe = await prisma.recipe.findMany({
            skip:randomIndex,
            take:1
        })

        if (randomRecipe){
            return {
                status: 200,
                randomRecipe: randomRecipe
            }
        } else {
            return {
                status: 500,
                message: "error fetching random recipe"
            }
        }

    } catch (e) {
        return {
            status: 500,
            message: "Internal server error!"
        }
    }
})


//get a recipe details by id
recipeRoute.get("/recipe/:id", async ({params})=>{
    const id = params.id;
    try {

        const singleRecipe = await prisma.recipe.findUnique({
            where: {
                id: parseInt(id)
            }
        })
        if (singleRecipe) {
            return {
                status: 200,
                recipe: singleRecipe
            }
        } else {
            return {
                status: 500,
                message: "Error while fetching recipe"
            }
        }

    } catch (e) {
        return {
            status: 500,
            message: "Internal server error!"
        }
    }
});

//get recipe of the day
recipeRoute.get("/recipeoftheday", async ()=>{
    try {
        // Get the total number of recipes in the database
        const totalRecipes = await prisma.recipe.count();

        // Use the current date to generate a seed
        const today = new Date();
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

        // Generate a "random" index based on the seed
        // Note: The randomness is deterministic and only changes once a day
        const index = seed % totalRecipes;

        // Fetch the recipe of the day by skipping to the "random" index
        // Note: For large datasets, consider a more efficient approach
        const recipeOfTheDay = await prisma.recipe.findMany({
            skip: index,
            take: 1,
        });
        if (recipeOfTheDay){
            return {
                status:200,
                recipeOfTheDay: recipeOfTheDay
            }
        } else {
            return {
                status: 400,
                message: "Error while fetching recipe of the day"
            }
        }
    } catch (e) {
        console.log(e)
    }
})

export default recipeRoute;