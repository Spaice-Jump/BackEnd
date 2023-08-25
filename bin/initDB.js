'use strict';

var app = require('../app');

// const bcrypt = require('bcrypt');

const Travel = require('../models/Travels');
const Location = require('../models/locations');
const User = require('../models/users');

const connection = require('../lib/connectMongoose');


main().catch(err => console.log('***There was an error***',err));



async function main() {

    const newUserId = await initUser();

    await initLocations();

    await initTravels(newUserId);

    connection.close();
}

async function initUser() {

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

    ]);

    console.log(`***Created ${inserted.length} users.***`)

    // I retrieve _id value from inserted user
    const newUserId = inserted[0]._id;
    return newUserId;
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
            remarks:'Beautiful travel to the Moon',
            photo: null,
            price: 500,
            forsale: true,
            origin: 'Earth',
            destination: 'Moon',
            userId: newUserId
        },
        {
            topic:'Travel to Saturn',
            remarks:'Beautiful travel to Saturn',
            photo: null,
            price: 2500,
            forsale: true,
            origin: 'Earth',
            destination: 'Saturn',
            userId: newUserId
        },
        {
            topic:'Coming back from Mars',
            remarks:'I need to come back from Mars to the Earth',
            photo: null,
            price: 1500,
            forsale: false,
            origin: 'Mars',
            destination: 'Earth',
            userId: newUserId
        },

    ]);
    console.log(`***Created ${inserted.length} travels.***`)
}
