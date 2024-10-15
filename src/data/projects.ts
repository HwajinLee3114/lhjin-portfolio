export const projects = [
  {
    id: '1',
    title: "프로젝트명 1",
    period: "2024.10 ~ 2024.11",
    skill: "react, javascript, mysql",
    git: "#",
    site: "#",
    filter: [
      { name: "team", color: "skyblue" },
      { name: "filter2", color: "coral" },
    ],
    description: "설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명",
    feature: [
      "주요기능1",
      "주요기능22222222222",
    ],
    contribution: [
      {
        id: '1',
        title: '기여1을 했습니다.',
        desc: [
          '기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1',
          '기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1',
          '기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1',
          '기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1',
        ]
      },
      {
        id: '2',
        title: '',
        desc: [
          '기여2기여2기여2기여2기여2기여2기여2기여2기여2기여2기여2기여2',
          '기여2기여2기여2기여2기여2기여2기여2기여2기여2기여2기여2기여2',
          '기여2기여2기여2기여2기여2기여2기여2기여2기여2기여2기여2기여2',

        ]
      },
    ],
    skillItem: [
      { id: "1", name: "JavaScript", url: "/images/js-100.png" },
      { id: "2", name: "Java", url: "/images/java-100.png" },
      { id: "3", name: "TailwindCSS", url: "/images/tailwind-100.png" },
    ],
    images: [
      { id: "1", url: "", name: "" },
      { id: "2", url: "", name: "" },
      { id: "3", url: "", name: "" },
    ],
  },
  {
    id: '2',
    title: "프로젝트명 2",
    period: "2024.12 ~ 2025.01",
    skill: "typescript, node.js",
    git: "#",
    site: "#",
    filter: [
      { name: "personal", color: "lightgreen" },
      { name: "filter4", color: "tomato" },
    ],
    description: "설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명",
    feature: [
      "주요기능1",
      "주요기능22222222222",
    ],
    contribution: [
      {
        id: '1',
        title: '기여1을 했습니다.',
        desc: [
          '기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1',
          '기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1',
          '기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1',
          '기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1기여1',
        ]
      },
      {
        id: '2',
        title: '',
        desc: [
          '기여2기여2기여2기여2기여2기여2기여2기여2기여2기여2기여2기여2',
          '기여2기여2기여2기여2기여2기여2기여2기여2기여2기여2기여2기여2',
          '기여2기여2기여2기여2기여2기여2기여2기여2기여2기여2기여2기여2',

        ]
      },
    ],
    skillItem: [
      { id: "1", name: "JavaScript", url: "/images/js-100.png" },
      { id: "2", name: "Java", url: "/images/java-100.png" },
      { id: "3", name: "TailwindCSS", url: "/images/tailwind-100.png" },
    ],
    images: [
      { id: "4", url: "/images/sample.jpg", name: "sample" },
      { id: "5", url: "", name: "" },
      { id: "6", url: "", name: "" },
      { id: "7", url: "", name: "" },
      { id: "8", url: "", name: "" },
      { id: "9", url: "", name: "" },
    ],
  },
];

// 프로젝트 상세
export const getProjectById = (id: string) => {
  return projects.find(project => project.id === id);
};