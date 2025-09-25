package com.veri.full_stack_developer_test_backend.auth;


import com.veri.full_stack_developer_test_backend.auth.dto.JwtResponse;
import com.veri.full_stack_developer_test_backend.auth.dto.LoginRequest;
import com.veri.full_stack_developer_test_backend.auth.dto.RegisterRequest;
import com.veri.full_stack_developer_test_backend.auth.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService auth;

    public AuthController(AuthService auth) {
        this.auth = auth;
    }

    @PostMapping("/register")
    public ResponseEntity<JwtResponse> register(@RequestBody @Valid RegisterRequest request) {
        return ResponseEntity.ok(auth.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody @Valid LoginRequest request) {
        return ResponseEntity.ok(auth.login(request));
    }
}
