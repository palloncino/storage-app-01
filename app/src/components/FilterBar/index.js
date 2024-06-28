import React, { useEffect } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
} from "@mui/material";

function FilterBar({ filters = {}, filtersConfig = [], onFilterChange }) {
  const handleChange = (name, value) => {
    onFilterChange(name, value);
  };

  useEffect(() => {
    filtersConfig.forEach((filter) => {
      if (filter.type === "select" && filter.options.length === 1) {
        handleChange(filter.name, filter.options[0].value);
      }
    });
  }, [filtersConfig]);

  const renderFilter = (filter) => {
    switch (filter.type) {
      case "text":
        return (
          <TextField
            key={filter.name}
            label={filter.placeholder}
            variant="outlined"
            fullWidth
            value={filters[filter.name] || ""}
            onChange={(event) => handleChange(filter.name, event.target.value)}
          />
        );
      case "select":
        const selectedValue =
          filters[filter.name] ||
          (filter.options.length === 1 ? filter.options[0].value : "all");
        return (
          <FormControl fullWidth key={filter.name}>
            <InputLabel>{filter.placeholder}</InputLabel>
            <Select
              label={filter.placeholder}
              value={selectedValue}
              onChange={(event) =>
                handleChange(filter.name, event.target.value)
              }
            >
              {filter.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
      <Grid container spacing={2} alignItems="flex-end">
        {filtersConfig.map((filter, index) => (
          <Grid item xs={12} sm={4} md={4} key={filter.name + index}>
            {renderFilter(filter)}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default FilterBar;
