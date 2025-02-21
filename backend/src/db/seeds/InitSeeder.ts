import { Seeder } from "typeorm-extension";
import { DataSource } from "typeorm";
import { User } from "../../entities/User.entity";
import * as bcrypt from "bcrypt";
import { UserRoles } from "../../common/enums/UserRoles";
import { constants } from "../../env-constants";

export default class InitSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    const hashedPassword = await bcrypt.hash(
      constants.SUPER_ADMIN_PASSWORD!,
      parseInt(constants.bcryptSalt!),
    );

    await userRepository.save({
      email: constants.SUPER_ADMIN_EMAIL,
      phone_number: constants.SUPER_ADMIN_PHONE,
      role: UserRoles.SUPER_ADMIN,
      password: hashedPassword,
      first_name: "Super",
      last_name: "Admin",
    });
  }
}
