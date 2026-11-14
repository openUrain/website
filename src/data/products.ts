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
    summary: '支持在线聊天、文件共享与局域网私聊的 Windows 桌面应用。',
    description: '把日常聊天、文件共享和局域网私聊放在同一个桌面应用里。需要时，你可以选择让 AI 助手读取哪些内容。',
    platform: 'Windows 桌面应用',
    icon: '/brand/zibblu.png',
    artwork: { src: '/images/zibblu-dialogue.webp', width: 960, height: 749 },
    repository: 'https://github.com/openUrain/Zibblu',
    repositoryAccess: '仓库需授权访问',
    features: [
      {
        title: '在线聊天',
        description: '支持单聊、群聊和消息历史。普通消息由服务端投递和存储，当前未启用端到端加密。',
      },
      {
        title: '文件共享',
        description: '拖放文件即可发送。在文件工作区按名称查找共享文件，传输暂停后可以继续。',
      },
      {
        title: '局域网加密私聊',
        description: '参与者同意后，通过可达的局域网直连进行加密文字聊天。连接失败时不会回退到互联网，私聊记录也不会持久保存到应用中。',
      },
      {
        title: '逐次授权的 AI 助手',
        description: '在普通聊天中用 @名称 调用助手。每次发送前，你都可以确认服务商，并指定助手当次可以读取的消息或文本文件。',
      },
    ],
  },
] satisfies readonly Product[];

export function productPath(id: string) {
  return `${productsPath}/${id}`;
}
