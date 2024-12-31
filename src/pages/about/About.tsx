import { Button, TextField, Rating } from "@mui/material";
const About = () => {
  return (
    <div>
      About
      <div className="flex gap-4">
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />

        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </div>
      <Rating name="simple-controlled" />
    </div>
  );
};

export default About;
