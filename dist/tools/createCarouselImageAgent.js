"use strict";
/**
 * AIM Instagram Suite — Tool: aim_create_carousel_image_agent
 * Создаёт промпты для генерации Instagram-карусели отдельными изображениями.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCarouselImageAgentSchema = void 0;
exports.createCarouselImageAgent = createCarouselImageAgent;
const zod_1 = require("zod");
const SlideSchema = zod_1.z.object({
    slideNumber: zod_1.z.number().int().min(1).describe('Номер слайда'),
    text: zod_1.z.string().describe('Точный текст текущего слайда'),
    visual: zod_1.z.string().describe('Описание изображения для текущего слайда'),
});
exports.CreateCarouselImageAgentSchema = zod_1.z.object({
    slides: zod_1.z.array(SlideSchema).min(1).max(20).describe('Массив слайдов: slideNumber, text, visual'),
    format: zod_1.z.enum(['square', 'portrait']).default('portrait').describe('square=1080x1080, portrait=1080x1350'),
    style: zod_1.z.string().optional().describe('Единый визуальный стиль'),
    language: zod_1.z.enum(['ru', 'en']).default('ru').describe('Язык текста на слайдах'),
    outputNaming: zod_1.z.string().default('slide_{NN}.png').describe('Шаблон имён файлов'),
    includeTextOnImage: zod_1.z.boolean().default(true).describe('Добавлять ли текст прямо на изображение'),
});
const formatSize = {
    square: '1080×1080',
    portrait: '1080×1350',
};
function createCarouselImageAgent(input) {
    const { slides, format, style = 'премиальный GPT-like визуал: чистая композиция, выразительная типографика, аккуратные детали', language, outputNaming, includeTextOnImage, } = input;
    const orderedSlides = [...slides].sort((a, b) => a.slideNumber - b.slideNumber);
    const slideCount = orderedSlides.length;
    const slidePlan = orderedSlides.map((slide, index) => {
        const displayNumber = index + 1;
        const fileName = outputNaming
            .replace('{NN}', String(slide.slideNumber).padStart(2, '0'))
            .replace('{N}', String(slide.slideNumber));
        return {
            slideNumber: slide.slideNumber,
            fileName,
            text: slide.text,
            visual: slide.visual,
            generationRule: `Сгенерируй только слайд ${slide.slideNumber} как отдельную картинку ${formatSize[format]}. Не делай коллаж, сетку или превью нескольких слайдов.`,
            promptTemplate: [
                `Instagram carousel slide ${displayNumber}/${slideCount}, ${formatSize[format]}, single standalone image.`,
                `Keep this shared visual style: ${style}.`,
                includeTextOnImage
                    ? `Use exactly this on-image text (${language === 'ru' ? 'Russian' : 'English'}): ${slide.text}`
                    : 'Do not add on-image text; leave clean space for typography overlay.',
                `Visual description for this slide only: ${slide.visual}`,
                'Do not include any other slide. No collage, no grid, no contact sheet, no multi-panel preview.',
            ].join('\n'),
        };
    });
    const result = {
        tool: 'aim_create_carousel_image_agent',
        purpose: 'Создаёт отдельный prompt для каждого слайда: один prompt = один слайд = одна картинка.',
        settings: {
            slideCount,
            format,
            pixelSize: formatSize[format],
            style,
            language,
            includeTextOnImage,
            outputNaming,
        },
        workflow: [
            '1. Используй готовый массив slides с text и visual для каждого слайда.',
            '2. Передавай perSlidePrompts в генератор изображений строго по одному.',
            '3. Каждый promptTemplate описывает только один текущий слайд.',
            '4. Проверяй, что результат — отдельная картинка, а не коллаж.',
            '5. Продолжай до генерации всех слайдов.',
        ],
        perSlidePrompts: slidePlan,
        negativePrompt: 'collage, grid, contact sheet, multiple slides in one image, carousel preview, split screen, storyboard sheet, extra panels',
        nextStep: 'Отправляй promptTemplate каждого слайда в генератор изображений отдельно и сохраняй результат под fileName.',
    };
    return JSON.stringify(result, null, 2);
}
//# sourceMappingURL=createCarouselImageAgent.js.map