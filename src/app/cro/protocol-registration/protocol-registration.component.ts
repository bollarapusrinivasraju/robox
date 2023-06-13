import { Component, NgModule } from '@angular/core';
import { ProtocolService } from './protocol-registration.service';
import { Form, FormBuilder, FormControl, FormsModule, FormArray, FormGroup, UntypedFormArray, UntypedFormGroup, Validators } from '@angular/forms';
import { LSponsers } from './lsponsers';
import { LabTests } from './lab-tests';
import { CROS } from './cros';
import { Protocol } from './protocol';
import { CrosService } from '../cros.service';
import { AdminService } from 'src/app/applicationadmin/admin.service';
@Component({
  selector: 'app-protocol-registration',
  templateUrl: './protocol-registration.component.html',
  styleUrls: ['./protocol-registration.component.css']
})
export class ProtocolRegistrationComponent {
  labMatTestsList: Array<any> = [];
  screening: boolean = true;
  visit: boolean = false;
  valueVisit: any= 0;
  listItems: string[]=[];
  listTabs: string[]=[];
  tabnum: number = 0;
  matList: any;
  materials: string[]=[];
  vmatList: any;
  display: boolean = false;
  displayv: boolean = false;
  multipleTests: any[] = []
  multipleTestsv: any[] = []
  testDisplay: boolean = false;
  testDisplayv: boolean = false;
  multipleTestsId: any[] = []
  multipleTestsvId: any[] = []
  selectedValue: any;
  selectedValuev: any;
  // MaterialList: FormArray = new FormArray([])
  constructor(private protocolService: ProtocolService, private adminService:AdminService, private croService:CrosService, private formBuilder: FormBuilder) { };
  sponsers: Array<any> = [];
  crosList: Array<any> = [];
  protocolList: Array<any> = [];
  labTestsList: Array<any> = [];
  sites: Array<any> = [];
slist :any
sizeValues: { [index: number]: string[] } = {};
sizeValuesv: { [index: number]: string[] } = {};
mlist:any
  files1: any;
  file2: any;
  public base64textString: string = '';
  public bas2: string = '';
  selectedTests :any

  public protocolForm: FormGroup = new FormGroup({
    selected_protocol_id: new FormControl("", [Validators.required]),
    selected_protocol_name: new FormControl("", [Validators.required]),
    selected_sponsor_id: new FormControl("", [Validators.required]),
    selected_cro_id: new FormControl("", [Validators.required]),
    selected_patients_num: new FormControl("", [Validators.required]),
    screens: new FormControl("", [Validators.required]),
    total_visits :new FormControl("", [Validators.required]),
    selected_vkit_count:new FormControl("", [Validators.required]),
    selected_skit_count:new FormControl("", [Validators.required]),
    labTestValue: new FormControl(""),
    labTestValuev: new FormControl(""),
 
  })

 
  VisitKitMatForm: any;
  sitesForm:any;
  ScreenKitForm:any;
  ScreenMaterialKitForm: any;
  VisitKitForm:any;
  customerFormGroup:any;
 
