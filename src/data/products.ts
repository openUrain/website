import { productsPath } from './site';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  description: string;
  platform: string;
  icon: string;
  artwork: { src: string; width: number; height: number; alt: string; caption: string };
  highlights: readonly string[];
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
    summary: 'Windows messaging with local-first history, resumable files, and AI requests you approve.',
    description: 'Host ordinary chats on a server your organization controls. Open a separate encrypted LAN session for private text.',
    platform: 'Windows 10 / 11 · x64',
    icon: '/brand/zibblu.png',
    artwork: {
      src: '/images/zibblu-chat.webp',
      width: 1188,
      height: 970,
      alt: 'Zibblu Windows client showing a conversation with attachment cards and an inline image preview',
      caption: 'Windows client · Chat and file sharing',
    },
    highlights: ['Enterprise Self-Hosting', 'Private LAN Chat'],
    repository: 'https://github.com/openUrain/Zibblu',
    website: 'https://zibblu.openurain.com/',
    downloadUrl: 'https://download.openurain.com/zibblu/windows/v0.1.10/Zibblu_0.1.10_x64_Client_Setup.exe',
    featureGroups: [
      {
        title: 'Where messages travel',
        features: [
          {
            title: 'Enterprise Self-Hosting',
            description: 'Deploy Zibblu Online with PostgreSQL on your infrastructure. Clients signed in to your HTTPS server use it for delivery without routing messages through the official Zibblu server. The hosting server can read online payloads. Ordinary chats have no end-to-end encryption.',
          },
          {
            title: 'Private LAN Chat',
            description: 'Participants opt in to a separate text session over an authenticated, encrypted connection on a reachable local network. There is no internet fallback or server relay. Zibblu clears the in-memory transcript when the session ends.',
          },
        ],
      },
      {
        title: 'Everyday chat',
        features: [
          {
            title: 'Local-first history',
            description: 'Received ordinary messages stay in SQLite on the device that received them. Review that history when an active session goes offline. New devices receive eligible pending deliveries and new messages.',
          },
          {
            title: 'File sharing',
            description: 'Send files and folders, find shared attachments, resume interrupted transfers and verify completed downloads. Online availability depends on your server’s policy.',
          },
          {
            title: 'Read-only AI',
            description: 'Mention a configured assistant in an ordinary chat, then review the provider, selected messages, and optional text files for that request. Cloud AI has no access to private LAN chats.',
          },
        ],
      },
    ],
  },
] satisfies readonly Product[];

export function productPath(id: string) {
  return `${productsPath}/${id}`;
}
