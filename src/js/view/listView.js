import { elements } from "./base";

export const renderItem = item => {
    const html = 
    `
    <li class="shopping__item" data-itemid=${item.id}>
        <div class="shopping__count">
            <input type="number" value="0.5" step="0.1">
            <p>cup</p>
        </div>
        <p class="shopping__description">${item.item}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li> 
    `

    elements.shoppingList.insertAdjacentHTML('beforeend', html);
};

export const clearItems = () => {
    elements.shoppingList.innerHTML = '';
};


export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    item.parentElement.removeChild(item);
};


