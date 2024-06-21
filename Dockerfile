# Stage 1: Build Stage
FROM node:slim AS build
WORKDIR /sociallogin.frontend/
COPY . .

RUN npm install -g @quasar/cli
RUN npm install
RUN quasar build

# Stage 2: Final Stage
FROM nginx:1.25.3-alpine3.18 AS production-stage
COPY --from=build /sociallogin.frontend/dist/spa/ /usr/share/nginx/html
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# docker build --pull --rm -f "Dockerfile" -t radowski.frontend:v1.55 "."
# docker image push radowski.azurecr.io/radowski.frontend:v1.55
