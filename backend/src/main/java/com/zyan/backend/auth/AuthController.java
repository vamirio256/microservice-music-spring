package com.zyan.backend.auth;

import com.zyan.backend.jwt.JwtUtils;
import com.zyan.backend.track.TrackService;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final TrackService trackService;
    private final JwtUtils jwtUtils;

    public AuthController(AuthService authService, TrackService trackService, JwtUtils jwtUtils) {
        this.authService = authService;
        this.trackService = trackService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(
            @RequestBody RegisterRequestDTO request
    ) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponseDTO> createAuthenticationToken(@RequestBody AuthRequestDTO request) {
        System.out.println(request.toString());
        return ResponseEntity.ok(authService.authenticate(request));

    }

    @PostMapping("/validate-token")
    public ResponseEntity<String> validateToken(@RequestHeader("Authorization") String token) {
        if (jwtUtils.isTokenExpired(token.substring(7))) {
            return ResponseEntity.status(HttpStatusCode.valueOf(401)).body("Token is expired");
        } else {
            return ResponseEntity.ok("Token validated");
        }
    }
}
