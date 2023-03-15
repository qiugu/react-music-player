FROM node:16-buster-slim as dependency

LABEL description="A demo Dockerfile for build Music Player."

COPY ./package.json ./package-lock.json /var/web/

RUN set -x \
&& cd /var/web \
&& npm install

FROM node:16-buster-slim as builder

COPY --from=0 /var/web /var/web

COPY . /var/web

RUN set -x \
&& cd /var/web \
&& ls -l \
&& npm run build

FROM nginx:1.23.1 as prod

EXPOSE 8003

COPY --from=1 /var/web/nginx.conf /etc/nginx

COPY --from=1 /var/web/dist /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;" ]
