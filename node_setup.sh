#!/usr/bin/env bash

sudo apt install npm
curl https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
echo "<==  Run  ==> 
source ~/.zshrc && \
nvm install --lts && \
npm install -g npm@latest && \
npm install -g @angular/cli && \
npm install"