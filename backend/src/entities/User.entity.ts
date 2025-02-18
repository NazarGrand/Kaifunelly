import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
} from "typeorm";
import { UserRoles } from "../common/enums/UserRoles";

@Entity("users")
@Index(["first_name", "last_name"])
export class User {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id!: number;

  @Column({ type: "varchar", unique: true })
  @Index({ unique: true })
  email!: string;

  @Column({ type: "varchar", unique: true })
  @Index({ unique: true })
  phone_number!: string;

  @Column({ type: "enum", enum: UserRoles, nullable: true })
  role?: UserRoles;

  @Column({ type: "varchar" })
  password!: string;

  @Column({ type: "varchar" })
  first_name!: string;

  @Column({ type: "varchar" })
  last_name!: string;

  @Column({ type: "uuid", nullable: true })
  refresh_token?: string;

  @Column({ type: "date", nullable: true })
  refresh_token_exp_date?: Date;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;
}
