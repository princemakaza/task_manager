package com.veri.full_stack_developer_test_backend.task;



import com.veri.full_stack_developer_test_backend.task.dto.TaskRequest;
import com.veri.full_stack_developer_test_backend.task.dto.TaskResponse;

import java.util.List;

public interface TaskService {
    TaskResponse create(String username, TaskRequest req);
    List<TaskResponse> findAll(String username);
    TaskResponse findOne(String username, Long id);
    TaskResponse update(String username, Long id, TaskRequest req);
    void delete(String username, Long id);
}
