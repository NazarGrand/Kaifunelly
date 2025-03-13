import { Anchor, Box, Button, Stack, Title } from "@mantine/core";
import { FunctionComponent } from "react";
import { Input } from "../../ui/Input";

import { ReactComponent as EmailIcon } from "../../assets/icons/EmailIcon.svg";
import { ReactComponent as PasswordIcon } from "../../assets/icons/Key.svg";
import { PasswordInput } from "../../ui/PasswordInput";
import { useForm } from "@mantine/form";
import { SingInValidation } from "../../common/helpers/validation";

const SingIn: FunctionComponent = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: SingInValidation,
  });

  return (
    <Stack align="center">
      <Title
        order={3}
        styles={(theme) => ({
          root: { ...theme.other.h3 },
        })}
      >
        Log in to Kaifunelly
      </Title>

      <form
        onSubmit={form.onSubmit(() => {
          console.log("submit");
        })}
      >
        <Stack gap="1rem" w="27.5rem">
          <Box h="3.75rem">
            <Input
              value={form.values.email}
              onChange={(email) => form.setFieldValue("email", email)}
              label="E-mail"
              placeholder="Your email"
              leftSection={<EmailIcon />}
              error={form.errors.email?.toString()}
            />
          </Box>

          <Box h="3.75rem">
            <PasswordInput
              value={form.values.password}
              onChange={(password) => form.setFieldValue("password", password)}
              label="Password"
              placeholder="Your password"
              leftSection={<PasswordIcon />}
              error={form.errors.password?.toString()}
            />
          </Box>
        </Stack>

        <Stack gap="0.2rem">
          <Stack w="27.5rem" px="1.5rem">
            <Anchor
              href="#"
              ml="auto"
              styles={(theme) => ({
                root: {
                  ...theme.other.bodySM,
                  color: "var(--mantine-color-primary-0)",
                },
              })}
            >
              Forgot Password ?
            </Anchor>
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
            Log In
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default SingIn;
