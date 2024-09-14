import { Radio, FormControlLabel, Typography } from "@mui/material";

export default function PollOption({ option, value, onChange }) {
  return (
    <FormControlLabel
      value={option.id}
      control={<Radio />}
      label={
        <Typography variant="body1">
          {option.text}
        </Typography>
      }
      onChange={onChange}
    />
  );
}
