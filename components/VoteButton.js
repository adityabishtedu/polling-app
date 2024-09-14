import { Button } from "@mui/material";

export default function VoteButton({ onClick, disabled }) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={disabled}
      fullWidth
    >
      Vote
    </Button>
  );
}
