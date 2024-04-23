import {Point} from "../geometry";

export class Marker {

    constructor(isIconShow = false) {
        this.position = new Point(0, 0)

        this.isActive = false

        this.isIconShow = isIconShow;

        this.init();
    }

    init() {
        this.marker = document.getElementById('marker')

    }

    show() {
        this.isActive = true;
        this.marker.style.display = 'block'
    }

    hide() {
        this.isActive = false;
        this.marker.style.display = 'none'
    }

    update(position) {
        this.marker.style.left =  `${position.x - 25}px`
        this.marker.style.top = `${position.y - 50}px`

        // this._setPos()
    }

    _setPos(x, y) {
        this.position = new Point(x ,y)
    }

    // draw(ctx, {} = {}) {
    //     // const rad = size / 2;
    //     // ctx.beginPath();
    //     // ctx.fillStyle = color;
    //     // ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);
    //     // ctx.fill();
    //     // if (outline) {
    //     //     ctx.beginPath();
    //     //     ctx.lineWidth = size/9;
    //     //     ctx.strokeStyle = "yellow";
    //     //     ctx.arc(this.x, this.y, rad * 0.6, 0, Math.PI * 2);
    //     //     ctx.stroke();
    //     // }
    //     // if (fill) {
    //     //     ctx.beginPath();
    //     //     ctx.arc(this.x, this.y, rad * 0.4, 0, Math.PI * 2);
    //     //     ctx.fillStyle = "yellow";
    //     //     ctx.fill();
    //     // }
    // }
}