package com.veri.full_stack_developer_test_backend.task;

import com.veri.full_stack_developer_test_backend.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "tasks", indexes = {
        @Index(name = "idx_tasks_user", columnList = "user_id")
})
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 1, max = 140)
    @Column(nullable = false, length = 140)
    private String title;

    @Size(max = 2000)
    @Column(length = 2000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private TaskStatus status = TaskStatus.PENDING;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_tasks_user"))
    private User user;

    public Task() {}

    public Task(String title, String description, TaskStatus status, User user) {
        this.title = title;
        this.description = description;
        this.status = status == null ? TaskStatus.PENDING : status;
        this.user = user;
    }

    // getters/setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }

    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public TaskStatus getStatus() { return status; }

    public void setStatus(TaskStatus status) { this.status = status; }

    public User getUser() { return user; }

    public void setUser(User user) { this.user = user; }
}
