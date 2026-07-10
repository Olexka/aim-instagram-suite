"use strict";
/**
 * AIM Instagram Suite — Tool: aim_create_carousel_image_agent
 * Создаёт промпт-агента для генерации Instagram-каруселей как отдельных изображений.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCarouselImageAgentSchema = void 0;
exports.createCarouselImageAgent = createCarouselImageAgent;
const zod_1 = require("zod");
exports.CreateCarouselImageAgentSchema = zod_1.z.object({
    material: zod_1.z.string().min(10).describe('Исходный материал: текст, тезисы, сценарий, ссылка-описание или бриф'),
    slideCount: zod_1.z.number().min(1).max(20).default(7).describe('Количество отдельных слайдов/изображений'),
    format: zod_1.z.enum(['square', 'portrait']).default('portrait').describe('square=1080x1080, portrait=1080x1350'),
    style: zod_1.z.string().optional().describe('Визуальный стиль: например GPT-like, luxury, editorial, 3D, minimal, neon'),
    language: zod_1.z.enum(['ru', 'en']).default('ru').describe('Язык текста на слайдах'),
    outputNaming: zod_1.z.string().default('slide_{NN}.png').describe('Шаблон имён файлов, например slide_{NN}.png'),
    includeTextOnImage: zod_1.z.boolean().default(true).describe('Добавлять ли текст прямо на изображение'),
});
const formatSize = {
    square: '1080×1080',
    portrait: '1080×1350',
};
function createCarouselImageAgent(input) {
    const { material, slideCount, format, style = 'премиальный GPT-like визуал: чистая композиция, выразительная типографика, аккуратные детали', language, outputNaming, includeTextOnImage, } = input;
    const slidePlan = Array.from({ length: slideCount }, (_, index) => {
        const n = index + 1;
        const role = n === 1
            ? 'обложка с сильным хуком'
            : n === slideCount
                ? 'финальный слайд с выводом и CTA'
                : `смысловой слайд ${n}: одна идея, один визуальный фокус`;
        return {
            slideNumber: n,
            fileName: outputNaming.replace('{NN}', String(n).padStart(2, '0')).replace('{N}', String(n)),
            role,
            generationRule: `Сгенерируй ТОЛЬКО слайд ${n} как отдельную картинку ${formatSize[format]}. Не делай коллаж, не объединяй с другими слайдами.`,
            promptTemplate: [
                `Instagram carousel slide ${n}/${slideCount}, ${formatSize[format]}, standalone image.`,
                `Role: ${role}.`,
                `Style: ${style}.`,
                includeTextOnImage
                    ? `Add concise ${language === 'ru' ? 'Russian' : 'English'} text directly on the image; keep it large, readable, and inside safe margins.`
                    : 'Do not add text; leave clean space for later typography overlay.',
                'Use the same visual identity as the other slides: colors, typography mood, lighting, illustration/photo treatment, spacing.',
                'IMPORTANT: output one single slide only, no grid, no multi-panel carousel preview, no contact sheet.',
                `Source material to adapt: ${material}`,
            ].join('\n'),
        };
    });
    const result = {
        tool: 'aim_create_carousel_image_agent',
        purpose: 'Агент/инструкция для генерации карусели отдельными файлами: один запрос = один слайд = одна картинка.',
        settings: {
            slideCount,
            format,
            pixelSize: formatSize[format],
            style,
            language,
            includeTextOnImage,
            outputNaming,
        },
        agentSystemPrompt: `Ты — Carousel Image Agent. Твоя задача — превращать предоставленный материал в Instagram-карусель, но генерировать каждый слайд отдельным изображением. Никогда не собирай все слайды в одну картинку, коллаж, сетку или превью. Для каждого слайда сначала коротко формулируй роль и текст, затем вызывай генерацию изображения только для этого одного слайда. Сохраняй единый стиль между слайдами: палитра, типографика, композиционная логика, персонажи/объекты и уровень детализации. Размер каждого слайда: ${formatSize[format]}. Имена файлов: ${outputNaming}.`,
        workflow: [
            '1. Разбей материал на логическую историю из нужного количества слайдов.',
            '2. Согласуй единый визуальный стиль: палитра, типографика, настроение, повторяющиеся элементы.',
            '3. Для каждого слайда отдельно создай промпт и генерируй одну картинку.',
            '4. После генерации слайда проверь: это один отдельный слайд, а не коллаж.',
            '5. Только после проверки переходи к следующему слайду.',
        ],
        perSlidePrompts: slidePlan,
        negativePrompt: 'collage, grid, contact sheet, multiple slides in one image, carousel preview, split screen, storyboard sheet, tiny unreadable text, inconsistent style, extra panels',
        nextStep: 'Передавай perSlidePrompts по одному в генератор изображений. Не отправляй все промпты одним запросом, если генератор склонен собирать их в один коллаж.',
    };
    return JSON.stringify(result, null, 2);
}
//# sourceMappingURL=createCarouselImageAgent.js.map