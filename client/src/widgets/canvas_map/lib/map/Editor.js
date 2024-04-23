import {Point, Polygon} from "../geometry";
import {findPolygonCenter, getNearestPoint} from "../utils";
import {Text} from "../geometry";
import img from '../img/1img.png'
import {Layer} from "../layer";
import {findClosestPointOnPolygon} from "../utils";
import {Item} from "../topology";
import {calculateDistanceAndNearestPoint} from "../utils/utils";

export class Editor {

    constructor(canvas, world, viewport) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.world = world
        this.viewport = viewport

        this.isEnabled = false

        this.image = new Image();
        this.image.src = img;

        this.pinLayer = this.world.layers.floors[0];
        this.currentLayer = null;

        this.isPin = true;

        this.hovered = false;
        this.selected = null;
        this.dragging = null;

        this.newObj = null;
    }

    enable(mode = 'draw') {
        this.#addEventListeners()
        this.isEnabled = true
        this.mode = mode
        // this.newObj = new Layer({
        //     name: 'без названия',
        //     description: 'без описания',
        //     type: 'building',
        //     locationId: 'smth',
        //     geometry: {
        //         points: []
        //     }
        // })
        if (mode === 'draw') {
            this.newObj = new Item({
                name: 'новый объект',
                description: 'новый объект без описания',
                locationId: 'smth',
                geometry: {
                    points: []
                }
            })
        } else {
            this.selected = null
        }
    }

    disable() {
        if (this.mode === 'draw') {
            if (this.newObj.geometry.points.length > 3) {
                this.newObj.geometry.centroid = findPolygonCenter(this.newObj.geometry.points)
                this.world.layers.floors[0].items.push(this.newObj);
                console.log(this.newObj)
                this.world.save()
            }
        }
        if (this.mode === 'edit') {
            if (this.world.selected) {
                this.world.selected.geometry.centroid = findPolygonCenter(this.world.selected.geometry.points)
                this.world.save()
            }
        }
        this.newObj = null
        this.selected = null
        this.isEnabled = false
        this.mode = null
        // this.world.selected = null;
        this.#removeEventListeners()
    }

    enabled() {
        return this.isEnabled;
    }

    drawImage() {
        // this.viewport.reset()
        const x = this.image.width/2;
        const y = this.image.height/2;
        this.ctx.drawImage(this.image, -x, -y);
    }

    draw() {
        // почему тут нужно запускать viewport reset если map это делает, в чем прикол

        // image.onload = () => {
        //     this.drawTopology(image)
        // };
        // console.log(this.hovered)

        if (this.world.selected && this.mode === 'edit') {
            // this.viewport.reset()
            // console.log(this.world.selected.geometry.points)
            // this.world.selected.geometry.points[0] = {x: -241,y: -238}
            // this.world.selected.geometry.points[0] = [-241, -238]
            // const p = new Polygon(this.world.selected.geometry.points)
            // p.draw(this.ctx, this.viewport, {isVertexDraw: true, isFill: true, strokeStyle: 'blue'})

            if (this.hovered) {
                // console.log('HOVERED')
                const point = new Point(this.hovered[0], this.hovered[1])
                point.draw(this.ctx, { fill: true, outline: true })
            }
        }
        if (this.mode === 'draw') {
            if (this.hovered) {
                // console.log(this.hovered)
                const point = new Point(this.hovered.x, this.hovered.y)
                point.draw(this.ctx, { fill: true })
            }
            if (this.newObj !== null) {
                const p = new Polygon(this.newObj.geometry.points)
                p.draw(this.ctx, this.viewport, {isVertexDraw:true})
            }
        }
    }

    #addEventListeners() {
        this.boundMouseDown = this.#handleMouseDown.bind(this);
        this.boundMouseMove = this.#handleMouseMove.bind(this);
        this.boundMouseUp = this.#handleMouseUp.bind(this);
        this.canvas.addEventListener("mousedown", this.boundMouseDown);
        this.canvas.addEventListener("mousemove", this.boundMouseMove);
        this.canvas.addEventListener("mouseup", this.boundMouseUp);
        // this.canvas.addEventListener("contextmenu", this.boundContextMenu);
    }

    #removeEventListeners() {
        this.canvas.removeEventListener("mousedown", this.boundMouseDown);
        this.canvas.removeEventListener("mousemove", this.boundMouseMove);
        this.canvas.removeEventListener("mouseup", this.boundMouseUp);
        // this.canvas.removeEventListener("contextmenu", this.boundContextMenu);
    }


    #handleMouseDown(e) {
        if (e.button === 1) {

        }
        if (e.button === 2) {
            if (this.selected) {
                this.selected = null;
            } else if (this.hovered) {
                // this.#removePoint(this.hovered)
            }
        }
        if (e.button === 0) {
            if (this.mode === 'draw') {
                if (this.hovered) {
                    // console.log('NEW OBJ this.hovered', this.hovered)
                    this.newObj.geometry.points.push([this.hovered.x, this.hovered.y])
                } else {
                    console.log(this.mouse.x, this.mouse.y)
                    this.newObj.geometry.points.push([Number(this.mouse.x), Number(this.mouse.y)])

                }
                // console.log('NEW OBJ', this.newObj.geometry.points)
            }
            if (this.mode === 'edit') {

                if (this.world.selected === null) {
                    this.world.selected = this.world.findByClick(this.mouse)
                }
                if (this.hovered) {
                    this.#select(this.hovered)
                }
                console.log(this.world.selected)
                // this.dragging = true;
                // return
            }
            // this.#select(this.mouse)
            // this.hovered = this.mouse; // small thing
        }

        this.draw()
    }

    #select(point) {
        if (this.world.selected) {
            const p = this.findPointIndex(point, this.world.selected.geometry.points)

            this.dragging = p
            console.log('DRAGGING', this.dragging)
        }
    }

    findPointIndex(point, points) {
        for (let i = 0; i < points.length; i++) {
            // console.log(points[0])
            // почему так нулевой элемент массива не сравнивался хотя они равны
            console.log(point, points[i], Number(points[0][0]) === Number(point[0]) && Number(points[0][1]) === Number(point[1]))
            // if (points[i] === point) {
            if ( Number(points[i][0]) === Number(point[0]) && Number(points[i][1]) === Number(point[1]) ) {
            // if (points[0][0] === point[0] && points[0][1] === point[1]) {
                console.log('SSSSSS')
                return i;
            }
        }
        return null;
    }

    #handleMouseMove(e) {
        this.mouse = this.viewport.getMouse(e)

        if (this.mode === 'draw') {
            // this.hovered = findClosestPointOnPolygon(this.mouse, this.pinLayer.geometry.points)
            this.hovered = this.findNearestPointOnNearEdge(this.mouse)
            // this.hovered = this.mouse
            // console.log(this.hovered)
            // this.newObj.geometry.points.push([this.mouse.x, this.mouse.y])
            // console.log(this.hovered)
        } else {

            if (this.world.selected && this.dragging === null) {
                const nearP = getNearestPoint(this.mouse, this.world.selected.geometry.points, 10 * this.viewport.state.zoom)
                this.hovered = nearP ? [Number(nearP[0]), Number(nearP[1])] : null
                // console.log(this.hovered)
            }

            if (this.world.selected && this.dragging !== null) {
                // const mouse = this.viewport.getMouse(e)
                // console.log('HTTTTTT',this.dragging)
                // console.log(this.world.selected.geometry.points[0)

                // this.world.selected.geometry.points[this.dragging] = [Number(this.mouse.x), Number(this.mouse.y)]
                const pointOnNearestLine = this.findNearestPointOnNearEdge(this.mouse)
                this.world.selected.geometry.points[this.dragging] = pointOnNearestLine ? [Number(pointOnNearestLine.x), Number(pointOnNearestLine.y)] : [Number(this.mouse.x), Number(this.mouse.y)]

                // console.log(this.world.selected.geometry.points)
            }
        }
        // if (this.dragging) {
        //     // this.selected.x = this.mouse.x;
        //     // this.selected.y = this.mouse.y;
        //
        // } else if (this.selected) {
        //
        // }

    }

    findNearestPointOnNearEdge(mouse) {
        let nearestPoint = null;
        let nearestEdge = null;
        let nearestDistance = 10;

        const polygons = [
            ...this.world.layers.floors[0]?.items,
            this.world.layers.floors[0]
        ]


        for (const polygon of polygons) {
            const points = polygon.geometry.points; // Find the nearest edge
            for (let i = 0; i < points.length; i++) {
                const nextIndex = (i + 1) % points.length;
                const edgeStart = {x: Number(points[i][0]), y: Number(points[i][1])};
                const edgeEnd = {x: Number(points[nextIndex][0]), y: Number(points[nextIndex][1])};
                const distance = calculateDistanceAndNearestPoint(mouse, edgeStart, edgeEnd).distance;

                if (distance < nearestDistance) {
                    nearestDistance = distance;
                    nearestEdge = { start: edgeStart, end: edgeEnd };
                }
            }
        }

        if (nearestEdge) {
            nearestPoint = calculateDistanceAndNearestPoint(mouse, nearestEdge.start, nearestEdge.end).nearestPoint;
        }
        // console.log(nearestPoint)
        return nearestPoint;
    }



    #handleMouseUp(e) {
        if (this.isEnabled) {
        }
        this.dragging = null
        this.hovered = null
    }


}