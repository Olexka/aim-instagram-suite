---
name: aim-content-team
description: Turn a topic and Sergey brand context into AIM content strategy, hooks, carousel structure, exact slide text, CTA, and visual direction.
---

# AIM Content Team

Use this skill when the user wants AIM to prepare content strategy or carousel planning for Sergey/AIM content.

## Real MCP schema

Use only these parameters:

- `mode`
- `topic`
- `sergeyContext`
- `platform`
- `goal`
- `format`

Allowed `platform` values:

- `instagram`
- `vk`
- `both`

Use no extra arguments beyond the six fields listed above.

## Required call

```json
{
  "tool": "aim_content_team",
  "arguments": {
    "mode": "carousel",
    "topic": "тема или исходный материал",
    "sergeyContext": "контекст бренда Сергея",
    "platform": "both",
    "goal": "shares",
    "format": "carousel"
  }
}
```

## Workflow

1. Collect or infer `topic` and `sergeyContext`.
2. Choose `platform` from `instagram`, `vk`, or `both`.
3. Choose a valid `goal`, preferably `shares` for viral carousel work.
4. Call `aim_content_team` with the exact schema above.
5. Use the result as the approved source for structure, hooks, exact slide text, CTA, and visual direction.
6. If images are needed, convert the carousel into `slides: [{ slideNumber, text, visual }]` and then use `aim_create_carousel_image_agent`.
