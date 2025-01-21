export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static subtract(vect1, vect2) {
        return new Vector(vect1.x - vect2.x, vect1.y - vect2.y);
    }
    static divide(vect, number) {
        if (number != 0) {
            return new Vector(vect.x / number, vect.y / number);
        }
        return new Vector(0, 0);
    }
    static add(vect, number) {
        return new Vector(vect.x + number, vect.y + number);
    }
    static addition(vect1, vect2) {
        return new Vector(vect1.x + vect2.x, vect1.y + vect2.y);
    }
    static normalized(vect) {
        const x = vect.x;
        const y = vect.y;
        const v = Math.sqrt((x * x) + (y * y));
        return this.divide(vect, v);
    }
    static multi(vect, number) {
        return new Vector(vect.x * number, vect.y * number);
    }
    static multiplication(vect1, vect2) {
        return new Vector(vect1.x * vect2.x, vect1.y * vect2.y);
    }
    static moyenne(vect1, vect2) {
        const distance = this.subtract(vect2, vect1);
        return distance.length();
    }
    static truncate(vect, maxSpeed) {
        let vectLength = vect.length();
        if (vectLength <= maxSpeed) {
            return vect;
        }
        return Vector.multi(Vector.normalized(vect), maxSpeed);
    }
    length() {
        const cx = this.x * this.x;
        const cy = this.y * this.y;
        const rxy = Math.sqrt(cx + cy);
        return rxy;
    }
    static dot(vectA, vectB) {
        return vectA.x * vectB.x + vectA.y * vectB.y;
    }
}