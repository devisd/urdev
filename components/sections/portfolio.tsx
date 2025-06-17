"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeroModal } from "@/components/modals/hero-modal/hero-modal";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { motion, AnimatePresence } from "framer-motion";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string[];
  features: string[];
  client: string;
  year: number;
  link?: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: "ecommerce-1",
    title: "МодаСтиль",
    description: "Интернет-магазин модной одежды с функциями фильтрации, поиска и оформления заказа.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800",
    category: ["бьюти"],
    features: [
      "Каталог товаров с фильтрами",
      "Интеграция с платежными системами",
      "Личный кабинет покупателя",
      "Автоматическая генерация SEO-тегов",
      "Мобильная версия"
    ],
    client: "ООО «МодаСтиль»",
    year: 2023,
    link: "https://example.com/modastyle"
  },
  {
    id: "mobile-1",
    title: "FitTrack",
    description: "Мобильное приложение для отслеживания тренировок и питания с аналитикой прогресса.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800",
    category: ["mobile", "app"],
    features: [
      "Трекер тренировок",
      "Дневник питания",
      "Интеграция с фитнес-устройствами",
      "Персональные рекомендации",
      "Статистика и графики"
    ],
    client: "FitLife LLC",
    year: 2024
  },
  {
    id: "webapp-1",
    title: "TaskFlow",
    description: "Веб-приложение для управления проектами и задачами в команде.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800",
    category: ["webapp", "saas"],
    features: [
      "Управление задачами и проектами",
      "Совместная работа в реальном времени",
      "Диаграмма Ганта",
      "Отчеты и аналитика",
      "Интеграция с популярными сервисами"
    ],
    client: "TaskFlow Inc.",
    year: 2024,
    link: "https://example.com/taskflow"
  }
];

const categories = [
  { value: "all", label: "Все проекты" },
  { value: "web", label: "Веб-сайты" },
  { value: "e-commerce", label: "Интернет-магазины" },
  { value: "mobile", label: "Мобильные приложения" },
  { value: "webapp", label: "Веб-приложения" },
  { value: "landing", label: "Лендинги" },
];

export function PortfolioSection() {
  const [openedId, setOpenedId] = useState<string | null>(null);
  const [showHeroModal, setShowHeroModal] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Закрытие карточки по клику вне
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!sectionRef.current) return;
      if (!(e.target instanceof Node)) return;
      if (!sectionRef.current.contains(e.target)) {
        setOpenedId(null);
      }
    }
    function handleScroll() {
      setOpenedId(null);
    }
    if (openedId) {
      document.addEventListener("mousedown", handleClick);
      // Только на md и выше (ширина >= 768px) закрываем по скроллу
      if (window.innerWidth >= 768) {
        window.addEventListener("scroll", handleScroll, true);
      }
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
      if (window.innerWidth >= 768) {
        window.removeEventListener("scroll", handleScroll, true);
      }
    };
  }, [openedId]);

  return (
    <section id="portfolio" className="py-24 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Наше портфолио"
          subtitle="Примеры наших успешных проектов"
          centered
        />
        <div
          ref={sectionRef}
          className="flex flex-col md:flex-row gap-4 w-full max-w-6xl md:h-[70vh] mx-auto mt-10 px-0 md:px-10"
        >
          {portfolioItems.map((item, i) => {
            const opened = openedId === item.id;
            return (
              <motion.div
                key={item.id}
                layout
                transition={{ layout: { duration: 0.5, type: "spring" } }}
                className={`relative flex flex-col justify-end gap-6 p-6 rounded-xl md:h-full cursor-pointer overflow-hidden group transition-all duration-500 bg-gradient-to-b from-neutral-800/80 to-black/80 ${opened ? "md:w-[70%] w-full z-20 shadow-2xl" : "md:w-1/3 w-full z-10"} ${opened ? 'md:min-h-[320px]' : 'min-h-[320px]'}`}
                style={{ minHeight: opened ? undefined : 320 }}
                onClick={() => setOpenedId(opened ? null : item.id)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center absolute inset-0 -z-20 transition-all duration-500 group-hover:scale-105"
                  style={{ zIndex: -20 }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={i === 0}
                />
                {/* Верхний блок с аватаркой, заголовком и категориями — только для раскрытой карточки */}
                {opened && (
                  <div className="flex flex-row items-center gap-4 z-10">
                    <div className="rounded-full border-4 border-white/20 bg-white/30 dark:bg-black/30 w-16 h-16 flex items-center justify-center overflow-hidden">
                      <span className="text-2xl font-bold text-white/80 dark:text-white/90">
                        {item.title[0]}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-2xl font-semibold text-pink-50 whitespace-nowrap">
                        {item.title}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {item.category.map((cat) => (
                          <Badge key={cat} variant="secondary" className="bg-white/10 hover:bg-white/20 text-white/80 dark:text-white/90">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {/* Затенение снизу карточки */}
                {!opened && (
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 via-black/80 to-transparent pointer-events-none rounded-b-xl z-10" />
                )}
                {/* Только для нераскрытой карточки: заголовок и категории, описание скрыто */}
                {!opened && (
                  <div className="absolute left-0 bottom-0 w-full p-6 z-20 flex flex-col gap-2">
                    <span className="text-2xl font-semibold text-pink-50 whitespace-nowrap">
                      {item.title}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {item.category.map((cat) => (
                        <Badge key={cat} variant="secondary" className="bg-white/10 hover:bg-white/20 text-white/80 dark:text-white/90">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {/* В раскрытом виде — всё содержимое */}
                <AnimatePresence>
                  {opened && (
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 40 }}
                      transition={{ duration: 0.3 }}
                      className="md:absolute md:inset-0 relative w-full h-auto bg-black/80 dark:bg-neutral-900/90 flex flex-col justify-end p-8 z-30 rounded-xl overflow-y-auto md:max-h-full max-h-[90vh]"
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="flex flex-col gap-2 mb-4">
                        <span className="text-lg font-semibold text-white">{item.title}</span>
                        <span className="text-xs text-white/70">{item.client} • {item.year}</span>
                        <p className="text-white/90 mt-2">{item.description}</p>
                        <ul className="list-disc list-inside text-white/80 mt-2 text-sm">
                          {item.features.map(f => (
                            <li key={f}>{f}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-row gap-4 mt-4">
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition"
                          >
                            Перейти к проекту
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <Button size="lg" onClick={() => setShowHeroModal(true)}>
            Обсудить ваш проект
          </Button>
        </div>
        <AnimatePresence>
          {showHeroModal && (
            <HeroModal
              title="Обсудить ваш проект"
              description="Заполните информацию для получения готового сайта и расчета стоимости"
              onClose={() => setShowHeroModal(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}