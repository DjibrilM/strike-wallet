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
  privateKey: string;

  @Column()
  publicKey: string;

  @Column()
  address: string;

  @Column()
  passwordIv: string;

  @Column()
  passwordAuthTag: string;

  @Column()
  passwordSalt: string;
}
