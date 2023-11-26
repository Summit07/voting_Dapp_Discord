import { REST, Routes } from "discord.js";

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: "votingTime",
    description: "Remaining voting time!",
  },
  {
    name: "candidate",
    description: "Candidate Name",
  },
  {
    name: "castVote",
    description: "vote Casted now",
  },
  {
    name: "myVote",
    description: "Voter vote Status",
  },
];

const rest = new REST({ version: "10" }).setToken(
  process.env.NEXT_PUBLIC_DISCORD_CLIENT_LOGIN
);

try {
  console.log("Started refreshing application (/) commands.");

  await rest.put(
    Routes.applicationCommands(process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID),
    {
      body: commands,
    }
  );

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}
