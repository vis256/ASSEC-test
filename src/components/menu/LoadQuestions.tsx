import { Dispatch, SetStateAction, useState } from "react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HomeIcon from "@mui/icons-material/Home";

interface LoadQuestionsProps {
  setTestName: Dispatch<SetStateAction<string>>;
  setQuestions: Dispatch<SetStateAction<Question[] | null>>;
}

const LoadQuestions = ({ setTestName, setQuestions }: LoadQuestionsProps) => {
  const [loading, setLoading] = useState<"local" | "upload" | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const error = (msg: string, line: number) => {
    setErrorMsg(`${msg} (linia ${line})`);
    return 1;
  };

  const loadTasks = (fileStr: string): number => {
    let lastLine = 1;
    const newTasks: Question[] = [];

    try {
      const rawQuestions: string[] = fileStr.split("\n").map((t) => t.trim());

      for (const [i, task] of rawQuestions.entries()) {
        lastLine = i + 1;
        const questionSplit = task.split("*");

        const question = questionSplit[0];
        const options: Option[] = [];

        if (questionSplit.length < 2) {
          return error("Zbyt mało odpowiedzi oznaczonych znakiem *", lastLine);
        }

        for (let option of questionSplit.slice(1)) {
          option = option.trim();
          const isCorrect = option.startsWith("[X]");
          const label = isCorrect ? option.replace("[X]", "") : option;
          options.push({ label, isCorrect });
        }

        newTasks.push({ label: question, options });
      }
    } catch {
      return error("Nieobsługiwany błąd", lastLine);
    }

    setQuestions(newTasks);
    return 0;
  };

  return (
    <Card
      sx={{
        width: "100%",
        p: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={async () => {
            setLoading("local");
            if (!loadTasks(await (await fetch("src/data/pyta.dat")).text())) {
              setTestName("PUT - BSI");
            }
            setLoading(null);
          }}
          startIcon={
            loading === "local" ? (
              <CircularProgress size="1.2rem" />
            ) : (
              <HomeIcon />
            )
          }
          disabled={loading !== null}
        >
          Zaduj domyślne zadania (PUT - BSI)
        </Button>
        <Button
          component="label"
          variant="outlined"
          startIcon={
            loading === "upload" ? (
              <CircularProgress size="1.2rem" />
            ) : (
              <CloudUploadIcon />
            )
          }
          disabled={loading !== null}
        >
          Załaduj własne zadania z pliku
          <TextField
            type="file"
            sx={{
              display: "none",
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setLoading("upload");
              const file = event.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (loadEvent) => {
                  if (loadEvent.target?.error || !reader.result) {
                    setErrorMsg("Wystąpił błąd podczas odczytu pliku");
                  } else {
                    if (!loadTasks(reader.result as string)) {
                      setTestName(file.name);
                    }
                  }
                };
                reader.readAsText(file);
              } else {
                setErrorMsg("Plik nie został prawidłowo przesłany");
              }
              event.target.value = "";  // clear file input to allow same file to be uploaded again
              setLoading(null);
            }}
          />
        </Button>
      </Box>

      {errorMsg && (
        <Box>
          <Typography>{"Błąd ładowania pliku:"}</Typography>
          <Typography>{errorMsg}</Typography>
        </Box>
      )}
    </Card>
  );
};

export default LoadQuestions;
