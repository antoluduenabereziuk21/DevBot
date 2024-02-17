FROM amazoncorretto:17.0.9

COPY /target/devbot-app.jar /app/devbot-app.jar
# RUN mkdir -p /app/src/main/resources/static/key
# RUN mkdir -p /app/src/main/resources/static/images
# RUN mkdir -p /app/src/main/resources/static/qr
#
# COPY /src/main/resources/static/images/logo.png /app/src/main/resources/static/images/logo.png
# COPY /src/main/resources/static/key/zephyr-cygnus-credentials.json /app/src/main/resources/static/key/zephyr-cygnus-credentials.json
# COPY /src/main/resources/static/not_found.png /app/src/main/resources/static/not_found.png


WORKDIR /app
CMD ["java","-Duser.timezone=America/Argentina", "-jar", "devbot-app.jar"]