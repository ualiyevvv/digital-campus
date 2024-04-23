import {Viewport} from "./Viewport";
import {World} from "./World";
import {Point, Polygon} from "../geometry";
import {Editor} from "./Editor";
import {findPolygonCenter} from "../utils";
import {Marker, Tooltip} from "../layer";
import EventEmitter from 'events'

export class Map extends EventEmitter {

    constructor(canvas, {zoom = 1} = {}) {
        super();
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')

        this.isAnimation = true;
        this.viewport = new Viewport(canvas, this.isAnimation)
        this.world = new World()
        this.editor = new Editor(canvas, this.world, this.viewport)

        // this.tooltip = new Tooltip('tooltip')
        this.pointer = null;
        this.marker = new Marker()


        // TODO передавать в Map контейнер в который уже через класс создавать и пушить html элемент (напр., тултип, маркер, контролс и пр.)
        // NOTE уже сделал с маркером, но ниже оставил, как пример, чтобы напомнить контекст мысли
        // this.marker = document.getElementById('marker')
        // this.selected = null;
        // this.pointer = null;
        // TODO нужен ли мне отдельно pointer? это же просто точка клика, а вот маркер, это маркер, вроде разные вещи, нужно определиться с их логикой
    }

    init() {
        this.#addEventListeners()
        this.render()
    }

    clear() {
        this.#removeEventListeners();
    }

