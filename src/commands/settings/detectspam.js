/**
 * Detect Spam settings (interaction-based)
 * 
 * Developed by: Nem Tudo
 * - Discord: @ nemtudo
 * - https://nemtudo.me/
 * - https://github.com/Nem-Tudo
 */

const GouCommand = require('../../structures/GouCommand');
const Discord = require("discord.js");

// ─── Helpers ────────────────────────────────────────────────────────────────

function buildEmbed(settings) {
    const enabled = settings.spamCatcher.enabled;

    const punishmentLabel = {
        KICK: "👢 KICK",
        BAN: "🔨 BAN",
        SOFTBAN: "🧹 SOFTBAN"
    }[settings.spamCatcher.punishment] ?? "👢 KICK";

    return new Discord.EmbedBuilder()
        .setTitle("🛡️ Settings — Detect Spam")
        .setColor(enabled ? 0x57F287 : 0xED4245)
        .addFields(
            {
                name: "Status",
                value: enabled ? "✅ **Enabled**" : "❌ **Disabled**",
                inline: true
            },
            {
                name: "Monitored channel",
                value: settings.spamCatcher.channel
                    ? `<#${settings.spamCatcher.channel}>`
                    : "`Not set`",
                inline: true
            },
            {
                name: "Punishment",
                value: `\`${punishmentLabel}\``,
                inline: true
            },
            {
                name: "Logs channel",
                value: settings.spamCatcher.logsChannel
                    ? `<#${settings.spamCatcher.logsChannel}>`
                    : "`Not set`",
                inline: true
            }
        )
        .setFooter({ text: "Changes are saved automatically." })
        .setTimestamp();
}

function buildComponents(settings) {
    const enabled = settings.spamCatcher.enabled;
    const punishment = settings.spamCatcher.punishment || "KICK";

    // Row 1: Toggle enable
    const row1 = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
            .setCustomId("detectspam:toggle")
            .setLabel(enabled ? "Disable" : "Enable")
            .setStyle(enabled ? Discord.ButtonStyle.Danger : Discord.ButtonStyle.Success)
            .setEmoji(enabled ? "🔴" : "🟢")
    );

    // Row 2: Punishment selector (3 buttons)
    const row2 = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
            .setCustomId("detectspam:punishment:KICK")
            .setLabel("Punishment: KICK")
            .setStyle(punishment === "KICK" ? Discord.ButtonStyle.Primary : Discord.ButtonStyle.Secondary)
            .setEmoji("👢"),

        new Discord.ButtonBuilder()
            .setCustomId("detectspam:punishment:BAN")
            .setLabel("Punishment: BAN")
            .setStyle(punishment === "BAN" ? Discord.ButtonStyle.Primary : Discord.ButtonStyle.Secondary)
            .setEmoji("🔨"),

        new Discord.ButtonBuilder()
            .setCustomId("detectspam:punishment:SOFTBAN")
            .setLabel("Punishment: SOFTBAN")
            .setStyle(punishment === "SOFTBAN" ? Discord.ButtonStyle.Primary : Discord.ButtonStyle.Secondary)
            .setEmoji("🧹")
    );

    // Row 3: Channel select (monitored channel)
    const row3 = new Discord.ActionRowBuilder().addComponents(
        new Discord.ChannelSelectMenuBuilder()
            .setCustomId("detectspam:channel")
            .setPlaceholder("📡 Select monitored channel")
            .setChannelTypes(Discord.ChannelType.GuildText)
            .setMinValues(1)
            .setMaxValues(1)
    );

    // Row 4: Logs channel select
    const row4 = new Discord.ActionRowBuilder().addComponents(
        new Discord.ChannelSelectMenuBuilder()
            .setCustomId("detectspam:logs")
            .setPlaceholder("📋 Select logs channel")
            .setChannelTypes(Discord.ChannelType.GuildText)
            .setMinValues(1)
            .setMaxValues(1)
    );

    return [row1, row2, row3, row4];
}

// ─── Command ────────────────────────────────────────────────────────────────

module.exports = class GouCommandDetectSpam extends GouCommand {
    constructor(client) {
        super(client);

        this.name = "detectspam";
        this.aliases = [];
        this.adminsOnly = false;
        this.guildOnly = true;
    }

    async run(message, args) {
        const guilddb = await this.client.settings.database.guild(message.guild.id);

        const embed = buildEmbed(guilddb.settings);
        const components = buildComponents(guilddb.settings);

        const reply = await message.channel.send({
            embeds: [embed],
            components
        });

        // ─── Collector ──────────────────────────────────────────────────────
        const collector = reply.createMessageComponentCollector({
            filter: (interaction) => interaction.user.id === message.author.id,
            time: 5 * 60 * 1000 // 5 minutes
        });

        collector.on("collect", async (interaction) => {
            const db = await this.client.settings.database.guild(message.guild.id);

            try {
                if (interaction.customId === "detectspam:toggle") {
                    db.settings.spamCatcher.enabled = !db.settings.spamCatcher.enabled;
                    await db.save();

                } else if (interaction.customId.startsWith("detectspam:punishment:")) {
                    const punishment = interaction.customId.split(":")[2]; // "BAN", "KICK" or "SOFTBAN"
                    db.settings.spamCatcher.punishment = punishment;
                    await db.save();

                } else if (interaction.customId === "detectspam:channel") {
                    db.settings.spamCatcher.channel = interaction.values[0];
                    await db.save();

                } else if (interaction.customId === "detectspam:logs") {
                    db.settings.spamCatcher.logsChannel = interaction.values[0];
                    await db.save();
                }

                await interaction.update({
                    embeds: [buildEmbed(db.settings)],
                    components: buildComponents(db.settings)
                });

            } catch (err) {
                console.error("[detectspam] Error saving settings:", err);
                await interaction.reply({
                    content: "❌ An error occurred while saving the settings.",
                    ephemeral: true
                }).catch(() => { });
            }
        });

        collector.on("end", async () => {
            const disabledRow1 = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("detectspam:toggle:disabled")
                    .setLabel("Enable/Disable")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setEmoji("🔴")
                    .setDisabled(true)
            );

            const disabledRow2 = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("detectspam:punishment:KICK:disabled")
                    .setLabel("Punishment: KICK")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setEmoji("👢")
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId("detectspam:punishment:BAN:disabled")
                    .setLabel("Punishment: BAN")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setEmoji("🔨")
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId("detectspam:punishment:SOFTBAN:disabled")
                    .setLabel("Punishment: SOFTBAN")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setEmoji("🧹")
                    .setDisabled(true)
            );

            const disabledRow3 = new Discord.ActionRowBuilder().addComponents(
                new Discord.ChannelSelectMenuBuilder()
                    .setCustomId("detectspam:channel:disabled")
                    .setPlaceholder("📡 Monitored channel (expired)")
                    .setChannelTypes(Discord.ChannelType.GuildText)
                    .setDisabled(true)
            );

            const disabledRow4 = new Discord.ActionRowBuilder().addComponents(
                new Discord.ChannelSelectMenuBuilder()
                    .setCustomId("detectspam:logs:disabled")
                    .setPlaceholder("📋 Logs channel (expired)")
                    .setChannelTypes(Discord.ChannelType.GuildText)
                    .setDisabled(true)
            );

            await reply.edit({ components: [disabledRow1, disabledRow2, disabledRow3, disabledRow4] }).catch(() => { });
        });
    }
};