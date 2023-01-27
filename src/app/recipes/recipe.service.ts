import {  Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
// import { Subject } from 'rxjs';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({providedIn: 'root'})
export class RecipeService {
    // recipeSelected = new Subject<Recipe>();
    recipesChanged = new Subject<Recipe[]>();

    constructor(private slService: ShoppingListService){}

    // private recipes: Recipe[] = [
    //     new Recipe(
    //       'A test recipe',
    //       'This is a test',
    //       'https://natashaskitchen.com/wp-content/uploads/2020/02/Juicy-Meatballs-Recipe-1.jpg',
    //       [
    //         new Ingredient('Tomato', 12), 
    //         new Ingredient('Bread', 12)
    //       ]
    //     ),
    //     new Recipe(
    //       'Another test recipe',
    //       'This is a test',
    //       'https://natashaskitchen.com/wp-content/uploads/2020/02/Juicy-Meatballs-Recipe-1.jpg',
    //       [
    //           new Ingredient('Meat', 1), 
    //           new Ingredient('French Fries', 10)
    //       ]
    //     ),
    // ];

    private recipes: Recipe[] = [];

    setRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        //Copia del array
        return this.recipes.slice();
    }

    getRecipe(id: number){
      return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
      this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());

    }

    deleteRecipe( index: number ) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
}