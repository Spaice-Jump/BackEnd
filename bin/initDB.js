'use strict';

var app = require('../app');

const Travel = require('../models/Travels');
const Location = require('../models/locations');
const connection = require('../lib/connectMongoose');


main().catch(err => console.log('***There was an error***',err));



async function main() {

    await initLocations();

    await initTravels();

    connection.close();
}

async function initTravels() {

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
            userId: null
        },

    ]);
    console.log(`***Created ${inserted.length} travels.***`)
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

