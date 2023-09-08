'use strict';

var app = require('../app');

// const bcrypt = require('bcrypt');

const Travel = require('../models/Travels');
const Location = require('../models/locations');
const User = require('../models/users');
const Favorite = require('../models/favorites');    

const connection = require('../lib/connectMongoose');


main().catch(err => console.log('***There was an error***',err));



async function main() {

    const [newUserId, newBuyerId] = await initUsers();
    
    await initLocations();

    const newTravelId = await initTravels(newUserId);

    await initFavorites(newBuyerId, newTravelId);

    connection.close();
}

async function initUsers() {

    // Deleting previous users
    const deleted = await User.deleteMany();
    console.log(`***Deleted ${deleted.deletedCount} users.***`);

    // New users creation
    const inserted = await User.insertMany ([
        {
            user:'Usuario Demo',
            email:'demo@gmail.com',
            password: await User.hashPassword('1234'),
        },
        {
            user:'Usuario Comprador',
            email:'buyer@gmail.com',
            password: await User.hashPassword('1234'),
        },

    ]);

    console.log(`***Created ${inserted.length} users.***`)

    // I retrieve _id value from inserted users
    const newUserId = inserted[0]._id;
    const newBuyerId = inserted[1]._id;
    return [newUserId, newBuyerId];
}

async function initLocations() {

    // Deleting previous locations
    const deleted = await Location.deleteMany();
    console.log(`***Deleted ${deleted.deletedCount} locations.***`);

    // New locations creation
    const inserted = await Location.insertMany ([
        {name:'Earth'},
        {name:'Moon'},
        {name:'Saturn'},
        {name:'Mercury'},
        {name:'Venus'},
        {name:'Mars'},
    ]);
    console.log(`***Created ${inserted.length} locations.***`)
}

async function initTravels(newUserId) {

    // Deleting previous travels
    const deleted = await Travel.deleteMany();
    console.log(`***Deleted ${deleted.deletedCount} travels.***`);

    // New travels creation
    const inserted = await Travel.insertMany ([
        {
            topic:'Travel to the Moon',
            active: true,
            userId: newUserId,
            remarks:'Beautiful travel to the Moon',
            photo: null,
            price: 500,
            userName: 'Usuario Demo',
            forsale: true,
            origin: 'Earth',
            destination: 'Moon',
            userBuyer: null,
            datetimeCreation: new Date()
        },
        {
            topic:'Travel to Saturn',
            active: true,
            userId: newUserId,
            remarks:'Beautiful travel to Saturn',
            photo: null,
            price: 2500,
            userName: 'Usuario Demo',
            forsale: true,
            origin: 'Earth',
            destination: 'Saturn',
            userBuyer: null,
            datetimeCreation: new Date()
        },
        {
            topic:'Coming back from Mars',
            active: true,
            userId: newUserId,
            remarks:'I need to come back from Mars to the Earth',
            photo: null,
            price: 1500,
            userName: 'Usuario Demo',
            forsale: false,
            origin: 'Mars',
            destination: 'Earth',
            userBuyer: null,
            datetimeCreation: new Date()
        },

    ]);
    console.log(`***Created ${inserted.length} travels.***`)
    // I retrieve _id value from inserted travels
    const newTravelId = inserted[0]._id;
    return newTravelId;
}

async function initFavorites(newBuyerId, newTravelId) {

    // Deleting previous favorites
    const deleted = await Favorite.deleteMany();
    console.log(`***Deleted ${deleted.deletedCount} favorites.***`);

    // New travels favirites
    const inserted = await Favorite.insertMany ([
        {
            userId: newBuyerId,
            travelId: newTravelId,
        },
    
    ]);
    console.log(`***Created ${inserted.length} favorites.***`)
}

