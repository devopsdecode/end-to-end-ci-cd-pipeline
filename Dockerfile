FROM nginx:alpine 

# Run package updates to patch potential base vulnerabilities
RUN apk update && apk upgrade --no-cache

COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]