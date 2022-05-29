const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelper')
const Campground = require('../models/Campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 500) + 1000;
        const camp = await new Campground({
            author: "629314b0b0360dcfde9d2b21",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla pariatur, quasi architecto odio adipisci a doloremque quibusdam voluptates ea consectetur assumenda reprehenderit quis maxime suscipit excepturi molestias dolore nemo velit?',
            price: price
        })
        await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
})