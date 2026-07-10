# 👥 Контент-команда AIM (aim_content_team)

Используй MCP инструмент `aim_content_team`.

Аргументы: $ARGUMENTS

Параметры реальной схемы:
- `mode` — `carousel`, `reels`, `post`, `stories`, `content_plan` (обычно `carousel`)
- `topic` — тема или исходный материал
- `sergeyContext` — контекст бренда Сергея
- `platform` — `instagram`, `telegram`, `both`
- `goal` — `shares`, `saves`, `sales`, `subscribers`, `reach`, `trust`
- `format` — `carousel`, `reels`, `post`, `stories`, `content_plan`

Пример:
```json
{
  "mode": "carousel",
  "topic": "тема или исходный материал",
  "sergeyContext": "контекст бренда Сергея",
  "platform": "both",
  "goal": "shares",
  "format": "carousel"
}
```

Не используй `brief`, `audience`, `toneOfVoice`, `language` и недопустимую цель `engagement`.
Обязательный параметр:
- `brief` — бриф: тема, продукт, аудитория, оффер или исходный материал.

Опционально:
- `format` — `carousel`, `reels`, `post`, `stories`, `content_plan`
- `goal` — `reach`, `engagement`, `sales`, `subscribers`, `trust`
- `audience` — целевая аудитория
- `toneOfVoice` — `educational`, `motivational`, `professional`, `casual`, `provocative`
- `language` — `ru` или `en`
- `deliverables` — нужные блоки: `strategy`, `hooks`, `script`, `carousel_structure`, `caption`, `cta`, `visual_direction`

Если бриф не указан — попроси пользователя описать тему, аудиторию и цель контента.
