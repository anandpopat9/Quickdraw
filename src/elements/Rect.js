// import { distToSegment } from './geometry'

// const HIT_DISTANCE = 1.5;

export default class Rect {
    constructor({ p1, p2, id }) {
        this.id = id;

        this.x = p1[0];
        this.y = p1[1];
        this.width = p2[0] - p1[0];
        this.height = p2[1] - p1[1];
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }

    isHit(pt) {
        // return distToSegment(pt, this.start, this.end) <= HIT_DISTANCE;
        return false;
    }
}