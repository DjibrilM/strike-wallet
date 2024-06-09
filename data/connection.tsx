import { createContext } from "react";
import { CredentialRepository } from "./credentials/credential.repository";
interface DatabaseConnectionContextData {
    todosRepository: CredentialRepository;

}
  
const DatabaseConnectionContext = createContext<DatabaseConnectionContextData>(
    {} as DatabaseConnectionContextData,
  );
  
  