    #addEventListeners() {
        this.boundMouseDown = this.#handleMouseDown.bind(this);
        this.boundMouseMove = this.#handleMouseMove.bind(this);
        this.boundMouseUp = this.#handleMouseUp.bind(this);
        this.boundWheel = this.#handleWheel.bind(this);
        this.boundContextMenu = (evt) => evt.preventDefault();
        this.canvas.addEventListener("mousedown", this.boundMouseDown);
        this.canvas.addEventListener("mousemove", this.boundMouseMove);
        this.canvas.addEventListener("mouseup", this.boundMouseUp);
        this.canvas.addEventListener("wheel", this.boundWheel);
        this.canvas.addEventListener("contextmenu", this.boundContextMenu);
    }

    #removeEventListeners() {
        this.canvas.removeEventListener("mousedown", this.boundMouseDown);
        this.canvas.removeEventListener("mousemove", this.boundMouseMove);
        this.canvas.removeEventListener("mouseup", this.boundMouseUp);
        this.canvas.removeEventListener("contextmenu", this.boundContextMenu);
    }

    // #handleContextMenu() {
    //     contextMenu
    // }

    #handleMouseDown(e) {
        const mouse = this.viewport.screenToWorld(e);
        console.log(mouse)
        if (e.button === 1) { // middle click
            this.viewport.startPan(mouse)
            this.viewport.stopInertia();
        }
        if (e.button === 2) { // right click
            // this.world.selected = null
            // const p = this.world.findByName('C1.1.202')
            // const c = findPolygonCenter(p.geometry)
            // console.log('FINDED',p, c)
            const obj = this.world.findByName('GYM')
            console.log('OBJ',obj)

            this.viewport.flyTo({x: -obj.geometry.centroid.x, y: -obj.geometry.centroid.y}, 0.4)
            // this.viewport.rotateCoff.isRotate = true
            // this.viewport.rotateCoff.start = e.offsetX
        }
        if (e.button === 0) { // left click
            if (!this.editor.enabled()) {
                // if (this.world.selected === null) {
                    this.world.selected = this.world.findByClick(mouse)
                // }
                this.emit('selectedChanged', this.world.selected);
                // console.log(this.world.selected)
                this.pointer = mouse;
                this.marker.update(this.viewport.worldToScreen(this.pointer))
                this.marker.show()
                // mouse.x, mouse.y

            }
            // this.tooltip.positionTooltip(e.clientX, e.clientY)
            // this.tooltip.showTooltip()
            // this.viewport.rotateCoff.isRotate = true
            // this.viewport.rotateCoff.start = e.offsetX
            // console.log('DIFFFF XX',e.offsetX)
        }

        this.render();
    }

    #handleMouseMove(e) {
        if (this.viewport.pan.isActive) {
            this.viewport.panning(this.viewport.screenToWorld(e))
            // console.log(coord)



            if (this.world.selected === null) {
                this.marker.hide() // так зачем тут это? если я не выбрал объект на карте то не показываем??
            }

            if (this.pointer) {
                this.marker.update(this.viewport.worldToScreen(this.pointer))
            } else {
                this.marker.hide()
            }

            // const coord = this.viewport.worldToScreen2(this.pointer)
            // this.marker.style.display = 'block'
            // this.marker.style.left =  `${coord.x - 25}px`
            // this.marker.style.top = `${coord.y - 50}px`
            // console.log('MARKER COORD', coord)
            // console.log('this.pointer', this.pointer)
            // console.log('viewport', this.viewport.pan.offset)
            // // !!!!!
            // this.pointer = null
            this.render()
        } else if (this.viewport.rotateCoff.isRotate) {
            this.viewport.rotateCoff.end = e.offsetX
            const diff = (this.viewport.rotateCoff.end - this.viewport.rotateCoff.start) * 0.002
            // console.log('DIFFFF',diff)
            this.viewport.rotate(-diff)
            this.render()
        }

        if (this.editor.enabled()) {
            this.render()
        }
    }

    #handleMouseUp(e) {
        if (this.viewport.pan.isActive) {
            this.viewport.stopPanning()
        }
        this.viewport.pan.isActive= false
        this.viewport.rotateCoff.isRotate = false
        // if (!this.editor.enabled()) {
        //     this.world.selected = null
        // }
        // console.log('viewport', this.viewport.pan.offset)
    }

    #handleWheel = (e) => {
        e.preventDefault()
        const wheelDelta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        this.viewport.zoom(wheelDelta)

        if (this.pointer) {
            this.marker.update(this.viewport.worldToScreen(this.pointer))
        } else {
            this.marker.hide()
        }
        // const coord = this.viewport.worldToScreen2(this.pointer)
        // this.marker.style.display = 'block'
        // this.marker.style.left =  `${coord.x - 25}px`
        // this.marker.style.top = `${coord.y - 50}px`
        this.render()
    }

    draw() {
        this.viewport.reset()

        const p = new Point(0, 0)
        p.draw(this.ctx, {color: 'green', size: 15})

        if (this.editor.enabled()) {
            this.editor.drawImage()
        }

        // я перенес selected в класс World, и уже отрисоваю его там, это я сделал чтобы логика отрисовки не переплеталась
        // с map, т.е если я захочу изменить логику отображения selected то короче будет некрасиво, low coupling high cohesion нарушается
        this.world.render(this.ctx, this.viewport, this.editor.enabled())

        if (this.editor.enabled()) {
            this.editor.draw()
            this.pointer = null;
        }

        if (this.pointer) this.pointer.draw(this.ctx, {color: 'blue'});

        this.ctx.restore();
    }

    render() {
        if (this.isAnimation) {
            this.startAnimation()
        } else {
            this.draw()
        }
    }

    startAnimation() {
        // Анимационный цикл
        if (this.animationFrameRequest) {
            return
        }
        this.animationFrameRequest = true;
        const animate = () => {
            if (!this.animationFrameRequest) return;
            console.log('animation')
            this.draw();

            requestAnimationFrame(animate);
        };
        animate();

        // TODO нужно не запускать метод анимации а просто изменить переменную которая и отвечает за анимацию,
        // тогда у меня не бдует такого что одна на другу накладывается, оно просто само будем проигрываться пока это нужно,
        // т.е пока я не изменю значение переменной чтобы отключить анимацию

        // Установка задержки и остановка анимации
        // setTimeout(() => {
        //     this.stopAnimation();
        // }, 3500); // 5000 миллисекунд = 5 секунд
    }

    stopAnimation() {
        if (this.animationFrameRequest) {
            cancelAnimationFrame(this.animationFrameRequest);
            this.animationFrameRequest = null;
        }
    }

}