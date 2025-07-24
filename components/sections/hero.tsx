"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { useState, useEffect } from "react";
import { HeroModal } from "../modals/hero-modal/hero-modal";

export function HeroSection() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const words = [
    { text: "конверсионные", bgColor: "bg-[#2362E1]", textColor: 'text-white' },
    { text: "продающие", bgColor: "bg-[#98E123]", textColor: 'text-black' },
    { text: "красивые", bgColor: "bg-gradient-to-r from-[#5DB6FF] to-[#FF48FC]", textColor: 'text-white' },
    { text: "современные", bgColor: "bg-gradient-to-r from-[#23E1E1] to-[#78EBFF]", textColor: 'text-[#232435]' },
    { text: "лидирующие", bgColor: "bg-[#D7CCAD]", textColor: 'text-[#1C1C1C]' },
    { text: "уникальные", bgColor: "bg-[#FDCC45]", textColor: 'text-[#1C1C1C]' },
    { text: "эффективные", bgColor: "bg-[#FD4545]", textColor: 'text-white' },
    { text: "прибыльные", bgColor: "bg-gradient-to-r from-[#98E123] to-[#FFDE58]", textColor: 'text-black' },
    { text: "удобные", bgColor: "bg-[#E0ECEF]", textColor: 'text-black' },
    { text: "цепляющие", bgColor: "bg-[#642AAA]", textColor: 'text-white' },
  ];

  const portfolioSlides = [
    { id: 1, title: "E-commerce Platform", color: "bg-gradient-to-br from-blue-400 to-purple-500" },
    { id: 2, title: "Corporate Website", color: "bg-gradient-to-br from-green-400 to-blue-500" },
    { id: 3, title: "Landing Page", color: "bg-gradient-to-br from-pink-400 to-red-500" },
    { id: 4, title: "Blog Platform", color: "bg-gradient-to-br from-yellow-400 to-orange-500" },
    { id: 5, title: "Portfolio Site", color: "bg-gradient-to-br from-indigo-400 to-purple-500" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 500);

    return () => clearInterval(interval);
  }, [words.length]);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % portfolioSlides.length);
    }, 2000);

    return () => clearInterval(slideInterval);
  }, [portfolioSlides.length]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex lg:items-center pt-40 lg:pt-[160px] pb-16 overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-20">
        <div className="flex flex-col lg:flex-row justify-center 2xl:justify-between items-center gap-4 lg:gap-8">
          <motion.div
            className="order-2 lg:order-1 flex-1 w-full max-w-[600px]"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeIn('right', 0.2)}
          >
            <div>
              <div className="flex flex-col">
                <h1 className="text-foreground font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-none">UR DEV -</h1>
                <span className="text-2xl 2xl:w-[1200px] lg:text-[48px] my-5 lg:items-start items-baseline flex flex-wrap sm:gap-[14px] sm:items-center text-foreground">
                  разрабатываем{" "}
                  <span
                    key={currentWordIndex}
                    className={`block w-full max-w-[150px] max-sm:mx-2 sm:max-w-[280px] lg:max-w-[350px] text-center pt-0 pb-1 px-0 rounded-[50px] ${words[currentWordIndex].textColor} tracking-[-0.02em] ${words[currentWordIndex].bgColor} text-lg sm:text-xl md:text-2xl lg:text-[48px] leading-[100%]`}
                  >
                    {words[currentWordIndex].text}
                  </span>{" "}
                  сайты
                </span>
              </div>
              <ul className="text-lg sm:text-xl md:text-2xl flex flex-col items-start my-8 sm:my-12 lg:my-[60px] space-y-2 text-[#717E98] dark:text-white">
                <li className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mr-1"></div>
                  Нешаблонные сайты от 2 дней.
                </li>
                <li className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mr-1"></div>
                  Проработанный дизайн для роста конверсий.
                </li>
                <li className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mr-1"></div>
                  Поддержка веб-сайтов 24/7
                </li>
              </ul>
              <div className="flex flex-col 2xl:w-[1200px] flex-1 2xl:flex-row justify-start gap-3 sm:gap-[15px]">
                <a href="#pricing" className="bg-[#2362E1] dark:bg-white/10 text-primary-foreground px-6 sm:px-10 py-4 sm:py-5 rounded-[90px] text-lg sm:text-xl lg:text-2xl text-center">Посчитать стоимость проекта</a>
                <button className="bg-[#2362E11A] dark:bg-white/10 text-foreground px-6 sm:px-10 py-4 sm:py-5 rounded-[90px] text-lg sm:text-xl lg:text-2xl" onClick={() => setShowContactModal(true)}>Свяжитесь со мной</button>
              </div>
            </div>
          </motion.div>

          {/* Простой вертикальный слайдер */}
          <motion.div
            className="order-1 hidden lg:block lg:order-2 lg:w-[360px] xl:w-[475px] h-[566px]"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeIn('left', 0.2)}
          >
            <div className="w-full h-full bg-[#2D2D2D] rounded-[30px] p-3 shadow-2xl">
              <div className="w-full h-full overflow-hidden rounded-[12px] border-2 border-gray-600">
                <motion.div
                  className="flex flex-col"
                  animate={{ y: -currentSlideIndex * 566 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  {portfolioSlides.map((slide) => (
                    <div
                      key={slide.id}
                      className={`w-full h-[566px] flex items-center justify-center ${slide.color}`}
                    >
                      <div className="text-center text-white p-4">
                        <div className="w-16 h-16 bg-white/20 rounded-lg mb-4 mx-auto"></div>
                        <h3 className="text-lg font-semibold mb-2">{slide.title}</h3>
                        <div className="space-y-2">
                          <div className="w-32 h-3 bg-white/30 rounded mx-auto"></div>
                          <div className="w-24 h-3 bg-white/20 rounded mx-auto"></div>
                          <div className="w-28 h-3 bg-white/25 rounded mx-auto"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {
        showContactModal && (
          <HeroModal
            title="Оставьте заявку"
            description="Расскажите о вашем проекте, и мы свяжемся с вами для обсуждения деталей"
            onClose={() => setShowContactModal(false)}
          />)}
    </section >
  );
}