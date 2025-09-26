import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task, TaskCreate, TaskUpdate } from '../../../core/services/models/task.models';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private readonly API = `${environment.apiBaseUrl}/api/tasks`;

  constructor(private http: HttpClient) {}

  list(): Observable<Task[]> {
    return this.http.get<Task[]>(this.API);
  }

  get(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.API}/${id}`);
  }

  create(payload: TaskCreate): Observable<Task> {
    return this.http.post<Task>(this.API, payload);
  }

  update(id: number, payload: TaskUpdate): Observable<Task> {
    return this.http.put<Task>(`${this.API}/${id}`, payload);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
