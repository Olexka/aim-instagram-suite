"use strict";
/**
 * AIM Instagram Suite — Tool: aim_content_team
 * Оркестрирует команду контент-специалистов для подготовки Reels/каруселей/постов.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentTeamSchema = void 0;
exports.contentTeam = contentTeam;
const zod_1 = require("zod");
exports.ContentTeamSchema = zod_1.z.object({
    brief: zod_1.z.string().min(10).describe('Бриф: тема, продукт, аудитория, оффер или исходный материал'),
    format: zod_1.z.enum(['carousel', 'reels', 'post', 'stories', 'content_plan']).default('carousel')
        .describe('Формат результата: carousel/reels/post/stories/content_plan'),
    goal: zod_1.z.enum(['reach', 'engagement', 'sales', 'subscribers', 'trust']).default('engagement')
        .describe('Цель контента'),
    audience: zod_1.z.string().optional().describe('Целевая аудитория'),
    toneOfVoice: zod_1.z.enum(['educational', 'motivational', 'professional', 'casual', 'provocative']).default('educational')
        .describe('Тон коммуникации'),
    language: zod_1.z.enum(['ru', 'en']).default('ru').describe('Язык результата'),
    deliverables: zod_1.z.array(zod_1.z.enum(['strategy', 'hooks', 'script', 'carousel_structure', 'caption', 'cta', 'visual_direction']))
        .optional()
        .describe('Какие блоки подготовить'),
});
const defaultDeliverablesByFormat = {
    carousel: ['strategy', 'hooks', 'carousel_structure', 'caption', 'cta', 'visual_direction'],
    reels: ['strategy', 'hooks', 'script', 'caption', 'cta', 'visual_direction'],
    post: ['strategy', 'hooks', 'caption', 'cta', 'visual_direction'],
    stories: ['strategy', 'script', 'cta', 'visual_direction'],
    content_plan: ['strategy', 'hooks', 'caption', 'cta'],
};
const roleDescriptions = [
    {
        role: 'Strategist',
        responsibility: 'Определяет угол подачи, цель, инсайт аудитории и ключевое обещание.',
    },
    {
        role: 'Hook Writer',
        responsibility: 'Создаёт сильные первые фразы/обложки, которые останавливают скролл.',
    },
    {
        role: 'Scriptwriter',
        responsibility: 'Собирает структуру повествования без воды: тезис → доказательство → действие.',
    },
    {
        role: 'Visual Director',
        responsibility: 'Задаёт визуальную метафору, стиль, палитру и композиционные правила.',
    },
    {
        role: 'Conversion Editor',
        responsibility: 'Усиливает CTA, сохранения, комментарии, доверие и коммерческую ясность.',
    },
];
function contentTeam(input) {
    const deliverables = input.deliverables?.length
        ? input.deliverables
        : defaultDeliverablesByFormat[input.format];
    const result = {
        tool: 'aim_content_team',
        purpose: 'Команда AI-специалистов для упаковки идеи в готовый контент-план, сценарий или структуру публикации.',
        settings: {
            format: input.format,
            goal: input.goal,
            audience: input.audience ?? null,
            toneOfVoice: input.toneOfVoice,
            language: input.language,
            deliverables,
        },
        team: roleDescriptions,
        teamSystemPrompt: `Ты — AIM Content Team: стратег, автор хуков, сценарист, визуальный директор и редактор конверсии. Работай как редакционная команда: сначала найди сильный угол подачи, затем создай структуру под формат ${input.format}, цель ${input.goal} и тон ${input.toneOfVoice}. Пиши на ${input.language === 'ru' ? 'русском' : 'английском'} языке. Не давай общие советы — выдавай готовые формулировки, которые можно сразу использовать.`,
        workflow: [
            '1. Strategist: сформулируй главный инсайт аудитории и контент-угол.',
            '2. Hook Writer: предложи 5 вариантов хука/обложки с разными психологическими триггерами.',
            '3. Scriptwriter: собери структуру под выбранный формат.',
            '4. Visual Director: опиши визуальную систему и ключевые кадры/слайды.',
            '5. Conversion Editor: добавь CTA, save/share/comment механику и финальную полировку.',
        ],
        outputContract: {
            requestedDeliverables: deliverables,
            requiredFormat: 'Верни структурированный JSON с ключами strategy, hooks, script/carousel_structure, caption, cta, visual_direction — только те ключи, которые запрошены в deliverables.',
        },
        executionPrompt: `БРИФ:\n${input.brief}\n\nФормат: ${input.format}\nЦель: ${input.goal}\nАудитория: ${input.audience ?? 'определи из брифа'}\nТон: ${input.toneOfVoice}\nDeliverables: ${deliverables.join(', ')}`,
        nextStep: input.format === 'carousel'
            ? 'После структуры можно вызвать aim_create_carousel_image_agent для генерации отдельных промптов-картинок по каждому слайду или aim_render_premium_carousel для HTML/PNG рендера.'
            : 'Используй результат как готовый бриф для продакшена или передай в профильный AIM-инструмент.',
    };
    return JSON.stringify(result, null, 2);
}
//# sourceMappingURL=contentTeam.js.map