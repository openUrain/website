import { productsPath } from './site';

export interface Product {
  id: string;
  name: string;
  tagline: readonly string[];
  summary: string;
  description: string;
  platform: string;
  icon: string;
  artwork: { src: string; width: number; height: number };
  repository: string;
  repositoryAccess?: string;
  features: readonly { title: string; description: string }[];
}

export const products = [
  {
    id: 'zibblu',
    name: 'Zibblu',
    tagline: ['Chat freely.', 'Share privately.'],
    summary: 'Messages, file sharing, and encrypted chats on your local network—all in one desktop app.',
    description: 'Keep conversations and shared files in one place. For an encrypted exchange, connect directly over your local network. When you bring in an AI assistant, you choose what it can read—every time.',
    platform: 'Windows desktop app',
    icon: '/brand/zibblu.png',
    artwork: { src: '/images/zibblu-dialogue.webp', width: 960, height: 749 },
    repository: 'https://github.com/openUrain/Zibblu',
    repositoryAccess: 'Private repository — access required',
    features: [
      {
        title: 'Stay in touch',
        description: 'Chat one-on-one or in groups, and pick up where you left off with message history. Regular online messages are delivered and stored by the server; these chats are not end-to-end encrypted.',
      },
      {
        title: 'Share files easily',
        description: 'Drag in a file to send it. Find shared files by name in the file workspace, and resume a transfer if it gets paused.',
      },
      {
        title: 'Encrypted LAN chat',
        description: 'With both people’s consent, chat over an encrypted direct connection on a reachable local network. If that connection fails, Zibblu will not fall back to the internet. These chats are not persistently saved in the app.',
      },
      {
        title: 'AI, on your terms',
        description: 'Mention an AI assistant with @ in a regular chat. Before each request, confirm the provider and choose which messages or text files it may read that time.',
      },
    ],
  },
] satisfies readonly Product[];

export function productPath(id: string) {
  return `${productsPath}/${id}`;
}
