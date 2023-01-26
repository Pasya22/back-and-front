import { Column, Entity, Index } from "typeorm";

@Index("id_user_pk", ["idUser"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @Column("integer", { primary: true, name: "id_user" })
  idUser: number;

  @Column("character varying", { name: "username", nullable: true, length: 19 })
  username: string | null;

  @Column("character varying", { name: "passwords", nullable: true })
  passwords: string | null;
}
