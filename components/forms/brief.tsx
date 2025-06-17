"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { STEPS } from "@/constants";

type FormState = Record<string, string>;

export default function BriefForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const sanitizeInput = (value: string): string => {
    // Удаляем HTML-теги и потенциально опасные последовательности
    return value
      .replace(/<[^>]*>/g, '') // HTML-теги
      .replace(/javascript:/gi, '') // JavaScript протокол
      .replace(/data:/gi, '') // Data URL
      .replace(/vbscript:/gi, '') // VBScript
      .replace(/on\w+=/gi, '') // Обработчики событий
      .replace(/expression\s*\(/gi, '') // CSS expressions
      .replace(/eval\s*\(/gi, '') // eval()
      .replace(/document\./gi, '') // document object
      .replace(/window\./gi, ''); // window object
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Обработка поля бюджета
    if (name === 'budget') {
      // Сохраняем позицию курсора
      const cursorPosition = (e.target as HTMLInputElement).selectionStart || 0;

      // Разбиваем на части, если есть диапазон
      const parts = value.split('-').map(part => part.trim());

      // Форматируем каждую часть
      const formattedParts = parts.map(part => {
        // Удаляем все нецифровые символы, кроме дефиса
        const numbers = part.replace(/[^\d]/g, '');
        if (numbers) {
          const formattedNumber = parseInt(numbers).toLocaleString('ru-RU');
          return `${formattedNumber} ₽`;
        }
        return '';
      });

      // Собираем результат
      processedValue = formattedParts.join(' - ');

      // Восстанавливаем позицию курсора после обновления значения
      setTimeout(() => {
        const input = e.target as HTMLInputElement;
        const newPosition = Math.min(cursorPosition, processedValue.length);
        input.setSelectionRange(newPosition, newPosition);
      }, 0);
    } else if (name === 'phone' || name === 'email') {
      // Для телефона и email оставляем как есть, так как у них своя валидация
      processedValue = value;
    } else if (name === 'deadline') {
      // Для даты оставляем как есть, так как у неё своя валидация
      processedValue = value;
    } else {
      // Для всех остальных полей применяем очистку
      processedValue = sanitizeInput(value);
    }

    setForm({ ...form, [name]: processedValue });
    validateField(name, processedValue);
  };

  const validateField = (name: string, value: string) => {
    const question = STEPS.flatMap(s => s.questions).find(q => q.name === name);
    if (!question) return;

    let error = "";
    if (question.required && !value.trim()) {
      error = "Это поле обязательно для заполнения";
    } else if (question.type === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) {
        error = "Введите корректный email адрес";
      }
      if (value.length > 100) {
        error = "Email не должен превышать 100 символов";
      }
    } else if (question.type === "phone") {
      const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
      if (!phoneRegex.test(value)) {
        error = "Введите корректный номер телефона";
      }
    } else if (question.type === "date") {
      const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19|20)\d\d$/;
      if (!dateRegex.test(value)) {
        error = "Введите корректную дату в формате ДД.ММ.ГГГГ";
      }
    } else if (question.type === "budget") {
      const budgetRegex = /^(\d{1,3}(?:\s\d{3})* ₽)(?:\s*-\s*(\d{1,3}(?:\s\d{3})* ₽))?$/;
      if (!budgetRegex.test(value)) {
        error = "Введите сумму в формате: 30 000 ₽ или 30 000 ₽ - 60 000 ₽";
      }
    } else if (question.type === "text") {
      if (value.length > 200) {
        error = "Текст не должен превышать 200 символов";
      }
    } else if (question.type === "textarea") {
      if (value.length > 2000) {
        error = "Текст не должен превышать 2000 символов";
      }
    }

    // Проверка на наличие потенциально опасных последовательностей
    if (/<script|javascript:|data:|vbscript:|on\w+=|expression\s*\(|eval\s*\(|document\.|window\./i.test(value)) {
      error = "Текст содержит недопустимые символы";
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateStep = () => {
    const currentQuestions = STEPS[step].questions;
    let isValid = true;
    const newErrors: Record<string, string> = {};

    currentQuestions.forEach(question => {
      const value = form[question.name] || "";
      validateField(question.name, value);
      if (errors[question.name] || (question.required && !value.trim())) {
        isValid = false;
        newErrors[question.name] = errors[question.name] || "Это поле обязательно для заполнения";
      }
    });

    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Добавляем специальные параметры FormSubmit
      formData.append('_subject', 'Новая заявка на разработку сайта');
      formData.append('_template', 'table');
      formData.append('_captcha', 'false');

      // Добавляем все поля формы с дополнительной очисткой
      Object.entries(form).forEach(([key, value]) => {
        // Дополнительная проверка перед отправкой
        const sanitizedValue = sanitizeInput(value);
        if (sanitizedValue !== value) {
          throw new Error('Обнаружены недопустимые символы в форме');
        }
        formData.append(key, sanitizedValue);
      });

      const response = await fetch('https://formsubmit.co/urdevs.team@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      if (response.ok) {
        toast({
          title: "Бриф отправлен",
          description: "Мы свяжемся с вами в ближайшее время",
        });
        router.push('/');
      } else {
        throw new Error('Ошибка при отправке формы');
      }
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось отправить бриф. Пожалуйста, попробуйте позже или свяжитесь с нами напрямую.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(s => Math.min(s + 1, STEPS.length - 1));
    }
  };

  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  return (
    <div className="container mx-auto">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-4 mb-2">
          {/* <h1 className="text-3xl font-bold">Бриф на разработку сайта</h1> */}
          <div className="w-full bg-secondary h-4 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Шаг {step + 1} из {STEPS.length}: {STEPS[step].title}
          </p>
        </div>

        <div className="border-2 border-[hsl(var(--primary)/0.5)] rounded-lg p-4">
          <div>
            <h2 className="text-2xl font-semibold mb-5 text-center">{STEPS[step].title}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {STEPS[step].questions.map((q) => (
                <div key={q.name} className="space-y-2">
                  <label className="block text-sm font-medium" htmlFor={q.name}>
                    {q.label}
                    {q.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {q.type === "textarea" ? (
                    <Textarea
                      id={q.name}
                      name={q.name}
                      value={form[q.name] || ""}
                      onChange={handleChange}
                      className="min-h-[100px] resize-none"
                      placeholder={q.placeholder}
                      maxLength={2000}
                      onKeyDown={(e) => {
                        // Запрещаем ввод HTML-тегов и опасных символов
                        if (
                          e.key === '<' ||
                          e.key === '>' ||
                          e.key === '{' ||
                          e.key === '}' ||
                          (e.ctrlKey && (e.key === 'v' || e.key === 'V')) // Запрет вставки
                        ) {
                          e.preventDefault();
                        }
                      }}
                      onPaste={(e) => {
                        // Проверяем вставляемый текст
                        const pastedText = e.clipboardData.getData('text');
                        if (/<script|javascript:|data:|vbscript:|on\w+=|expression\s*\(|eval\s*\(|document\.|window\./i.test(pastedText)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  ) : q.type === "phone" ? (
                    <Input
                      type="tel"
                      pattern="\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}"
                      placeholder="+7 (___) ___-__-__"
                      value={form[q.name] || ""}
                      onChange={handleChange}
                      name={q.name}
                      required={q.required}
                    />
                  ) : q.type === "date" ? (
                    <Input
                      type="date"
                      value={form[q.name] || ""}
                      onChange={handleChange}
                      name={q.name}
                      placeholder={q.placeholder}
                      required={q.required}
                    />
                  ) : q.type === "budget" ? (
                    <Input
                      type="text"
                      pattern="[0-9\s]+"
                      placeholder={q.placeholder}
                      value={form[q.name] || ""}
                      onChange={handleChange}
                      name={q.name}
                      required={q.required}
                    />
                  ) : (
                    <Input
                      id={q.name}
                      name={q.name}
                      type={q.type}
                      value={form[q.name] || ""}
                      onChange={handleChange}
                      placeholder={q.placeholder}
                      maxLength={200}
                      onKeyDown={(e) => {
                        // Запрещаем ввод HTML-тегов и опасных символов
                        if (
                          e.key === '<' ||
                          e.key === '>' ||
                          e.key === '{' ||
                          e.key === '}' ||
                          (e.ctrlKey && (e.key === 'v' || e.key === 'V')) // Запрет вставки
                        ) {
                          e.preventDefault();
                        }
                      }}
                    />
                  )}
                  {errors[q.name] && (
                    <p className="text-sm text-red-500 mt-1">{errors[q.name]}</p>
                  )}
                </div>
              ))}

              <div className="flex justify-between p-0 m-0 items-center">
                <Button
                  type="button"
                  onClick={prevStep}
                  disabled={step === 0 || isSubmitting}
                  variant="outline"
                  className="min-w-[120px]"
                >
                  Назад
                </Button>
                {step === STEPS.length - 1 ? (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-w-[120px]"
                  >
                    {isSubmitting ? "Отправка..." : "Отправить"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="min-w-[120px]"
                  >
                    Далее
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}