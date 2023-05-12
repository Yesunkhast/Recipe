require("@babel/polyfill");

import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";

/*

******* WEB appin tuluv ******
* hailtin query, ur dun
* tuhain uzuulj baigaa jor
* like drsan joruud 
* zahialj baigaa jorin nairalguud

*/

const state = {};

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

const r = new Recipe(47746);
r.getRecipe();