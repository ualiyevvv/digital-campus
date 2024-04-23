import {Point} from "./Point";

export class Polygon {

    constructor(points) {
        this.points = points
    }
    draw(ctx, viewport, {isVertexDraw = false, isFill = false, strokeStyle = 'red', fillStyle='yellow', opacity = 0.7} = {}) {
        if (this.points.length < 1) {
            return
        }
        ctx.save()
        ctx.beginPath();
        // ctx.save()
        // ctx.moveTo(polygon[0][0], polygon[0][1]);
        // for (var i = 0; i < this.geometries.length; i++) {
        //     let scaleFactor = viewport.state.zoom;
        //     if (viewport.state.zoom >= 1.4) {
        //         scaleFactor /= 2;
        //     }
        //     let newWH = 10/scaleFactor;
        //     // let newX = (this.geometries[i][0]-(newWH/2))
        //     // let newY = (this.geometries[i][1]-(newWH/2))
        //
        //     if (isVertexDraw) {
        //         // отрисовка vertexes of polygon
        //         new Point(this.geometries[i][0], this.geometries[i][1]).draw(ctx)
        //         // this.drawRect(newX, newY, newWH, newWH, 'blue')
        //     }
        //
        //     ctx.lineTo(this.geometries[i][0], this.geometries[i][1]);
        // }

        this.points.map(points => {
            ctx.lineTo(points[0], points[1]);
        })
        ctx.closePath();

        ctx.strokeStyle  = strokeStyle;
        ctx.lineWidth = 3;
        ctx.stroke();

        if (isFill) {
            ctx.globalAlpha = opacity
            ctx.fillStyle  = fillStyle;
            ctx.fill()
        }

        if(isVertexDraw) {
            this.points.map(point => {
                new Point(point[0], point[1]).draw(ctx)
            })
        }
        ctx.restore()

    }

}