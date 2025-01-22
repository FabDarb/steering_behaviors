export default class ObjectPool {
    constructor() {
        this.usedObject = [];
        this.availableObject = [];
    }
    acquire(create) {
        if (this.availableObject.length == 0) {
            const object = create();
            this.usedObject.push(object);
            return object;
        } else {
            const object = this.availableObject.pop();
            object.reset();
            this.usedObject.push(object);
            return object;
        }

    }
    release(object) {
        const indexOf = this.usedObject.indexOf(object);
        this.usedObject.splice(indexOf, 1);
        this.availableObject.push(object);
    }
}