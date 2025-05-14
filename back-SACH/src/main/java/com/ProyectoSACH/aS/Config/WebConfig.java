package com.ProyectoSACH.aS.Config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Asegúrate de que la ruta esté bien escrita con "file:///" y que termine en /
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:///C:/Users/flavi/Videos/SACH/uploads/");
    }
}
