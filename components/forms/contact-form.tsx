import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { useToast } from '../ui/use-toast';

interface ContactFormProps {
    onSuccess: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSuccess }) => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Здесь будет логика отправки формы
        toast({
            title: 'Заявка отправлена',
            description: 'Мы свяжемся с вами в ближайшее время',
        });
        setIsSubmitting(false);
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div>
                <Label htmlFor="name" className="text-base">Имя</Label>
                <Input
                    id="name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={isSubmitting}
                    className="h-12"
                    placeholder="Иван Иванов"
                />
            </div>
            <div>
                <Label htmlFor="phone" className="text-base">Телефон</Label>
                <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    required
                    disabled={isSubmitting}
                    className="h-12"
                    placeholder="+7 (900) 123-45-67"
                />
            </div>
            <div>
                <Label htmlFor="email" className="text-base">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={isSubmitting}
                    className="h-12"
                    placeholder="email@example.com"
                />
            </div>
            <div>
                <Label htmlFor="message" className="text-base">Комментарий или вопрос</Label>
                <Textarea
                    id="message"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
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
                    'Отправить'
                )}
            </Button>
        </form>
    );
};
