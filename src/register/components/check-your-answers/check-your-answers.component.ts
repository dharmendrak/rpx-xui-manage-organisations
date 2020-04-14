import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { TermsConditionsService } from '../../../../src/shared/services/termsConditions.service';
import {FormDataValuesModel} from '../../models/form-data-values.model';

/**
 * Stateless component responsible for
 * displaying and submitting user's inputted data.
 */

@Component({
  selector: 'app-check-your-answers',
  templateUrl: './check-your-answers.component.html',
})
export class CheckYourAnswersComponent implements OnInit, AfterViewInit {

  constructor() {}

  public formDataValues: FormDataValuesModel;

  @Output() public submit = new EventEmitter();
  @Input() public set fromValues(values: FormDataValuesModel) {
    this.formDataValues = values;
  }

  public ngOnInit() {
  }

  // Set to focus to the title when the page started for accessibility
  public ngAfterViewInit() {
    const focusElement = document.getElementsByTagName('h1')[0];
    if (focusElement) {
      focusElement.setAttribute('tabindex', '-1');
      focusElement.focus();
    }
  }

  public onSubmitData() {
    this.submit.emit();
  }

}
