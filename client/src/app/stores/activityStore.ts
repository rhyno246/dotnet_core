import { action, makeAutoObservable, observable } from "mobx";

export default class ActivityStore { 
    title = 'test title';
    constructor () {
        makeAutoObservable(this, {
            title : observable,
            setTitle : action
        })
    }
    setTitle = () => {
        this.title = this.title + 'cc';
    }
}