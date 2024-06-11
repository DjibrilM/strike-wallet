//@ts-ignore
import { v4 as uuidv4 } from "uuid";
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";

@Entity("credentials")
export class Credentials {
  @BeforeInsert()
  genarate() {
    this.id = uuidv4();
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  password: string;

  @Column({ default: false })
  hasConfirguredWallet: boolean;

  @Column({default:true})
  AllowBiomtricCrediential:boolean
}
