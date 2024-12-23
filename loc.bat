@echo off
REM count lines of code, exclude node_modules folder and Chakra UI snippets
cloc client server shared scripts --exclude-dir=node_modules,ui --include-lang=TypeScript,Python,SQL --not-match-f=odsgen\.sql