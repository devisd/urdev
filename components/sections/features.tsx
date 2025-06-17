"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn, zoomIn } from "@/lib/animations";
import { BedIcon as SpeedIcon, WrenchIcon, LineChartIcon, SearchIcon, SmartphoneIcon, ShieldIcon, ZapIcon, HeartIcon } from "lucide-react";

const features = [
  {
    title: "Высокая скорость разработки",
    description: "Разрабатываем сайт в кратчайшие сроки — от 2-х дней",
    icon: SpeedIcon,
  },
  {
    title: "Индивидуальная настройка",
    description: "Мы адаптируем каждый лендинг под уникальные задачи вашего бизнеса, обеспечивая максимальную эффективность.",
    icon: WrenchIcon,
  },
  {
    title: "Сбор аналитики",
    description: "Подключаем аналитические инструменты для сбора информации о поведении клиентов на вашем сайте",
    icon: LineChartIcon,
  },
  {
    title: "SEO-оптимизация",
    description: "Продвижение в поисковых системах для привлечения целевой аудитории",
    icon: SearchIcon,
  },
  {
    title: "Адаптивный дизайн",
    description: "Идеальное отображение на всех устройствах и экранах",
    icon: SmartphoneIcon,
  },
  {
    title: "Высокая производительность",
    description: "Оптимизируем сайт под максимальное удобство для пользователя",
    icon: ZapIcon,
  },
  {
    title: "Передовые технологии",
    description: "Используем современные технологии для создания надежных решений",
    icon: HeartIcon,
  },
  {
    title: "Индивидуальный подход",
    description: "Разрабатываем решения с учетом специфики вашего бизнеса",
    icon: HeartIcon,
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Наши возможности"
          subtitle="Мы разрабатываем эффективные цифровые решения под реальные задачи вашего бизнеса"
          centered
        />

        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeIn('up', index * 0.1)}
            >
              <Card className="h-full border-border/40 transition-all duration-300 hover:border-primary/50 hover:shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}