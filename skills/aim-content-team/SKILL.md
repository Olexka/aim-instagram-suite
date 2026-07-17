---
name: aim-content-team
description: Turn a topic and an explicitly named account context into AIM content strategy, hooks, carousel structure, exact slide text, CTA, and visual direction. For expert-positioning, sales, diagnostic, consultation, support, training, or service content, load aim-expert-conversion-content first and follow its approval workflow.
---

# AIM Content Team

Use this skill when the user wants AIM to prepare content strategy or carousel planning for Olga, Sergey, or another explicitly named AIM account.

## Required expert-content gate

If the material promotes an expert, diagnosis, consultation, support, training, or another paid service:

1. Load `aim-expert-conversion-content` first.
2. Confirm its six context points.
3. Present the concept for approval.
4. Call `aim_content_team` and write the full text only after approval.

Never assume the account. Keep Olga's and Sergey's positioning separate.

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

1. Collect `topic` and confirm the account context to place in `sergeyContext` (the field name is legacy and may contain Olga's or another account's context).
2. Choose `platform` from `instagram`, `vk`, or `both`.
3. Choose a valid `goal`, preferably `shares` for viral carousel work.
4. Call `aim_content_team` with the exact schema above.
5. Use the result as the approved source for structure, hooks, exact slide text, CTA, and visual direction.
6. If images are needed, convert the carousel into `slides: [{ slideNumber, text, visual }]` and then use `aim_create_carousel_image_agent`.
