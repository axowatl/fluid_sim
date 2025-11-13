export class Vector2 {
    constructor(x, y) {
        if (y == null) {
            this.x = x;
            this.y = x;
        } else {
            this.x = x;
            this.y = y;
        }
    }

    mulNumber(other) {
        this.x *= other;
        this.y *= other;
    }

    static mulNumber(vector, num) {
        return new Vector2(vector.x * num, vector.y * num);
    }

    static addVectors(a, b) {
        return new Vector2(a.x + b.x, a.y + b.y);
    }

    static divNumber(v, n) {
        return new Vector2(v.x / n, v.y / n);
    }
}