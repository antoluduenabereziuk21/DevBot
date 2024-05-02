FROM amazoncorretto:17.0.9
LABEL author=luis;exequiel;antonio
COPY /target/devbot-app.jar /app/devbot-app.jar
RUN mkdir -p /app/src/main/resources/reports
RUN mkdir -p /app/src/main/resources/images
#RUN mkdir -p /app/src/main/resources/fonts
# RUN mkdir -p /app/src/main/resources/static/qr
#
COPY /src/main/resources/images/check.png /app/src/main/resources/images/check.png
COPY /src/main/resources/images/cygnus.png /app/src/main/resources/images/cygnus.png
COPY /src/main/resources/images/lightbulb.png /app/src/main/resources/images/lightbulb.png
COPY /src/main/resources/images/Logo.png /app/src/main/resources/images/Logo.png
COPY /src/main/resources/images/wha.png /app/src/main/resources/images/wha.png
COPY /src/main/resources/reports/Voucher.jrxml /app/src/main/resources/reports/Voucher.jrxml
#COPY /src/main/resources/fonts/erasdemi.ttf  /app/src/main/resources/fonts/erasdemi.ttf
#COPY /src/main/resources/fonts/erasdemiitc.ttf  /app/src/main/resources/fonts/erasdemiitc.ttf
WORKDIR /app
CMD ["java","-Duser.timezone=America/Argentina", "-jar", "devbot-app.jar"]

