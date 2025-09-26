// src/app/features/tasks/components/task-form/task-form.ts
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  NonNullableFormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Task, TaskStatus } from '../../../../core/services/models/task.models'; // fix path

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
    styleUrls: ['./task-form.css'],   // <-- add this
  templateUrl: './task-form.html',
})
export class TaskFormComponent implements OnChanges {
  @Input() task: Task | null = null;
  @Output() save = new EventEmitter<{ title: string; description?: string | null; status: TaskStatus }>();
  @Output() cancel = new EventEmitter<void>();

  private fb = inject(NonNullableFormBuilder);

  // Strongly typed FormGroup
  form: FormGroup<{
    title: FormControl<string>;
    description: FormControl<string>;
    status: FormControl<TaskStatus>;
  }> = this.fb.group({
    title: this.fb.control('', [Validators.required, Validators.maxLength(140)]),
    description: this.fb.control(''),
    status: this.fb.control<TaskStatus>('PENDING'),
  });

  ngOnChanges(_changes: SimpleChanges): void {
    if (!this.form) return;
    if (this.task) {
      this.form.reset({
        title: this.task.title,
        description: this.task.description ?? '',
        status: this.task.status,
      });
    } else {
      this.form.reset({ title: '', description: '', status: 'PENDING' as TaskStatus });
    }
  }

  submit(): void {
    if (this.form.invalid) return;
    this.save.emit(this.form.value as { title: string; description?: string | null; status: TaskStatus });
  }
}
