package com.veri.full_stack_developer_test_backend.auth.service;

import com.veri.full_stack_developer_test_backend.auth.dto.JwtResponse;
import com.veri.full_stack_developer_test_backend.auth.dto.LoginRequest;
import com.veri.full_stack_developer_test_backend.auth.dto.RegisterRequest;

public interface AuthService {
    JwtResponse register(RegisterRequest request);
    JwtResponse login(LoginRequest request);
}
