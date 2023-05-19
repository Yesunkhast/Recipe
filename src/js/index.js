require("@babel/polyfill");

import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";
import { renderRecipe, clearRecipe, highlightSelectedRecipe } from './view/recipeView'
import List from "./model/List";
import Like from "./model/Like";
import * as listView from "./view/listView";
import * as likesView from "./view/likesView";

/*

******* WEB appin tuluv ******
* hailtin query, ur dun
* tuhain uzuulj baigaa jor
* like drsan joruud 
* zahialj baigaa jorin nairalguud

*/

// itemuudig hussen gazrn ashigalah bolomjiig uusgej ugnu
const state = {};


/*
* Hailtiin controler = Model ==> Controller <== View
*/
const controlSearch = async () =>{

    // 1) webees hailtiin tulhuur ugiig gargaj avna
    const query = searchView.getInput();

    if(query){
        // 2) shineer hailtiin objegtiig uusgej ugnu
        state.search = new Search(query);

        // 3) hailt hiihed zoruilj interfaciig beltegnee
        searchView.clearSearchQuery();
        searchView.clearSearchResult();
        renderLoader(elements.searchResultDiv);

        // 4) hailtiig guitsetgene
        await state.search.doSearch();
    
        // 5) hailtiin ur dung delgtsend uzuulne
        clearLoader();
        if(state.search.result === undefined) alert("Хайлт илэрцгүй...");
        else searchView.renderRecipes(state.search.result, 1);
    }

};

elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});

elements.pageButtons.addEventListener('click', e => {
    // target.closest('') func n tuhain zaasan Html iin oiroltsooh utag tuun deerh utag value g avna
    const btn = e.target.closest('.btn-inline');

    if(btn){
        // button deer inner hiij bga html deer bh data-goto deerh utgiig selegt hiih
        const gotoPageNumber = parseInt(btn.dataset.goto);
        searchView.clearSearchResult();
        searchView.renderRecipes(state.search.result, gotoPageNumber);
    }
});

// const r = new Recipe(47746);

// r.getRecipe();

/*
* Joriin controller
*/

const controlRecipe = async () => {
    // 1) URL - aas ID -ig salgaj avna
    const id = window.location.hash.replace('#', '');

    // URL deer ID baigaa esehiig shalgana
    if(id)
    {
    // 2) joriin modeliig uusgej ugnu
    state.recipe = new Recipe(id);

    // 3) UI delgtsig beltgene
    clearRecipe();
    renderLoader(elements.recipeDiv);
    highlightSelectedRecipe(id);

    // 4) Joroo tataj avcirna 
    await state.recipe.getRecipe();

    // 5) joriig guitsetgeh hugtsaa bolon ortsiig tootsoolno
    clearLoader();
    state.recipe.calcTime();
    state.recipe.calcHuniiToo();

    // 6) joroo delgtsend gargana
    renderRecipe(state.recipe, state.likes.isLiked(id));
    // console.log(state.likes.isLiked(id));
    }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

window.addEventListener('load', e => {
    // shineer like modeliig app dunguj acaalagdahad uusgene.
    if(!state.likes) state.likes = new Like();

    // like tsesiig gargah esehiig shiideh
    likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
    
    // likuud baival tsesend nemj haruulna
    state.likes.likes.forEach(like => likesView.renderLike(like));

});

/*
* nairlagani controller
*/

const controlList = () => {
    // niarlganii modeliig uusegne
    state.list = new List();

    // umnu n hargdaj baisan nairlguudig delgtsenees arilgana
    listView.clearItems();
    // ug model ruu odoo hargdaj baigaa buh nairalgiig avj hiine
    state.recipe.ingredients.forEach( n => 
        {
            // tuhain nairlagiig modelruu hiine
            const item = state.list.addItem(n);
            
            // tuhain nairlagiig delgtsend gargana
            listView.renderItem(item);
        }
    );
};

/*
* Like controller
*/

const controlLike = () => {
    // 1) like iin modeliig shineer uusgene
    if(!state.likes) state.likes = new Like();

    // 2) odoo hargdaj baigaa joriin id g olj avah
    const currentRecipeId = state.recipe.id;

    // 3) ene joriig likelsan esehiig shalgah
    if(state.likes.isLiked(currentRecipeId)){
        // like drsan bol likeiig boliolna
        state.likes.deleteLike(currentRecipeId);

        // likiig tsesnees ustagna
        likesView.deleteLike(currentRecipeId);

        // like tovchnii likelsan baidliig boliulah
        likesView.toggleLikeBtn(false);
    }else{
        // like draagu bol like drna
        const newLike = state.likes.addLike(
            currentRecipeId, 
            state.recipe.title,  
            state.recipe.publisher,  
            state.recipe.image_url,
            );

            // like tsesend ene laikig gargaj ireh
            likesView.renderLike(newLike)
            
            // like tovchiig likelsan bolgoh
            likesView.toggleLikeBtn(true);
        }

    likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
    console.log(state.likes.getNumberOfLikes());
}

elements.recipeDiv.addEventListener('click', e => {
    if(e.target.matches('.recipe__btn, .recipe__btn * ')){
        controlList();
    }else if(e.target.matches('.recipe__love, .recipe__love * ')){
        controlLike();
    }
});

elements.shoppingList.addEventListener('click', e => {
    // click hiise li elmentiin data-itemid atributig shuuj avah
    const id  = e.target.closest('.shopping__item').dataset.itemid;

    console.log(e.target);

    // oldson ID - tai ortsiig ustgana
    state.list.deleteItem(id);

    // delgtsnees iim ID tai orstiig arilganaa
    if(e.target.href)listView.deleteItem(id);

});