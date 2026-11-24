import { productsPath } from './site';

export type FeatureIconName = 'server' | 'privacy' | 'chat' | 'files' | 'ai' | 'lan';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  description: string;
  platform: string;
  version: string;
  icon: string;
  artwork: { src: string; width: number; height: number; alt: string; caption: string };
  secondaryArtwork?: {
    compact: { src: string; width: number; height: number; alt: string };
    privateLan: { src: string; width: number; height: number; alt: string };
    signIn: { src: string; width: number; height: number; alt: string };
  };
  highlights: readonly string[];
  repository: string;
  website?: string;
  downloadUrl?: string;
  checksumUrl?: string;
  releaseUrl?: string;
  featureGroups: readonly {
    title: string;
    subtitle: string;
    features: readonly { icon: FeatureIconName; title: string; description: string }[];
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
    version: 'v0.1.10',
    icon: '/brand/zibblu.png',
    artwork: {
      src: '/images/showcase/02-desktop-chat.png',
      width: 1186,
      height: 786,
      alt: 'Zibblu Windows desktop client showing the conversation list and a chat with rich text',
      caption: 'Zibblu for Windows · Desktop conversation',
    },
    secondaryArtwork: {
      compact: {
        src: '/images/showcase/04-compact-chat.png',
        width: 462,
        height: 787,
        alt: 'Zibblu compact desktop window showing rich Markdown and explicit AI context selection',
      },
      privateLan: {
        src: '/images/showcase/03-private-lan.png',
        width: 462,
        height: 786,
        alt: 'Zibblu dark Private LAN mode while discovering devices on a local network',
      },
      signIn: {
        src: '/images/showcase/01-sign-in.png',
        width: 1185,
        height: 784,
        alt: 'Zibblu Windows sign-in and account selection screen',
      },
    },
    highlights: ['Enterprise Self-Hosting', 'Private LAN Chat', 'Read-only AI'],
    repository: 'https://github.com/openUrain/Zibblu',
    website: 'https://zibblu.openurain.com/',
    downloadUrl: 'https://download.openurain.com/zibblu/windows/v0.1.10/Zibblu_0.1.10_x64_Client_Setup.exe',
    checksumUrl: 'https://download.openurain.com/zibblu/windows/v0.1.10/SHA256SUMS.txt',
    releaseUrl: 'https://github.com/openUrain/Zibblu/releases/tag/v0.1.10',
    featureGroups: [
      {
        title: 'Where messages travel',
        subtitle: 'Clear separation between server-routed work chats and direct local-network text.',
        features: [
          {
            icon: 'server',
            title: 'Enterprise Self-Hosting',
            description: 'Deploy Zibblu Online with PostgreSQL on your infrastructure. Clients signed in to your HTTPS server use it for delivery without routing messages through the official Zibblu server. The hosting server can read online payloads. Ordinary chats have no end-to-end encryption.',
          },
          {
            icon: 'privacy',
            title: 'Private LAN Chat',
            description: 'Participants opt in to a separate text session over an authenticated, encrypted connection on a reachable local network. There is no internet fallback or server relay. Zibblu clears the in-memory transcript when the session ends.',
          },
        ],
      },
      {
        title: 'Everyday chat',
        subtitle: 'Built for calm reading, dependable transfers, and explicit control over what leaves your machine.',
        features: [
          {
            icon: 'chat',
            title: 'Local-first history',
            description: 'Received ordinary messages stay in SQLite on the device that received them. Review that history when an active session goes offline. New devices receive eligible pending deliveries and new messages.',
          },
          {
            icon: 'files',
            title: 'File sharing',
            description: 'Send files and folders, find shared attachments, resume interrupted transfers and verify completed downloads. Online availability depends on your server’s policy.',
          },
          {
            icon: 'ai',
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
