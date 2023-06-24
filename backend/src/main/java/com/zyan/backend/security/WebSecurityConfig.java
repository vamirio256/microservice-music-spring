package com.zyan.backend.security;

import com.zyan.backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@Configuration
public class WebSecurityConfig {

    @Autowired
    private UserRepository userRepository;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .cors().disable()
                .csrf().disable()
                .authorizeHttpRequests()
//                .requestMatchers("api/v1/auth/hello").permitAll()
                .anyRequest()
                .permitAll()
                .and()
                .oauth2Login()
                .defaultSuccessUrl("/user",true)
//                .and()
//                .logout()
//                .and()
//                .httpBasic()
                .and()
                .build();
//                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                  .oauth2ResourceServer((oauth2) -> oauth2
//    .jwt(Customizer.withDefaults())
//)
//                .httpBasic(withDefaults());

    }

//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer() throws Exception {
//        return (web) -> web.ignoring().requestMatchers("/ignore1");
//    }

    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder passwordEncoder) {
        UserDetails admin = User.withUsername("admin")
                .password(passwordEncoder.encode("admin"))
                .roles("ADMIN")
                .build();
        UserDetails user = User.withUsername("user")
                .password("user")
                .roles("USER")
                .build();
        return new InMemoryUserDetailsManager(admin, user);
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
