import { Box, Card, Typography } from "@mui/material";

interface PreviousResultsProps {
  previousResults: DataResults;
}

const PreviousResults = ({ previousResults }: PreviousResultsProps) => {
  const getAverageOfResults = (results: Result[]) => {
    return (
      Math.floor(
        (results.reduce((sum, r) => sum + r.result, 0) / results.length) * 10
      ) / 10
    );
  };

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        p: 3,
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography>Wyniki Twoich poprzednich testów:</Typography>
        {!Object.keys(previousResults).length ? (
          <Typography sx={{ fontSize: 12 }}>Brak historii wyników</Typography>
        ) : (
          <ul>
            {Object.entries(previousResults)
              .sort(([date0], [date1]) =>
                Number(date0) < Number(date1) ? 1 : -1
              )
              .slice(0, 10)
              .map(([date, results]) => (
                <div key={date}>
                  <li
                    style={{
                      paddingTop: 8,
                      paddingBottom: 8,
                    }}
                  >
                    <Typography
                      sx={{
                        display: "inline-block",
                        pr: 2,
                      }}
                    >
                      {date}
                    </Typography>
                    <Typography
                      sx={{
                        display: "inline-block",
                        color:
                          getAverageOfResults(results) < 50 ? "red" : "green",
                      }}
                    >
                      {`~${getAverageOfResults(results)}%`}
                    </Typography>
                  </li>
                  <ul>
                    {results.map((result, i) => (
                      <li key={i}>
                        <Typography
                          sx={{
                            display: "inline-block",
                            minWidth: 60,
                            color: result.result < 50 ? "red" : "green",
                          }}
                        >
                          {`${result.result}%`}
                        </Typography>
                        <Typography
                          sx={{
                            display: "inline-block",
                          }}
                        >
                          {`(${result.testName})`}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </ul>
        )}
      </Box>
    </Card>
  );
};

export default PreviousResults;
