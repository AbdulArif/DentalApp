export class CreatePatientModel {
    patientId!: string
  clinicId!: string
  userId!: string
  fullName!: string
  phoneNumber!: string
  address!: string
  insuranceDetails!: string
  reasonForVisit!: string
  preferredDateAndTime!: Date
  medicalHistory!: string
  dentalHistory!: string
  dateOfBirth!: Date
  addedBy!: string
  addedDate!: Date
  updatedBy!: string
  updatedDate!: Date
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