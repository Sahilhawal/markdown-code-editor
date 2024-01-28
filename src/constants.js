const HEADING_PREFIX = "# ";
const BOLD_LINE_PREFIX = "* ";
const RED_LINE_PREFIX = "** ";
const UNDERLINE_PREFIX = "*** ";

export const PREFIX_VALUES = [
  HEADING_PREFIX,
  BOLD_LINE_PREFIX,
  RED_LINE_PREFIX,
  UNDERLINE_PREFIX,
];

export const STYLE_SETTINGS = {
  [HEADING_PREFIX]: {
    type: "BLOCK",
    value: "header-one",
  },
  [BOLD_LINE_PREFIX]: {
    type: "INLINE_STYLE",
    value: "BOLD",
  },
  [RED_LINE_PREFIX]: {
    type: "INLINE_STYLE",
    value: "RED_COLOR",
  },
  [UNDERLINE_PREFIX]: {
    type: "INLINE_STYLE",
    value: "UNDERLINE",
  },
};

export const styleMap = {
  RED_COLOR: {
    color: "red",
  },
  CODE: {
    color: "blue",
  },
};
