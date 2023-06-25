FROM archlinux:latest

RUN pacman -Syu --noconfirm \
        nodejs \
        npm \
    && :

# Update npm.
RUN npm install -g npm@latest
