import React, { useState, FunctionComponent, ChangeEvent } from "react";
import { TextInput } from "@mantine/core";
import { ReactComponent as ClearIcon } from "../../assets/icons/ClearIcon.svg";

import classes from "./Input.module.scss";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  error?: string;
  withCloseButton?: boolean;
  leftSection?: JSX.Element;
  disabled?: boolean;
}

const Input: FunctionComponent<InputProps> = ({
  value,
  onChange,
  label,
  placeholder,
  error,
  leftSection,
  disabled = false,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const getElementColor = () => {
    switch (true) {
      case disabled:
        return "var(--mantine-color-neutral-5)";
      case focused:
        return "var(--mantine-color-primary-0)";
      case !!error:
        return "var(--mantine-color-error-0)";
      case hovered || !!value:
        return "var(--mantine-color-neutral-8)";
      default:
        return "var(--mantine-color-neutral-6)";
    }
  };

  const elementColor = getElementColor();

  const handleClear = () => {
    onChange?.("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.currentTarget.value);
  };

  return (
    <section onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <TextInput
        label={label}
        placeholder={focused || error ? placeholder : ""}
        classNames={{
          input: classes.input,
          label: classes.label,
        }}
        disabled={disabled}
        error={!focused ? error : ""}
        {...props}
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ "--element-color": elementColor }}
        styles={(theme) => ({
          input: {
            boxShadow: focused ? `0 0 5px ${theme.colors.primary[4]}` : "",
            ...theme.other.bodyMD,
          },
          label: {
            position: "absolute",
            top: focused || value || error ? "0" : "50%",
            left: focused || value || error ? "0.75rem" : "2.5rem",
            transform: "translateY(-50%)",
            transition: "all 150ms ease",
            fontSize:
              focused || value || error
                ? theme.other.bodyXS.fontSize
                : theme.other.bodyMD.fontSize,
            fontWeight:
              focused || value || error
                ? theme.other.bodyXS.fontWeight
                : theme.other.bodyMD.fontWeight,
            lineHeight: "auto",
            padding: `0 ${theme.spacing.xs}`,
            cursor: "text",
          },
          error: {
            ...theme.other.bodyXS,
          },
        })}
        leftSection={
          leftSection
            ? React.cloneElement(leftSection, { style: { fill: elementColor } })
            : null
        }
        leftSectionWidth="3rem"
        rightSectionPointerEvents="all"
        rightSection={
          <button
            type="button"
            onClick={handleClear}
            style={{
              height: "1.5rem",
              display: value ? undefined : "none",
            }}
            aria-label="Clear input"
          >
            <ClearIcon style={{ fill: elementColor }} />
          </button>
        }
        rightSectionWidth="3rem"
      />
    </section>
  );
};

export default Input;
