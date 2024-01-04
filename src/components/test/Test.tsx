import { Dispatch, SetStateAction, useState } from "react";
import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import TestMenu from "./TestMenu";
import { useLocalStorage } from "usehooks-ts";

interface TestProps {
  test: Test;
  setTest: Dispatch<SetStateAction<Test | null>>;
}

const Test = ({ test, setTest }: TestProps) => {
  const [page, setPage] = useLocalStorage<number>("TestPage", 0);
  const [checkAnswer, setCheckAnswer] = useState<boolean>(false);
  const [testFinished, setTestFinished] = useState<boolean>(false);

  const Navigator = () => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        height: 40,
      }}
    >
      {page > 0 && (
        <IconButton
          sx={{ color: "primary.main", position: "absolute", top: 0, left: 0 }}
          onClick={() => {
            setPage((old) => old - 1);
            if (!testFinished) setCheckAnswer(false);
          }}
        >
          <NavigateBeforeIcon />
        </IconButton>
      )}

      <Typography>{`${page + 1} / ${test.questions.length}`}</Typography>

      {page < test.questions.length - 1 && (
        <IconButton
          sx={{ color: "primary.main", position: "absolute", top: 0, right: 0 }}
          onClick={() => {
            setPage(page + 1);
            if (!testFinished) setCheckAnswer(false);
          }}
        >
          <NavigateNextIcon />
        </IconButton>
      )}
    </Box>
  );

  return (
    <>
      <TestMenu
        test={test}
        setTest={setTest}
        page={page}
        setPage={setPage}
        checkAnswer={checkAnswer}
        setCheckAnswer={setCheckAnswer}
        testFinished={testFinished}
        setTestFinished={setTestFinished}
      />
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          width: "100%",
          pt: 1,
          pb: 5,
          px: 4,
        }}
      >
        <Navigator />
        <Typography>{test.questions[page].label}</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            ml: 4,
          }}
        >
          {test.questions[page].options.map((option, i) => (
            <FormControlLabel
              sx={{
                color: checkAnswer
                  ? option.isCorrect
                    ? "green"
                    : option.isSelected
                    ? "red"
                    : "inherit"
                  : "inherit",
              }}
              key={i}
              label={option.label}
              checked={option.isSelected ?? false}
              onChange={(_, checked) => {
                if (!testFinished) {
                  test.questions[page].options[i].isSelected = checked;
                  setTest(test);
                }
              }}
              control={<Checkbox />}
            />
          ))}
        </Box>
      </Card>
    </>
  );
};

export default Test;
