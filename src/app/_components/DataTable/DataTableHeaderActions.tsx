import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import TreeButtonIcon from "../TreeButtonIcon";
import GridButtonIcon from "../GridButtonIcon";
import { TableView } from "@/constants/config.enum";
import FilterButton from "../FilterButton";
import SearchBar from "../SearchBar";
import AddAgentButton from "../AddAgentButton";

import { DataTableLabels } from "@/constants/labels.enums";
import { useState } from "react";

const DataTableHeaderActions = () => {
  const theme = useTheme();

  const [toogleViewSelected, setToogleViewSelected] = useState<TableView>(
    TableView.GRID
  );

  const handleToogleView = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setToogleViewSelected(newAlignment as TableView);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
          {DataTableLabels.MAINCARDTITLE}
        </Typography>

        <Box>
          <ToggleButtonGroup
            color="primary"
            value={toogleViewSelected}
            exclusive
            onChange={handleToogleView}
            aria-label="view toggle"
          >
            <ToggleButton value={TableView.GRID} aria-label="grid view">
              <GridButtonIcon
                selected={toogleViewSelected === TableView.GRID}
              />
            </ToggleButton>
            <ToggleButton value={TableView.TREE} aria-label="tree view">
              <TreeButtonIcon
                selected={toogleViewSelected === TableView.TREE}
              />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 2,
        }}
      >
        <Box>
          <ToggleButtonGroup
            color="primary"
            exclusive
            aria-label="filters"
            sx={{
              borderColor: theme.palette.grey[300],
              borderWidth: 1,
              borderStyle: "solid",
              "& .MuiToggleButton-root": {
                borderColor: theme.palette.grey[300], // Aplicar a los botones dentro del grupo
              },
            }}
          >
            <Button>
              <FilterButton />
            </Button>
          </ToggleButtonGroup>
          <SearchBar />
        </Box>
        <Box>
          <AddAgentButton />
        </Box>
      </Box>
    </>
  );
};

export default DataTableHeaderActions;
