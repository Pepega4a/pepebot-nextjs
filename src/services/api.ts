import { DiscordBot, Guild, BotCommand } from '@/types/discord';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const timeout = 120000;

export const api = {
  async getBotInfo(): Promise<DiscordBot> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(`${API_URL}/api/bot`, { signal: controller.signal });
      if (!response.ok) {
        throw new Error('Failed to fetch bot info');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timed out');
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  },

  async getGuilds(): Promise<Guild[]> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(`${API_URL}/api/guilds`, { signal: controller.signal });
      if (!response.ok) throw new Error('Failed to fetch guilds');
      return response.json();
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timed out');
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  },

  async getGuildById(id: string): Promise<Guild> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(`${API_URL}/api/guilds/${id}`, { signal: controller.signal });
      if (!response.ok) throw new Error('Failed to fetch guild');
      return response.json();
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timed out');
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  },

  async getCommands(): Promise<BotCommand[]> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(`${API_URL}/api/bot/commands`, { signal: controller.signal });
      if (!response.ok) throw new Error('Failed to fetch commands');
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timed out');
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }
};
