"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Сколько времени займет разработка сайта?",
    answer: "Сроки разработки зависят от сложности проекта. Одностраничный сайт может быть готов за 1-2 недели, многостраничный сайт или интернет-магазин – 4-8 недель. Точные сроки мы определяем после детального обсуждения требований."
  },
  {
    question: "Можно ли самостоятельно обновлять контент на сайте?",
    answer: "Да, все наши проекты включают систему управления контентом, которая позволяет легко обновлять информацию без технических знаний. Мы также проводим обучение по работе с административной панелью."
  },
  {
    question: "Какие гарантии вы предоставляете?",
    answer: "Мы предоставляем гарантию на наши разработки от 6 до 12 месяцев в зависимости от выбранного тарифа. В течение гарантийного срока мы бесплатно исправляем любые обнаруженные ошибки и проблемы."
  },
  {
    question: "Включает ли стоимость разработки хостинг и домен?",
    answer: "Стоимость хостинга и домена не включена в базовую стоимость разработки, но мы можем помочь с их регистрацией и настройкой как дополнительную услугу. Также мы можем порекомендовать надежные хостинг-провайдеры."
  },
  {
    question: "Что входит в SEO-оптимизацию сайта?",
    answer: "В базовую SEO-оптимизацию входит: настройка мета-тегов, оптимизация скорости загрузки, адаптивная верстка, настройка XML-карты сайта и robots.txt, базовая структурная оптимизация. Расширенная оптимизация дополнительно включает работу с ключевыми словами и контентом."
  },
  {
    question: "Можете ли вы доработать существующий сайт?",
    answer: "Да, мы выполняем доработку и модернизацию существующих сайтов. Стоимость и сроки зависят от текущего состояния проекта и требуемых изменений. Для оценки необходим аудит вашего сайта."
  },
  {
    question: "Как происходит процесс оплаты?",
    answer: "Мы работаем по предоплате 50% от стоимости проекта. Оставшаяся сумма выплачивается после завершения работ и тестирования. При выборе годовой подписки оплата происходит раз в месяц или единовременно со скидкой 10%."
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Часто задаваемые вопросы"
          subtitle="Ответы на самые распространенные вопросы о нашей работе"
          centered
        />
        
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeIn('up', index * 0.1)}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
        
        <motion.div
          variants={fadeIn('up', 0.5)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Не нашли ответ на свой вопрос? Свяжитесь с нами, и мы с радостью поможем.
          </p>
          <Button 
            onClick={() => {
              document.querySelector("#contact")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Задать вопрос
          </Button>
        </motion.div>
      </div>
    </section>
  );
}