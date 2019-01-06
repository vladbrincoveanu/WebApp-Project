import {action, observable} from "mobx";
import {IngredientModel} from "../view-models/ingredients";
import {QuantityType} from "../view-models/quantity-type";
import RecipesApiInstance, {
    RecipesApiService
} from "./api-services/recipes-api.service";

export class IngredientStore{
    private recipeApi: RecipesApiService;
    @observable ingredients: IngredientModel[] = [];
    @observable quantityTypes: QuantityType[] = [];

    constructor(recipesApi: RecipesApiService) {
        this.recipeApi = recipesApi;
    }

    addIngredient(ingredient: IngredientModel) {
        this.ingredients = [...this.ingredients, ingredient];
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
    }

    updateIngredient(ingredient: IngredientModel, index: number) {
        this.ingredients[index] = ingredient;
    }
    updateIngredients(ingredients: IngredientModel[]) {
        this.ingredients = ingredients;
    }
    resetIngredients() {
        
        this.ingredients = [];
    }

    @action
    loadQuantityTypes() {
        this.recipeApi.getQuantityTypes().then(data => {
            this.quantityTypes = data;
        });
    }
}

export default new IngredientStore(RecipesApiInstance);