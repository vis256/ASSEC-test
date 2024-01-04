import { Box, Button, Card, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

let localTestFinished = false;

/** Local variable tracing when the test is finished to stop the timer timeout. */
interface TestMenuProps {
  test: Test;
  setTest: Dispatch<SetStateAction<Test | null>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  setCheckAnswer: Dispatch<SetStateAction<boolean>>;
  testFinished: boolean;
  setTestFinished: Dispatch<SetStateAction<boolean>>;
}

const TestMenu = ({
  test,
  setTest,
  page,
  setPage,
  setCheckAnswer,
  testFinished,
  setTestFinished,
}: TestMenuProps) => {
  const [timer, setTimer] = useState<number>(
    Number(localStorage.getItem("TestTimer") ?? 0)
  );

  useEffect(() => {
    startTimerUpdater();
    console.log("aaaa")
  }, []);

  const startTimerUpdater = (run = false) => {
    if (!localTestFinished) {
      if (run) {
        setTimer((old) => {
          localStorage.setItem("TestTimer", String(old + 1));
          return old + 1;
        });
      }
      setTimeout(() => startTimerUpdater(true), 1000);
    }
  };

  const getTestResults = (): number => {
    let score = 0;
    for (const question of test.questions) {
      let correctOptions = 0;
      let balanceOfSelectedOptions = 0;
      for (const option of question.options) {
        if (option.isCorrect) {
          correctOptions++;
          if (option.isSelected) balanceOfSelectedOptions++;
        } else {
          if (option.isSelected) balanceOfSelectedOptions--;
        }
      }
      if (correctOptions === balanceOfSelectedOptions) {
        score++;
      } else {
        score += Math.max(balanceOfSelectedOptions, 0) / correctOptions;
      }
    }

    const percentage = Math.floor((score / test.questions.length) * 1000) / 10;
    console.log(`${percentage}%`);
    return percentage;
  };

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 1,
        width: "100%",
        py: 1,
        px: 4,
      }}
    >
      {/* check current question */}
      <Box
        sx={{
          flex: 1,
        }}
      >
        {!testFinished ? (
          <Button variant="outlined" onClick={() => setCheckAnswer(true)}>
            Pokaż odpowiedź
          </Button>
        ) : (
          <Typography
            sx={{ color: "primary.main" }}
          >{`Wynik: ${getTestResults()}%`}</Typography>
        )}
      </Box>

      {/* timer */}
      <Typography
        sx={{
          flex: 1,
          textAlign: "center",
        }}
      >
        {`${Math.floor(timer / 60)}:${timer % 60 < 10 ? "0" : ""}${timer % 60}`}
      </Typography>

      {/* end test button */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {!testFinished ? (
          <Button
            variant={
              page === test.questions.length - 1 ? "contained" : "outlined"
            }
            onClick={() => {
              setCheckAnswer(true);
              setTestFinished(true);
              localTestFinished = true;
            }}
          >
            Zakończ test
          </Button>
        ) : (
          <Button 
          variant="outlined"
           onClick={() => {
            setTest(null);
            setTimer(0);
            setPage(0);
            localTestFinished = false;
            localStorage.setItem("TestTimer", "0");
           }}>
            Wyjdź
          </Button>
        )}
      </Box>
    </Card>
  );
};

export default TestMenu;
