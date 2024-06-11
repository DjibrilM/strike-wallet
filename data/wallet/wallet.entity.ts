//@ts-ignore
import { v4 as uuidv4 } from "uuid";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from "typeorm";
import { Column } from "typeorm";

@Entity()
export class WalletEntity extends BaseEntity {
  @BeforeInsert()
  genarate() {
    this.id = uuidv4();
  }
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  seedPhrase: string;

  @Column()
  mnemonic: string;

  @Column()
  privateMasterKey: string;

  @Column({ default: "Main wallet" })
  name: string;

  @Column({ default: false })
  configured: boolean;
}
