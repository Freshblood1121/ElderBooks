import React, { useEffect, useRef, useState } from "react";
import {
  styled,
  MenuItem,
  Select,
  createTheme,
  ThemeProvider,
  FormControl,
  InputLabel,
} from "@mui/material";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { keyframes } from "@emotion/react";
import { palette } from "../../Utils/Constants";
import { CaretDown } from "@phosphor-icons/react";
import DropdownIcon from "./DropdownIcon";
import { Link } from "react-router-dom";

const breakpointsTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const theme = createTheme({
  typography: {
    fontFamily: ["Golos UI", "Arial", "sans-serif"].join(","),
    fontSize: 16,
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          "--Select-brandBorderColor": `${palette.basic}`,
          "--Select-brandBorderHoverColor": `${palette.hover}`,
          "--Select-brandBorderFocusedColor": `${palette.basic}`,
          transition: "0.25s cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          // width: "100%",
          width: "220px",
          height: "50px",
          borderRadius: "20px",
          boxShadow: `6px 7px 0px 0px ${palette.warning}`,
          fontSize: "16px",
          "& .MuiSelect-select": {
            paddingLeft: "30px",
          },
          "&:hover": {
            backgroundColor: `${palette.hover}`,
            boxShadow: "none",
          },
          "& .Mui-focused": {
            color: "var(--Select-brandBorderFocusedColor)",
            boxShadow: "none",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          left: "20px",
          top: "-4px",
          color: `${palette.basic}`,
          fontSize: "16px",
          "&.Mui-focused": {
            zIndex: 6,
            color: `${palette.basic}`,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderWidth: "2px",
          borderColor: "var(--Select-brandBorderColor)",
          transition: "0.25s cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
        root: {
          color: `${palette.basic}`,
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {},
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--Select-brandBorderFocusedColor)",
          },
          [`&.Mui-focused`]: {
            backgroundColor: `${palette.hover}`,
            boxShadow: "none",
            position: "relative",
            zIndex: "5",
            transformStyle: "preserve-3d",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          "--Select-brandBorderColor": `${palette.basic}`,
          boxShadow: "none",
          border: "2px solid var(--Select-brandBorderColor)",
          borderRadius: "20px",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          paddingTop: "6px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: `${palette.basic}`,
          paddingLeft: "30px",
          fontSize: "16px",
          [`&.Mui-selected`]: {
            backgroundColor: `${palette.active} !important`,
            borderTop: `2px solid ${palette.basic}`,
            borderBottom: `2px solid ${palette.basic}`,
          },
        },
      },
    },
  },
});

const CategorySelect = ({ categories }) => {
  console.log(categories);
  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  // Определяем позицию dropdown-меню и опускаем его на 2px ниже компонента Select

  const inputComponent = useRef(null);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    setPosition(
      inputComponent.current
        ? inputComponent.current.getBoundingClientRect().bottom + 2
        : 0
    );
  }, [inputComponent]);

  const IconComponent = (props) => {
    return <DropdownIcon inheritViewBox {...props} />;
  };

  return (
    <ThemeProvider theme={theme}>
      <FormControl variant="outlined">
        {category == "" ? (
          <InputLabel shrink={false}>Категории</InputLabel>
        ) : null}
        <Select
          ref={inputComponent}
          MenuProps={{
            PaperProps: { sx: { top: `${position}px !important` } },
          }}
          id="simple-select"
          value={category}
          onChange={handleChange}
          IconComponent={IconComponent}
          fullWidth
        >
          {/* <MenuItem value={"Все"}>Все</MenuItem>
          <MenuItem value={"Художественные"}>Художественные</MenuItem>
          <MenuItem value={"Научные"}>Научные</MenuItem>
          <MenuItem value={"Научно-популярные"}>Научно-популярные</MenuItem>
          <MenuItem value={"Учебные"}>Учебные</MenuItem>
          <MenuItem value={"Справочные"}>Справочные</MenuItem>
          <MenuItem value={"Полиграфия"}>Полиграфия</MenuItem> */}
          <MenuItem value={"Все"}>
            <Link to={"all"}>Все</Link>
          </MenuItem>
          {categories.map((categoryItem) => (
            <MenuItem key={categoryItem.id} value={categoryItem.title}>
              <Link to={`${categoryItem.id}`}>{categoryItem.title}</Link>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
};

export default CategorySelect;
