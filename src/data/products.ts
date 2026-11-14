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
    summary: '聊天、传文件，或是在局域网里私聊，都可以在 Zibblu 里完成。',
    description: '聊聊天、传个文件，不必来回切换工具。想在局域网里私聊，可以选择加密直连；需要 AI 帮忙时，读取哪些内容，由你每次确认。',
    platform: 'Windows 桌面应用',
    icon: '/brand/zibblu.png',
    artwork: { src: '/images/zibblu-dialogue.webp', width: 960, height: 749 },
    repository: 'https://github.com/openUrain/Zibblu',
    repositoryAccess: '这是私有仓库，需要访问权限',
    features: [
      {
        title: '在线聊天',
        description: '一对一聊天、群聊，之前的消息也能接着看。普通在线消息由服务器传递和保存，目前不提供端到端加密。',
      },
      {
        title: '文件共享',
        description: '拖放文件就能发送；想找之前分享的文件，可以在文件工作区按名称搜索。传输暂停后，也能接着传。',
      },
      {
        title: '局域网加密私聊',
        description: '双方同意后，可以通过可达的局域网连接加密聊天。连不上也不会自动改走互联网，私聊记录不会保存在应用中。',
      },
      {
        title: '逐次授权的 AI 助手',
        description: '在普通聊天里 @ 助手，就能发起请求。每次发送前，你都可以确认服务商，并选好这次允许它读取的消息或文本文件。',
      },
    ],
  },
] satisfies readonly Product[];

export function productPath(id: string) {
  return `${productsPath}/${id}`;
}
