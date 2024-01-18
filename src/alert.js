import { EmbedBuilder } from 'discord.js';
import mongoose from 'mongoose';
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

const guildSettingsSchema = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true },
    alertChannelId: { type: String, default: null },
});

const GuildSettings = mongoose.model('GuildSettings', guildSettingsSchema);

const getAlerts = async (client) => {
    const options = {};
    try {
        const allGuilds = await GuildSettings.find();

        for (const guildSetting of allGuilds) {
            const alertChannel = client.channels.cache.get(guildSetting.alertChannelId);
            if (alertChannel !== undefined) {
                getActiveAlert(async (err, alert) => {
                    if (err) {
                        console.error('Retrieving active alert failed: ', err);
                    } else {
                        if (alertChannel && alert.type !== 'none') {
                            const embed = new EmbedBuilder()
                                .setTitle(`התראות בזמן אמת`)
                                .setColor(`#a60b00`)
                                .setFields(
                                    { name: `סוג התראה`, value: `${translations[alert.type]}` },
                                    { name: `ערים`, value: `${alert.cities}` },
                                    { name: `הוראות פיקוד העורף`, value: `${alert.instructions}` },
                                );
                            try {
                                alertChannel.send({ embeds: [embed] });
                            } catch (sendError) {
                                console.error('Error sending alert message:', sendError);
                            }
                        }
                    }
                }, options);
            }
        }

        setTimeout(() => getAlerts(client), 5000);
    } catch (error) {
        console.error('Error fetching guild settings:', error);
    }
};

const setAlertChannel = async (guildId, channelId) => {
    try {
        await GuildSettings.findOneAndUpdate(
            { guildId: guildId },
            { alertChannelId: channelId },
            { new: true, upsert: true }
        );
    } catch (err) {
        console.error('Error setting alert channel:', err);
    }
};

const setAlertChannelCommand = async (interaction) => {
    const guildId = interaction.guildId;
    const channelId = interaction.channelId;
    const client = interaction.guild.members.me;

    const channelPermissions = interaction.guild.channels.cache.get(channelId).permissionsFor(client.user.id);

    try {
        if(!channelPermissions.has('SendMessages')) {
            interaction.reply({ content: `Failed to set the alert channel. No permissions`, ephemeral: true });
        } else {
            await setAlertChannel(guildId, channelId);
            interaction.reply({ content: `Alert channel set to <#${channelId}>.`, ephemeral: true });
        }
    } catch (error) {
        console.error('Error setting alert channel:', error);
        interaction.reply({ content: 'Failed to set the alert channel. Please try again.', ephemeral: true });
    }
};

export { getAlerts, setAlertChannel, setAlertChannelCommand };

