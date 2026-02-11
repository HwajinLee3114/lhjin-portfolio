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
      className="min-w-[220px] sm:min-w-[280px] max-w-[320px] w-full p-6 bg-gray-200 text-gray-900 rounded-lg text-decoration-none transition-transform duration-200 ease-linear hover:scale-105 dark:bg-[#273038] dark:text-darkfg"
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
      {title && <div className="text-2xl mb-5 g_RiaSansFont dark:text-darkfg">{title}</div>}
      {url && <div className="font-bold dark:text-darkfg/90">{url}</div>}
      {description && <div className="dark:text-darkfg/80">{description}</div>}
    </a>
  )
}

export default HoverAMenu
