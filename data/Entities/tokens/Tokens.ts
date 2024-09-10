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
export class TokenEntity extends BaseEntity {
  @BeforeInsert()
  genarate() {
    this.id = uuidv4();
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @PrimaryGeneratedColumn("uuid")
  token_symbol: string;

  @Column()
  token_logo: string;

  @Column()
  token_decimals: string;

  @Column()
  contract_address: string;

  @Column()
  price_usd: string;

  @Column()
  price_24h_percent_change: string;

  @Column()
  price_7d_percent_change: string;

  @Column()
  market_cap_usd: string;
}
