import { Component, OnInit, OnDestroy, AfterViewInit, OnChanges, DoCheck } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck, OnInit, AfterViewInit, OnDestroy {
  title = 'change-detection-experiment';
  formGroup: FormGroup;
  subscription: Subscription;

  counterMetaData: 'even' | 'odd' = 'odd';

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({});
  }

  ngOnInit(): void {
  }

  ngDoCheck() {
    console.log('running ngDoCheck');
  }

  ngAfterViewInit(): void {
    this.formGroup.valueChanges.pipe(
      startWith({ counter: 1 })
    ).subscribe((value) => {
      if (value.counter % 2 === 0) {
        this.counterMetaData = 'even';
      } else {
        this.counterMetaData = 'odd';
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
