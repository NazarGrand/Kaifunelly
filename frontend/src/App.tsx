import { Button } from "@mantine/core";
import classes from "./App.module.scss";
import { AuthModal } from "./components/AuthModal";
import { useDisclosure } from "@mantine/hooks";

function App() {
  const [opened, { open, close }] = useDisclosure(false);

  return <div className={classes.App}>
    <Button variant="default" onClick={open}>
        Open modal
    </Button>

    <AuthModal opened={opened} onClose={close} />
  </div>;
}

export default App;
