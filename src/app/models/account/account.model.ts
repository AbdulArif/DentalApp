
export class User {
    id!: string
    first_name!: string
    last_name!: string
    gender!: string
    email!: string
  
    token!: User
  }
  
  export class Role {
    id!: string;
    name!: string
    normalizedName!: string
    concurrencyStamp!: string
  }
  
  export class RegisterBindingModel {
    clinicId!: string
    clinicName!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    subscriptionKey!: string;
    role!: string;
    password!: string;
    confirmPassword!: string;
    addedBy!: string;
    addedDate!: Date;
    updatedBy!: string;
    updatedDate!: Date;
  }
  
  export class LoginBindingModel {
    email!: string;
    password!: string;
  }
  
  export class RefreshTokenModel {
    accessToken!: string;
    refreshToken!: string;
  }
  
  export class ChangePasswordBindingModel {
    userId!: string;
    oldPassword!: string;
    newPassword!: string;
    confirmPassword!: string
  }
  
  export class ForgotPasswordBindingModel {
    Email!: string
  }
  
  export class ResetPasswordBindingModel {
    userId!: string
    code!: string
    newPassword!: string
  }
  