FROM nginx

LABEL org.opencontainers.image.source = "https://github.com/LZL-Tech/lazuli-ui"

COPY ./dist/lazuli-ui /usr/share/nginx/html
