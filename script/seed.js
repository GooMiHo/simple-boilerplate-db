'use strict';

const db = require('../server/db/');
const { Temp } = require('../server/db/models/');

async function seed() {
  await db.sync({force: true});
  console.log('db synced!');

  //temp ==================================

  await Temp.create({
    firstName: 'Lucy',
    lastName: 'Pevensie'
  });

  await Temp.create({
    firstName: 'Frodo',
    lastName: 'Baggins'
  });

  console.log(`seeded successfully`);
}

async function runSeed() {
  console.log('seeding in progress...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing connection to db');
    await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}
