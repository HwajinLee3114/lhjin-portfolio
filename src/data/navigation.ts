import { User, Code, Briefcase, Folder, type LucideIcon } from 'lucide-react'

export interface NavItem {
  id: string
  title: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { id: 'about', title: 'About Me', icon: User },
  { id: 'skills', title: 'Skills', icon: Code },
  { id: 'projects', title: 'Projects', icon: Folder },
  { id: 'career', title: 'Career', icon: Briefcase },
]
