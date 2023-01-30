#!/usr/bin/env bash
# The Releases page provides an AppImage that runs on most Linux systems.
# No installation is needed, just download nvim.appimage and run it.
# (It might not work if your Linux distribution is more than 4 years old.)

curl -LO https://github.com/neovim/neovim/releases/latest/download/nvim.appimage
chmod u+x nvim.appimage
./nvim.appimage

# If the ./nvim.appimage command fails, try:
./nvim.appimage --appimage-extract
./squashfs-root/AppRun --version

# Optional: exposing nvim globally.
sudo mv squashfs-root /
sudo ln -s /squashfs-root/AppRun /usr/bin/nvim

# -----nvim is set to use, just how you use vim------
echo "-----nvim is set to use, just how you use vim------"

# -----configuring nvim as an IDE------
sudo mkdir -p ~/.config/nvim && chmod 755 ~/.config/nvim
cd ~/.config/nvim/ || { echo "can't access ~/.config/nvim/"; exit 1; }
sudo curl -o ~/.config/nvim/init.lua https://raw.githubusercontent.com/nvim-lua/kickstart.nvim/master/init.lua
sudo mkdir -p ~/.config/nvim
cd ~/.config/nvim/ || { echo "can't access ~/.config/nvim/"; exit 1; }
curl -o ~/.config/nvim/init.lua https://raw.githubusercontent.com/nvim-lua/kickstart.nvim/master/init.lua

# start nvim
nvim

# wait for all installations
# quit and restart nvim, and voila!
