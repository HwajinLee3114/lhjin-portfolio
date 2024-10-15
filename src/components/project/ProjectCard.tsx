"use client";

import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { ProjectDetailModal } from "./detail/ProjectDetailModal";
import ModalPortal from "../comn/ModalPortal";

interface Tag {
  name: string;
  color: string;
  txtcolor?: string;
}

interface ProjectCardProps {
  id?: string;
  title?: string;
  filter?: Tag[];
  period?: string;
  feature?: string[];
  link?: string;
  imageSrc?: string;
  skill: string;
}

const TxtButton = tw.button`
  px-3 
  py-1 
  border 
  border-gray-300 
  rounded 
  font-medium 
  text-sm 
  outline-none 
  cursor-pointer 
  hover:bg-yellow-400 
  hover:text-white 
  hover:border-yellow-400
`;

const ModalWrapper = tw.div`
fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center items-center bg-black bg-opacity-60 z-40 
overflow-y-auto
scrollbar-hide
`;

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  filter,
  period,
  feature,
  link,
  imageSrc,
  skill,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string>(""); // 상세 프로젝트
  return (
    <>
      <div className="max-w-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 p-4 bg-white cursor-pointer">
        <div className="flex justify-center">
          {/* h-full overflow-hidden absolute */}
          <img
            className="w-full h-48 object-cover"
            src={imageSrc}
            alt={title}
          />
        </div>
        <div className="py-4">
          <div className="flex gap-2 justify-between items-center">
            <h2 className="text-base font-bold">{title}</h2>
            {filter && (
              <div className="flex gap-2">
                {filter.map((fil, idx) => (
                  <p
                    key={`pjfilter_${idx}`}
                    className="text-xs px-2 py-0.5 rounded-lg"
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

          {feature && (
            <ul className="list-disc pl-3">
              {feature.map((feat, index) => (
                <li key={`desc_${index}`} className="text-gray-700 text-base">
                  <span className="block overflow-hidden whitespace-nowrap overflow-ellipsis max-w-xs">
                    {feat}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="self-start py-1 px-3 mb-2 bg-themacolor15 border-2 border-themacolor4 rounded text-sm">
          {skill}
        </div>
        {id && (
          <div className="flex justify-end">
            <TxtButton
              onClick={() => {
                setIsOpen(true);
                setActiveId(id);
              }}
            >
              DETAIL
            </TxtButton>
          </div>
        )}
      </div>

      {isOpen && (
        <ModalPortal>
          <ModalWrapper
            onClick={(e) => {
              setIsOpen(false);
              setActiveId("");
            }}
          >
            <ProjectDetailModal isOpen={isOpen} activeId={activeId} />
          </ModalWrapper>
        </ModalPortal>
      )}
    </>
  );
};

export default ProjectCard;
