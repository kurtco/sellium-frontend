import { Box, LinearProgress, Stack, SxProps, Typography } from "@mui/material";

interface LinearWithLabelProps {
  value: number;
  sx?: SxProps;
}

export default function LinearWithLabel({
  value,
  sx,
  ...others
}: LinearWithLabelProps) {
  return (
    <Stack alignItems="center" direction="row">
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          value={value}
          {...others}
          sx={sx}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          value
        )}%`}</Typography>
      </Box>
    </Stack>
  );
}
