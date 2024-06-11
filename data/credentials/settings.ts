//@ts-ignore
import 'react-native-get-random-values';
//@ts-ignore
import { v4 as uuidv4 } from "uuid";

import {
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BaseEntity,
  Entity,
} from "typeorm";

@Entity("Settings")
export class Settings extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  password: string;

  @Column({ default: false })
  hasConfirguredWallet: boolean;

  @Column({ default: true })
  AllowBiomtricCrediential: boolean;
}
