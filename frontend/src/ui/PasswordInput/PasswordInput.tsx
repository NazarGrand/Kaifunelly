import { TextInput } from "@mantine/core";
import React, { ChangeEvent, FunctionComponent, useState } from "react";

import classes from "./PasswordInput.module.scss";

import { ReactComponent as Eye } from "../../assets/icons/Eye.svg";
import { ReactComponent as EyeSlash } from "../../assets/icons/EyeSlash.svg";

interface PasswordInputProps {
  value?: string;
  onChange?: (value: string) => void;
  label: string;
  placeholder?: string;
  error?: string;
  withCloseButton?: boolean;
  leftSection?: JSX.Element;
  disabled?: boolean;
}

const PasswordInput: FunctionComponent<PasswordInputProps> = ({
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

  const [inputValue, setInputValue] = useState<string>(value || "");

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const getElementColor = () => {
    switch (true) {
      case disabled:
        return "var(--mantine-color-neutral-5)";
      case focused:
        return "var(--mantine-color-primary-0)";
      case !!error:
        return "var(--mantine-color-error-0)";
      case hovered:
        return "var(--mantine-color-neutral-8)";
      default:
        return "var(--mantine-color-neutral-6)";
    }
  };

  const elementColor = getElementColor();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
    onChange?.(event.currentTarget.value);
  };

  const inputType = showPassword ? "text" : "password";

  return (
    <section
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <TextInput
        type={inputType}
        label={label}
        placeholder={focused || error ? placeholder : ""}
        classNames={{
          input: classes.input,
          label: classes.label,
        }}
        disabled={disabled}
        error={!focused ? error : ""}
        {...props}
        value={inputValue}
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
            top: focused || inputValue || error ? "0" : "50%",
            left: focused || inputValue || error ? "0.75rem" : "2.5rem",
            transform: "translateY(-50%)",
            transition: "all 150ms ease",
            fontSize:
              focused || inputValue || error
                ? theme.other.bodyXS.fontSize
                : theme.other.bodyMD.fontSize,
            fontWeight:
              focused || inputValue || error
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
            style={{
              height: "1.5rem",
            }}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeSlash style={{ fill: elementColor }} />
            ) : (
              <Eye style={{ fill: elementColor }} />
            )}
          </button>
        }
        rightSectionWidth="3rem"
      />
    </section>
  );
};

export default PasswordInput;
