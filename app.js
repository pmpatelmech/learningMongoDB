// show dbs
// use fruitsDB
// show collections
// db.fruits.find()
// db.people.find()

const mongoose = require("mongoose")
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });

// *************************fruits collection************************//

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    rating: {
        type: Number,
        min: 0,
        max: 10
    },
    review: String
})
const Fruit = mongoose.model("Fruit", fruitSchema)
const apple = new Fruit({
    name: "Apple",
    rating: 5,
    review: "Good"
})
// apple.save()

const kiwi = new Fruit({
    name: "Kiwi",
    rating: 6,
    review: "soso"
})
const banana = new Fruit({
    name: "Banana",
    rating: 7,
    review: "Nice"
})
// Fruit.insertMany([kiwi, banana], (err) => {
//     if (err) {
//         console.log(err)
//     } else { console.log("Successfully inserted kiwi & banana to fruits collection"); }
// })

Fruit.find({}, (err, result) => {
    if (err) { console.log(err); }
    else {
        result.forEach(element => {
            console.log(element);
        });
        mongoose.connection.close()
    }
})

Fruit.updateMany({ name: "Apple" }, { name: "Mango" }, (err) => { if (err) { console.log(err) } else { console.log("Successfully changed name of Apple to Mango"); } })

// Fruit.deleteMany({ name: "Apple" }, (err) => { if (err) { console.log(err) } else { console.log("Successfully deleted all Bananas") } })

// ******************************people collection******************************//

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
})
const Person = mongoose.model("Person", personSchema)
const pritesh = new Person({
    name: "Pritesh",
    age: 30,
    favoriteFruit: kiwi
})
pritesh.save()

// Person.deleteMany({ name: "Pritesh" }, (err) => { if (err) { console.log(err); } else { console.log("Deleted all Pritesh"); } })

