import {Point} from "./Point";

export class Text {

    constructor(position, text) {
        this.x = position.x;
        this.y = position.y;
        this.text = text;
    }

    static draw(ctx, text, position, angle = 0, zoom = 1) {
        // console.log('TEXT DRAW')
        // angle = 45
        const fontSize = 16 * zoom
        ctx.save() // сохраняем контекст до этого, чтобы потом когда сбросим вернуться к этому значению

        // очень важно когда изменили центр контектса, а потом например выводим текст как ниже, то текст нужно уже выводить
        // не в позиции x, y - а в 0, 0
        ctx.translate(position.x, position.y)

        // const p = new Point(0, -15)
        // p.draw(ctx)
        ctx.font = fontSize + "px Arial";
        ctx.fillStyle = "blue";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        // console.log(ctx)
        ctx.rotate(-angle)
        ctx.fillText(text, 0, 0);
        ctx.restore()
    }
}