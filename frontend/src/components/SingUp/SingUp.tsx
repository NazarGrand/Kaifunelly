import { Box, Button, Stack, Title } from "@mantine/core";
import { FunctionComponent } from "react";
import { Input } from "../../ui/Input";

import { ReactComponent as UserIcon } from "../../assets/icons/UserIcon.svg";
import { ReactComponent as EmailIcon } from "../../assets/icons/EmailIcon.svg";
import { ReactComponent as PasswordIcon } from "../../assets/icons/Key.svg";
import { PasswordInput } from "../../ui/PasswordInput";

import { useForm } from "@mantine/form";
import { SingUpValidation } from "../../common/helpers/validation";

const SingUp: FunctionComponent = () => {
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: false,
    },
    validate: SingUpValidation,
  });

  return (
    <Stack align="center">
      <Title
        order={3}
        styles={(theme) => ({
          root: { ...theme.other.h3 },
        })}
      >
        Create your account
      </Title>

      <form
        onSubmit={form.onSubmit(() => {
          console.log("submit");
        })}
      >
        <Stack gap="0.4rem">
          <Stack gap="1rem" w="27.5rem">
            <Box h="3.75rem">
              <Input
                value={form.values.name}
                onChange={(name) => form.setFieldValue("name", name)}
                label="Full name"
                leftSection={<UserIcon />}
                error={form.errors.name as string}
              />
            </Box>

            <Box h="3.75rem">
              <Input
                value={form.values.email}
                onChange={(email) => form.setFieldValue("email", email)}
                label="E-mail"
                placeholder="Your email"
                leftSection={<EmailIcon />}
                error={form.errors.email as string}
              />
            </Box>

            <Box h="3.75rem">
              <PasswordInput
                value={form.values.password}
                onChange={(password) => form.setFieldValue("password", password)}
                label="Password"
                placeholder="Your password"
                leftSection={<PasswordIcon />}
                error={form.errors.password as string}
              />
            </Box>
          </Stack>

          <Button
            type="submit"
            fullWidth
            h="3rem"
            color="var(--mantine-color-primary-0)"
            styles={() => ({
              label: {
                fontWeight: "400",
                fontSize: "1rem",
              },
            })}
          >
            Create account
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default SingUp;
