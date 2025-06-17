"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn, zoomIn } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PortfolioModal } from "@/components/modals/portfolio-modal";
import { ContactModal } from "@/components/modals/contact-modal";

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
    id: "corporate-1",
    title: "ТехноПром",
    description: "Корпоративный сайт для промышленной компании с каталогом продукции и формой обратной связи.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800",
    category: ["промышленность"],
    features: [
      "Интерактивная презентация компании",
      "Каталог продукции с фильтрами",
      "Интеграция с CRM",
      "Многоязычность (RU/EN)",
      "Калькулятор стоимости"
    ],
    client: "ОАО «ТехноПром»",
    year: 2023
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
    id: "landing-1",
    title: "АвтоЭксперт",
    description: "Лендинг для сервиса по подбору и проверке автомобилей с формой заявки.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800",
    category: ["landing", "web"],
    features: [
      "Интерактивные анимации",
      "Форма заявки с валидацией",
      "Интеграция с CRM",
      "Оптимизация для поисковых систем",
      "Адаптивный дизайн"
    ],
    client: "ИП Автоэксперт",
    year: 2023
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
  },
  {
    id: "ecommerce-2",
    title: "ТехноМаркет",
    description: "Интернет-магазин электроники с расширенным функционалом и интеграцией с 1С.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800",
    category: ["e-commerce", "web"],
    features: [
      "Синхронизация с 1С",
      "Умный поиск и фильтры",
      "Сравнение товаров",
      "Программа лояльности",
      "Мультивалютность"
    ],
    client: "ООО «ТехноМаркет»",
    year: 2023
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
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <section id="portfolio" className="py-24">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Наше портфолио"
          subtitle="Примеры наших успешных проектов"
          centered
        />
        
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={fadeIn('up', index * 0.1)}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
              onClick={() => setSelectedProject(item)}
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-medium mb-2">{item.title}</h3>
                  <p className="text-white/90 text-sm mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.category.map((cat) => (
                      <Badge key={cat} variant="secondary" className="bg-white/10 hover:bg-white/20">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          variants={zoomIn(0.4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-12 text-center"
        >
          <Button 
            size="lg"
            onClick={() => setShowContactModal(true)}
          >
            Обсудить ваш проект
          </Button>
        </motion.div>
      </div>

      {selectedProject && (
        <PortfolioModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {showContactModal && (
        <ContactModal
          title="Обсудить ваш проект"
          description="Расскажите нам о вашей идее, и мы поможем реализовать её"
          onClose={() => setShowContactModal(false)}
        />
      )}
    </section>
  );
}