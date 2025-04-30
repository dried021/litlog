// package com.bookfox.LitLog;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.lang.NonNull;
// import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// import com.bookfox.interceptor.SessionInterceptor;

// @Configuration
// public class WebConfig implements WebMvcConfigurer {

//     private static final String[] EXCLUDE_PATHS = {
//         "/login",
//         "/auth/**",
//         "/api/main/getTermsList",
//         "/resources/**",
//         "/css/**",
//         "/js/**",
//         "/images/**",
//         "/favicon.ico",
//         "/api/login",
//         "/api/auth/**"
//     };

//     @Autowired
//     private SessionInterceptor sessionInterceptor;

//     @Override
//     public void addInterceptors(@NonNull InterceptorRegistry registry) {
//         registry.addInterceptor(sessionInterceptor)
//         .order(1)
//         .addPathPatterns("/**")
//         .excludePathPatterns(EXCLUDE_PATHS);
//     }
// }
