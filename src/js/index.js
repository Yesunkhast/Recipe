require("@babel/polyfill");

import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";

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
        else searchView.renderRecipes(state.search.result);
    }

}

elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
})