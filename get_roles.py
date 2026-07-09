import json
import re

with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

roles = set()
for line in content.split('\n'):
    if 'role:' in line:
        try:
            role = re.search(r'role:\s*"([^"]+)"', line).group(1)
            roles.add(role)
        except:
            pass

print(list(roles))
