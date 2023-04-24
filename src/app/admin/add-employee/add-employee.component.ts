import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin.service';



@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employeeForm!: FormGroup;
  submitted=false

  constructor(private fb:FormBuilder,private adminService:AdminService){
    console.log("hijjk")
  }

  ngOnInit(): void {
    this.employeeForm= this.fb.group({
      employeeName: ['', [Validators.required,Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber:['',[Validators.required,Validators.pattern(/^\d{10}$/)]],
      gender:['',Validators.required],
      department:['Department',Validators.required],
      module:['Module',Validators.required],
      position:['Position',Validators.required],
      password: ['', [Validators.required, Validators.minLength(6),Validators.pattern("^(?=.*[A-Z])(?=.*[!@#$%^&*()_+,\-.?])(?=.{8,})[a-zA-Z0-9!@#$%^&*()_+,\-.?]+$")]],
      confirmPassword: ['', Validators.required]
  },{
    validators:this.MustMatch('password','confirmPassword')
  }
  );
  }

  file!:File;

  selectFile(event:any){
     this.file= event.target.files[0]
    
  }

  MustMatch(password:string,confirmPassword:string){
    return(fb:FormGroup)=>{

      const password=fb.get('password');
      const confirmPassword=fb.get('confrimPassword');

      if(confirmPassword?.errors&&!confirmPassword?.errors?.['mismatch'])
          return;

      if(password?.value!==confirmPassword?.value){
        confirmPassword?.setErrors({mismatch:true});
      }
      else
      confirmPassword?.setErrors(null);

    }
  }
 
  get employeeName(){
    return this.employeeForm.get('employeeName');
  }
  get email(){
    return this.employeeForm.get('email');
  }
  get phoneNumber(){
    return this.employeeForm.get('phoneNumber');
  }
  get gender(){
    return this.employeeForm.get('gender');
  }
  get department(){
    return this.employeeForm.get('department');
  }
  get module(){
    return this.employeeForm.get('module');
  }
  get position(){
    return this.employeeForm.get('position');
  }
  get password(){
    return this.employeeForm.get('password');
  }
  get confirmPassword(){
    return this.employeeForm.get('confirmPassword');
  }
  
  onSubmit(){
    let formData=new FormData();
    formData.append("profilePic",this.file,this.file.name)
    formData.append("employeeObj",JSON.stringify(this.employeeForm.value))

    this.adminService.addEmployee(formData).subscribe(res=>{
      console.log(res);
    })
    
  }

  onReset(){
    this.employeeForm.reset();
  }

}
