import React from "react";

interface Skill {
  name: string;
  color: string;
  txtcolor?: string;
}

interface SkillItemProps {
  title: string;
  skills: Skill[];
  img: string;
}

const SkillItem: React.FC<SkillItemProps> = ({ title, skills, img }) => {
  return (
    <div className="flex flex-col md:flex-row gap-5 items-center mb-4 md:mb-2">
      <img src={img} alt="lang" className="w-14" />
      <div className="font-bold text-lg flex-none w-24 text-center">
        {title}
      </div>
      <ul className="flex gap-3 flex-wrap">
        {skills.map((skill, index) => (
          <li
            key={`skillsItem_${index}`}
            className="rounded-md px-2 py-1 font-bold text-sm"
            style={{
              backgroundColor: skill.color,
              color: skill.txtcolor ? skill.txtcolor : "#ffffff",
            }}
          >
            {skill.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillItem;
