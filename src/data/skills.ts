export interface Skill {
  name: string;
  color: string;
  txtcolor?: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
  img: string;
}

export const skills: SkillCategory[] = [
  {
    title: 'FrontEnd',
    skills: [
      { name: "JavaScript", color: "#efd81d", txtcolor: "#000000" },
      { name: "React", color: "#61DBFB" },
      { name: "TypeScript", color: "#2f74c0" },
      { name: "Next.js", color: "#000000" },
      { name: "Zustand", color: "#49443e" },
      { name: "Tailwind CSS", color: "#06B6D4" },
    ],
    img: '/images/fe-100.png'
  },
  {
    title: 'BackEnd',
    skills: [
      { name: "Java", color: "#5382a1" },
      { name: "Spring", color: "#8BC34A" },
      { name: "Supabase", color: "#30a26e" },
    ],
    img: '/images/be-100.png'
  },
  {
    title: 'Database',
    skills: [
      { name: "Oracle", color: "#F80102" },
      { name: "MySQL", color: "#00758f" },
      { name: "MariaDB", color: "#C49A6C" },
    ],
    img: '/images/db-100.png'
  },
  {
    title: 'Tools',
    skills: [
      { name: "GitHub", color: "#000000" },
      // { name: "Git", color: "#F05032" },
      { name: "PostMan", color: "#EF5B25" },
      { name: "Slack", color: "#E01E5A" },
      { name: "Notion", color: "#000000" },
    ],
    img: '/images/tool-100.png'
  },
  {
    title: 'Dev Ops',
    skills: [
      { name: "Vercel", color: "#000000" },
      { name: "Netlify", color: "#004746" },
      // { name: "Docker", color: "#2468ee" },
      // { name: "AWS", color: "#f79b26", txtcolor:'#000000' },
    ],
    img: '/images/dev-100.png'
  },
];