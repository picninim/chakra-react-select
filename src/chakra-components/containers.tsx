import React from "react";
import { Box } from "@chakra-ui/layout";
import type { CSSObject } from "@chakra-ui/system";
import { useMultiStyleConfig } from "@chakra-ui/system";
import type {
  ContainerProps,
  GroupBase,
  IndicatorsContainerProps,
  ValueContainerProps,
} from "react-select";

export const SelectContainer = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: ContainerProps<Option, IsMulti, Group>
) => {
  const {
    children,
    className,
    cx,
    innerProps,
    isDisabled,
    isRtl,
    hasValue,
    selectProps: { chakraStyles },
  } = props;

  const initialSx: CSSObject = {
    position: "relative",
    direction: isRtl ? "rtl" : undefined,
    ...(isDisabled ? { cursor: "not-allowed" } : {}),
  };

  const sx = chakraStyles?.container
    ? chakraStyles.container(initialSx, props)
    : initialSx;

  return (
    <Box
      {...innerProps}
      className={cx(
        {
          "--is-disabled": isDisabled,
          "--is-rtl": isRtl,
          "--has-value": hasValue,
        },
        className
      )}
      sx={sx}
    >
      {children}
    </Box>
  );
};

export const ValueContainer = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: ValueContainerProps<Option, IsMulti, Group>
) => {
  const {
    children,
    className,
    cx,
    isMulti,
    hasValue,
    innerProps,
    selectProps: { size, chakraStyles, variant },
  } = props;

  // Getting the css from input instead of select
  // to fit better with each of the variants
  const inputStyles = useMultiStyleConfig("Input", {
    size,
    variant,
  });

  const initialSx: CSSObject = {
    display: "flex",
    alignItems: "center",
    flex: 1,
    paddingY: "2px",
    paddingX: inputStyles.field.px,
    flexWrap: "wrap",
    WebkitOverflowScrolling: "touch",
    position: "relative",
    overflow: "hidden",
  };

  const sx = chakraStyles?.valueContainer
    ? chakraStyles.valueContainer(initialSx, props)
    : initialSx;

  return (
    <Box
      {...innerProps}
      className={cx(
        {
          "value-container": true,
          "value-container--is-multi": isMulti,
          "value-container--has-value": hasValue,
        },
        className
      )}
      sx={sx}
    >
      {children}
    </Box>
  );
};

export const IndicatorsContainer = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: IndicatorsContainerProps<Option, IsMulti, Group>
) => {
  const {
    children,
    className,
    cx,
    innerProps,
    selectProps: { chakraStyles },
  } = props;

  const initialSx: CSSObject = {
    display: "flex",
    alignItems: "center",
    alignSelf: "stretch",
    flexShrink: 0,
  };

  const sx = chakraStyles?.indicatorsContainer
    ? chakraStyles.indicatorsContainer(initialSx, props)
    : initialSx;

  return (
    <Box
      {...innerProps}
      className={cx(
        {
          indicators: true,
        },
        className
      )}
      sx={sx}
    >
      {children}
    </Box>
  );
};
