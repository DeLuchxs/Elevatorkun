// const { SlashCommandBuilder } = require('discord.js');

// const { createAudioPlayer } = require('@discordjs/voice');
// const player = createAudioPlayer();

// module.exports = {
//     data : new SlashCommandBuilder()
//     .setName('join')
//     .setDescription('Join the voice channel you are in.'),
//     async execute(interaction) {
//         if(!channel) return interaction.reply('You need to be in a voice channel to use this command.');
//         try {
//             await connection.joinVoiceChannel();
//             while (connection) {
//                 connection.subscribe(player); 
//                 player.play('C:\stuff\discord bot\audio\elevator.mp3');
//             }
//             player.stop();
//             return connection;
//         } catch (error) {
//             connection.destroy();
//             return interaction.reply('There was an error connecting to the voice channel.');
//         }
//     }
// }