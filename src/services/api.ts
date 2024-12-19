import { DiscordBot, Guild, BotCommand } from '@/types/discord';

const API_URL = process.env.NEXT_API_URL;

export const api = {
  async getBotInfo(): Promise<DiscordBot> {
    console.log('API URL:', process.env.NEXT_API_URL);
    const response = await fetch(`${API_URL}/api/bot`);
    if (!response.ok) {
      throw new Error('Failed to fetch bot info');
    }
    const data = await response.json();
    return data;
  },

  async getGuilds(): Promise<Guild[]> {
    const response = await fetch(`${API_URL}/api/guilds`);
    if (!response.ok) throw new Error('Failed to fetch guilds');
    return response.json();
  },

  async getGuildById(id: string): Promise<Guild> {
    const response = await fetch(`${API_URL}/api/guilds/${id}`);
    if (!response.ok) throw new Error('Failed to fetch guild');
    return response.json();
  },

  async getCommands(): Promise<BotCommand[]> {
    const response = await fetch(`${API_URL}/api/bot/commands`);
    if (!response.ok) throw new Error('Failed to fetch commands');
    const data = await response.json();
    return data;
  }
};
