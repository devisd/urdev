import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '../../ui/button';
import BriefForm from '../../forms/brief';
import { ContactForm } from '../../forms/contact-form';
import './hero-modal.css';

interface HeroModalProps {
    title: string;
    description: string;
    onClose: () => void;
};

// Контентная часть для модального окна
const HeroModalContent = ({ mode, setMode, title }: { mode: 'contact' | 'brief', setMode: (m: 'contact' | 'brief') => void, title: string }) => (
    mode === 'contact' ? (
        <>
            <h2 className="text-2xl md:text-4xl font-extrabold mb-2 md:mb-4 text-secondary text-center">{title}</h2>
            <p className="text-sm md:text-base text-center text-secondary mb-4 md:mb-10">
                Заполните информацию для получения готового сайта и расчета стоимости
            </p>
            <Button onClick={() => setMode('brief')} className="w-full max-w-xs md:w-auto pointer-events-auto mb-6 md:mb-0" variant="secondary">
                Заполнить информацию
            </Button>
        </>
    ) : (
        <>
            <h2 className="text-2xl md:text-4xl font-extrabold mb-2 md:mb-4 text-secondary text-center">Бриф на разработку сайта</h2>
            <span className="text-sm md:text-base text-secondary text-center mb-4 md:mb-10 block">
                Если у вас возникают вопросы, менеджер поможет вам с заполнением
            </span>
            <Button
                onClick={() => setMode('contact')}
                variant="secondary"
                className="w-full max-w-xs md:w-auto pointer-events-auto mb-6 md:mb-0"
            >
                Связаться с менеджером
            </Button>
        </>
    )
);

export const HeroModal = ({ title, description, onClose }: HeroModalProps) => {
    const [mode, setMode] = useState<'contact' | 'brief'>('contact');
    const [displayedMode, setDisplayedMode] = useState<'contact' | 'brief'>('contact');
    const [isMobile, setIsMobile] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [isSwitching, setIsSwitching] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 300); // 300ms = длительность анимации
        return () => clearTimeout(timer);
    }, []);

    // Управление плавным переключением между режимами
    const handleSetMode = (newMode: 'contact' | 'brief') => {
        if (mode === newMode) return;
        setIsSwitching(true);
        setTimeout(() => {
            setDisplayedMode(newMode);
            setIsSwitching(false);
            setMode(newMode);
        }, 300); // 300ms = длительность transition
        setMode(newMode);
    };

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <DialogContent className={`p-0 bg-transparent shadow-none border-none overflow-visible max-w-3xl hrmod-dialog-content`}>
                <div className={`hrmodContainer ${mode} ${isMobile ? 'min-h-screen overflow-y-auto h-auto' : 'h-[90vh]'} w-full flex items-center justify-center bg-black relative`}>
                    <div className={`hrmodBg absolute top-0 right-0 w-full h-full -z-10`} />
                    {/* Контентная часть всегда присутствует */}
                    {isMobile ? (
                        <div className="w-full h-full flex flex-col items-center justify-start z-20 px-4 py-10">
                            <HeroModalContent mode={displayedMode} setMode={handleSetMode} title={title} />
                            {/* Одна форма */}
                            <div className="w-full flex flex-col items-center justify-center mt-4">
                                {displayedMode === 'brief' ? (
                                    <div className="w-full h-full max-w-xl">
                                        <BriefForm />
                                    </div>
                                ) : (
                                    <div className="w-full max-w-md">
                                        <ContactForm onSuccess={onClose} />
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className={`flex flex-row w-full h-full z-10`}>
                                {/* Бриф */}
                                <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4">
                                    <div className={`transition-transform duration-300 ${mode === 'brief' ? 'scale-100' : 'scale-0'} w-full max-w-xl`}>
                                        {displayedMode === 'brief' && <BriefForm />}
                                    </div>
                                </div>
                                {/* Контакты */}
                                <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4">
                                    <div className={`transition-transform duration-300 ${mode === 'contact' ? 'scale-100' : 'scale-0'} w-full max-w-md`}>
                                        {displayedMode === 'contact' && <ContactForm onSuccess={onClose} />}
                                    </div>
                                </div>
                            </div>
                            {/* Абсолютная контентная часть для desktop */}
                            {showContent && (
                                <div className="absolute top-0 left-0 w-full h-full flex flex-col md:flex-row pointer-events-none z-20">
                                    <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
                                        <div className={`transition-all duration-300 ${mode === 'contact' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-32'} text-white m-8 text-center pointer-events-none`}>
                                            {displayedMode === 'contact' && <HeroModalContent mode={displayedMode} setMode={handleSetMode} title={title} />}
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
                                        <div className={`transition-all duration-300 ${mode === 'brief' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-32'} text-white m-8 text-center pointer-events-none`}>
                                            {displayedMode === 'brief' && <HeroModalContent mode={displayedMode} setMode={handleSetMode} title={title} />}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
} 