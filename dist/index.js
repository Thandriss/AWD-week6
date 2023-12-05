"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
class Vehicle {
    constructor(model, color, year, power) {
        this.model = model;
        this.color = color;
        this.year = year;
        this.power = power;
    }
}
class Car extends Vehicle {
    constructor(model, color, year, power, bodyType, wheelCount) {
        super(model, color, year, power);
        this.bodyType = bodyType;
        this.wheelCount = wheelCount;
    }
}
class Plane extends Vehicle {
    constructor(model, color, year, power, wingspan) {
        super(model, color, year, power);
        this.wingspan = wingspan;
    }
}
class Boat extends Vehicle {
    constructor(model, color, year, power, draft) {
        super(model, color, year, power);
        this.draft = draft;
    }
}
const saved = [];
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get("/hello", (req, res) => {
    res.send("Hello World");
});
app.post("/vehicle/add", (req, res) => {
    const { model, color, year, power, draft, wingspan, bodyType, wheelCount } = req.body;
    let newVeh;
    if (wingspan) {
        newVeh = new Plane(model, color, year, power, wingspan);
    }
    else if (draft) {
        newVeh = new Boat(model, color, year, power, draft);
    }
    else if (bodyType) {
        newVeh = new Car(model, color, year, power, bodyType, wheelCount);
    }
    else {
        newVeh = new Vehicle(model, color, year, power);
    }
    saved.push(newVeh);
    console.log(saved);
    res.status(201).send("Vehicle added");
});
app.get("/vehicle/search/:model", (req, res) => {
    for (let i = 0; i < saved.length; i++) {
        if (saved[i].model === req.params.model) {
            res.send(JSON.stringify(saved[i]));
        }
    }
    res.status(404);
});
app.listen(port, () => {
    console.log("Server listen!");
});
