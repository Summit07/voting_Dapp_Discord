import React from "react";
import axios from "axios";

function DiscordService() {
  // console.log(process.env.DISCORD_WEBHOOK_URL);
  const Send = async (content, title, data) => {
    const body = {
      content: content,
      tts: false,
      color: "white",
      embeds: [
        {
          title: title,
          description: data,
        },
      ],
    };

    try {
      await axios.post(process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL, body);
      // await axios.post(
      //   "https://discord.com/api/webhooks/1176978889327780030/CPPqvXcSTE5s23ky_DV76pNuyaoQ3MgjNQuQyTIcLKSehTQOjoP6P4TlqG9I9HfTkGDj",
      //   body
      // );
    } catch (error) {
      console.error(error);
    }
  };

  return {
    Send,
  };
}

export default DiscordService;
