import express from "express";
import jsonServer from "json-server";
import auth from "json-server-auth";

const server = express();
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

const router = jsonServer.router('./Data/db.json');
server.use('/api', router);
server.db = router.db;

const middlewares = jsonServer.defaults();
const rules = auth.rewriter({
  Recipes: 444,
  FeaturedRecipes: 444,
 
});

server.use(rules);
server.use(auth);
server.use(middlewares);
server.use(router);

// New route to fetch "Recipes"
server.get('/api/recipes', async (req, res) => {
  try {
    // Fetch "Recipes" from the router's database
    const recipes = await router.db.get('Recipes').value();
    
    // Send "Recipes" as the response
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// New route to fetch "FeaturedRecipes"
server.get('/api/featured_recipes', async (req, res) => {
  try {
    // Fetch "FeaturedRecipes" from the router's database
    const featuredRecipes = await router.db.get('featuredrecipes').value();
    
    // Send "FeaturedRecipes" as the response
    res.json(featuredRecipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

server.listen(9000, () => {
  console.log('Server is running on port 9000');
});
