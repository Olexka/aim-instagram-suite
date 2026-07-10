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
