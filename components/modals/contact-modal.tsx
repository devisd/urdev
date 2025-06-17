import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface ContactModalProps {
  onClose: () => void;
  title?: string;
  description?: string;
}

export function ContactModal({ onClose, title = "Обсудить проект", description = "Оставьте свои контактные данные, и мы свяжемся с вами для обсуждения деталей" }: ContactModalProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBriefClick = () => {
    onClose();
    router.push("/brief");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Здесь будет логика отправки формы
    toast({
      title: "Заявка отправлена",
      description: "Мы свяжемся с вами в ближайшее время",
    });
    onClose();
    setIsSubmitting(false);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-8">
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center gap-2 border-2 p-6 rounded-lg border-[hsl(var(--primary)/0.5)]">
            <p className="text-sm text-center border-color ">
              Заполните информацию для получения готового сайта и расчета стоимости
            </p>
            <Button onClick={handleBriefClick} className="w-full" variant="outline">
              Заполнить информацию
            </Button>
          </div>
        </div>
        <div className="font-semibold text-center">ИЛИ</div>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base">Имя</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              required
              disabled={isSubmitting}
              className="h-12"
              placeholder="Иван Иванов"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-base">Телефон</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              onFocus={() => setFocusedField('phone')}
              onBlur={() => setFocusedField(null)}
              required
              disabled={isSubmitting}
              className="h-12"
              placeholder="+7 (900) 123-45-67"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              required
              disabled={isSubmitting}
              className="h-12"
              placeholder="email@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-base">Комментарий или вопрос</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              disabled={isSubmitting}
              className="min-h-[120px]"
              placeholder="Расскажите нам о вашем проекте"
            />
          </div>
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
              "Отправить"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
} 