"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "@/components/ui/section-heading";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { MailIcon, PhoneIcon, MapPinIcon, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: z.string().email("Введите корректный email"),
  phone: z.string().min(6, "Введите корректный номер телефона"),
  message: z.string().min(10, "Сообщение должно содержать минимум 10 символов"),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    
    try {
      // Here you would normally integrate with Mailgun API
      // For demo purposes, we'll simulate a successful submission after 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Form submitted:", values);
      setIsSuccess(true);
      toast({
        title: "Сообщение отправлено",
        description: "Мы свяжемся с вами в ближайшее время",
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        form.reset();
      }, 3000);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение. Попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Связаться с нами"
          subtitle="Обсудите ваш проект с нашими специалистами"
          centered
        />
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              variants={fadeIn('right', 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              <h3 className="text-2xl font-bold mb-6">Контактная информация</h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 shrink-0">
                    <MailIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <a href="mailto:info@urdev.ru" className="text-muted-foreground hover:text-primary transition-colors">
                      info@urdev.ru
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 shrink-0">
                    <PhoneIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Телефон</h4>
                    <a href="tel:+79001234567" className="text-muted-foreground hover:text-primary transition-colors">
                      +7 (900) 123-45-67
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 shrink-0">
                    <MapPinIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Адрес</h4>
                    <p className="text-muted-foreground">
                      Москва, ул. Примерная, 123, офис 45
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/30 p-6 rounded-lg border border-border/40">
                <h4 className="font-medium mb-2">Режим работы</h4>
                <p className="text-muted-foreground mb-4">
                  Понедельник – пятница: 9:00 – 18:00<br />
                  Суббота – воскресенье: Выходные
                </p>
                <p className="text-sm">
                  Мы стараемся ответить на все запросы в течение 24 часов в рабочие дни.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              variants={staggerContainer(0.1, 0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              {isSuccess ? (
                <motion.div
                  variants={fadeIn('up', 0.2)}
                  className="h-full flex flex-col items-center justify-center text-center bg-muted/20 p-8 rounded-lg border border-border/40"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Сообщение отправлено</h3>
                  <p className="text-muted-foreground mb-6">
                    Спасибо за обращение! Мы свяжемся с вами в ближайшее время.
                  </p>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <motion.div variants={fadeIn('up', 0.1)}>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">Имя</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Иван Иванов" 
                                {...field} 
                                disabled={isSubmitting}
                                className="h-12"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <motion.div variants={fadeIn('up', 0.2)}>
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base">Email</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="email@example.com" 
                                  {...field} 
                                  disabled={isSubmitting}
                                  className="h-12"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                      
                      <motion.div variants={fadeIn('up', 0.3)}>
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base">Телефон</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="+7 (900) 123-45-67" 
                                  {...field} 
                                  disabled={isSubmitting}
                                  className="h-12"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    </div>
                    
                    <motion.div variants={fadeIn('up', 0.4)}>
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">Сообщение</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Расскажите нам о вашем проекте"
                                rows={5}
                                {...field}
                                disabled={isSubmitting}
                                className="min-h-[120px]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                    
                    <motion.div variants={fadeIn('up', 0.5)}>
                      <Button 
                        type="submit" 
                        className="w-full h-12 text-base font-medium"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            Отправка...
                          </div>
                        ) : (
                          "Отправить сообщение"
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}