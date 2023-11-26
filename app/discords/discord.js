import { Client, GatewayIntentBits } from "discord.js";

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  message.reply({
    content: "Hi from server bot",
  });
});

client.on("interactionCreate", (interaction) => {
  // console.log(message.content);

  interaction.reply("Pong");
});

// client.on("ready", () => {
//   console.log(`Logged in as ${client.user.tag}!`);
// });

// client.on("interactionCreate", async (interaction) => {
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === "ping") {
//     await interaction.reply("Pong!");
//   }
// });

export default clients = client.login(
  process.env.NEXT_PUBLIC_DISCORD_CLIENT_LOGIN
);
