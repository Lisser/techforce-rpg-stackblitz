import React from 'react';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import * as MuiColors from '@material-ui/core/colors';

const temp = MuiColors as { [key: string]: { [key: string]: string } };

interface ColorPickerProps {
  onChange: (color: string) => void;
  color: string;
}

const hues = Object.keys(MuiColors).slice(1);
const shades = Object.keys(MuiColors.red);

function valueLabelFormat(value: number) {
  return shades[value];
}

function breakdownColor(color: string) {
  let result = { hue: 'blue', shade: '500' };
  Object.entries(temp).some(([hue, shadeRow]) =>
    Object.entries(shadeRow).some(([shade, value]) => {
      if (color === value) {
        result = { hue, shade };
        return true;
      }
      return false;
    })
  );
  return result;
}

export default function ColorPicker({ onChange, color }: ColorPickerProps) {
  const { hue, shade } = breakdownColor(color);

  return (
    <Box>
      <Typography>Shade: {shade}</Typography>
      <Slider
        value={shades.indexOf(shade)}
        min={0}
        step={1}
        max={shades.length - 1}
        getAriaValueText={valueLabelFormat}
        valueLabelFormat={valueLabelFormat}
        onChange={(_, newValue: number | number[]) => {
          if (typeof newValue === 'number') {
            onChange(temp[hue][shades[newValue]]);
          }
        }}
        valueLabelDisplay="auto"
      />
      <Box display="grid" gridTemplateColumns="repeat(4, 48px)" gridTemplateRows="repeat(5, 48px)">
        {hues.map(h => (
          <Box
            boxSizing="border-box"
            border="2px solid transparent"
            borderColor={h === hue ? 'white' : 'transparent'}
            key={`${h}${shade}`}
            bgcolor={temp[h][shade]}
            onClick={() => onChange(temp[h][shade])}
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
          >
            {h === hue ? <CheckIcon fontSize="large" /> : null}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
