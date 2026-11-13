export interface Product {
  id: string;
  name: string;
  tagline: readonly string[];
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
    description: '把日常聊天、文件共享和局域网私聊放在同一个桌面应用里。需要时，你可以选择让 AI 助手读取哪些内容。',
    platform: 'Windows 桌面应用',
    icon: '/brand/zibblu.png',
    artwork: { src: '/images/zibblu-dialogue.webp', width: 960, height: 749 },
    repository: 'https://github.com/openUrain/Zibblu',
    repositoryAccess: '仓库需授权访问',
    features: [
      { title: '在线聊天', description: '支持单聊、群聊和消息历史。' },
      { title: '文件共享', description: '在文件工作区查找共享文件，传输暂停后可继续。' },
      { title: '局域网加密私聊', description: '参与者同意后，在可达的局域网内建立加密连接，连接失败时不会回退到互联网。' },
      { title: '由你授权的 AI 助手', description: '每次调用前，由你决定要分享哪些消息或文件。助手只有所选内容的读取权限。' },
    ],
  },
] satisfies readonly Product[];
