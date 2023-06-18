const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides info about the user')
        .addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show')),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
		if (user) return interaction.reply(`${user.username} joined the server on ${user.joinAt}`);
		return interaction.reply(`${interaction.user.username} joined the server on ${interaction.users.joinAt}`);
    },
};