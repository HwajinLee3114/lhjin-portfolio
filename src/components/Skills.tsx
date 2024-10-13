import React from "react";
import SkillItem from "./comn/SkillItem";

export default function Skills() {
  return (
    <section
      id="skills"
      className="flex flex-col items-center justify-center bg-themacolor2 min-h-50 md:min-h-35 md:h-full"
    >
      <h2 className="text-3xl font-bold mt-36 md:mt-0">Skills</h2>
      <p className="mt-4">
        React, Next.js, Tailwind CSS 등 다양한 기술을 사용합니다.
      </p>

      <div className="w-full xl:w-9/12 h-3/5 md:h-96 shadow-md mt-5 rounded-lg bg-themacolor1 p-5 md:p-10">
        <SkillItem
          title="FrontEnd"
          skills={[
            { name: "JavaScript", color: "#efd81d", txtcolor: "#000000" },
            { name: "React", color: "#61DBFB" },
            { name: "TypeScript", color: "#2f74c0" },
            { name: "Next.js", color: "#000000" },
            { name: "Zustand", color: "#49443e" },
            { name: "Tailwind CSS", color: "#06B6D4" },
          ]}
          img="/images/fe-100.png"
        />
        <SkillItem
          title="BackEnd"
          skills={[
            { name: "Java", color: "#5382a1" },
            { name: "Spring", color: "#8BC34A" },
            { name: "Supabase", color: "#30a26e" },
          ]}
          img="/images/be-100.png"
        />
        <SkillItem
          title="Database"
          skills={[
            { name: "Oracle", color: "#F80102" },
            { name: "MySQL", color: "#00758f" },
            { name: "MariaDB", color: "#C49A6C" },
          ]}
          img="/images/db-100.png"
        />
        <SkillItem
          title="Tools"
          skills={[
            { name: "GitHub", color: "#000000" },
            // { name: "Git", color: "#F05032" },
            { name: "PostMan", color: "#EF5B25" },
            { name: "Slack", color: "#E01E5A" },
            { name: "Notion", color: "#000000" },
          ]}
          img="/images/tool-100.png"
        />
        <SkillItem
          title="Dev Ops"
          skills={[
            { name: "Vercel", color: "#000000" },
            { name: "Netlify", color: "#004746" },
            // { name: "Docker", color: "#2468ee" },
            // { name: "AWS", color: "#f79b26", txtcolor:'#000000' },
          ]}
          img="/images/dev-100.png"
        />
      </div>
    </section>
  );
}
