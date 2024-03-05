FROM amazoncorretto:17.0.9

COPY /target/devbot-app.jar /app/devbot-app.jar
RUN mkdir -p /app/src/main/resources/reports
RUN mkdir -p /app/src/main/resources/images
RUN mkdir -p /app/src/main/resources/fonts

COPY /src/main/resources/images/165.jpg /app/src/main/resources/images/165.jpg
COPY /src/main/resources/reports/ReportePedido.jrxml /app/src/main/resources/reports/ReportePedido.jrxml
COPY /src/main/resources/reports/fonts/*.ttf /app/src/main/resources/fonts/
# Cambié la ruta de destino de /src/main/resources/reports/fonts/ a /app/src/main/resources/fonts/

WORKDIR /app
CMD ["java", "-Duser.timezone=America/Argentina", "-jar", "devbot-app.jar"]

