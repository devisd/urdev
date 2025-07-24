"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MailIcon, PhoneIcon, MapPinIcon, FacebookIcon, TwitterIcon, InstagramIcon } from "lucide-react";
import { Logo } from "./Icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-muted/40 dark:bg-muted/20 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* О компании */}
          <div>
            <Link href="/">
              <Logo />
            </Link>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Профессиональная разработка сайтов и приложений, которые
              увеличивают продажи и упрощают настройку.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" aria-label="Facebook">
                <FacebookIcon className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <TwitterIcon className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <InstagramIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Навигация */}
          <div>
            <h3 className="font-bold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#hero"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => handleSmoothScroll(e, "#hero")}
                >
                  Главная
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => handleSmoothScroll(e, "#features")}
                >
                  Возможности
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => handleSmoothScroll(e, "#portfolio")}
                >
                  Портфолио
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => handleSmoothScroll(e, "#pricing")}
                >
                  Цены
                </a>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="font-bold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:+79001234567" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <PhoneIcon className="h-5 w-5 mr-2" />
                  +7 (900) 123-45-67
                </a>
              </li>
              <li>
                <a href="mailto:info@urdev.ru" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <MailIcon className="h-5 w-5 mr-2" />
                  info@urdev.ru
                </a>
              </li>
              <li>
                <div className="flex items-start text-muted-foreground">
                  <MapPinIcon className="h-5 w-5 mr-2 mt-1" />
                  <span>
                    123456, Россия, Москва,<br />
                    ул. Примерная, д. 1
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} UR dev. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}