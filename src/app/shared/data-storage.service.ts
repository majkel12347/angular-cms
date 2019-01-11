import { Injectable } from '../../../node_modules/@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { HttpClient, HttpRequest} from '../../../node_modules/@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import 'rxjs/Rx';
 

@Injectable()

export class DataStorageService {

constructor(private httpClient: HttpClient,
            private recipeService: RecipeService,
            private authService: AuthService
          )
            {}

    storeRecipes(){
        const token = this.authService.getToken();
        
       return this.httpClient.put('https://ng-cms-3a856.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
    }

    getRecipes() {
       const token = this.authService.getToken();

         this.httpClient.get<Recipe[]>('https://ng-cms-3a856.firebaseio.com/recipes.json?auth=' + token)
              .map((recipes) => {
                return recipes.map((recipe) => {
                    if (! recipe['ingredients']) {
                        recipe.ingredients = [];
                    }
                    return recipe;
                });
            })
          .subscribe(
            (recipes: Recipe[]) => {
              this.recipeService.setRecipes(recipes);
            }
          )
    
    }
}