import React from 'react'

interface HoverAMenuProps {
  img?: string
  title?: string
  url: string
  description?: string
}

const HoverAMenu: React.FC<HoverAMenuProps> = ({ img, title, url, description }) => {
  return (
    <a
      className="min-w-[300px] max-w-[320px] w-full p-6 bg-gray-200 rounded-lg text-decoration-none transition-transform duration-200 ease-linear hover:scale-105"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {img && (
        <div>
          <img
            alt={`${title} 이미지`}
            loading="lazy"
            width="384"
            height="84"
            src={img}
            className={`transparent mb-5`}
          />
        </div>
      )}
      {title && <div className="text-2xl mb-5 g_RiaSansFont">{title}</div>}
      {url && <div className="font-bold">{url}</div>}
      {description && <div>{description}</div>}
    </a>
  )
}

export default HoverAMenu
