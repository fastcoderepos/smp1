import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TestService } from '../test.service';
import { ITest } from '../itest';
import { Globals, BaseNewComponent, PickerDialogService, ErrorService } from 'src/app/common/shared';

@Component({
  selector: 'app-test-new',
  templateUrl: './test-new.component.html',
  styleUrls: ['./test-new.component.scss'],
})
export class TestNewComponent extends BaseNewComponent<ITest> implements OnInit {
  title: string = 'New Test';
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TestNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public global: Globals,
    public pickerDialogService: PickerDialogService,
    public testService: TestService,
    public errorService: ErrorService
  ) {
    super(formBuilder, router, route, dialog, dialogRef, data, global, pickerDialogService, testService, errorService);
  }

  ngOnInit() {
    this.entityName = 'Test';
    this.setAssociations();
    super.ngOnInit();
    this.setForm();
    this.checkPassedData();
    this.setPickerSearchListener();
  }

  setForm() {
    this.itemForm = this.formBuilder.group({
      version: ['', Validators.required],
    });

    this.fields = [
      {
        name: 'version',
        label: 'version',
        isRequired: true,
        isAutoGenerated: false,
        type: 'number',
      },
    ];
  }

  setAssociations() {
    this.associations = [];
    this.parentAssociations = this.associations.filter((association) => {
      return !association.isParent;
    });
  }

  onSubmit() {
    let test = this.itemForm.getRawValue();
    super.onSubmit(test);
  }
}
