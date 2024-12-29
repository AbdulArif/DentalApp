import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account/account.service';
import { UserService } from 'src/app/services/account/user.service';
import { AuthenticationService } from 'src/app/services/core/authentication.service';
import { AudioService } from 'src/app/services/shared/audio.service';
import { FieldToggleService } from 'src/app/services/shared/field-toggle.service';
import Validation from 'src/app/validators/must-match.validator';
import { Title } from '@angular/platform-browser';
import { UploadDownloadService } from 'src/app/services/account/upload-download.service';

declare var $: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  @ViewChild('profile') profile!: ElementRef;
  @ViewChild('clinic') clinic!: ElementRef;

  default_select: any
  clinicId!: string
  userId!: string
  userName!: string
  userRole!: string
  todaysDate = new Date().toISOString();

  showProfilePictureDialog: boolean = false
  fileToUpload!: File;
  imageUrl: any = "assets/user.svg"
  imageUploading: boolean = false;
  imageUploadedSub!: Subscription
  imageUrlSub!: Subscription

  logoToUpload!: File
  showCompnayLogoDialog: boolean = false;
  clinicLogoUrl: any = "assets/clinic.svg";
  clinicLogoUploading: boolean = false
  clinicLogoUploadSub!: Subscription
  clinicLogoSub!: Subscription;

  user: any;
  userSub!: Subscription;
  user_loading: boolean = false

  editProfile: boolean = false
  updateProfileForm!: UntypedFormGroup
  updateProfileForm_loading: boolean = false
  updateProfileFormSub!: Subscription;

  passwordChangeForm!: UntypedFormGroup
  passwordChangeForm_loading: boolean = false;
  passwordChangeFormSub!: Subscription

  constructor(
    private title: Title,
    private formBuilder: UntypedFormBuilder,
    public authenticationService: AuthenticationService,
    private accountService: AccountService,
    private toastr: ToastrService,
    private audioService: AudioService,
    public fieldToggleService: FieldToggleService,
    private userService: UserService,
    private uploadDownloadService: UploadDownloadService,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.title.setTitle("User Profile")
    this.clinicId = this.authenticationService.clinicId();
    this.userId = this.authenticationService.currentUserId();
    this.userName = this.authenticationService.currentUserFirstName() + ' ' + this.authenticationService.currentUserLastName();
    $('[data-bs-toggle="tooltip"]').tooltip();
    this.getUser();
    this.getUserprofileImage();
    this.getClinicLogo();
    this.buildChangePasswordForm();
    this.buildUpdateProfileForm();

  }

  ngOnDestroy() {
    if (this.passwordChangeFormSub) {
      this.passwordChangeFormSub.unsubscribe()
    }
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
    if (this.updateProfileFormSub) {
      this.updateProfileFormSub.unsubscribe();
    }
    if (this.imageUploadedSub) {
      this.imageUploadedSub.unsubscribe();
    }
    if (this.imageUrlSub) {
      this.imageUrlSub.unsubscribe();
    }
    if (this.imageUploadedSub) {
      this.imageUploadedSub.unsubscribe();
    }
    if (this.clinicLogoSub) {
      this.clinicLogoSub.unsubscribe();
    }
  }

  getUser() {
    this.user_loading = true
    this.userSub = this.userService.GetUser(this.userId).subscribe({
      next: (res) => {
        console.log("GetUser Value:", res)
        this.user = res;
        this.user_loading = false
        this.setUserDetailsToUpdate()
      },
      error: (err: any) => {
        this.user_loading = false
      }
    })
  }

  getUserprofileImage() {
    this.imageUrl = localStorage.getItem("userprofileImage") ? this.sanitizer.bypassSecurityTrustUrl(localStorage.getItem("userprofileImage")!) : "assets/user.svg"
    this.imageUrlSub = this.uploadDownloadService.getBinaryImage(this.clinicId, this.userId).subscribe({
      next: (res: any) => {
        localStorage.setItem('userprofileImage', res.response);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(localStorage.getItem("userprofileImage")!);
      },
      error: (err: any) => {
        if (err.status == 404) {
          this.imageUrl = "assets/user.svg";
        }
      }
    })
    console.log("Image Url:", this.imageUrl)
  }

  getClinicLogo(): void {
    this.clinicLogoUrl = localStorage.getItem("clinicLogo") ? this.sanitizer.bypassSecurityTrustUrl(localStorage.getItem("clinicLogo")!) : "assets/company.svg"
    this.clinicLogoSub = this.uploadDownloadService.getBinaryclinicLogo(this.clinicId, this.userId).subscribe({
      next: (res: any) => {
        localStorage.setItem('clinicLogo', res.response);
        this.clinicLogoUrl = this.sanitizer.bypassSecurityTrustUrl(localStorage.getItem("clinicLogo")!);
      },
      error: (err: any) => {
        if (err.status == 404) {
          this.clinicLogoUrl = "assets/company.svg";
        }
      }
    })
    console.log("Clinic Logo Url:", this.clinicLogoUrl)
  }

  get g() { return this.passwordChangeForm.controls; }

  buildChangePasswordForm() {
    this.passwordChangeForm = this.formBuilder.group({
      userId: this.userId,
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]]
    },
      {
        validator: [Validation.match('newPassword', 'confirmPassword')]
      }
    );
  }

  get h() { return this.updateProfileForm.controls; }

  buildUpdateProfileForm() {
    this.updateProfileForm = this.formBuilder.group({
      userId: ['', Validators.required],
      clinicId: ['', Validators.required],
      parentId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      countryCode: ['', Validators.required],
      phoneNumber: [null, Validators.required],
      UpdatedBy: this.authenticationService.currentUserFirstName() + " " + this.authenticationService.currentUserLastName(),
      UpdatedDate: null
    })
    this.updateProfileForm.disable();
  }

  setUserDetailsToUpdate() {
    this.updateProfileForm.patchValue({
      userId: this.user.id,
      clinicId: this.user.clinicId,
      parentId: this.user.parentId,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      countryCode: this.user.countryCode,
      phoneNumber: this.user.phoneNumber
    })
  }

  onSubmitChangePasswordForm() {
    this.passwordChangeForm_loading = true;
    if (!this.passwordChangeForm.valid) {
      this.passwordChangeForm_loading = false
      return
    }
    this.passwordChangeFormSub = this.accountService.ChangePassword(this.passwordChangeForm.value).subscribe({
      next: (res) => {

        this.passwordChangeForm_loading = false;
        this.audioService.success();
        this.toastr.success('Password changed successfully!', 'Success', { positionClass: 'toast-bottom-right' })
        this.buildChangePasswordForm();
      },
      error: (err) => {
        this.passwordChangeForm_loading = false;
        this.audioService.error();
        this.toastr.error(err.error, 'Error', { positionClass: 'toast-bottom-right' })
      },
      complete: () => { }
    })
  }

  resetChangePasswordForm(): void {
    this.buildChangePasswordForm();
  }

  onClickEditProfile() {
    if (this.updateProfileForm.disabled) {
      this.updateProfileForm.enable()
      this.editProfile = true
    }
    else {
      this.updateProfileForm.disable();
      this.editProfile = false
    }
  }

  onSubmitUpdateProfileForm() {
    this.updateProfileForm_loading = true
    this.updateProfileForm.patchValue({
      UpdatedDate: this.todaysDate
    })
    if (!this.updateProfileForm.valid) {
      this.updateProfileForm_loading = false;
      this.toastr.warning('Please fill all the required fields', 'Warning', { positionClass: 'toast-bottom-right' })
      return
    }
    this.updateProfileFormSub = this.userService.UpdateUser(this.updateProfileForm.value).subscribe({
      next: (res) => {
        this.updateProfileForm_loading = false
        this.toastr.success('Profile updated successfully!', 'Success', { positionClass: 'toast-bottom-right' })
        this.audioService.success();
        this.updateProfileForm.disable();
        this.getUser();
      },
      error: (err) => {
        this.updateProfileForm_loading = false;
        this.toastr.error('Failed to update profile', 'Error', { positionClass: 'toast-bottom-right' })
      }
    })
  }

  showPreview(event: any) {
    this.fileToUpload = event.target.files[0]
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  showLogoPreview(event: any) {
    this.logoToUpload = event.target.files[0]
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.clinicLogoUrl = event.target.result;
    }
    reader.readAsDataURL(this.logoToUpload);
  }

  uploadProfilePicture() {
    if (this.fileToUpload == null) {
      this.toastr.warning('Please select an image', 'Warning', { positionClass: 'toast-bottom-right' })
      return;
    }
    this.imageUploading = true;
    var formData = new FormData();
    formData.append(this.fileToUpload.name, this.fileToUpload)
    this.imageUploadedSub = this.uploadDownloadService.uploadProfilePicture(formData, this.clinicId, this.userId).subscribe({
      next: (res) => {
        this.imageUploading = false
        this.profile.nativeElement.value = null
        this.showProfilePictureDialog = false
        this.getUserprofileImage();
        this.audioService.success();
        this.toastr.success('Profile picture updated!', 'Success', { positionClass: 'toast-bottom-right' })
        setTimeout(() => {
          this.toastr.success('Reload page now to take effect!', 'Success', { positionClass: 'toast-bottom-right' })
        }, 2000)
      },
      error: (err) => {
        this.imageUploading = false
        this.audioService.error()
        this.toastr.error('Failed to update picture!', 'Error', { positionClass: 'toast-bottom-right' })
      }
    })
  }

  uploadclinicLogo() {
    if (this.logoToUpload == null) {
      this.toastr.warning('Please select an image', 'Warning', { positionClass: 'toast-bottom-right' })
      return;
    }
    this.clinicLogoUploading = true;
    var formData = new FormData();
    formData.append(this.logoToUpload.name, this.logoToUpload)
    this.clinicLogoUploadSub = this.uploadDownloadService.uploadclinicLogo(formData, this.clinicId, this.userId).subscribe({
      next: (res) => {
        this.clinicLogoUploading = false
        this.clinic.nativeElement.value = null
        this.showCompnayLogoDialog = false
        this.getClinicLogo();
        this.audioService.success();
        this.toastr.success('clinic logo updated!', 'Success', { positionClass: 'toast-bottom-right' })
        setTimeout(() => {
          this.toastr.success('Reload page to take effect!', 'Success', { positionClass: 'toast-bottom-right' })
        }, 2000)
      },
      error: (err) => {
        this.clinicLogoUploading = false
        this.audioService.error()
        this.toastr.error('Failed to update logo!', 'Error', { positionClass: 'toast-bottom-right' })
      }
    })
  }

  toggleFieldTextType() {
    this.fieldToggleService.toggleField();
  }

  displayProfilePictureDialog(): void {
    this.showProfilePictureDialog = true
  }

  hideProfilePictureDialog(): void {
    this.profile.nativeElement.value = null
    this.showProfilePictureDialog = false
    this.getUserprofileImage()
  }

  displayCompnayLogoDialog(): void {
    this.showCompnayLogoDialog = true;
  }

  hideCompnayLogoDialog(): void {
    this.clinic.nativeElement.value = null
    this.showCompnayLogoDialog = false;
    this.getClinicLogo();
  }

  copyclinicId() {
    // this.clipboard.copy(this.clinicId);
    this.toastr.success('Clinic id copied!', '', { positionClass: 'toast-bottom-right' });
  }
  copyUserId() {
    // this.clipboard.copy(this.userId);
    this.toastr.success('User id copied!', '', { positionClass: 'toast-bottom-right' });
  }

}
