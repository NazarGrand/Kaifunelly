import React, { useState, FunctionComponent, ChangeEvent } from "react";
import { useMantineTheme, TextInput } from "@mantine/core";
import { ReactComponent as ClearIcon } from "../assets/icons/ClearIcon.svg";
import { ReactComponent as Eye } from "../assets/icons/Eye.svg";
import { ReactComponent as EyeSlash } from "../assets/icons/EyeSlash.svg";
import classes from "./Input.module.scss";

export enum InputVariantEnums {
  text = "text",
  password = "password",
  email = "email",
}

interface InputProps {
  value?: string;
  onChange?: (value: string) => void;
  variant?: InputVariantEnums;
  label: string;
  placeholder?: string;
  error?: string;
  withCloseButton?: boolean;
  leftSection?: JSX.Element;
  clearable?: boolean;
  disabled?: boolean;
}

const Input: FunctionComponent<InputProps> = ({
  value,
  onChange,
  variant = InputVariantEnums.text,
  label,
  placeholder,
  error,
  leftSection,
  clearable = true,
  disabled = false,
  ...props
}) => {
  const theme = useMantineTheme();
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(value || "");

  const getElementColor = () => {
    switch (true) {
      case disabled:
        return theme.colors.neutral[5];
      case focused:
        return theme.colors.primary[0];
      case !!error:
        return theme.colors.error[0];
      case hovered:
        return theme.colors.neutral[8];
      default:
        return theme.colors.neutral[6];
    }
  };

  const elementColor = getElementColor();

  const inputType =
    variant === InputVariantEnums.password && showPassword ? "text" : variant;

  const handleClear = () => {
    setInputValue("");
    onChange?.("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
    onChange?.(event.currentTarget.value);
  };

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
          root: classes.root,
          input: classes.input,
          label: classes.label,
          error: classes.error,
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
          <>
            {variant !== InputVariantEnums.password ? (
              <>
                {clearable && inputValue !== "" && (
                  <button
                    type="button"
                    onClick={handleClear}
                    style={{
                      height: "1.5rem",
                      display: inputValue ? undefined : "none",
                    }}
                    aria-label="Clear input"
                  >
                    <ClearIcon style={{ fill: elementColor }} />
                  </button>
                )}
              </>
            ) : (
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
            )}
          </>
        }
        rightSectionWidth="3rem"
      />
    </section>
  );
};

export default Input;
