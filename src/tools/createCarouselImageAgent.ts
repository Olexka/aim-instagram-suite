/**
 * AIM Instagram Suite — Tool: aim_create_carousel_image_agent
 * Создаёт промпт-агента для генерации Instagram-каруселей как отдельных изображений.
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
  style: z.string().optional().describe('Единый визуальный стиль: например GPT-like, luxury, editorial, 3D, minimal, neon'),
  language: z.enum(['ru', 'en']).default('ru').describe('Язык текста на слайдах'),
  outputNaming: z.string().default('slide_{NN}.png').describe('Шаблон имён файлов, например slide_{NN}.png'),
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
    const n = slide.slideNumber;
    const role = index === 0
      ? 'обложка с сильным хуком'
      : index === slideCount - 1
        ? 'финальный слайд с выводом и CTA'
        : `смысловой слайд ${n}: одна идея, один визуальный фокус`;

    return {
      slideNumber: n,
      fileName: outputNaming.replace('{NN}', String(n).padStart(2, '0')).replace('{N}', String(n)),
      role,
      text: slide.text,
      visual: slide.visual,
      generationRule: `Сгенерируй ТОЛЬКО слайд ${n} как отдельную картинку ${formatSize[format]}. Не делай коллаж, не объединяй с другими слайдами.`,
      promptTemplate: [
        `Instagram carousel slide ${index + 1}/${slideCount}, ${formatSize[format]}, standalone image.`,
        `Role: ${role}.`,
        `Style to keep consistent across all slides: ${style}.`,
        includeTextOnImage
          ? `On-image text (${language === 'ru' ? 'Russian' : 'English'}), use exactly this text and no other wording: ${slide.text}`
          : 'Do not add text; leave clean space for later typography overlay.',
        `Visual for this slide only: ${slide.visual}`,
        'IMPORTANT: output one single slide only, no grid, no multi-panel carousel preview, no contact sheet.',
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
    agentSystemPrompt: `Ты — Carousel Image Agent. Твоя задача — генерировать каждый слайд Instagram-карусели отдельным изображением. Никогда не собирай все слайды в одну картинку, коллаж, сетку или превью. Для каждого запроса используй только text и visual текущего слайда. Сохраняй единый стиль между слайдами: палитра, типографика, композиционная логика, персонажи/объекты и уровень детализации. Размер каждого слайда: ${formatSize[format]}. Имена файлов: ${outputNaming}.`,
    workflow: [
      '1. Прими готовый массив slides с точным text и visual для каждого слайда.',
      '2. Согласуй единый визуальный стиль: палитра, типографика, настроение, повторяющиеся элементы.',
      '3. Для каждого слайда отдельно создай промпт и генерируй одну картинку.',
      '4. После генерации слайда проверь: это один отдельный слайд, а не коллаж.',
      '5. Только после проверки переходи к следующему слайду, пока не будут готовы все слайды.',
    ],
    perSlidePrompts: slidePlan,
    negativePrompt: 'collage, grid, contact sheet, multiple slides in one image, carousel preview, split screen, storyboard sheet, tiny unreadable text, inconsistent style, extra panels',
    nextStep: 'Передавай perSlidePrompts по одному в генератор изображений. Каждый promptTemplate содержит только текст и visual текущего слайда.',
  };

  return JSON.stringify(result, null, 2);
}
