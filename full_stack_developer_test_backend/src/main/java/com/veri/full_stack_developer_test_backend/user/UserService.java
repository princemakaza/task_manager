package com.veri.full_stack_developer_test_backend.user;

import java.util.Optional;

public interface UserService {
    boolean existsByUsername(String username);
    Optional<User> findByUsername(String username);
    User save(User user);
}
