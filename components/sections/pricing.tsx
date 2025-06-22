"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import { CalculatorForm } from "../forms/calculator-form";

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Калькулятор стоимости сайта"
          subtitle="Рассчитайте примерную стоимость вашего будущего сайта"
          centered
        />

        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <CalculatorForm />
        </motion.div>
      </div>
    </section>
  );
}