import React, { useRef, useEffect } from "react";
import { useTheme } from "next-themes";

// Цвета частиц для светлой и тёмной темы
const PARTICLE_COLOR_LIGHT = `rgba(37, 87, 230, 0.18)`;

const MAIN_RGB = "37, 87, 230";
const MAIN_COLOR = `rgb(${MAIN_RGB})`;
const SECONDARY_GRADIENT = (ctx: CanvasRenderingContext2D, width: number) => {
    const grad = ctx.createLinearGradient(0, 0, width, 0);
    grad.addColorStop(0, `rgb(${MAIN_RGB})`);
    grad.addColorStop(1, `#fff`);
    return grad;
};

export const WaveBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        let animationId: number;
        let lastTime = performance.now();
        let phase = 0;

        // Параметры волны
        const wave = {
            amplitude: 60,
            frequency: 1.15,
            speed: 0.07,
            baseline: 0.6,
            color: MAIN_COLOR,
            thickness: 4,
        };

        // Получить количество контрольных точек в зависимости от ширины экрана
        function getControlPointsCount() {
            return window.innerWidth < 1024 ? 4 : 8;
        }

        // Функция для адаптива: canvas всегда на весь экран
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Обновить контрольные точки при изменении размера
            updateControlPoints();
        }

        // Контрольные точки для волны (обновляются при изменении размера)
        let controlPointsCount = getControlPointsCount();
        let controlPoints: any[] = [];
        function updateControlPoints() {
            controlPointsCount = getControlPointsCount();
            controlPoints = Array.from({ length: controlPointsCount }, (_, i) => ({
                x: (canvas.width / (controlPointsCount - 1)) * i,
                baseY: canvas.height * wave.baseline,
                amplitude: 80 + Math.random() * 40,
                phase: Math.random() * Math.PI * 2,
                y: 0,
            }));
        }

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // // Параметры частиц
        // const config = {
        //     particleCount: 100,
        //     particleSize: 3,
        // };
        // // Массив частиц
        // const particles = Array.from({ length: config.particleCount }, () => ({
        //     x: Math.random() * canvas.width,
        //     y: Math.random() * canvas.height,
        //     size: Math.random() * config.particleSize + 1,
        //     speed: Math.random() * 0.5 + 0.1,
        //     offset: Math.random() * Math.PI * 2,
        // }));

        updateControlPoints();

        // Главная функция анимации
        function animate(now: number) {
            animationId = requestAnimationFrame(animate);

            // Эффект плавного затухания (шлейф)
            ctx.fillStyle = isDark
                ? "rgba(0,0,0,0.08)"
                : "rgba(255,255,255,0.08)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Фон canvas (чистый, без прозрачности)
            ctx.globalCompositeOperation = "destination-over";
            ctx.fillStyle = isDark ? "#000" : "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = "source-over";

            // Анимация волны
            const dt = (now - lastTime) / 1000;
            lastTime = now;
            phase += wave.speed * 90 * dt;

            // Анимация контрольных точек волны
            for (let i = 0; i < controlPoints.length; i++) {
                const p = controlPoints[i];
                p.y = p.baseY + Math.sin(phase * 0.03 + p.phase + i) * p.amplitude;
                p.y += Math.sin(phase * 0.07 + p.phase * 2 + i * 2) * 20;
                p.x = (canvas.width / (controlPointsCount - 1)) * i;
            }

            // Рисуем шлейф (параллельные линии)
            const trailCount = 10;
            const trailOffset = 3;
            for (let t = trailCount; t >= 1; t--) {
                // Цвет шлейфа: градиент от основного к белому
                ctx.beginPath();
                ctx.moveTo(0, controlPoints[0].y - t * trailOffset);
                for (let i = 0; i < controlPoints.length - 1; i++) {
                    const cp1 = controlPoints[i];
                    const cp2 = controlPoints[i + 1];
                    const xc = (cp1.x + cp2.x) / 2;
                    const yc = (cp1.y + cp2.y) / 2 - t * trailOffset;
                    ctx.quadraticCurveTo(cp1.x, cp1.y - t * trailOffset, xc, yc);
                }
                ctx.lineTo(canvas.width, controlPoints[controlPoints.length - 1].y - t * trailOffset);
                ctx.strokeStyle = SECONDARY_GRADIENT(ctx, canvas.width);
                ctx.lineWidth = Math.max(1, wave.thickness - t);
                ctx.shadowColor = wave.color;
                ctx.shadowBlur = 8;
                ctx.stroke();
                ctx.shadowBlur = 0;
            }

            // Рисуем основную волну
            ctx.beginPath();
            ctx.moveTo(0, controlPoints[0].y);
            for (let i = 0; i < controlPoints.length - 1; i++) {
                const cp1 = controlPoints[i];
                const cp2 = controlPoints[i + 1];
                const xc = (cp1.x + cp2.x) / 2;
                const yc = (cp1.y + cp2.y) / 2;
                ctx.quadraticCurveTo(cp1.x, cp1.y, xc, yc);
            }
            ctx.lineTo(canvas.width, controlPoints[controlPoints.length - 1].y);
            ctx.strokeStyle = wave.color;
            ctx.lineWidth = wave.thickness;
            ctx.shadowColor = wave.color;
            ctx.shadowBlur = 32;
            ctx.stroke();
            ctx.shadowBlur = 0;

            // // Анимация частиц
            // particles.forEach((p) => {
            //     p.y += p.speed;
            //     p.offset += 0.01;
            //     p.x += Math.sin(p.offset) * 0.5;
            //     if (p.y > canvas.height + 10) {
            //         p.y = -10;
            //         p.x = Math.random() * canvas.width;
            //     }
            //     ctx.beginPath();
            //     ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            //     ctx.fillStyle = PARTICLE_COLOR_LIGHT;
            //     ctx.fill();
            // });
        }

        animate(performance.now());

        // Очистка при размонтировании
        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationId);
        };
    }, [isDark]);

    return (
        <div className="absolute inset-0 z-[10] pointer-events-none">
            <canvas
                ref={canvasRef}
                className="block w-full h-full"
                style={{ width: "100vw", height: "100vh" }}
            />
        </div>
    );
}; 