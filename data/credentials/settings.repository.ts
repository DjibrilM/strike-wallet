import { Repository, Connection, FindOptionsWhere } from "typeorm";
import { Settings } from "./settings";

export interface CredentialsType {
  password: string;
  seedPhrase: string;
}

export class CredentialRepository {
  private ormRepository: Repository<Settings>;
  construct(connection: Connection) {
    this.ormRepository = connection.getRepository(Settings);
  }

  async create({ password, seedPhrase }: CredentialsType) {
    return await this.ormRepository.create({
      password: password,
    });
  }

  async find() {
    return await this.ormRepository.find();
  }

  async finById(id: FindOptionsWhere<Settings>) {
    return this.ormRepository.findBy(id);
  }

  async findOne(
    searchQuery:
      | FindOptionsWhere<Settings>
      | FindOptionsWhere<Settings>[]
      | undefined
  ) {
    return this.ormRepository.findOne({ where: searchQuery });
  }
}
