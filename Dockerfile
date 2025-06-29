FROM node:18

# Install ImageMagick + Ghostscript and patch policy to allow EPS/PS
RUN apt update && apt install -y imagemagick ghostscript && \
    sed -i 's|<policy domain="coder" rights="none" pattern="EPS" />|<!-- EPS policy disabled -->|' /etc/ImageMagick-6/policy.xml && \
    sed -i 's|<policy domain="coder" rights="none" pattern="PS" />|<!-- PS policy disabled -->|' /etc/ImageMagick-6/policy.xml

WORKDIR /app

COPY . .

RUN npm install

# Let Render use assigned PORT
EXPOSE $PORT

CMD ["node", "server.js"]