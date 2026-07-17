# 👥 Контент-команда AIM (aim_content_team)

Используй MCP инструмент `aim_content_team`.

Аргументы: $ARGUMENTS

Если контент продвигает эксперта, диагностику, консультацию, сопровождение, обучение или услугу, сначала используй skill `aim-expert-conversion-content`: уточни 6 обязательных пунктов, предложи концепцию и дождись согласования. Полный текст до согласования не создавай.

Всегда уточняй аккаунт. Не переноси контекст Сергея в материалы Ольги и наоборот.

Параметры реальной схемы:
- `mode` — `carousel`, `reels`, `post`, `stories`, `content_plan` (обычно `carousel`)
- `topic` — тема или исходный материал
- `sergeyContext` — контекст выбранного аккаунта (название поля историческое)
- `platform` — `instagram`, `vk`, `both`
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

Не добавляй аргументы сверх перечисленных полей схемы.
