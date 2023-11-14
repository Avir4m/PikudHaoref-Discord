import { Client, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import { getActiveAlert } from 'pikud-haoref-api';


config();

const client = new Client({ intents: [GatewayIntentBits.Guilds]});
const TOKEN = process.env.TOKEN;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

var poll = function () {
    var options = {
    };

    getActiveAlert(function (err, alert) {
        setTimeout(poll, 5000);
        if (err) {
            return console.log('Retrieving active alert failed: ', err);
        }
        console.log(alert);
    }, options);
}
client.login(TOKEN);

poll();