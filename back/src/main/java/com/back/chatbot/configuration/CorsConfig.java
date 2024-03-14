package com.back.chatbot.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


/**
 * This class configures Cross-Origin Resource Sharing (CORS) settings for the application.
 */
@Configuration
@EnableWebMvc
public class CorsConfig {

    /**
     * Configures global CORS settings for the application using WebMvcConfigurer.
     *
     * @return An instance of WebMvcConfigurer with CORS settings.
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*")
                        .allowedHeaders("*");
            }
        };
    }
}