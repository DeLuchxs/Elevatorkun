const { SlashCommandBuilder } = require('discord.js');

const { joinVoiceChannel, createAudioPlayer, createAudioResource, getVoiceConnection } = require('@discordjs/voice');
const path = require('path');

module.exports = {
    data : new SlashCommandBuilder()
    .setName('join')
    .setDescription('Join the voice channel you are in.'),
    async execute(interaction) {
        const voiceChannel = interaction.member.voice.channel;
        if(!voiceChannel) return interaction.reply('You need to be in a voice channel to use this command.');
        try {
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });
            const player = createAudioPlayer();
            const resource = createAudioResource(path.join(__dirname, 'audio', 'elevator.mp3'), {
                inlineVolume: true
            });
            player.on('idle', () => {
                player.play();
            });
            connection.subscribe(player);
            player.play(resource);
            return interaction.reply('Joined the voice channel.');
        } catch (error) {
            connection.destroy();
            return interaction.reply('There was an error connecting to the voice channel.');
        }
    }
}