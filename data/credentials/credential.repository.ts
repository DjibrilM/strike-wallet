import { Repository, Connection, FindOptionsWhere } from "typeorm";
import { Credentials } from "./credential.entity";

export interface CredentialsType {
  password: string;
  seedPhrase: string;
}

export class CredentialRepository {
  private ormRepository: Repository<Credentials>;
  construct(connection: Connection) {
    this.ormRepository = connection.getRepository(Credentials);
  }

  async create({ password, seedPhrase }: CredentialsType) {
    return await this.ormRepository.create({
      password: password,
      seedPhrase: seedPhrase,
    });
  }

  async find() {
    return await this.ormRepository.find();
  }

  async finById(id: FindOptionsWhere<Credentials>) {
    return this.ormRepository.findBy(id);
  }

  async findOne(
    searchQuery:
      | FindOptionsWhere<Credentials>
      | FindOptionsWhere<Credentials>[]
      | undefined
  ) {
    return this.ormRepository.findOne({ where: searchQuery });
  }
    
}