  ngOnInit() {

    this.croService.getsponsors().subscribe((sponsers) => {
      this.sponsersData(sponsers);
    });

  
    this.croService.getLabTests().subscribe((labTestsList) => {
      this.matList = labTestsList
      this.vmatList = labTestsList

    });
    this.croService.getLabTests().subscribe((labTestsList) => {
      this.vmatList = labTestsList

    });


      this.croService.meterials().subscribe((data:any)=>{
         console.log(data)
         this.materials = data
               this.labMatData(data)

       })
   
    this.adminService.getCro().subscribe((crosList) => {
      this.crosData(crosList);
    });
  
  
    this.customerFormGroup = this.formBuilder.group({
      sitesList: this.formBuilder.array([])
      
    });


    this.ScreenKitForm = this.formBuilder.group({

      labTestsList: this.formBuilder.array([this.addScreenKitData()])

    })

    this.ScreenMaterialKitForm=this.formBuilder.group({

      materialList: this.formBuilder.array([this.addScreenmKitData()])

    })

    this.VisitKitMatForm = this.formBuilder.group({

      materialList: this.formBuilder.array([this.addVisitKitMatData()])

    })

  }
  labValues(){
    this.multipleTests = [];
    if (this.protocolForm.controls['labTestValue'].value === '' || this.protocolForm.controls['labTestValue'].value === undefined ||
    this.protocolForm.controls['labTestValue'].value === null) {
      this.multipleTests = [];

    } else {
      this.protocolForm.controls['labTestValue'].value.forEach((element: any) => {

      this.testDisplay = true;
   
      this.multipleTestsId.push(element.lab_id);
        this.multipleTests.push(element.name);
        this.display = false
      });
    }
    
  
  }
  labValuesv(){
    this.multipleTestsv = [];
    if (this.protocolForm.controls['labTestValuev'].value === '' || this.protocolForm.controls['labTestValuev'].value === undefined ||
    this.protocolForm.controls['labTestValuev'].value === null) {
      this.multipleTestsv = [];

    } else {
      this.protocolForm.controls['labTestValuev'].value.forEach((element: any) => {

      this.testDisplayv = true;
      this.multipleTestsvId.push(element.lab_id);
        this.multipleTestsv.push(element.name);
        this.displayv = false
      });
    }

  }
  get customerAddressDTOList() {
    return <FormArray>this.customerFormGroup.controls['sitesList'];
  }
  dialog(){
    this.display = true
  }
  dialogv(){
    this.displayv = true
  }
  onScreenKitAdd() {

    //this.ScreenKitForm.get('labTestsList').push(this.addScreenKitData());
    const control1 = this.ScreenKitForm.get('labTestsList') as FormArray;
    control1.push(this.addScreenKitData());
    console.log(this.ScreenKitForm.get('labTestsList').controls);
  }
  removeMatScreenKit(j: number) { 
    this.ScreenMaterialKitForm.get('materialList').removeAt(j);
  }
  removeVisitMatKit(j: number) { 
    this.VisitKitMatForm.get('materialList').removeAt(j);
  }
  showsc(){
    this.screening = true;
    this.visit = false
  }

  showv(){
    // this.tabnum = tab
    // this.listTabs = []; 
    // for (let i = 0; i <= tab; i++)
    //  { this.listTabs.push(`Item ${i}`); 
    // //  this.addVisitKit()
  
    // }
    // this.addVisitKit()
    this.screening = false;
    this.visit = true
  }
  get materialList(): FormArray {
    return this.VisitKitMatForm.get('materialList') as FormArray;
  }
  visits(value: any){
  console.log(value.data);
  
  this.valueVisit= value
  this.listItems = []; 
  for (let i = 1; i <= value.data; i++)
   { this.listItems.push(`Item ${i}`); 
  
  //  this.materialList.push(this.addVisitKitMatData());
  } 
} 
  
  onMaterialKitAdd() {

    //this.ScreenKitForm.get('labTestsList').push(this.addScreenKitData());
    const control1 = this.ScreenMaterialKitForm.get('materialList') as FormArray;
    control1.push(this.addScreenmKitData());
    console.log(this.ScreenMaterialKitForm.get('materialList').controls);
  }
  addScreenKitData() {
    return this.formBuilder.group({
      lab_test_id: [''],
    
    })
  }
  addScreenmKitData() {
    return this.formBuilder.group({
     
      meterial_id: [''],
      size: [''],
      quantity: [''],
      frozen_status: [''],
      image: ['']
    })
  }

  addVisitKitMatData(){
    return this.formBuilder.group({
      meterial_id: [''],
      size: [''],
      quantity:[''],
      frozen_status: [''],
      image: ['']
    })
  }
  addScreenKit() {
    this.ScreenKitForm.get('labTestsList').push(this.addScreenKitData());
    console.log(this.ScreenKitForm.controls);
  }
 

  addVisitMatKit(){
    this.VisitKitMatForm.get('materialList').push(this.addVisitKitMatData());
  }
 
  
  sponsersData(sponsers:any) {
    sponsers.forEach((sponser: any) => {
      this.sponsers.push(sponser);
    });

    console.log(this.sponsers);
  }

  labTestsData(labTestsList:any) {
    labTestsList.forEach((labTests:any) => {
      this.labTestsList.push(labTests);
    });
    console.log(this.labTestsList);
  }

  labMatData(labMatList:any) {
    labMatList.forEach((labTests:any) => {
      this.labMatTestsList.push(labTests);
    });
    console.log(this.labMatTestsList);
  }
  

  crosData(crosList:any) {
    crosList.forEach((cros:any) => {
      this.crosList.push(cros);
    });
  }

  sitesData(sites:any) {
    sites.forEach((site:any) => {
      this.sites.push(site);
    });
    console.log(this.sites);
  }

