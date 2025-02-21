import { MigrationInterface, QueryRunner } from "typeorm";

export class VerificationEntity1739537416069 implements MigrationInterface {
    name = 'VerificationEntity1739537416069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "verification" ("id" BIGSERIAL NOT NULL, "verificationCode" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "isUsed" boolean NOT NULL DEFAULT false, "expireAt" TIMESTAMP NOT NULL, "user_id" bigint, CONSTRAINT "PK_f7e3a90ca384e71d6e2e93bb340" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "verification" ADD CONSTRAINT "FK_49cf5e171603b309b4194850461" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "verification" DROP CONSTRAINT "FK_49cf5e171603b309b4194850461"`);
        await queryRunner.query(`DROP TABLE "verification"`);
    }

}
