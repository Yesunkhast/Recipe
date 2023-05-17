import { elements } from "../view/base";

export default class Like {
    constructor(){
        this.readDataFromLocalStorage();

        if(!this.likes)this.likes = [];
    }

    addLike(id, title, publisher, img){
        const like = {id, title , publisher, img}

        this.likes.push(like);

        // storage ruu hadgalna
        this.saveDataToLocalStorage();

        return like;
    };

    deleteLike(id){
        // id gdeg ID tai ortsiin indexiig massivaas haij olno
        const index = this.likes.findIndex(el => el.id === id);

        // ug index deerh elmentiig massivaas ustgana
        this.likes.splice(index, 1);

        // storage ruu hadgalna
        this.saveDataToLocalStorage();
    };

    isLiked(id){
        // if(this.likes.findIndex(el => el.id ==id) === -1) return false;
        // else return true;

        return this.likes.findIndex(el => el.id ==id) !== -1;
    };

    getNumberOfLikes(){
        return this.likes.length;
    };

    saveDataToLocalStorage(){
        localStorage.setItem('likes', JSON.stringify(this.likes));
    };

    readDataFromLocalStorage(){
        this.likes = JSON.parse(localStorage.getItem('likes'));
    }
};