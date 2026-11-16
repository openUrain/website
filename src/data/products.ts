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
  website?: string;
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
    summary: 'A calmer Windows messenger with local-first history, dependable file sharing, and opt-in private LAN chats.',
    description: 'Chat simply, keep received history on your devices, share files with confidence, and opt into separate encrypted private chats on a reachable local network.',
    platform: 'Windows desktop app',
    icon: '/brand/zibblu.png',
    artwork: { src: '/images/zibblu-dialogue.webp', width: 960, height: 749 },
    repository: 'https://github.com/openUrain/Zibblu',
    website: 'https://zibblu.openurain.com/',
    downloadUrl: 'https://download.openurain.com/zibblu/windows/v0.1.4/Zibblu_0.1.4_x64_Client_Setup.exe',
    featureGroups: [
      {
        title: 'Two ways to chat',
        features: [
          {
            title: 'Online chat',
            description: 'Chat one-on-one or in groups. Received history is saved locally; server-side text is temporary for 72 hours. Regular online chats are not end-to-end encrypted.',
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
