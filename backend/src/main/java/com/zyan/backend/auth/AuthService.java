package com.zyan.backend.auth;

public interface AuthService {
    AuthResponseDTO authenticate(AuthRequestDTO authRequestDTO);

    AuthResponseDTO register(RegisterRequestDTO request);
}
