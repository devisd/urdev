"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { useState } from "react";
import { ContactModal } from "@/components/modals/contact-modal";
import { WaveBackground } from "../ui/wave-background";
import { HeroButton } from "../ui/hero-button/hero-button";

export function HeroSection() {
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
    >
      <WaveBackground />
      <div className="container mx-auto px-4 relative z-20">
        <div className="flex justify-center items-center">
          <motion.div
            className="order-2 lg:order-1"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeIn('right', 0.2)}
          >
            <h1 className="text-4xl md:text-5xl flex gap-2 lg:text-5xl text-center flex-row max-lg:flex-col font-bold tracking-tight mb-6">
              <span className="text-primary">UR dev</span> <p className="max-lg:hidden">-</p> разрабатываем продающие сайты
            </h1>
            <p className="text-xl text-center mb-8">
              Нешаблонные сайты от 2 дней. Проработанный дизайн для роста конверсий.
            </p>
            <div className="flex justify-center mt-20">
              <HeroButton text="Создать сайт" className="h-10" onClick={() => setShowContactModal(true)} />
            </div>
          </motion.div>
        </div>
      </div>

      {
        showContactModal && (
          <ContactModal
            title="Оставьте заявку"
            description="Расскажите о вашем проекте, и мы свяжемся с вами для обсуждения деталей"
            onClose={() => setShowContactModal(false)}
          />
        )
      }
    </section >
  );
}