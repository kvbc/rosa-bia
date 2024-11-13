@echo off
REM count lines of code, exclude node_modules folder and Chakra UI snippets
cloc client server shared --exclude-dir=node_modules,ui