import { productsPath } from './site';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  description: string;
  platform: string;
  icon: string;
  artwork: { src: string; width: number; height: number };
  repository: string;
  downloadUrl?: string;
  featureGroups: readonly {
    title: string;
    features: readonly { title: string; description: string }[];
  }[];
}

export const products = [
  {
    id: 'zibblu',
    name: 'Zibblu',
    tagline: 'Chat freely. Share privately.',
    summary: 'A Windows messenger for everyday chats, file sharing, and encrypted conversations on your local network.',
    description: 'Keep messages and files in one place. Start a separate encrypted chat on your local network, or call on an AI assistant in an online conversation.',
    platform: 'Windows desktop app',
    icon: '/brand/zibblu.png',
    artwork: { src: '/images/zibblu-dialogue.webp', width: 960, height: 749 },
    repository: 'https://github.com/openUrain/Zibblu',
    downloadUrl: 'https://github.com/openUrain/Zibblu/releases/download/v0.1.2/Zibblu_0.1.2_x64_Client_Setup.exe',
    featureGroups: [
      {
        title: 'Two ways to chat',
        features: [
          {
            title: 'Online chat',
            description: 'Chat one-on-one or in groups and pick up where you left off with message history. The server delivers and stores online messages. These chats are not end-to-end encrypted.',
          },
          {
            title: 'Private LAN chat',
            description: 'With everyone’s consent, chat over a direct, encrypted connection on a reachable local network. Private chats never fall back to the internet. The app keeps these messages in memory for the session.',
          },
        ],
      },
      {
        title: 'Files and AI',
        features: [
          {
            title: 'File sharing',
            description: 'Drag a file into a chat to send it. Find shared files by name in the file workspace and resume a transfer if it pauses.',
          },
          {
            title: 'AI assistant',
            description: 'Type @ and the assistant’s name in an online chat. For each request, confirm the provider and choose which messages or text files it may read. Cloud AI is unavailable in private chats.',
          },
        ],
      },
    ],
  },
] satisfies readonly Product[];

export function productPath(id: string) {
  return `${productsPath}/${id}`;
}
