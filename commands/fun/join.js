const { SlashCommandBuilder } = require('discord.js');

const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const path = require('node:path');

module.exports = {
    data : new SlashCommandBuilder()
    .setName('join')
    .setDescription('Join the voice channel you are in.'),
    async execute(interaction) {
        const voiceChannel = interaction.member.voice.channel;
        if(!voiceChannel) return interaction.reply('You need to be in a voice channel to use this command.');
        let connection;
        try {
            const connection = joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
            const player = createAudioPlayer();
            const resource = createAudioResource(path.join(__dirname, 'audio', 'elevator.mp3'), {
                inlineVolume: true,
            });
            player.on('idle', () => {
                player.play(resource);
            });
            connection.subscribe(player);
            player.play(resource);
            return interaction.reply('Joined the voice channel.');
        } catch (error) {
            if(connection)
            connection.destroy();
            return interaction.reply('There was an error connecting to the voice channel.');
        }
    }
}