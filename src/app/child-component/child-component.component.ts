import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { of, zip, from, interval } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.scss']
})
export class ChildComponentComponent implements OnInit {

  @Input() parentFormGroup: FormGroup;
  counter = new FormControl(0);

  constructor() { }

  ngOnInit() {
    this.parentFormGroup.addControl('counter', this.counter);

    zip(
      from([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      interval(1000),
      (val, i) => val // Just emit the value
    ).subscribe((val) => {
      this.counter.setValue(val);
    });
  }

  updateCounter() {
    let current = this.counter.value;
    this.counter.setValue(++current);
  }

}
