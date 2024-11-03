export class CreateUserBindingModel {
    clinicId!: string;
    parentId!: string;
    clinicName!: string;
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
    clinicId!: string;
    ParentId!: string;
    FirstName!: string;
    LastName!: string;
    PhoneNumber!: string
    UpdatedBy!: string
    UpdatedDate!: Date
}