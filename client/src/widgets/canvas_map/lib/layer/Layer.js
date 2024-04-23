import {Polygon} from "../geometry";

export class Layer {

    // this.isVisible = true;
    // this.type = '' // building, floor, area
    // this.name = ''
    // this.description = ''
    //
    // this.ids = {
    //     locationId: null,
    //     buildingId: null,
    //     floorId: null,
    // }
    //
    // this.geometry = {
    //     centroid: 0,
    //     points: []
    // }
    constructor({name, description, type, locationId, geometry}) {

        this.isVisible = true;
        this.type = type
        this.name = name
        this.description = description

        this.ids = {
            locationId: locationId,
            buildingId: null,
            floorId: null,
        }

        this.geometry = geometry

        this.items = [];
    }


    create({name, description, type, locationId, geometry}) {
        this.type = type;
        this.name = name;
        this.description = description;
        this.geometry = geometry

        this.ids = {
            locationId
        }

        return this;
    }

    draw(ctx, viewport) {
        new Polygon(this.geometry.points).draw(ctx, viewport, {
            // isFill:true
            strokeStyle: 'red'
        })
    }



}