  SubmitData() {
    console.log(this.multipleTestsvId);
    const data = {
      "protocol_id": this.protocolForm.controls['selected_protocol_id'].value,
      "protocol_name":this.protocolForm.controls['selected_protocol_name'].value,
      "sponsor_id": this.protocolForm.controls['selected_sponsor_id'].value,
      "cro_id": this.protocolForm.controls['selected_cro_id'].value,
      "no_of_visits":Number(this.protocolForm.controls['total_visits'].value),
      "no_of_screens":Number(this.protocolForm.controls['screens'].value),
      "total_patients": Number(this.protocolForm.controls['selected_patients_num'].value),
      "screening_kit_details": [
        {
          "screening_kit_count": Number(this.protocolForm.controls['selected_skit_count'].value),
          "lab_test_ids": this.multipleTestsId,
          "meterial_details": this.ScreenMaterialKitForm.value.materialList
            
      
        }
      ],
      "visit_kit_details": [
        {
          "visit_kit_count":Number(this.protocolForm.controls['selected_vkit_count'].value),
          "lab_test_ids":  this.multipleTestsvId,
          "meterial_details": this.VisitKitMatForm.value.materialList
        }
      ]
    }
 

    console.log(data);

    this.protocolService.postProtocol(data).subscribe(
      (data:any) => {
        alert('protocol created successfully');
      },
      (err:any)=>{
        alert('internal server err');
      }
      );
  }
  image_url:any;

sizeOptions: { [index: number]: string[] } = {};

getSizes(index: number) {
  const materialList = this.ScreenMaterialKitForm.controls['materialList'] as FormArray;
  const item = materialList.at(index) as FormGroup;
  const selectedValue = item.controls['meterial_id'].value;
  const selectedItem = this.labMatTestsList.find((lab: any) => lab.meterial_id === selectedValue);

  if (selectedItem) {
    return selectedItem.size;
  }

  return []; 
}

onScreenKitChange(evt: any, index: any) {
  this.selectedValue = evt.target.value;
  // Find the selected item based on the selectedValue
  const selectedItem = this.labMatTestsList.find(item => item.meterial_id === this.selectedValue);
  if (selectedItem) {
    const selectedSize = selectedItem.size;
    const selectedImageString = selectedItem.image;
    // Clear and update the 'size' control in the FormArray
    const sizeControl = this.ScreenMaterialKitForm.controls.materialList.controls[index].get('size');
    sizeControl.setValue(''); // Clear the value
    // Update the 'sizeValues' array for dropdown options
    this.sizeValues = [...selectedSize];
    // Set the 'size' control value to the first option (if desired)
    if (selectedSize.length > 0) {
      sizeControl.setValue(selectedSize[0]);
    }
    this.ScreenMaterialKitForm.controls.materialList.controls[index].get('frozen_status').setValue(false);
    // Set the 'image' control value
    const img = new Image();
    img.src = 'data:image/jpeg;base64,' + selectedImageString;
    this.image_url = img.src;
    this.ScreenMaterialKitForm.controls.materialList.controls[index].get('image').setValue(img.src);
  }
}

getSizev(index: number) {
  const materialListv = this.VisitKitMatForm.controls['materialList'] as FormArray;
  const item = materialListv.at(index) as FormGroup;
  const selectedValuev = item.controls['meterial_id'].value;
  const selectedItemv = this.labMatTestsList.find((lab: any) => lab.meterial_id === selectedValuev);

  if (selectedItemv) {
    return selectedItemv.size;
  }

  return []; 
}

 onVisitKitMatChange(evt: any,index: any){
  this.selectedValuev = evt.target.value;
  const selectedItem = this.labMatTestsList.find(item => item.meterial_id === this.selectedValuev);
  if (selectedItem) {
    const selectedSizev = selectedItem.size;
    const selectedImageStringv = selectedItem.image;
    const sizeControl = this.VisitKitMatForm.controls.materialList.controls[index].get('size');
    sizeControl.setValue(''); 
    this.sizeValuesv = [...selectedSizev];
    if (selectedSizev.length > 0) {
      sizeControl.setValue(selectedSizev[0]);
    }
    const img = new Image();
    img.src = 'data:image/jpeg;base64,' + selectedImageStringv;
    this.image_url = img.src;
    this.VisitKitMatForm.controls.materialList.controls[index].get('image').setValue(img.src);
    this.VisitKitMatForm.controls.materialList.controls[index].get('frozen_status').setValue(false);
  }
    
   }
 } 









