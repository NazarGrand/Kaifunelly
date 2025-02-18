import { MigrationInterface, QueryRunner } from "typeorm";

export class Userrole1739888419566 implements MigrationInterface {
    name = 'Userrole1739888419566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL`);
    }

}
