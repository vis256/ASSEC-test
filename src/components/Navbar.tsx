import { Dispatch, SetStateAction } from "react";
import { Button, Card } from "@mui/material";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

interface NavbarProps {
  colorMode: string;
  setColorMode: Dispatch<SetStateAction<"light" | "dark">>;
}

const Navbar = ({ colorMode, setColorMode }: NavbarProps) => {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
        p: 1,
      }}
    >
      {/* theme toggle button */}
      <Button
        onClick={() => setColorMode(colorMode === "dark" ? "light" : "dark")}
      >
        {colorMode === "dark" ? <Brightness4Icon /> : <Brightness7Icon />}
      </Button>
    </Card>
  );
};

export default Navbar;
