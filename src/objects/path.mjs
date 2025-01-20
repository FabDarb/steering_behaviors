export default class Path {
    constructor() {
        this.nods = [];
    }
    set setNods(newNods) {
        this.nods = newNods;
    }
    get getNods() {
        return this.nods;
    }
}