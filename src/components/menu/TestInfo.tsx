import { Dispatch, SetStateAction, useState } from "react";
import { Button, Card, CircularProgress, Typography } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";

interface TestInfoProps {
  testName: string;
  questions: Question[];
  setTest: Dispatch<SetStateAction<Test | null>>;
}

const TestInfo = ({ testName, questions, setTest }: TestInfoProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const drawTasks = (amount: number = questions.length, random: boolean = true) => {
    amount = Math.min(amount, questions.length);
    setLoading(true);
    const testQuestions: Question[] = [];
    if (random) {
      const testQuestionsIds: number[] = [];
      while (testQuestions.length < amount) {
        const id = Math.floor(Math.random() * questions.length);
        if (!testQuestionsIds.includes(id)) {
          testQuestionsIds.push(id);
          const question = questions[id];
          testQuestions.push({
            label: question.label,
            options: question.options.sort(() => 0.5 - Math.random()),
          });
        }
      }
    }
    else {
      for (const question of questions) {
        testQuestions.push({
          label: question.label,
          options: question.options.sort(() => 0.5 - Math.random()),
        });
      }
    }
    setTest({ name: testName, questions: testQuestions });
    setLoading(false);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        width: "100%",
        p: 3,
      }}
    >
      <Typography
        sx={{ color: "primary.main" }}
      >{`Test: ${testName}`}</Typography>
      <Typography>{`Liczba dostępnych pytań: ${questions.length}`}</Typography>
      <Button
        variant="contained"
        onClick={() => drawTasks(40)}
        startIcon={loading ? <CircularProgress size="1.2rem" /> : <QuizIcon />}
        disabled={loading}
        fullWidth
      >
        Rozpocznij test (40 zadań)
      </Button>
      <Button
        variant="contained"
        onClick={() => drawTasks(10)}
        startIcon={loading ? <CircularProgress size="1.2rem" /> : <QuizIcon />}
        disabled={loading}
        fullWidth
      >
        Rozpocznij test (10 zadań)
      </Button>
      <Button
        variant="contained"
        onClick={() => drawTasks()}
        startIcon={loading ? <CircularProgress size="1.2rem" /> : <QuizIcon />}
        disabled={loading}
        fullWidth
      >
        Rozpocznij test (wszystkie zadania, losowo)
      </Button>
      <Button
        variant="contained"
        onClick={() => drawTasks(undefined, false)}
        startIcon={loading ? <CircularProgress size="1.2rem" /> : <QuizIcon />}
        disabled={loading}
        fullWidth
      >
        Rozpocznij test (wszystkie zadania)
      </Button>
    </Card>
  );
};

export default TestInfo;
