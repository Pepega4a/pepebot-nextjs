// General
export interface DiscordBot {
  id: string;
  username: string;
  avatar: string;
  serverCount: number;
  commandsCount: number;
}

// Guild
export interface Guild {
  id: string;
  name: string;
  icon: string | null;
  member_count: number;
}

// Commands
export interface BotCommand {
  name: string;
  description: string;
  category?: string;
  examples?: string[];
  usage?: string;
  options?: CommandOption[];
}

export interface CommandOption {
    name: string;
    required: boolean;
    type: number;
  }