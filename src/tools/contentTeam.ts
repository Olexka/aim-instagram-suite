/**
 * AIM Instagram Suite — Tool: aim_content_team
 * Оркестрирует команду контент-специалистов для подготовки Reels/каруселей/постов.
 */

import { z } from 'zod';

export const ContentTeamInputSchema = z.object({
  mode: z.enum(['carousel', 'reels', 'post', 'stories', 'content_plan']).default('carousel')
    .describe('Режим работы контент-команды'),
  topic: z.string().min(3).describe('Тема или исходный материал'),
  sergeyContext: z.string().optional().default('').describe('Контекст бренда Сергея'),
  platform: z.enum(['instagram', 'vk', 'both']).default('both').describe('Платформа публикации'),
  goal: z.enum(['shares', 'saves', 'sales', 'subscribers', 'reach', 'trust']).default('shares')
    .describe('Цель контента'),
  format: z.enum(['carousel', 'reels', 'post', 'stories', 'content_plan']).default('carousel')
    .describe('Формат результата'),
});

export type ContentTeamInput = z.infer<typeof ContentTeamInputSchema>;

const deliverablesByFormat: Record<ContentTeamInput['format'], string[]> = {
  carousel: ['strategy', 'hooks', 'carousel_structure', 'exact_slide_text', 'caption', 'cta', 'visual_direction'],
  reels: ['strategy', 'hooks', 'script', 'caption', 'cta', 'visual_direction'],
  post: ['strategy', 'hooks', 'caption', 'cta', 'visual_direction'],
  stories: ['strategy', 'story_sequence', 'cta', 'visual_direction'],
  content_plan: ['strategy', 'content_pillars', 'hooks', 'publishing_plan', 'cta'],
};

const team = [
  { role: 'Strategist', responsibility: 'Определяет угол подачи, цель, инсайт аудитории и ключевое обещание.' },
  { role: 'Hook Writer', responsibility: 'Создаёт сильные первые фразы/обложки, которые останавливают скролл.' },
  { role: 'Scriptwriter', responsibility: 'Собирает структуру повествования без воды: тезис → доказательство → действие.' },
  { role: 'Visual Director', responsibility: 'Задаёт визуальную метафору, стиль, палитру и композиционные правила.' },
  { role: 'Conversion Editor', responsibility: 'Усиливает CTA, сохранения, репосты, комментарии, доверие и коммерческую ясность.' },
];

export function contentTeam(input: ContentTeamInput): string {
  const deliverables = deliverablesByFormat[input.format];

  const result = {
    tool: 'aim_content_team',
    purpose: 'Команда AI-специалистов для упаковки темы в готовую стратегию, структуру публикации и точные формулировки.',
    settings: {
      mode: input.mode,
      topic: input.topic,
      sergeyContext: input.sergeyContext,
      platform: input.platform,
      goal: input.goal,
      format: input.format,
      deliverables,
    },
    team,
    teamSystemPrompt: `Ты — AIM Content Team для бренда Сергея. Учти тему, контекст бренда Сергея, платформу ${input.platform}, цель ${input.goal}, mode ${input.mode} и format ${input.format}. Выдавай готовые формулировки, а не общие советы.`,
    workflow: [
      '1. Strategist: сформулируй главный инсайт аудитории и контент-угол.',
      '2. Hook Writer: предложи 5 вариантов хука/обложки.',
      '3. Scriptwriter: собери структуру под выбранный формат и точный текст.',
      '4. Visual Director: опиши визуальную систему и ключевые кадры/слайды.',
      '5. Conversion Editor: добавь CTA и механику под выбранную цель.',
    ],
    outputContract: {
      requestedDeliverables: deliverables,
      requiredFormat: 'Верни структурированный JSON с готовыми текстами и visual_direction под выбранный format.',
    },
    executionPrompt: `Тема или материал: ${input.topic}\nКонтекст Сергея: ${input.sergeyContext || 'не указан'}\nПлатформа: ${input.platform}\nЦель: ${input.goal}\nMode: ${input.mode}\nFormat: ${input.format}`,
    nextStep: input.format === 'carousel'
      ? 'Передай готовые слайды в aim_create_carousel_image_agent как slides: [{ slideNumber, text, visual }].'
      : 'Используй результат как готовый бриф для продакшена.',
  };

  return JSON.stringify(result, null, 2);
}
