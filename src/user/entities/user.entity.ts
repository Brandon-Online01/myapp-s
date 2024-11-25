import { forwardRef, Inject } from '@nestjs/common';
import {
  CoatSize,
  Gender,
  IdentityDocumentType,
  LicenseType,
  MaritalStatus,
  Race,
  ShirtSize,
  ShoeSize,
} from 'src/enums';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class EmployeeProfile {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column({ nullable: true })
  height: string;

  @Column({ nullable: true })
  weight: string;

  @Column({ nullable: true })
  bloodType: string;

  @Column({ nullable: true })
  eyeColor: string;

  @Column({ nullable: true })
  hairColor: string;

  @Column({
    type: 'enum',
    enum: Race,
    nullable: true,
  })
  race: Race;

  @Column({
    type: 'enum',
    enum: ShoeSize,
    nullable: true,
  })
  shoeSize: ShoeSize;

  @Column({
    type: 'enum',
    enum: ShirtSize,
    nullable: true,
  })
  shirtSize: ShirtSize;

  @Column({
    type: 'enum',
    enum: CoatSize,
    nullable: true,
  })
  coatSize: CoatSize;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender: Gender;

  @Column({
    type: 'enum',
    enum: MaritalStatus,
    nullable: true,
  })
  maritalStatus: MaritalStatus;

  @Column({
    type: 'enum',
    enum: IdentityDocumentType,
    nullable: true,
  })
  identityDocumentType: IdentityDocumentType;

  @Column({ nullable: true })
  idOrPassportNumber: string;

  @Column({ type: 'date', nullable: true })
  idOrPassportExpiryDate: Date;

  @Column({ type: 'date', nullable: true })
  dob: Date;

  @OneToOne(() => User, (user) => user?.employeeProfile)
  @Inject(forwardRef(() => User))
  user: User;
}

@Entity()
export class EmploymentProfile {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column({ nullable: true })
  currentPosition: string;

  @Column({ nullable: true })
  department: string;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  salary: number;

  @Column({ nullable: true })
  employeeId: string;

  @Column({ nullable: true })
  taxId: string;

  @Column({ nullable: true })
  bankAccount: string;

  @Column({ type: 'timestamp', nullable: true })
  creationDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastUpdateDate: Date;

  @Column({ nullable: true })
  drivingLicenseNumber: string;

  @Column({ type: 'date', nullable: true })
  licenseExpiryDate: Date;

  @Column({ type: 'date', nullable: true })
  licenseIssueDate: Date;

  @Column({ nullable: true })
  licenseCountryOfIssue: string;

  @Column({ nullable: true })
  licenseStateOfIssue: string;

  @Column({
    type: 'enum',
    enum: LicenseType,
    nullable: true,
  })
  licenseType: LicenseType;

  //relations
  @OneToOne(() => User, (user) => user?.employmentProfile)
  @Inject(forwardRef(() => User))
  user: User;

  @Column({ nullable: true })
  attendance: string;

  @Column({ nullable: true })
  schedule: string;

  @Column({ nullable: true })
  leave: string;

  @Column({ nullable: true })
  claims: string;

  @Column({ nullable: true })
  benefits: string;

  @Column({ nullable: true })
  training: string;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  contactNumber: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  photoURL: string;

  @Column({ default: true })
  isProfileActive: boolean;

  @Column({ nullable: true })
  isUserStillEmployed: boolean;

  @Column({ type: 'timestamp', nullable: true })
  creationDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastUpdateDate: Date;

  @Column({ nullable: true })
  organisationId: string;

  @Column({ nullable: true })
  branchId: string;

  @Column({ nullable: true })
  employeeRefCode: string;

  @OneToOne(() => EmployeeProfile)
  @JoinColumn()
  employeeProfile: EmployeeProfile;

  @OneToOne(() => EmploymentProfile)
  @JoinColumn()
  employmentProfile: EmploymentProfile;

  @Column({ nullable: true })
  emergencyContactName: string;

  @Column({ nullable: true })
  emergencyContactNumber: string;

  @Column({ nullable: true })
  alternateEmail: string;

  @Column({ type: 'json', nullable: true })
  employmentHistory: any;
}
