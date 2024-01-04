import { Card, Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Card
      sx={{
        marginTop: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        p: 1.5,
      }}
    >
      <Typography sx={{ textAlign: "center" }}>
        Dane zapamiętywane są między sesjami,
        więc możesz spokojnie przerwać test i wrócić do niego w dowolnej chwili.
      </Typography>
      <Link
        href="https://github.com/Hi-Im-Simon"
        sx={{
          fontSize: 12,
        }}
      >
        Wykonał: Szymon Stanisławski
      </Link>
    </Card>
  );
};

export default Footer;
