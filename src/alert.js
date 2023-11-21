import { EmbedBuilder } from 'discord.js';
import { getActiveAlert } from 'pikud-haoref-api';

const translations = {
  missiles: 'טילים',
  radiologicalEvent: 'אירוע רדיולוגי',
  earthquake: 'רעידת אדמה',
  tsunami: 'צונאמי',
  hostileAircraftIntrusion: 'פריצה של מטוסי אויב',
  hazardousMaterials: 'חומרים מסוכנים',
  terroristInfiltration: 'התקפה טרוריסטית',
  missilesDrill: 'תרגול טילים',
  earthquakeDrill: 'תרגול רעידת אדמה',
  radiologicalEventDrill: 'תרגול אירוע רדיולוגי',
  tsunamiDrill: 'תרגול צונאמי',
  hostileAircraftIntrusionDrill: 'תרגול פריצה של מטוסי אויב',
  hazardousMaterialsDrill: 'תרגול חומרים מסוכנים',
  terroristInfiltrationDrill: 'תרגול התקפה טרוריסטית',
  unknown: 'לא ידוע',
};



const getAlerts = (client) => {
    const options = {};
    getActiveAlert((err, alert) => {
        if (err) {
            console.error('Retrieving active alert failed: ', err);
        } else {
            const alertChannel = client.channels.cache.get('1173985945687687270');
            if (alertChannel) {
                if (alert.type != 'none') {
                    console.log(alert);
                    const embed = new EmbedBuilder()
                    .setTitle(`התראות בזמן אמת`)
                    .setColor(`#a60b00`)
                    .setFields(
                        {name: `סוג התראה`, value: `${translations[alert.type]}`},
                        {name: `ערים`, value: `${alert.cities}`},
                        {name: `הוראות פיקוד העורף`, value: `${alert.instructions}`},
                    );
                    alertChannel.send({embeds: [embed]});
                }
            }
        }
        
        setTimeout(() => getAlerts(client), 5000);
    }, options);
  };
  
  export { getAlerts };

