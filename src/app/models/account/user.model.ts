export class CreateUserBindingModel {
    companyId!: string;
    parentId!: string;
    companyName!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    role!: string;
    password!: string;
    confirmPassword!: string;
    addedBy!: string;
    addedDate!: Date;
    updatedBy!: string;
    updatedDate!: Date;
}

export class UpdateUserBindingModel {
    UserId!: string;
    CompanyId!: string;
    ParentId!: string;
    FirstName!: string;
    LastName!: string;
    PhoneNumber!: string
    UpdatedBy!: string
    UpdatedDate!: Date
}