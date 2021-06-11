$(document).ready(function(){
    var tagsInput = $('#ingredients').tagsInput({
        'defaultText':'Lisa koostisosad',
    });

    class recipeApp {
        constructor() {
            recipeApp.renderRecipes()
            recipeApp.initializeEdit();
            recipeApp.initializeDelete();
            recipeApp.initializeAddNew();
            recipeApp.initializeSave();
        }

        static initializeView() {
            $(".recipe.view").click(function(e){
                e.preventDefault()
                name = e.target.getAttribute('data-name')
                var recipes = recipeApp.getRecipesFromStorage()
                var recipe = recipes[name]
                $('#recipeName').text(recipe.name)
                $('#recipeMethod').text(recipe.method)
                $('#recipeIngredients').html('')
                var split = recipe.ingredients.split(",")
                for (let i in split) {
                    if (split[i].length > 0) {
                        $('#recipeIngredients').append("<li>" + split[i] + "</li>")
                    }
                }
                $('#editRecipe').attr('data-name', recipe.name)
                $('#deleteRecipe').attr('data-name', recipe.name)
            });
        }

        static initializeEdit() {
            $("#editRecipe").click(function(e){
                name = e.target.getAttribute('data-name')
                var recipes = recipeApp.getRecipesFromStorage()
                var recipe = recipes[name]
                $('#name').val(recipe.name)
                tagsInput.importTags(recipe.ingredients)
                $('#method').val(recipe.method)
            });
        }

        static initializeSave() {
            $("#save").click(function(e){
                e.preventDefault()
                var name = $('#name').val();
                var recipe = {
                    name: name,
                    method: $('#method').val(),
                    ingredients: $('#ingredients').val(),
                }
                var recipes = recipeApp.getRecipesFromStorage()
                recipes[name] = recipe
                localStorage.setItem('recipes', JSON.stringify(recipes))
                recipeApp.renderRecipes()
            });
        }

        static initializeDelete() {
            $("#deleteRecipe").click(function(e){
                name = e.target.getAttribute('data-name')
                var recipes = recipeApp.getRecipesFromStorage()
                delete recipes[name]
                localStorage.setItem('recipes', JSON.stringify(recipes))
                recipeApp.renderRecipes()
            });
        }

        static initializeAddNew() {
            $(".recipe.add-recipe").click(function(e){
                $('#name').val('');
                $('#method').val('');
                tagsInput.importTags('');
            });
        }

        static renderRecipes() {
            var recipes = recipeApp.getRecipesFromStorage()
            var html = $('.recipe.add-recipe')[0].outerHTML
            for (var recipeName in recipes) {
                html = html + '<a class="recipe view" href="#view" data-name="'+recipeName+'" rel="modal:open"> <h3>'+ recipeName + '</h3> </a>'
            }
            $('#recipes').html(html)
            recipeApp.initializeView()
            recipeApp.initializeAddNew()
        }

        static getRecipesFromStorage()
        {
            var recipes = localStorage.getItem('recipes')
            if (recipes && recipes.length > 0) {
                recipes = JSON.parse(recipes)
            } else {
                recipes = {}
            }
            return recipes
        }
    }
    new recipeApp();
});
