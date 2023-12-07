import express, {Express, Request, Response} from "express"
import { type } from "os";
import bodyParser from 'body-parser'

const app: Express = express()
const port: number = 3000

class Vehicle {
    model: string;
    color: string;
    year: number;
    power: number;
    constructor(model: string, color: string, year: number, power: number){
        this.model= model;
        this.color= color;
        this.year= year;
        this.power= power;
      }
}

class Car extends Vehicle{
    bodyType: string;
    wheelCount: number;
    constructor(model: string, color: string, year: number, power: number, bodyType: string, wheelCount: number){
        super(model, color, year, power);
        this.bodyType= bodyType;
        this.wheelCount= wheelCount;
      }
}

class Plane extends Vehicle{
    wingspan: number;
    constructor(model: string, color: string, year: number, power: number, wingspan: number){
        super(model, color, year, power);
        this.wingspan= wingspan;
      }
}

class Boat extends Vehicle{
    draft: number;
    constructor(model: string, color: string, year: number, power: number, draft: number){
        super(model, color, year, power);
        this.draft= draft;
      }
}
const saved: Array<Vehicle> = [];
app.use(bodyParser.json()) ;
app.use(bodyParser.urlencoded({ extended: true })) ;

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello World")
})

app.post("/vehicle/add", (req: Request, res: Response) => {
    const {model, color, year, power, draft, wingspan, bodyType, wheelCount} = req.body
    let newVeh: Vehicle;
    if (wingspan) {
        newVeh = new Plane(model, color, year, power, wingspan);
    } else if (draft) {
        newVeh = new Boat(model, color, year, power, draft);
    } else if (bodyType) {
        newVeh = new Car(model, color, year, power, bodyType, wheelCount);
    } else {
        newVeh = new Vehicle(model, color, year, power);
    }
    saved.push(newVeh);
    console.log(saved);
    res.status(201).send("Vehicle added")
})

app.get("/vehicle/search/:model", (req: Request, res: Response) => {
    for (let i= 0; i < saved.length; i++) {
        let result: Array<Vehicle> = [];
        if (saved[i].model === req.params.model) {
            result.push(saved[i]);
            //  = {
            //     model: saved[i].model,
            //     color: saved[i].color,
            //     year: saved[i].year,
            //     power: saved[i].power
            // }
            console.log(result)
            
        }
        res.send(JSON.stringify(result));
    }
    res.status(404)
})

app.listen(port, () => {
    console.log("Server listen!")
})

