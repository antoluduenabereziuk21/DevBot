FROM amazoncorretto:17.0.9

COPY /target/devbot-app.jar /app/devbot-app.jar
RUN mkdir -p /app/src/main/resources/reports
RUN mkdir -p /app/src/main/resources/images
RUN mkdir -p /app/src/main/resources/fonts

# RUN mkdir -p /app/src/main/resources/static/qr
#
COPY /src/main/resources/images/165.jpg /app/src/main/resources/images/165.jpg
COPY /src/main/resources/reports/ReportePedido.jrxml /app/src/main/resources/reports/ReportePedido.jrxml
COPY /src/main/resources/reports/fonts/*.ttf /src/main/resources/reports/fonts/

# COPY /src/main/resources/static/not_found.png /app/src/main/resources/static/not_found.png


WORKDIR /app
CMD ["java","-Duser.timezone=America/Argentina", "-jar", "devbot-app.jar"]
