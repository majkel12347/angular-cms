import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from '../../../node_modules/rxjs';

@Injectable()
export class RecipeService {
recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] =  [
    new Recipe('Strogonoff',
     'yummy great meal',
      'https://img.rasset.ie/000a24ae-800.jpg',
    [
        new Ingredient('wolowina', 1),
        new Ingredient('pieczarki', 5)

]),
    new Recipe('Rosół',
     'yummy great our soup',
      'https://gospodazbojnicka.pl/wp-content/uploads/2015/01/zupy-rosol1.jpg',
    [

        new Ingredient('kurczak', 1),
        new Ingredient('warzywa', 7)

    ])
];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
  this.recipes.push(recipe);
  this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
