package com.zyan.backend.auth;

import com.zyan.backend.jwt.JwtUtils;
import com.zyan.backend.track.TrackService;
import com.zyan.backend.user.dto.UserDTO;
import com.zyan.backend.user.entities.User;
import com.zyan.backend.user.services.UserService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final TrackService trackService;
    private final UserService userService;
    private final JwtUtils jwtUtils;

    public AuthController(AuthService authService, TrackService trackService, UserService userService, JwtUtils jwtUtils) {
        this.authService = authService;
        this.trackService = trackService;
        this.userService = userService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody RegisterRequestDTO userDTO,
            HttpServletRequest request
    ) throws MessagingException, UnsupportedEncodingException {
        if (userService.checkIfEmailExist(userDTO.getEmail())) {
            return ResponseEntity.status(HttpStatusCode.valueOf(409)).body("Email already exists");
        }
        authService.register(userDTO, getSiteURL(request));
        return ResponseEntity.ok("register user successully!");
    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponseDTO> createAuthenticationToken(@RequestBody AuthRequestDTO request) {
        return ResponseEntity.ok(authService.authenticate(request));

    }

    @PostMapping("/validate-token")
    public ResponseEntity<UserDTO> validateToken(@RequestHeader("Authorization") String token) {
        int id = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        if (jwtUtils.isTokenExpired(token.substring(7))) {
            return ResponseEntity.status(HttpStatusCode.valueOf(401)).body(new UserDTO());
        } else {
            return ResponseEntity.ok(userService.findById(id));
        }
    }

    @GetMapping("/verify")
    public String verifyUser(@Param("code") String code) {
        if (authService.verify(code)) {
            return "Verify successfully, please go to homepage to login ";
        } else {
            return "Verify failed";
        }
    }
}
