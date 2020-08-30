FROM node:14.9.0-alpine

RUN mkdir -p /home/pengubot/
WORKDIR /home/pengubot/

RUN apk add --no-cache \
	build-base \
	cairo-dev \
	freetype-dev \
	g++ \
	gcc \
	giflib-dev \
	git \
	jpeg-dev \
	libjpeg-turbo-dev \
	musl-dev \
	pango-dev \
	pangomm-dev \
	pixman-dev \
	pkgconfig \
	python

COPY package.json /home/pengubot/
COPY yarn.lock /home/pengubot/

ARG PAT

RUN sed -i "s|github:pengubot/music#build|git+https://AdityaTD:${PAT}@github.com/PenguBot/music.git#build|g" ./package.json
RUN yarn install --link-duplicates --build-links --production

COPY /src /home/pengubot/src
COPY /assets /home/pengubot/assets
COPY config.js /home/pengubot/config.js
COPY .git /home/pengubot/.git

WORKDIR /home/pengubot/src
CMD ["node", "main.js"]