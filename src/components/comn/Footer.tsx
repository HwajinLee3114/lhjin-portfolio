import React from 'react'

export default function Footer() {
  return (
    <div className="text-center p-5 bg-white dark:bg-[#1f262e] dark:text-darkfg">
      <p className="text-sm">© {new Date().getFullYear()} Lee HwaJin FE Portfolio. All rights reserved.</p>
    </div>
  )
}
