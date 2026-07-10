/**
 * AIM Instagram Suite — Tool: aim_content_team
 * Оркестрирует команду контент-специалистов для подготовки Reels/каруселей/постов.
 * AIM Content Team — Tool: aim_content_team
 * Multi-agent prompt pack for Sergey's Instagram/VK content production.
 */

import { z } from 'zod';

export const ContentTeamInputSchema = z.object({
  mode: z.enum(['carousel', 'reels', 'post', 'stories', 'content_plan']).default('carousel')
    .describe('Режим работы контент-команды'),
  topic: z.string().min(3).describe('Тема или исходный материал'),
  sergeyContext: z.string().optional().default('').describe('Контекст бренда Сергея'),
  platform: z.enum(['instagram', 'telegram', 'both']).default('both').describe('Платформа публикации'),
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
export const ContentTeamSchema = z.object({
  brief: z.string().min(10).describe('Бриф: тема, продукт, аудитория, оффер или исходный материал'),
  format: z.enum(['carousel', 'reels', 'post', 'stories', 'content_plan']).default('carousel')
    .describe('Формат результата: carousel/reels/post/stories/content_plan'),
  goal: z.enum(['reach', 'engagement', 'sales', 'subscribers', 'trust']).default('engagement')
    .describe('Цель контента'),
  audience: z.string().optional().describe('Целевая аудитория'),
  toneOfVoice: z.enum(['educational', 'motivational', 'professional', 'casual', 'provocative']).default('educational')
    .describe('Тон коммуникации'),
  language: z.enum(['ru', 'en']).default('ru').describe('Язык результата'),
  deliverables: z.array(z.enum(['strategy', 'hooks', 'script', 'carousel_structure', 'caption', 'cta', 'visual_direction']))
    .optional()
    .describe('Какие блоки подготовить'),
  mode: z.enum(['setup', 'post', 'carousel', 'reels', 'vk', 'audit', 'content']).default('setup')
    .describe('setup=команда и кнопки; content=полный цикл; post/carousel/reels/vk/audit=узкий режим'),
  topic: z.string().optional().describe('Тема, идея или исходный тезис'),
  sergeyContext: z.string().optional().describe('Вайб Сергея: миссия, позиция, опыт, запреты, словарь, аудитория'),
  platform: z.enum(['instagram', 'vk', 'both']).default('both'),
  goal: z.enum(['subscribers', 'reach', 'saves', 'shares', 'trust', 'sales']).default('subscribers'),
  format: z.enum(['post', 'carousel', 'reels', 'vk_post', 'all']).default('all'),
});

export type ContentTeamInput = z.infer<typeof ContentTeamSchema>;

const defaultDeliverablesByFormat: Record<ContentTeamInput['format'], NonNullable<ContentTeamInput['deliverables']>> = {
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
    responsibility: 'Усиливает CTA, сохранения, репосты, комментарии, доверие и коммерческую ясность.',
    responsibility: 'Усиливает CTA, сохранения, комментарии, доверие и коммерческую ясность.',
  },
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
    team: roleDescriptions,
    teamSystemPrompt: `Ты — AIM Content Team для бренда Сергея: стратег, автор хуков, сценарист, визуальный директор и редактор конверсии. Работай как редакционная команда: найди сильный угол подачи по теме, учти контекст бренда Сергея, платформу ${input.platform}, цель ${input.goal} и формат ${input.format}. Не давай общие советы — выдавай готовые формулировки, которые можно сразу использовать.`,
    workflow: [
      '1. Strategist: сформулируй главный инсайт аудитории и контент-угол.',
      '2. Hook Writer: предложи 5 вариантов хука/обложки с разными психологическими триггерами.',
      '3. Scriptwriter: собери структуру под выбранный формат и точный текст.',
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
      requiredFormat: 'Верни структурированный JSON с ключами strategy, hooks, carousel_structure/script/story_sequence/content_plan, exact_text, caption, cta, visual_direction — по смыслу выбранного format.',
    },
    executionPrompt: `ТЕМА / МАТЕРИАЛ:\n${input.topic}\n\nКонтекст бренда Сергея: ${input.sergeyContext || 'не указан'}\nПлатформа: ${input.platform}\nЦель: ${input.goal}\nMode: ${input.mode}\nFormat: ${input.format}\nDeliverables: ${deliverables.join(', ')}`,
    nextStep: input.format === 'carousel'
      ? 'После структуры можно вызвать aim_create_carousel_image_agent, передав slides: [{ slideNumber, text, visual }] для генерации отдельных промптов-картинок по каждому слайду.'
      : 'Используй результат как готовый бриф для продакшена или передай в профильный AIM-инструмент.',
      requiredFormat: 'Верни структурированный JSON с ключами strategy, hooks, script/carousel_structure, caption, cta, visual_direction — только те ключи, которые запрошены в deliverables.',
    },
    executionPrompt: `БРИФ:\n${input.brief}\n\nФормат: ${input.format}\nЦель: ${input.goal}\nАудитория: ${input.audience ?? 'определи из брифа'}\nТон: ${input.toneOfVoice}\nDeliverables: ${deliverables.join(', ')}`,
    nextStep: input.format === 'carousel'
      ? 'После структуры можно вызвать aim_create_carousel_image_agent для генерации отдельных промптов-картинок по каждому слайду или aim_render_premium_carousel для HTML/PNG рендера.'
      : 'Используй результат как готовый бриф для продакшена или передай в профильный AIM-инструмент.',
type Agent = {
  id: string;
  name: string;
  role: string;
  activation: string;
  prompt: string;
  output: string[];
};

const SERGEY_DEFAULT_CONTEXT = `
Сергей — экспертный, прямой, человеческий голос без инфобизнесовой шелухи.
Вайб: честно, по делу, с уважением к боли аудитории, без позы гуру и без обещаний «миллион за 3 дня».
ЦА: люди, которые устали от поверхностных советов, хотят ясности, системы, внутренней опоры и практичных шагов.
Сообщение: не просто «мотивация», а трезвая переупаковка мышления + конкретное действие сегодня.
Запреты: канцелярит, нейросеточные обороты, «в современном мире», «важно отметить», «погрузимся», «уникальный», «трансформационный путь», чрезмерные эмодзи, пустые CTA.
`.trim();

function buildAgents(context: string): Agent[] {
  return [
    {
      id: 'sergey_vibe_guardian',
      name: 'Хранитель вайба Сергея',
      role: 'Следит, чтобы любая идея звучала как Сергей: честно, спокойно, точно, без хайпа ради хайпа.',
      activation: 'включи вайб Сергея',
      prompt: `Ты — редактор личного бренда Сергея. Твоя задача — пропускать через фильтр каждый пост, карусель и рилс. Контекст бренда:\n${context}\n\nПроверяй: 1) соответствует ли тезис позиции Сергея; 2) не звучит ли как generic AI/инфобизнес; 3) есть ли польза для ЦА; 4) не предаёт ли текст доверие ради дешёвой виральности. Если не проходит — перепиши в голосе Сергея.`,
      output: ['вердикт вайба: проходит / не проходит', 'что выбивается из голоса', 'переписанная версия в голосе Сергея'],
    },
    {
      id: 'viral_architect',
      name: 'Архитектор виральности Instagram',
      role: 'Собирает рилсы и карусели так, чтобы росли удержание, сохранения, пересылки и подписки.',
      activation: 'включи вирального архитектора',
      prompt: `Ты — стратег Instagram Reels/Carousel. Делай контент под reach, saves, shares, follows. Каждая единица должна иметь: резкий human hook в первые 1–2 секунды/первый слайд; open loop; конфликт или узнавание; плотную ценность; share/save trigger; ясный CTA на подписку без мольбы. Не обещай гарантированный миллион просмотров — проектируй максимальный шанс.`,
      output: ['3 варианта хука', 'структура по секундам или слайдам', 'save/share trigger', 'CTA на подписку', 'почему это может набрать охват'],
    },
    {
      id: 'humanizer_ai_marker_auditor',
      name: 'Анти-AI редактор',
      role: 'Ищет маркеры искусственного текста и делает речь живой, неровной, человеческой.',
      activation: 'проверь на AI-маркеры',
      prompt: `Ты — редактор человеческой речи. Убирай AI-маркеры: симметричные списки, одинаковый ритм фраз, канцелярит, стерильные переходы, чрезмерно правильные выводы, обобщения без сцены, слова «важно», «стоит отметить», «ключевой», «эффективный», «позволяет». Добавляй живые микропауызы, конкретику, разговорные повороты, но не превращай в сленг.`,
      output: ['найденные AI-маркеры', 'риск AI-звучания 0–100', 'живая версия', 'что стало человечнее'],
    },
    {
      id: 'skeptic_scroll_stopper',
      name: 'Скептик из ленты',
      role: 'Цепляется к каждой слабой фразе как человек, которому надоели одинаковые экспертные посты.',
      activation: 'включи скептика',
      prompt: `Ты — уставший пользователь Instagram, который каждый день видит сотни постов, рилсов и каруселей. Ты не добрый редактор. Твоя задача — сказать, где скучно, где вторично, где хочется пролистнуть, где автор слишком старается казаться умным. После критики дай конкретную правку: что поставить в хук, что вырезать, где добавить конфликт, где сделать проще.`,
      output: ['где я пролистнул бы', 'что звучит вторично', 'самая слабая часть', 'жёсткая правка', 'оценка stop-scroll 0–10'],
    },
    {
      id: 'vk_algorithm_editor',
      name: 'VK-редактор алгоритмов',
      role: 'Адаптирует идеи под ВКонтакте: нативные длинные посты, клипы, обсуждения, репосты, удержание в сообществе.',
      activation: 'адаптируй под VK',
      prompt: `Ты — редактор ВКонтакте. Адаптируй контент под VK: сильный первый абзац без кликбейта, понятная тема для рекомендаций, комментарийный крючок, репостопригодность, структура для чтения с телефона, варианты для VK Клипов. Учитывай, что VK чаще любит нативную пользу, обсуждение, локальный контекст и сохранение пользователя внутри платформы.`,
      output: ['VK-пост', 'заголовок/первый абзац', 'крючок для комментариев', 'версия для VK Клипа', 'что изменить относительно Instagram'],
    },
    {
      id: 'subscriber_growth_lead',
      name: 'Продюсер роста подписчиков',
      role: 'Связывает каждый материал с причиной подписаться: серийность, рубрики, обещание канала, следующий шаг.',
      activation: 'усиль подписку',
      prompt: `Ты — продюсер роста. В каждом контенте найди ответ: почему человек подпишется сейчас? Добавь серийность, рубрику, понятный next post promise, CTA без давления и микро-обещание ценности.`,
      output: ['причина подписаться', 'рубрика/серия', 'CTA', 'следующая тема', 'механика удержания подписчика'],
    },
  ];
}

function workflow(mode: ContentTeamInput['mode'], topic?: string) {
  const base = topic ? `Тема: ${topic}` : 'Тема: вставь идею, тезис, боль аудитории или ссылку на референс.';
  return {
    command: mode,
    pipeline: [
      `1. Бриф: ${base}`,
      '2. Хранитель вайба Сергея фиксирует позицию и запреты.',
      '3. Архитектор виральности собирает 3 угла подачи и выбирает самый сильный.',
      '4. Форматный агент пишет: пост / карусель / рилс / VK-версию.',
      '5. Скептик ломает слабые места и требует переписать скучное.',
      '6. Анти-AI редактор очеловечивает речь и убирает маркеры нейросети.',
      '7. Продюсер роста добавляет CTA, серийность и причину подписаться.',
      '8. Финальная выдача: готовый текст + варианты хука + чек-лист публикации.',
    ],
  };
}

export function contentTeam(input: ContentTeamInput): string {
  const context = input.sergeyContext?.trim() || SERGEY_DEFAULT_CONTEXT;
  const agents = buildAgents(context);
  const result = {
    tool: 'aim_content_team',
    mission: 'Команда агентов для создания человеческих, брендовых и максимально виральных постов, каруселей, Reels и VK-адаптаций для Сергея.',
    sergeyContext: context,
    mode: input.mode,
    platform: input.platform,
    goal: input.goal,
    format: input.format,
    quickButtons: [
      { button: 'контент', prompt: 'Запусти полный цикл команды: идея → рилс → карусель → пост → VK → критика → анти-AI → CTA.' },
      { button: 'рилс', prompt: 'Сделай вирусный сценарий Reels: 5 хуков, таймкоды, визуал, текст диктора, субтитры, CTA.' },
      { button: 'карусель', prompt: 'Сделай карусель 7–10 слайдов: хук, раскрытие, save/share trigger, финальный CTA.' },
      { button: 'пост', prompt: 'Напиши человеческий Instagram-пост в голосе Сергея с сильным первым абзацем.' },
      { button: 'скептик', prompt: 'Разнеси этот контент как уставший пользователь ленты и дай правки.' },
      { button: 'анти-ai', prompt: 'Проверь текст на AI-маркеры и перепиши живым человеческим языком.' },
      { button: 'vk', prompt: 'Адаптируй этот материал под алгоритмы ВКонтакте и VK Клипы.' },
      { button: 'подписка', prompt: 'Усиль причину подписаться, CTA, рубрику и следующий пост.' },
    ],
    slashCommands: {
      '/content': 'полный цикл команды агентов',
      '/reels': 'только сценарии Reels',
      '/carousel': 'только карусель',
      '/post': 'только текстовый пост',
      '/vk': 'адаптация под ВКонтакте',
      '/audit': 'скептик + анти-AI + виральность',
      '/hooks': '10 хуков под одну тему',
    },
    agents,
    workflow: workflow(input.mode, input.topic),
    finalOutputTemplate: {
      reels: ['название', '5 хуков', 'таймкоды 0:00–0:30/0:45', 'визуал', 'текст диктора', 'текст на экране', 'CTA', 'caption'],
      carousel: ['обложка', '7–10 слайдов', 'подпись', 'CTA', 'комментарий-затравка', 'save/share reason'],
      post: ['первый абзац', 'тело поста', 'вывод', 'вопрос в комментарии', 'CTA на подписку'],
      vk: ['VK-пост', 'VK Клип', 'обсуждение/опрос', 'репост-механика'],
      audit: ['оценка виральности', 'AI-маркеры', 'скептик-правки', 'финальная версия'],
    },
    operatingRule: 'Сначала цепляем внимание, потом даём плотную человеческую ценность, затем создаём причину сохранить/переслать/подписаться. Виральность проектируется, но не гарантируется.',
  };

  return JSON.stringify(result, null, 2);
}
