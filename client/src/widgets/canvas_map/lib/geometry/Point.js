export class Point {

    constructor(x ,y, rounded = true) {
        this.x = x;
        this.y = y;
    }

    draw(ctx, { size = 8, color = "black", outline = false, fill = false } = {}) {

        const rad = size / 2;
        ctx.save()
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);
        ctx.fill();
        if (outline) {
            ctx.beginPath();
            ctx.lineWidth = size/9;
            ctx.strokeStyle = "yellow";
            ctx.arc(this.x, this.y, rad * 0.6, 0, Math.PI * 2);
            ctx.stroke();
        }
        if (fill) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, rad * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = "yellow";
            ctx.fill();
        }
        ctx.restore()
    }
}