FROM node:18-alpine AS build


WORKDIR /app

COPY package.json ./
RUN npm install
COPY . /app/

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN CI=true && npm run build

# Prepare nginx
FROM nginx:1.20.2-alpine

COPY --from=build /app/dist /var/www
RUN chown -R nginx:nginx /var/www
COPY nginx.conf /etc/nginx/nginx.conf

# Fire up nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

