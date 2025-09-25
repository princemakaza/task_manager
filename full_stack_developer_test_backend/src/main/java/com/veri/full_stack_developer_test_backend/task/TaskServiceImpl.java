package com.veri.full_stack_developer_test_backend.task;

import com.veri.full_stack_developer_test_backend.task.dto.TaskRequest;
import com.veri.full_stack_developer_test_backend.task.dto.TaskResponse;
import com.veri.full_stack_developer_test_backend.user.User;
import com.veri.full_stack_developer_test_backend.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

import java.util.List;

@Service
@Transactional
public class TaskServiceImpl implements TaskService {

    private static final Logger log = LoggerFactory.getLogger(TaskServiceImpl.class);

    private final TaskRepository tasks;
    private final UserRepository users;

    public TaskServiceImpl(TaskRepository tasks, UserRepository users) {
        this.tasks = tasks;
        this.users = users;
    }

    @Override
    public TaskResponse create(String username, TaskRequest req) {
        User owner = users.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "User not found"));

        Task task = new Task(
                req.getTitle(),
                req.getDescription(),
                req.getStatus() == null ? TaskStatus.PENDING : req.getStatus(),
                owner
        );
        Task saved = tasks.save(task);
        log.info("Task created id={} by user={}", saved.getId(), username);
        return toDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TaskResponse> findAll(String username) {
        return tasks.findAllByUser_UsernameOrderByIdDesc(username)
                .stream().map(this::toDto).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public TaskResponse findOne(String username, Long id) {
        Task task = tasks.findByIdAndUser_Username(id, username)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Task not found"));
        return toDto(task);
    }

    @Override
    public TaskResponse update(String username, Long id, TaskRequest req) {
        Task task = tasks.findByIdAndUser_Username(id, username)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Task not found"));

        task.setTitle(req.getTitle());
        task.setDescription(req.getDescription());
        task.setStatus(req.getStatus() == null ? TaskStatus.PENDING : req.getStatus());
        Task saved = tasks.save(task);
        log.info("Task updated id={} by user={}", saved.getId(), username);
        return toDto(saved);
    }

    @Override
    public void delete(String username, Long id) {
        Task task = tasks.findByIdAndUser_Username(id, username)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Task not found"));
        tasks.delete(task);
        log.info("Task deleted id={} by user={}", id, username);
    }

    private TaskResponse toDto(Task t) {
        return new TaskResponse(t.getId(), t.getTitle(), t.getDescription(), t.getStatus());
    }
}
