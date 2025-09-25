package com.veri.full_stack_developer_test_backend.auth.service;


import com.veri.full_stack_developer_test_backend.auth.dto.JwtResponse;
import com.veri.full_stack_developer_test_backend.auth.dto.LoginRequest;
import com.veri.full_stack_developer_test_backend.auth.dto.RegisterRequest;
import com.veri.full_stack_developer_test_backend.security.JwtTokenProvider;
import com.veri.full_stack_developer_test_backend.user.User;
import com.veri.full_stack_developer_test_backend.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthServiceImpl implements AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthServiceImpl.class);

    private final UserRepository users;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthServiceImpl(UserRepository users,
                           PasswordEncoder passwordEncoder,
                           AuthenticationManager authenticationManager,
                           JwtTokenProvider jwtTokenProvider) {
        this.users = users;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    @Transactional
    public JwtResponse register(RegisterRequest request) {
        if (users.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username already taken");
        }
        User u = new User();
        u.setUsername(request.getUsername());
        u.setPassword(passwordEncoder.encode(request.getPassword()));
        users.save(u);
        log.info("User registered: {}", u.getUsername());

        // auto-login on register
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        String token = jwtTokenProvider.generateToken((org.springframework.security.core.userdetails.User) auth.getPrincipal());
        return new JwtResponse(token);
    }

    @Override
    public JwtResponse login(LoginRequest request) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            String token = jwtTokenProvider.generateToken((org.springframework.security.core.userdetails.User) auth.getPrincipal());
            log.info("User login successful: {}", request.getUsername());
            return new JwtResponse(token);
        } catch (BadCredentialsException ex) {
            log.warn("Login failed for {}: {}", request.getUsername(), ex.getMessage());
            throw ex;
        }
    }
}
