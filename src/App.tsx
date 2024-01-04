import { useEffect, useMemo, useState } from "react";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { useLocalStorage } from "usehooks-ts";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadQuestions from "./components/menu/LoadQuestions";
import TestInfo from "./components/menu/TestInfo";
import Test from "./components/test/Test";

const App = () => {
  const [test, setTest] = useLocalStorage<Test | null>("TestData", null);
  const [testName, setTestName] = useState<string>("");
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [colorMode, setColorMode] = useLocalStorage<"light" | "dark">(
    "ColorMode",
    "dark"
  );
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: colorMode,
          background: {
            paper: colorMode === "light" ? "#ebebeb" : undefined,
          },
          primary: {
            main: "#d26415",
          },
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
          },
        },
      }),
    [colorMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "background.default",
          color: "text.primary",
          width: "100%",
          minHeight: "100%",
          gap: 2,
        }}
      >
        <Navbar colorMode={colorMode} setColorMode={setColorMode} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            width: { xs: "98%", md: 880 },
          }}
        >
          {test ? (
            <Test test={test} setTest={setTest} />
          ) : (
            <>
              {questions && (
                <TestInfo testName={testName} questions={questions} setTest={setTest} />
              )}
              <LoadQuestions
                setTestName={setTestName}
                setQuestions={setQuestions}
              />
            </>
          )}
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default App;
