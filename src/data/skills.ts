export interface Skill {
  name: string
  color: string
  txtcolor?: string
}

export interface SkillCategory {
  title: string
  skills: Skill[]
  img: string
}

const SKILL_COLORS = {
  javascript: { bg: '#efd81d', fg: '#000000' },
  react: { bg: '#61DBFB', fg: '#ffffff' },
  typescript: { bg: '#2f74c0', fg: '#ffffff' },
  next: { bg: '#000000', fg: '#ffffff' },
  zustand: { bg: '#49443e', fg: '#ffffff' },
  tailwind: { bg: '#06B6D4', fg: '#ffffff' },
  java: { bg: '#5382a1', fg: '#ffffff' },
  spring: { bg: '#8BC34A', fg: '#ffffff' },
  supabase: { bg: '#30a26e', fg: '#ffffff' },
  oracle: { bg: '#F80102', fg: '#ffffff' },
  mysql: { bg: '#00758f', fg: '#ffffff' },
  mariadb: { bg: '#C49A6C', fg: '#ffffff' },
  github: { bg: '#000000', fg: '#ffffff' },
  postman: { bg: '#EF5B25', fg: '#ffffff' },
  slack: { bg: '#E01E5A', fg: '#ffffff' },
  notion: { bg: '#000000', fg: '#ffffff' },
  vercel: { bg: '#000000', fg: '#ffffff' },
  netlify: { bg: '#004746', fg: '#ffffff' },
}

export const skills: SkillCategory[] = [
  {
    title: 'FrontEnd',
    skills: [
      { name: 'JavaScript', color: SKILL_COLORS.javascript.bg, txtcolor: SKILL_COLORS.javascript.fg },
      { name: 'React', color: SKILL_COLORS.react.bg, txtcolor: SKILL_COLORS.react.fg },
      { name: 'TypeScript', color: SKILL_COLORS.typescript.bg, txtcolor: SKILL_COLORS.typescript.fg },
      { name: 'Next.js', color: SKILL_COLORS.next.bg, txtcolor: SKILL_COLORS.next.fg },
      { name: 'Zustand', color: SKILL_COLORS.zustand.bg, txtcolor: SKILL_COLORS.zustand.fg },
      { name: 'Tailwind CSS', color: SKILL_COLORS.tailwind.bg, txtcolor: SKILL_COLORS.tailwind.fg },
    ],
    img: '/images/fe-100.png',
  },
  {
    title: 'BackEnd',
    skills: [
      { name: 'Java', color: SKILL_COLORS.java.bg, txtcolor: SKILL_COLORS.java.fg },
      { name: 'Spring', color: SKILL_COLORS.spring.bg, txtcolor: SKILL_COLORS.spring.fg },
      { name: 'Supabase', color: SKILL_COLORS.supabase.bg, txtcolor: SKILL_COLORS.supabase.fg },
    ],
    img: '/images/be-100.png',
  },
  {
    title: 'Database',
    skills: [
      { name: 'Oracle', color: SKILL_COLORS.oracle.bg, txtcolor: SKILL_COLORS.oracle.fg },
      { name: 'MySQL', color: SKILL_COLORS.mysql.bg, txtcolor: SKILL_COLORS.mysql.fg },
      { name: 'MariaDB', color: SKILL_COLORS.mariadb.bg, txtcolor: SKILL_COLORS.mariadb.fg },
    ],
    img: '/images/db-100.png',
  },
  {
    title: 'Tools',
    skills: [
      { name: 'GitHub', color: SKILL_COLORS.github.bg, txtcolor: SKILL_COLORS.github.fg },
      // { name: "Git", color: "#F05032" },
      { name: 'PostMan', color: SKILL_COLORS.postman.bg, txtcolor: SKILL_COLORS.postman.fg },
      { name: 'Slack', color: SKILL_COLORS.slack.bg, txtcolor: SKILL_COLORS.slack.fg },
      { name: 'Notion', color: SKILL_COLORS.notion.bg, txtcolor: SKILL_COLORS.notion.fg },
    ],
    img: '/images/tool-100.png',
  },
  {
    title: 'Dev Ops',
    skills: [
      { name: 'Vercel', color: SKILL_COLORS.vercel.bg, txtcolor: SKILL_COLORS.vercel.fg },
      { name: 'Netlify', color: SKILL_COLORS.netlify.bg, txtcolor: SKILL_COLORS.netlify.fg },
      // { name: "Docker", color: "#2468ee" },
      // { name: "AWS", color: "#f79b26", txtcolor:'#000000' },
    ],
    img: '/images/dev-100.png',
  },
]
