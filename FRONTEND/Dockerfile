# Stage 1: Build Stage
FROM node:slim AS develop
WORKDIR /sociallogin.frontend/
RUN npm install -g @quasar/cli
COPY . .
RUN npm install

FROM develop as build
RUN quasar build

# Stage 2: Final Stage
FROM nginx:1.25.3-alpine3.18 AS prod
COPY --from=build /sociallogin.frontend/dist/spa/ /usr/share/nginx/html
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

