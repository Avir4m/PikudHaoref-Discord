import { Client, EmbedBuilder, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import { getActiveAlert } from 'pikud-haoref-api';


config();

const client = new Client({ intents: [GatewayIntentBits.Guilds]});
const TOKEN = process.env.TOKEN;
const interval = 5000;

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    poll();
});

const poll = () => {
    const options = {};
    getActiveAlert((err, alert) => {
        if (err) {
            console.error('Retrieving active alert failed: ', err);
        } else {
            const alertChannel = client.channels.cache.get('1173985945687687270');
            if (alertChannel) {
                if (alert.type != 'none') {
                    const embed = new EmbedBuilder()
                    .setTitle(`התראות בזמן אמת`)
                    .setColor(`#a60b00`)
                    .setFields(
                        {name: `סוג התראה`, value: `${alert.type}`},
                        {name: `ערים`, value: `${alert.cities}`},
                        {name: `הוראות פיקוד העורף`, value: `${alert.instructions}`},
                        );
                    alertChannel.send({embeds : [embed]});
                }
            }
        }
        
        setTimeout(poll, interval);
    }, options);
};

client.login(TOKEN);