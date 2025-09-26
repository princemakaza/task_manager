import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TaskStatus } from '../../../../core/services/models/task.models';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.html',
    styleUrls: ['./task-list.css'],   // <-- add this

})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Input() loading = false;
  @Output() edit = new EventEmitter<Task>();
  @Output() toggle = new EventEmitter<{ id: number; status: TaskStatus }>();
  @Output() remove = new EventEmitter<number>();
}
