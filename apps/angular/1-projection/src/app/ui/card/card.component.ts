import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [style.background-color]="bgColor()">
      <img ngSrc="{{ imageSource() }}" width="200" height="200" />
      <section>
        @for (item of list(); track item) {
          <app-list-item
            [name]="item.firstName"
            [id]="item.id"
            [deleteById]="deleteById()" />
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()()">
        Add
      </button>
    </div>
  `,
  imports: [ListItemComponent, NgOptimizedImage],
})
export class CardComponent {
  readonly imageSource = input('');

  readonly list = input<any[] | null>(null);
  readonly bgColor = input('');

  addNewItem = input<() => void>(() => {
    console.warn('Add new item handler not provided');
    // Default behavior if no handler is provided
  });

  deleteById = input<(id: number) => void>(() => {
    console.warn('Delete by ID handler not provided');
  });

  //   const type = this.type();
  //   if (type === CardType.TEACHER) {
  //     this.teacherStore.addOne(randTeacher());
  //   } else if (type === CardType.STUDENT) {
  //     this.studentStore.addOne(randStudent());
  //   }
  // }
}
