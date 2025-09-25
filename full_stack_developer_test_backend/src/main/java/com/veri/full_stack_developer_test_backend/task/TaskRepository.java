package com.veri.full_stack_developer_test_backend.task;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByUser_UsernameOrderByIdDesc(String username);
    Optional<Task> findByIdAndUser_Username(Long id, String username);
}
