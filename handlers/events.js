const { Events } = require('../validation/eventNames');
const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');

module.exports = async (client) => {
  const Table = new Ascii('Events Loaded');

  (await PG(`${process.cwd()}/events/*/*.js`)).map(async (file) => {
    const event = require(file);

    if (!Events.includes(event.name) || !event.name) {
      const L = file.split('/');
      await Table.addRow(`${event.name || 'MISSING'}`, `⛔ Event name is either invalid or missing: ${L[8] + '/' + L[9]}`);
      return;
    }

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    }
    else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }

    await Table.addRow(event.name, '✅ Succesful');
  });
  console.log(Table.toString());
};