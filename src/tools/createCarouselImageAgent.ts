/**
 * AIM Instagram Suite — Tool: aim_create_carousel_image_agent
 * Создаёт промпты для генерации Instagram-карусели отдельными изображениями.
 */

import { z } from 'zod';

const SlideSchema = z.object({
  slideNumber: z.number().int().min(1).describe('Номер слайда'),
  text: z.string().describe('Точный текст текущего слайда'),
  visual: z.string().describe('Описание изображения для текущего слайда'),
});

export const CreateCarouselImageAgentSchema = z.object({
  slides: z.array(SlideSchema).min(1).max(20).describe('Массив слайдов: slideNumber, text, visual'),
  format: z.enum(['square', 'portrait']).default('portrait').describe('square=1080x1080, portrait=1080x1350'),
  style: z.string().optional().describe('Единый визуальный стиль'),
  language: z.enum(['ru', 'en']).default('ru').describe('Язык текста на слайдах'),
  outputNaming: z.string().default('slide_{NN}.png').describe('Шаблон имён файлов'),
  includeTextOnImage: z.boolean().default(true).describe('Добавлять ли текст прямо на изображение'),
});

export type CreateCarouselImageAgentInput = z.infer<typeof CreateCarouselImageAgentSchema>;

const formatSize: Record<CreateCarouselImageAgentInput['format'], string> = {
  square: '1080×1080',
  portrait: '1080×1350',
};

export function createCarouselImageAgent(input: CreateCarouselImageAgentInput): string {
  const {
    slides,
    format,
    style = 'премиальный GPT-like визуал: чистая композиция, выразительная типографика, аккуратные детали',
    language,
    outputNaming,
    includeTextOnImage,
  } = input;

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
