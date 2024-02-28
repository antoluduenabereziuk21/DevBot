package com.back.chatbot.configuration;


import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
@OpenAPIDefinition(
        servers ={ @Server(
                url = "http://149.50.137.89:9698",//"http://localhost:9698", //http://181.15.143.132:9698
                description = "dev server don web"),//don web luis
                @Server
                (url = "http://127.0.0.1:9698",//"http://localhost:9698", //http://181.15.143.132:9698
                description = "development server"),

        }
)
public class SwaggerConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("ChatBot Dev")
                        .version("1.0.0")
                        .description("Documentation ChatBot Dev API v1.0")

                );
    }
     /*
    .contact(new Contact()
                                .name("Luis Peche")
                                .url("https://www.linkedin.com/in/luis-peche/"))
                        .contact(new Contact()
                                .name("Antonio Bereziuk")
                                .url("https://www.linkedin.com/in/antonioluduenabereziuk/"))
                        .contact(new Contact()
                                .name("Exequiel Baez")
                                .url("https://www.linkedin.com/in/exequiel-baez-156752238/"))
     */

}


