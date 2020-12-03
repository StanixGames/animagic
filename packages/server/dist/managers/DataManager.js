"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationManager = void 0;
const Manager_1 = require("./Manager");
const WorldLocation_1 = require("../locations/WorldLocation");
class LocationManager extends Manager_1.Manager {
    constructor() {
        super();
        this.locations = new Map();
    }
    init() {
        console.log('preparing locations...');
        const worldLocation = new WorldLocation_1.WorldLocation();
        this.locations.set(worldLocation.id, worldLocation);
        return Promise.resolve();
    }
    destroy() {
        return Promise.resolve();
    }
    update(delta) {
        // this.locations.forEach((location) => {
        //   console.log(location.state.entities)
        //   // console.log((location as WorldLocation).update(delta));
        //   // location.state.update(delta);
        // })
    }
}
exports.LocationManager = LocationManager;
//# sourceMappingURL=DataManager.js.map