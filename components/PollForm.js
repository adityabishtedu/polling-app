import { TextField, Button, Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PollForm({
  question,
  setQuestion,
  options,
  setOptions,
  onSubmit,
}) {
  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <form onSubmit={onSubmit}>
      <TextField
        fullWidth
        label="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        margin="normal"
        required
      />
      {options.map((option, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <TextField
            fullWidth
            label={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            required
          />
          <IconButton
            onClick={() => handleRemoveOption(index)}
            disabled={options.length <= 2}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button startIcon={<AddIcon />} onClick={handleAddOption} sx={{ mb: 2 }}>
        Add Option
      </Button>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Create Poll
      </Button>
    </form>
  );
}
