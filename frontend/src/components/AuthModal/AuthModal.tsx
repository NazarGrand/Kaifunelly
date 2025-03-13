import { Anchor, Button, Divider, Group, Modal, Stack, Tabs, Text } from "@mantine/core";
import { FunctionComponent, useState } from "react";

import classes from "./AuthModal.module.scss";

import { SignIn } from "../SingIn";
import { SignUp } from "../SingUp";
import { ReactComponent as GoogleIcon } from "../../assets/icons/GoogleIcon.svg";
import { ReactComponent as FacebookIcon } from "../../assets/icons/FacebookIcon.svg";

interface AuthModalProps {
  opened: boolean;
  onClose: () => void;
}

const AuthModal: FunctionComponent<AuthModalProps> = ({ opened, onClose }) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      size="37.5rem"
      yOffset="3rem"
      classNames={{ body: classes.modal }}
    >
      <Tabs
        value={activeTab} onChange={(val: string | null) => 
          setActiveTab(val as "login" | "register")}
        classNames={{
          tab: classes.tab,
          tabLabel: classes.tabLabel,
        }}
        styles={(theme) => ({
          tabLabel: { ...theme.other.bodyXL },
        })}
      >
        <Tabs.List grow justify="space-between">
          <Tabs.Tab value="login">Log in</Tabs.Tab>
          <Tabs.Tab value="register">Create Account</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="login" mt={"1.5rem"}>
          <SignIn />
        </Tabs.Panel>

        <Tabs.Panel value="register" mt={"1.5rem"}>
          <SignUp />
        </Tabs.Panel>
      </Tabs>

      <Stack mt="0.75rem">
        <Divider
          label={activeTab === "login" ? "Or Log In with" : "Or Sign Up with"}
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

        <Group align="center" mt="0.5rem" justify="center">
          <Text
            styles={(theme) => ({
              root: {
                color: "var(--mantine-color-neutral-8)",
                ...theme.other.buttonLG,
              },
            })}
          >
            {activeTab === "login" ? "Don't have an account?" : 
              "Already have an account?"}
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
            {activeTab === "login" ? "sign up" : "sing in"}
          </Anchor>
        </Group>
      </Stack>
    </Modal>
  );
};

export default AuthModal;
