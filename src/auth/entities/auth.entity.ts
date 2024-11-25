import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  referenceKey: string;
}
