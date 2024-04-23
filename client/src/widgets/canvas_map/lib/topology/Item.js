import {Point, Polygon, Text} from "../geometry";

export class Item {

    constructor({name, description, locationId, geometry, category = null}) {

        this.locationId = locationId
        this.areasId = [];
        this.segmentsId = [];

        this.id = null
        this.name = name
        this.description = description
        this.category = category;
        this.isBookable = false;

        this.properties = {
            seats: 0,
            projector: 0,
            computers: 0,
        }

        this.enterances = []

        this.geometry = geometry

        this.schedule = {

        }

        this.info = {
            text: ''
        }

        this.photos = []
        this.reviews = []

    }

    update(data) {
        this.name = data.name;
        this.description = data.description;
        this.category = data.category;
    }

    draw(ctx, viewport) {
        const style = {
            'default': '#b1e2f5',
            'food': '#ffa145'
        }

        new Polygon(this.geometry.points).draw(ctx, viewport, {
            isFill:true,
            strokeStyle: 'red',
            fillStyle: style[this.category ? this.category : 'default']
        })
        // const p = new Point(this.geometry.centroid.x, this.geometry.centroid.y)
        // p.draw(ctx, viewport)
    }



}