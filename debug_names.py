import re
with open(r'C:\Users\Movila\.gemini\antigravity\brain\32ad02ae-78b3-406d-a4e1-ab97bed2ebaa\.system_generated\steps\22\content.md', encoding='utf-8') as f:
    content = f.read()

matches = re.findall(r'data-name="(.*?)".*?alt="(.*?)"', content, flags=re.DOTALL)
for m in matches[:50]:
    print(f"{m[0]} -> {m[1]}")
