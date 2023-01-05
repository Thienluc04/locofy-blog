import React, { useState } from "react";
import { useController } from "react-hook-form";
import { DropdownProvider, useDropdown } from "./dropdown-context";

const Dropdown = ({ children, ...props }) => {
  return <DropdownProvider {...props}>{children}</DropdownProvider>;
};

export default Dropdown;
