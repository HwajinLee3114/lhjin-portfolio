'use client'

import React, { useEffect, useState } from 'react'

import ThemeToggle from './ThemeToggle'
import { focusRing } from '@/styles/ui'

interface HeaderProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const NAV_ITEMS = [
  { id: 'about', label: "It's ME" },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'career', label: 'Career' },
] as const

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isHidden, setIsHidden] = useState<boolean>(false)
  const [scrollTimer, setScrollTimer] = useState<number | null>(null)

  const lf_toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'career']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [setActiveSection])

  useEffect(() => {
    const handleScrollState = () => {
      setIsHidden(true)
      if (scrollTimer) window.clearTimeout(scrollTimer)
      const timer = window.setTimeout(() => setIsHidden(false), 180)
      setScrollTimer(timer)
    }
    window.addEventListener('scroll', handleScrollState)
    return () => {
      window.removeEventListener('scroll', handleScrollState)
      if (scrollTimer) window.clearTimeout(scrollTimer)
    }
  }, [scrollTimer])

  const lf_scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
    }
    setIsOpen(false)
  }

  return (
    <header
      className={`flex items-center justify-between fixed top-0 w-full p-4 backdrop-blur-sm shadow-md z-50 bg-white/70 dark:bg-[#232830]/80 transition-transform duration-200 ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <button
        onClick={() => lf_scrollToSection('home')}
        className={`flex gap-2 text-lg md:text-2xl text-themacolor4 ${focusRing} rounded`}
      >
        <div className="g_titleEngFontBlack">lhjin&apos;s</div>
        <div className="g_titleEngFontOutline">Portfolio</div>
      </button>
      <div className="flex items-center gap-3">
        {/* PC 메뉴 */}
        <nav className="hidden md:flex space-x-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => lf_scrollToSection(item.id)}
              className={`p-2 l_menu_tab g_RiaSansFont ${activeSection === item.id ? 'active' : ''}
              ${focusRing} focus-visible:rounded-sm
              `}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
        {/* 모바일 햄버거 버튼 */}
        <button
          onClick={lf_toggleMenu}
          className={`md:hidden ${focusRing} rounded`}
          aria-label="메뉴 열기"
        >
          <div className={`l_hamburger_menu ${isOpen ? 'animate' : ''}`}></div>
        </button>
      </div>
      {/* 모바일 사이드 메뉴 */}
      <nav
        className={`shadow-md fixed top-0 right-0 bg-themacolor1 h-screen w-3/4 md:hidden transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } z-50`}
      >
        <div className="h-12"></div>
        <div className="px-4 py-3">
          <ThemeToggle />
        </div>
        {NAV_ITEMS.map((item) => (
          <button
            key={`mobile_${item.id}`}
            onClick={() => lf_scrollToSection(item.id)}
            className={`block p-4 w-full l_menu_tab g_RiaSansFont ${
              activeSection === item.id ? 'active' : ''
            }
            ${focusRing} focus-visible:rounded-sm
            `}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  )
}

export default Header
