import { Github, Globe, Linkedin, type LucideIcon } from 'lucide-react'
import { profile } from './profile'

export interface SocialLink {
  id: string
  title: string
  url: string
  icon: LucideIcon
  desc: string
}

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    title: 'GitHub',
    url: profile.social.github,
    icon: Github,
    desc: '소스 코드 저장소',
  },
  {
    id: 'blog',
    title: 'Tistory',
    url: profile.social.blog,
    icon: Globe,
    desc: '기술 블로그',
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    url: profile.social.linkedin,
    icon: Linkedin,
    desc: '커리어 네트워크',
  },
]
