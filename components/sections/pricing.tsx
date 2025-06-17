"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn, zoomIn } from "@/lib/animations";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PricingModal } from "@/components/modals/pricing-modal";

const pricingPlans = [
  {
    id: "basic",
    name: "Базовый",
    description: "Идеально для малого бизнеса и стартапов",
    monthlyPrice: 30000,
    yearlyPrice: 324000,
    features: [
      "Одностраничный сайт",
      "Адаптивный дизайн",
      "Базовое SEO",
      "Интеграция с соцсетями",
      "3 правки после сдачи",
      "Техподдержка 2 месяца"
    ],
  },
  {
    id: "standard",
    name: "Стандарт",
    description: "Оптимальное решение для растущего бизнеса",
    monthlyPrice: 60000,
    yearlyPrice: 648000,
    features: [
      "До 5 страниц",
      "Адаптивный дизайн",
      "Расширенное SEO",
      "Интеграция CRM",
      "Система управления контентом",
      "5 правок после сдачи",
      "Техподдержка 6 месяцев"
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Премиум",
    description: "Комплексное решение для среднего и крупного бизнеса",
    monthlyPrice: 75000,
    yearlyPrice: 810000,
    features: [
      "До 15 страниц",
      "Уникальный дизайн",
      "Полная SEO-оптимизация",
      "Интеграция со всеми системами",
      "Расширенная аналитика",
      "Неограниченные правки 1 месяц",
      "Техподдержка 12 месяцев"
    ],
  },
];

export function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  function formatPrice(price: number) {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price);
  }

  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Тарифы и цены"
          subtitle="Выберите оптимальное решение для вашего бизнеса"
          centered
        />
        
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              variants={fadeIn('up', index * 0.1)}
              className="flex"
            >
              <Card 
                className={`flex flex-col w-full border-border/40 transition-all duration-300 hover:shadow-lg cursor-pointer ${
                  plan.popular ? "border-primary/50 relative" : "hover:border-primary/30"
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                    Популярный выбор
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <p className="text-3xl font-bold">
                      {formatPrice(plan.monthlyPrice)}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto pt-6">
                  <Button 
                    variant={plan.popular ? "default" : "outline"} 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlan(plan.id);
                    }}
                  >
                    Выбрать тариф
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedPlan && (
        <PricingModal
          plan={pricingPlans.find(p => p.id === selectedPlan)!}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </section>
  );
}