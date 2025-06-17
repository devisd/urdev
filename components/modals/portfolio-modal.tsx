"use client";

import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ExternalLink } from "lucide-react";
import { ContactModal } from "@/components/modals/contact-modal";
import { useState } from "react";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string[];
  features: string[];
  client: string;
  year: number;
  link?: string;
}

interface PortfolioModalProps {
  project: PortfolioItem;
  onClose: () => void;
}

export function PortfolioModal({ project, onClose }: PortfolioModalProps) {
  const [showContactModal, setShowContactModal] = useState(false);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(true);

  const handleContactClick = () => {
    setIsPortfolioModalOpen(false);
    setShowContactModal(true);
  };

  if (!isPortfolioModalOpen && !showContactModal) {
    onClose();
    return null;
  }

  return (
    <>
      {isPortfolioModalOpen && (
        <Dialog open={true} onOpenChange={() => {
          setIsPortfolioModalOpen(false);
          onClose();
        }}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <div className="flex items-start justify-between">
                <div>
                  <DialogTitle>{project.title}</DialogTitle>
                  <DialogDescription className="mt-1.5">{project.description}</DialogDescription>
                </div>
              </div>
            </DialogHeader>
            
            <div className="mt-4">
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div className="mt-6 flex flex-wrap gap-2">
                {project.category.map((cat) => (
                  <Badge key={cat} variant="secondary">{cat}</Badge>
                ))}
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-3">Особенности проекта:</h4>
                <ul className="space-y-2">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6 space-y-2">
                <p><span className="font-medium">Клиент:</span> {project.client}</p>
                <p><span className="font-medium">Год:</span> {project.year}</p>
                {project.link && (
                  <p>
                    <span className="font-medium">Сайт:</span>{" "}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center"
                    >
                      {project.link.replace(/^https?:\/\//, "")}
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </p>
                )}
              </div>
              
              <div className="mt-8 flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsPortfolioModalOpen(false);
                    onClose();
                  }}
                >
                  Закрыть
                </Button>
                <Button onClick={handleContactClick}>
                  Обсудить похожий проект
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {showContactModal && (
        <ContactModal
          title="Обсудить похожий проект"
          description="Расскажите нам о вашей идее, и мы поможем реализовать её, опираясь на наш опыт разработки подобных проектов"
          onClose={() => {
            setShowContactModal(false);
            onClose();
          }}
        />
      )}
    </>
  );
}