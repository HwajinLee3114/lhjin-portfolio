'use client'

import React, { useState, useEffect, useCallback } from 'react'
import ThemeToggle from './ThemeToggle'

interface HeaderProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const lf_toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const lf_handleScroll = useCallback(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'career']
    const scrollY = window.scrollY

    sections.forEach((section) => {
      const element = document.getElementById(section)
      if (element) {
        const { offsetTop, clientHeight } = element

        if (scrollY >= offsetTop - 200 && scrollY < offsetTop + clientHeight) {
          setActiveSection(section)
        }
      }
    })
  }, [setActiveSection])

  useEffect(() => {
    window.addEventListener('scroll', lf_handleScroll)
    return () => {
      window.removeEventListener('scroll', lf_handleScroll)
    }
  }, [lf_handleScroll])

  const lf_scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
    }
    setIsOpen(false)
  }

  return (
    <header className="flex items-center justify-between fixed top-0 w-full p-4 backdrop-blur-sm shadow-md z-50 bg-white/70 dark:bg-[#232830]/80">
      <button
        onClick={() => lf_scrollToSection('home')}
        className="flex gap-2 text-lg md:text-2xl text-themacolor4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-themacolor4 focus-visible:ring-offset-2 rounded"
      >
        <div className="g_titleEngFontBlack">lhjin&apos;s</div>
        <div className="g_titleEngFontOutline">Portfolio</div>
      </button>
      <div className="flex items-center gap-3">
        {/* PC 메뉴 */}
        <nav className="hidden md:flex space-x-4">
          <button
            onClick={() => lf_scrollToSection('about')}
            className={`p-2 l_menu_tab g_RiaSansFont ${activeSection === 'about' ? 'active' : ''}
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-themacolor4 focus-visible:ring-offset-2 rounded
          `}
          >
            It&apos;s ME
          </button>
          <button
            onClick={() => lf_scrollToSection('skills')}
            className={`p-2 l_menu_tab g_RiaSansFont ${activeSection === 'skills' ? 'active' : ''}
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-themacolor4 focus-visible:ring-offset-2 rounded
          `}
          >
            Skills
          </button>
          <button
            onClick={() => lf_scrollToSection('projects')}
            className={`p-2 l_menu_tab g_RiaSansFont ${activeSection === 'projects' ? 'active' : ''}
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-themacolor4 focus-visible:ring-offset-2 rounded
          `}
          >
            Projects
          </button>
          <button
            onClick={() => lf_scrollToSection('career')}
            className={`p-2 l_menu_tab g_RiaSansFont ${activeSection === 'career' ? 'active' : ''}
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-themacolor4 focus-visible:ring-offset-2 rounded
          `}
          >
            Career
          </button>
        </nav>
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
        {/* 모바일 햄버거 버튼 */}
        <button
          onClick={lf_toggleMenu}
          className="md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-themacolor4 focus-visible:ring-offset-2 rounded"
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
        <button
          onClick={() => lf_scrollToSection('about')}
          className={`block p-4 w-full l_menu_tab g_RiaSansFont ${
            activeSection === 'about' ? 'active' : ''
          }
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-themacolor4 focus-visible:ring-offset-2 rounded
          `}
        >
          It&apos;s ME
        </button>
        <button
          onClick={() => lf_scrollToSection('skills')}
          className={`block p-4 w-full l_menu_tab g_RiaSansFont ${
            activeSection === 'skills' ? 'active' : ''
          }
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-themacolor4 focus-visible:ring-offset-2 rounded
          `}
        >
          Skills
        </button>
        <button
          onClick={() => lf_scrollToSection('projects')}
          className={`block p-4 w-full l_menu_tab g_RiaSansFont ${
            activeSection === 'projects' ? 'active' : ''
          }
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-themacolor4 focus-visible:ring-offset-2 rounded
          `}
        >
          Projects
        </button>
        <button
          onClick={() => lf_scrollToSection('career')}
          className={`block p-4 w-full l_menu_tab g_RiaSansFont ${
            activeSection === 'career' ? 'active' : ''
          }
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-themacolor4 focus-visible:ring-offset-2 rounded
          `}
        >
          Career
        </button>
      </nav>
    </header>
  )
}

export default Header
