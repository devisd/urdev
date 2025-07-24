"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HeroModal } from "./modals/hero-modal/hero-modal";
import { ThemeIcon, Logo } from "./Icons";

const navItems = [
  { label: "Главная", href: "#hero" },
  { label: "Возможности", href: "#features" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Отзывы", href: "#testimonials" },
  { label: "Цены", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contact" },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Определяем активный раздел при скролле
      const sections = navItems.map(item => item.href);
      const scrollPosition = window.scrollY + 100; // Небольшой отступ для лучшего определения

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.querySelector(sections[i]);
        if (section) {
          const sectionTop = (section as HTMLElement).offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (pathname === "/brief") {
      // Если мы на странице брифа, переходим на главную с якорем
      router.push(`/${href}`);
    } else {
      // Если мы на главной странице, используем плавную прокрутку
      document.querySelector(href)?.scrollIntoView({
        behavior: "smooth",
      });
    }

    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-10 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-background/40 backdrop-blur-sm border-b" : "bg-transparent"
        )}
      >
        <div className="container mx-auto max-2xl:max-w-[95%]">
          <div className="flex items-center justify-between bg-[#F5F6FBF5] dark:bg-white/10 opacity-95 px-10 lg:px-4 xl:px-10 rounded-[90px]">
            <div className="flex items-center">
              <Link href="/" >
                <Logo />
              </Link>
              <p className="w-[140px] max-2xl:text-xs text-lg">Быстрая разработка сайтов под ключ</p>
            </div>

            <nav className="hidden lg:flex py-5 mx-1 items-center">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavigation(e, item.href)}
                  className={cn(
                    "xl:px-[30px] px-4 py-[15px] max-2xl:text-sm text-[20px] transition-colors",
                    activeSection === item.href
                      ? "text-primary bg-white dark:bg-white/20 dark:text-white rounded-[60px]"
                      : "text-foreground/60 hover:text-foreground"
                  )}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowContactModal(true)}
                className="hidden xl:flex bg-white transition-colors duration-200 hover:bg-opacity-10 hover:text-primary dark:hover:bg-white dark:hover:text-primary dark:bg-white/20 rounded-[90px] text-foreground text-[20px] max-2xl:text-sm px-5 xl:px-[50px] py-[15px] shadow-[5px_5px_15px_0px_rgba(35,98,225,0.2)]"
              >
                Связаться
              </button>

              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hidden lg:flex transition-colors duration-200 hover:bg-opacity-10 dark:hover:bg-white dark:hover:stroke-inherit p-[10px] bg-white dark:bg-white/20 dark:stroke-white flex-1 shrink-0 shadow-[5px_5px_15px_0px_rgba(35,98,225,0.2)] rounded-full"
              >
                <ThemeIcon />
              </button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
                <span className="sr-only">Меню</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-24 z-40 bg-background/80 backdrop-blur-sm border-b lg:hidden"
          >
            <nav className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavigation(e, item.href)}
                    className={cn(
                      "px-4 py-2 text-sm font-medium transition-colors",
                      activeSection === item.href
                        ? "text-foreground font-semibold bg-foreground/10 rounded-md"
                        : "text-foreground/60 hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </a>
                ))}
                <Button
                  size="sm"
                  onClick={() => {
                    setShowContactModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Связаться
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-full mt-2"
                >
                  <Sun className="h-4 w-4 block transition-all dark:hidden" />
                  <Moon className="h-4 w-4 hidden transition-all dark:block" />
                  <span className="ml-2">Переключить тему</span>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {
        showContactModal && (
          <HeroModal
            title="Оставьте заявку"
            description="Расскажите о вашем проекте, и мы свяжемся с вами для обсуждения деталей"
            onClose={() => setShowContactModal(false)}
          />)}
    </>
  );
}