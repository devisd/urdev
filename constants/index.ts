export const STEPS = [
    {
        title: "Основная информация",
        questions: [
            {
                label: "Название компании и отрасль",
                name: "company",
                type: "text",
                placeholder: "Например: ООО 'Компания', IT-сфера",
                required: true
            },
            {
                label: "Краткое описание бизнеса",
                name: "business",
                type: "textarea",
                placeholder: "Опишите ваш бизнес в 2-3 предложения",
                required: true
            },
            {
                label: "Уникальное торговое предложение",
                name: "usp",
                type: "textarea",
                placeholder: "Чем вы отличаетесь от конкурентов?",
                required: true
            },
        ],
    },
    {
        title: "Цели и аудитория",
        questions: [
            {
                label: "Основная цель сайта",
                name: "goal",
                type: "textarea",
                placeholder: "Например: продажи, лидогенерация, презентация продукта",
                required: true
            },
            {
                label: "Портрет целевой аудитории",
                name: "audience",
                type: "textarea",
                placeholder: "Опишите ваших клиентов: пол, возраст, география, потребности",
                required: true
            },
            {
                label: "Что мотивирует к покупке",
                name: "motivation",
                type: "textarea",
                placeholder: "Например: низкие цены, высокое качество, уникальные преимущества",
                required: true
            },
        ],
    },
    {
        title: "Технические требования",
        questions: [
            {
                label: "Необходимые разделы и блоки",
                name: "sections",
                type: "textarea",
                placeholder: "Например: первый блок, преимущества, отзывы, форма обратной связи",
                required: true
            },
            {
                label: "Необходимые интеграции",
                name: "integrations",
                type: "textarea",
                placeholder: "Например: почта, CRM, платежные системы, чаты",
                required: true
            },
            {
                label: "Требования к адаптивности",
                name: "responsive",
                type: "textarea",
                placeholder: "На каких устройствах должен отображаться сайт?",
                required: true
            },
        ],
    },
    {
        title: "Дизайн и контент",
        questions: [
            {
                label: "Референсы и примеры",
                name: "references",
                type: "textarea",
                placeholder: "Ссылки на понравившиеся сайты",
                required: true
            },
            {
                label: "Цветовая палитра и типографика",
                name: "design",
                type: "textarea",
                placeholder: "Предпочтения по цветам и шрифтам",
                required: true
            },
        ],
    },
    {
        title: "Сроки и бюджет",
        questions: [
            {
                label: "Желаемая дата завершения",
                name: "deadline",
                type: "date",
                placeholder: "ДД.ММ.ГГГГ",
                required: true,
                mask: "99.99.9999"
            },
            {
                label: "Бюджетный диапазон",
                name: "budget",
                type: "budget",
                placeholder: "Например: 30 000 - 60 000 ₽",
                required: true,
                mask: "999 999 999"
            },
            {
                label: "Дополнительные требования",
                name: "additional",
                type: "textarea",
                placeholder: "Укажите любые дополнительные пожелания или требования к проекту",
                required: false
            },
        ],
    },
    {
        title: "Контактные данные",
        questions: [
            {
                label: "Ваше имя",
                name: "name",
                type: "text",
                placeholder: "Введите ваше имя",
                required: true
            },
            {
                label: "Телефон",
                name: "phone",
                type: "phone",
                placeholder: "+7 (___) ___-__-__",
                required: true,
                mask: "+7 (999) 999-99-99"
            },
            {
                label: "Email",
                name: "email",
                type: "email",
                placeholder: "example@mail.com",
                required: true
            },
        ],
    },
];