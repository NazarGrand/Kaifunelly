import { Anchor, Box, Button, Divider, Group, Stack, Text, Title } from "@mantine/core";
import { FunctionComponent } from "react";
import { Input } from "../../ui/Input";

import { ReactComponent as EmailIcon } from "../../assets/icons/EmailIcon.svg";
import { ReactComponent as PasswordIcon } from "../../assets/icons/Key.svg";
import { ReactComponent as GoogleIcon } from "../../assets/icons/GoogleIcon.svg";
import { ReactComponent as FacebookIcon } from "../../assets/icons/FacebookIcon.svg";
import { PasswordInput } from "../../ui/PasswordInput";
import { useForm } from "@mantine/form";

const SingIn: FunctionComponent = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (val: string) => (!val ? "Email is required" : null),
      password: (val: string) => (!val ? "Password is required" : null),
    },
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

      <Divider
        label="Or Log In with"
        labelPosition="center"
        color="var(--mantine-color-neutral-6)"
        w="27.5rem"
        mt="0.5rem"
        styles={(theme) => ({
          label: {
            ...theme.other.buttonLG,
            color: "var(--mantine-color-neutral-12)",
          },
        })}
      />

      <Group align="center">
        <Button
          leftSection={<GoogleIcon />}
          variant="outline"
          w="13rem"
          h="3rem"
          styles={(theme) => ({
            root: {
              border: "0.125rem solid var(--mantine-color-primary-0)",
            },
            label: {
              ...theme.other.buttonLG,
              color: "var(--mantine-color-primary-0)",
            },
          })}
        >
          Google
        </Button>
        <Button
          leftSection={<FacebookIcon />}
          variant="outline"
          w="13rem"
          h="3rem"
          styles={(theme) => ({
            root: {
              border: "0.125rem solid var(--mantine-color-primary-0)",
            },
            label: {
              ...theme.other.buttonLG,
              color: "var(--mantine-color-primary-0)",
            },
          })}
        >
          Facebook
        </Button>
      </Group>

      <Group align="center" mt="0.5rem">
        <Text
          styles={(theme) => ({
            root: {
              color: "var(--mantine-color-neutral-8)",
              ...theme.other.buttonLG,
            },
          })}
        >
          Don&apos;t have an account?
        </Text>
        <Anchor
          href="#"
          styles={(theme) => ({
            root: {
              ...theme.other.buttonLG,
              color: "var(--mantine-color-primary-0)",
            },
          })}
        >
          sign up
        </Anchor>
      </Group>
    </Stack>
  );
};

export default SingIn;
