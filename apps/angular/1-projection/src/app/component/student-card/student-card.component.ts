import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      imageSource="assets/img/student.webp"
      [addNewItem]="addNewStudent"
      [deleteById]="deleteStudent"
      [bgColor]="'rgba(0, 250, 0, 0.1)'" />
  `,
  styles: [],
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students = this.store.students;

  addNewStudent = () => {
    this.store.addOne(randStudent());
  };
  deleteStudent = (id: number) => {
    this.store.deleteOne(id);
  };

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }
}
