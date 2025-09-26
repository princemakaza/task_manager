import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Task, TaskStatus, TaskUpdate } from '../../../../core/services/models/task.models';
import * as TasksSelectors from '../../store/tasks.selectors';
import * as TasksActions from '../../store/tasks.actions';

import { TaskListComponent } from '../../components/task-list/task-list';
import { TaskFormComponent } from '../../components/task-form/task-form';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TaskListComponent, TaskFormComponent],
  styleUrls: ['./dashboard.css'],
  templateUrl: './dashboard.html',
})
export class DashboardComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;

  editing: Task | null = null;
  showForm = false;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.tasks$ = this.store.select(TasksSelectors.selectTasks);
    this.loading$ = this.store.select(TasksSelectors.selectTasksLoading);
    this.error$ = this.store.select(TasksSelectors.selectTasksError);

    this.store.dispatch(TasksActions.loadTasks());
  }

  startCreate(): void {
    this.editing = null;
    this.showForm = true;
  }

  startEdit(task: Task): void {
    this.editing = task;
    this.showForm = true;
  }

  save(form: { title: string; description?: string | null; status: TaskStatus }): void {
    if (this.editing) {
      const changes: TaskUpdate = {
        title: form.title,
        description: form.description ?? '',
        status: form.status,
      };
      this.store.dispatch(TasksActions.updateTask({ id: this.editing.id, changes }));
    } else {
      this.store.dispatch(TasksActions.createTask({ payload: form }));
    }
    this.showForm = false;
    this.editing = null;
  }

  toggleStatus(ev: { id: number; status: TaskStatus }) {
    this.store.dispatch(
      TasksActions.updateTask({
        id: ev.id,
        changes: { title: this.findTitle(ev.id), description: this.findDescription(ev.id), status: ev.status } as TaskUpdate,
      })
    );
  }

  delete(id: number) {
    this.store.dispatch(TasksActions.deleteTask({ id }));
  }

  cancel() {
    this.showForm = false;
    this.editing = null;
  }

  logout() {
    localStorage.removeItem('jwt');        // clear token
    this.router.navigateByUrl('/auth/login'); // go to login
  }

  // helpers
  private findTitle(id: number): string {
    let title = '';
    this.tasks$.subscribe(list => {
      const t = list.find(x => x.id === id);
      title = t?.title ?? '';
    }).unsubscribe();
    return title;
  }
  private findDescription(id: number): string {
    let desc = '';
    this.tasks$.subscribe(list => {
      const t = list.find(x => x.id === id);
      desc = t?.description ?? '';
    }).unsubscribe();
    return desc;
  }
}
