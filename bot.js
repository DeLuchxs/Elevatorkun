const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { token } = require('./config.json');

client.once(Events.ClientReady, c => {
    console.log('Ready!');
});

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
    const commandPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandPath, file);
        const command = require(filePath);
    // set a new item in the Collection with the key as the command name and the value as the exported module
        if('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log("[WARNING] The command at ${FilePath} does not have a 'data' or 'execute' property.");
        }
    }
}


client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if(!command) {
        console.error('No mathching Command ${interaction.commandName} found.');
        return;
    }

    try{
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if(interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

client.login(token);