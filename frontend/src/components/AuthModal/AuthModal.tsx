import { Modal, Tabs } from "@mantine/core";
import { FunctionComponent } from "react";

import classes from "./AuthModal.module.scss";

import { SignIn } from "../SingIn";
import { SignUp } from "../SingUp";

interface AuthModalProps {
  opened: boolean;
  onClose: () => void;
}

const AuthModal: FunctionComponent<AuthModalProps> = ({ opened, onClose }) => {
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
        defaultValue="login"
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
    </Modal>
  );
};

export default AuthModal;
