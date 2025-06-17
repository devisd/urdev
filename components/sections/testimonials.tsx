"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/lib/animations";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Алексей Смирнов",
    company: "ООО «ТехноПром»",
    position: "Генеральный директор",
    text: "Сотрудничество с UR dev превзошло все наши ожидания. Новый сайт значительно увеличил конверсию и упростил процесс взаимодействия с клиентами. Теперь мы можем легко обновлять контент без привлечения технических специалистов.",
    imageSrc: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    initials: "АС",
  },
  {
    id: 2,
    name: "Елена Петрова",
    company: "Интернет-магазин «МодаСтиль»",
    position: "Маркетинг-директор",
    text: "После запуска нового сайта от UR dev наши продажи выросли на 35% за первый месяц. Интуитивно понятная панель управления позволяет нам быстро добавлять товары и акции без специальных знаний. Очень довольны результатом!",
    imageSrc: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    initials: "ЕП",
  },
  {
    id: 3,
    name: "Иван Козлов",
    company: "Строительная компания «СтройХаус»",
    position: "Руководитель отдела продаж",
    text: "UR dev разработали для нас не только качественный сайт, но и удобную CRM-систему, которая значительно упростила наш рабочий процесс. Количество обращений выросло, а время обработки заказов сократилось. Рекомендую!",
    imageSrc: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    initials: "ИК",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Отзывы"
          subtitle="Реальные кейсы наших клиентов — как цифровые решения помогают бизнесу расти и зарабатывать больше"
          centered
        />
        
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={fadeIn('up', index * 0.1)}
            >
              <Card className="h-full border-border/40 transition-all duration-300 hover:border-primary/30 hover:shadow-md overflow-hidden">
                <CardContent className="p-6 flex flex-col h-full">
                  <Quote className="text-primary/30 h-10 w-10 mb-4" />
                  <p className="flex-1 text-muted-foreground mb-6 italic">
                    &quot;{testimonial.text}&quot;
                  </p>
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={testimonial.imageSrc} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.position}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}