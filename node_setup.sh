#!/usr/bin/env bash

sudo apt install npm
git clone https://github.com/nvm-sh/nvm.git ~/nvm
cd ~/nvm
./install.sh
source ~/.bashrc
nvm install --lts
npm install -g npm@latest
npm install -g @angular/cli
npm install