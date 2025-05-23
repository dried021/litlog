// package com.bookfox.config;

// import org.springframework.context.annotation.Configuration;
// import org.springframework.lang.NonNull;
// import org.springframework.web.servlet.config.annotation.*;

// @Configuration
// public class WebConfig implements WebMvcConfigurer {
//     @Override
//     public void addCorsMappings(@NonNull CorsRegistry registry) {
//         registry.addMapping("/**")
//                 .allowedOrigins("http://localhost:5173")
//                 .allowedMethods("*")
//                 .allowedHeaders("*")
//                 .allowCredentials(true);
//     }
//     @Override
//     public void addResourceHandlers(ResourceHandlerRegistry registry) {
//         registry.addResourceHandler("/images/profile/*")
//                 .addResourceLocations("file:uploads/profile-images/");
//     }
// }
