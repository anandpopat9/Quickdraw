export default class Rect {
    constructor({ p1, p2, id }) {
        this.start = [...p1];
        this.end = [...p2];
        this.id = id;
    }


    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.start[0], this.start[1], this.end[0] - this.start[0], this.end[1] - this.start[1]);
        ctx.stroke();
    }
    
    isHit(pt) {
        const findRange = (p1, diff) => {
            return diff > 0 ? [p1, p1 + diff] : [p1 + diff, p1];
        };
        const [x1, x2] = findRange(this.start[0], this.end[0] - this.start[0]);
        const [y1, y2] = findRange(this.start[1], this.end[1] - this.start[1]);
        if(pt[0] >= x1 && pt[0] <= x2 && pt[1] >= y1 && pt[1] <= y2) {
            return true;
        }
        return false;
    }
}