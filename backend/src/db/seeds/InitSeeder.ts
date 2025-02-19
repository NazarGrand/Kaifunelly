import { Seeder } from "typeorm-extension";
import { DataSource } from "typeorm";
import { User } from "../../entities/User.entity";
import * as bcrypt from "bcrypt";
import { UserRoles } from "../../common/enums/UserRoles";
import { constants } from "../../env-constants";

export default class InitSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    const superAdminEmail = constants.SUPER_ADMIN_EMAIL;
    const existingAdmin = await userRepository.findOne({
      where: { email: superAdminEmail },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(
        constants.SUPER_ADMIN_PASSWORD!,
        parseInt(constants.bcryptSalt!),
      );

      const superAdmin = userRepository.create({
        email: superAdminEmail,
        phone_number: constants.SUPER_ADMIN_PHONE,
        role: UserRoles.SUPER_ADMIN,
        password: hashedPassword,
        first_name: constants.SUPER_ADMIN_FIRST_NAME,
        last_name: constants.SUPER_ADMIN_LAST_NAME,
      });

      await userRepository.save(superAdmin);
      console.log("Super Admin created successfully!");
    } else {
      console.log("Super Admin already exists.");
    }
  }
}
