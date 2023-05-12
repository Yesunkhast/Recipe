import { elements } from "./base";

// image_url
// : 
// "http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg"
// publishers
// : 
// "101 Cookbooks"
// publisher_url
// : 

// "http://www.101cookbooks.com"
// recipe_id
// : 
// "47746"
// social_rank
// : 
// 100
// source_url
// : 
// "http://www.101cookbooks.com/archives/001199.html"
// title
// : 
// "Best Pizza Dough Ever"

// private funcion
const renderRecipe = recipe =>{
    // console.log(recipe)
    const markup = `
    <li>
    <a class="results__link " href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name"> ${recipe.title} </h4>
            <p class="results__author"> ${recipe.publisher} </p>
        </div>
    </a>
    </li>`;

    // ul ruuge nemne
    elements.searchResultList.insertAdjacentHTML("beforeend", markup);

};

// hailtin hergt saerch hiisni dra haitiin utgiig alg bolgoh
export const clearSearchQuery = () => {
    elements.searchInput.value = '';
}

// hailtiin utgiin medeedlel buyu zuun hesgt garj irej bga medeellig shine 
// hailt hiihed bhgu bolgoj tuhain shine hailtiin tsesiig gargaj ireh

export const clearSearchResult = () => {
    elements.searchResultList.innerHTML = '';
    elements.pageButtons.innerHTML = '';
}

export const getInput = () => elements.searchInput.value;

export const renderRecipes = (recipes, currentPage = 1, resPerPage = 5) => {

    // hailtiin ur dung huudaslaj uzuuleh
    // page = 2, start = 10, end = 20
    const start = (currentPage - 1) * resPerPage;

    const end = currentPage * resPerPage;

    // delgtsend joriig uzuuleh
    recipes.slice(start, end).forEach(renderRecipe);

    // huudaslaltiin tovchuudig gargaj ireh
    const totalPages = Math.ceil( recipes.length / resPerPage );

    renderButtons(currentPage, totalPages);
};

// buttonii html
// type ===> 'prev', 'next'
const createButton = (page, type, direction) => 
    `<button class="btn-inline results__btn--${type}" data-goto = ${page} >
    <span>Хуудас ${page}</span>
         <svg class="search__icon">
             <use href="img/icons.svg#icon-triangle-${direction}"></use>
         </svg>
     </button>`;

export const renderButtons = (currentPage, totalPages)  => {
    let buttonHtml ;

    if (currentPage === 1 && totalPages > 1) {
        // 1eer huudsan deere 2r huudas gdeg tovchiig gargaj uguh
        buttonHtml = createButton(currentPage + 1, 'next', 'right');
    } else if (currentPage < totalPages) {
        // umnuh bolon daraagin huudas ruu shiljih tovshiig uzuulne
        buttonHtml = createButton(currentPage - 1, 'prev', 'left');
        buttonHtml += createButton(currentPage + 1, 'next', 'right');
        // deerh '+=' uildel n umnuh html deer zalgagdah buyu html deer nemj bicigdene
    } else if (currentPage === totalPages) {
        // hamgiin suulin huudas der bn. umnuh ruu shiljuuleh tovchiigl uzuulne
        buttonHtml = createButton(currentPage - 1, 'prev', 'left');
    }

    elements.pageButtons.insertAdjacentHTML('afterbegin', buttonHtml);

};
