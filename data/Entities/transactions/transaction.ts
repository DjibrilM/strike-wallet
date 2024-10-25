//@ts-ignore
import "react-native-get-random-values";
//@ts-ignore

import { PrimaryGeneratedColumn, Column, BaseEntity, Entity } from "typeorm";

@Entity("")
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  from: string;

  @Column({ default: false })
  to: string;

  @Column({ default: true, type: "decimal" })
  amount: number;

  @Column()
  state: "failed" | "succeeded";

  @Column({ nullable: true })
  contractAddress: string;

  @Column()
  tokenName: string;

  @Column({ nullable: true })
  hash: string;

  @Column({ nullable: true })
  usdAmount: number;

  @Column({ nullable: true })
  date: string;
}
