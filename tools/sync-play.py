#!/usr/bin/env python3
"""Copy blackpine.js and blackpine.css into the inlined copy inside play.html.
Run from anywhere:  python3 tools/sync-play.py"""
import os
d = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
rd = lambda n: open(os.path.join(d, n), encoding='utf-8').read()
html, js, css = rd('play.html'), rd('blackpine.js').split('\n'), rd('blackpine.css')
# CSS: everything between the first <style> and </style>
a = html.index('<style>\n') + len('<style>\n'); b = html.index('\n</style>', a)
html = html[:a] + css.rstrip('\n') + html[b:]
# JS: from "function bootSurvival" to the line before the "(function(){" launcher
h = html.split('\n')
s = next(i for i, l in enumerate(h) if l.startswith('function bootSurvival'))
e = next(i for i in range(s, len(h)) if h[i].startswith('(function(){'))
body = [js[2].replace('export ', '', 1)] + js[3:]
while body and body[-1] == '': body.pop()
h = h[:s] + body + h[e:]
open(os.path.join(d, 'play.html'), 'w', encoding='utf-8').write('\n'.join(h))
print('play.html synced:', len(body), 'JS lines,', len(css.splitlines()), 'CSS lines')
