"use client";

import React from "react";
import styled from "styled-components";

interface Tag {
  name: string;
  color: string;
  txtcolor?: string;
}

interface ProjectCardProps {
  title?: string;
  filter?: Tag[];
  period?: string;
  description?: string[];
  link?: string;
  imageSrc?: string;
  skill: string;
}

const TxtButton = styled.button`
  padding: 0.25rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: #faad1a;
    color: #ffffff;
    border: 1px solid #faad1a;
  }
`;

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  filter,
  period,
  description,
  link,
  imageSrc,
  skill,
}) => {
  return (
    <div className="max-w-sm rounded-md overflow-hidden shadow-lg p-4 bg-white cursor-pointer">
      <img className="w-full h-48 object-cover" src={imageSrc} alt={title} />
      <div className="py-4">
        <div className="flex gap-2 justify-between items-center">
          <h2 className="text-base font-bold">{title}</h2>
          {filter && (
            <div className="flex gap-2">
              {filter.map((fil) => (
                <p
                  className="text-xs px-2 rounded-lg"
                  style={{
                    backgroundColor: fil.color,
                    color: fil.txtcolor ? fil.txtcolor : "#ffffff",
                  }}
                >
                  {fil.name}
                </p>
              ))}
            </div>
          )}
        </div>

        {period && (
          <p className="text-gray-600 text-base md:text-sm mb-1">{period}</p>
        )}

        {description && (
          <ul className="list-disc pl-3">
            {description.map((desc, index) => (
              <li key={index} className="text-gray-700 text-base">
                <span className="block overflow-hidden whitespace-nowrap overflow-ellipsis max-w-xs">
                  {desc}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="self-start py-1 px-3 mb-2 bg-themacolor15 border-2 border-themacolor4 rounded text-sm">
        {skill}
      </div>
      <div className="flex justify-end">
        {/* inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition */}
        <TxtButton>DETAIL</TxtButton>
      </div>
    </div>
  );
};

export default ProjectCard;
