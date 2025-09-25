package com.veri.full_stack_developer_test_backend.task;


import com.veri.full_stack_developer_test_backend.task.dto.TaskRequest;
import com.veri.full_stack_developer_test_backend.task.dto.TaskResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.veri.full_stack_developer_test_backend.common.SecurityUtils;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<TaskResponse> create(@RequestBody @Valid TaskRequest req) {
        String username = requireUser();
        TaskResponse created = service.create(username, req);
        return ResponseEntity
                .created(URI.create("/api/tasks/" + created.getId()))
                .body(created);
    }

    @GetMapping
    public List<TaskResponse> list() {
        String username = requireUser();
        return service.findAll(username);
    }

    @GetMapping("/{id}")
    public TaskResponse get(@PathVariable Long id) {
        String username = requireUser();
        return service.findOne(username, id);
    }

    @PutMapping("/{id}")
    public TaskResponse update(@PathVariable Long id, @RequestBody @Valid TaskRequest req) {
        String username = requireUser();
        return service.update(username, id, req);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        String username = requireUser();
        service.delete(username, id);
        return ResponseEntity.noContent().build();
    }

    private String requireUser() {
        return SecurityUtils.getCurrentUsername()
                .orElseThrow(() -> new IllegalStateException("No authenticated user in context"));
    }
}
