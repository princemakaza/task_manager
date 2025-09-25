package com.veri.full_stack_developer_test_backend.task.dto;

import com.veri.full_stack_developer_test_backend.task.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class TaskRequest {

    @NotBlank
    @Size(min = 1, max = 140)
    private String title;

    @Size(max = 2000)
    private String description;

    // Optional; null defaults to PENDING on create
    private TaskStatus status;

    public TaskRequest() {}

    public TaskRequest(String title, String description, TaskStatus status) {
        this.title = title;
        this.description = description;
        this.status = status;
    }

    public String getTitle() { return title; }

    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public TaskStatus getStatus() { return status; }

    public void setStatus(TaskStatus status) { this.status = status; }
}
