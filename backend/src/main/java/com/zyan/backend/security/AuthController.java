package com.zyan.backend.security;

import com.zyan.backend.security.dto.LoginDTO;
import com.zyan.backend.security.dto.TokenDTO;
import com.zyan.backend.security.dto.SignUpDTO;
import com.zyan.backend.user.User;
import com.zyan.backend.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationProvider;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/v1/auth")
@Slf4j
//@CrossOrigin(origins = "*")
public class AuthController {

    private final UserDetailsManager userDetailsManager;
    private final TokenGenerator tokenGenerator;
    private final DaoAuthenticationProvider daoAuthenticationProvider;
    private final JwtAuthenticationProvider refreshTokenAuthProvider;

    public AuthController(
            UserDetailsManager userDetailsManager,
            TokenGenerator tokenGenerator,
            DaoAuthenticationProvider daoAuthenticationProvider,
            @Qualifier("jwtRefreshTokenAuthenticationProvider") JwtAuthenticationProvider refreshTokenAuthProvider) {
        this.userDetailsManager = userDetailsManager;
        this.tokenGenerator = tokenGenerator;
        this.daoAuthenticationProvider = daoAuthenticationProvider;
        this.refreshTokenAuthProvider = refreshTokenAuthProvider;
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody SignUpDTO signUpDTO) {
        User user = new User(signUpDTO.getUsername(), signUpDTO.getPassword());
        userDetailsManager.createUser(user);

        Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(user, signUpDTO.getPassword(), Collections.EMPTY_LIST);
        return ResponseEntity.ok(tokenGenerator.createToken(authentication));
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginDTO loginDTO) {
        Authentication authentication = daoAuthenticationProvider.authenticate(
                UsernamePasswordAuthenticationToken.unauthenticated(
                        loginDTO.getUsername(),
                        loginDTO.getPassword()
                ));
        return ResponseEntity.ok(tokenGenerator.createToken(authentication));
    }

    @PostMapping("/token")
    public ResponseEntity token(@RequestBody TokenDTO tokenDTO) {
        Authentication authentication = refreshTokenAuthProvider.authenticate(new BearerTokenAuthenticationToken(tokenDTO.getRefreshToken()));

        Jwt jwt = (Jwt) authentication.getCredentials();
        //check if present in db and not revoked
        log.info(String.valueOf(jwt));

        return ResponseEntity.ok(tokenGenerator.createToken(authentication));
    }
}
