---
name: aim-content-team
description: Use AIM Content Team to turn Sergey brand context and a topic into carousel strategy, hooks, exact slide text, CTAs, and visual direction through the local AIM MCP server.
---

# AIM Content Team

Use this skill when the user asks for content strategy, hooks, carousel structure, captions, CTA ideas, or a content plan for Sergey/AIM content.

## Workflow

1. Collect or infer the required inputs:
   - `topic`: тема или исходный материал;
   - `sergeyContext`: контекст бренда Сергея;
   - `platform`: `instagram`, `telegram`, or `both`;
   - `goal`: `shares`, `saves`, `sales`, `subscribers`, `reach`, or `trust`;
   - `mode` and `format`: usually `carousel` for carousel work.
2. Call the MCP tool `aim_content_team` with exactly the real schema fields.
3. Use the returned team output as the source of truth:
   - strategy from Strategist;
   - hooks from Hook Writer;
   - carousel structure and exact text from Scriptwriter;
   - visual direction from Visual Director;
   - CTA/save/share/comment mechanics from Conversion Editor.
4. If the user wants images, convert the carousel result into `slides: [{ slideNumber, text, visual }]` and continue with the `aim-carousel-image-agent` skill.

## MCP Tool

Call `aim_content_team` with this shape:

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

## Important constraints

- Do not use `brief`, `audience`, `toneOfVoice`, or `language`.
- Do not use unsupported goals such as `engagement`.
- Return ready-to-use copy, not generic advice.
- Keep hooks specific and scroll-stopping.
- Keep CTA aligned with the selected goal.
- For carousel outputs, make the slide structure concrete enough to pass directly into `aim_create_carousel_image_agent` as `slides`.
