import React from "react";
import { motion } from "framer-motion";
import { career } from "@/data/career";
import { projects } from "@/data/projects";

export default function Career() {
  return (
    <section
      id="career"
      className="flex flex-col items-center justify-center min-h-screen bg-themacolor1"
    >
      <h2 className="text-3xl g_titleEngFont mt-3">Career</h2>
      <p className="my-4">내 경력에 대해 알아보세요.</p>

      <div className="max-w-2xl w-full">
        <ul className="flex flex-col gap-5">
          {career.map((item, index) => (
            <motion.li
              key={`career_${index}`}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
                delay: career.indexOf(item) * 0.1,
                y: { duration: 0.5 },
              }}
            >
              <div className="flex flex-col sm:flex-row gap-2 mb-2 items-start sm:items-center">
                <h2 className="text-lg font-bold">{item.company}</h2>
                <div className="text-gray-600 text-base md:text-sm">
                  {item.period}
                </div>
              </div>
              <div>{item.companyInfo}</div>
              <div className="flex gap-2">
                {item.tag.map((t, idx) => (
                  <p
                    key={`carrerTag_${idx}`}
                    className="text-xs px-2 py-0.5 rounded-lg bg-black text-white"
                  >
                    {t}
                  </p>
                ))}
              </div>

              {item.projects &&
                item.projects.map((pjId, idx) => {
                  const pj = projects.find((p) => p.id === pjId);
                  return (
                    pj && (
                      <section
                        className="py-3.5 px-0 md:p-4"
                        key={`${pjId}_career_${idx}`}
                      >
                        <div className="py-1 pl-4 mb-2 border-l-4 border-gray-600 text-gray-600 bg-quotecolor">
                          {pj.title}
                        </div>
                        <div className="text-gray-600 text-base md:text-sm mb-1">
                          {pj.period}
                        </div>
                        <div>{pj.description}</div>
                      </section>
                    )
                  );
                })}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
