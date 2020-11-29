import {
  Grid,
  Heading,
  SlideFade,
  Tag,
  TagCloseButton,
  TagLabel,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { Dispatch, useContext } from "react";
import useToggleOptions from "../hook/useToggleOptions";
import { usePrintMode } from "../hook/usePrintMode";
import { FilterContext } from "../hook/useFilters";

function TagOptions({
  colorScheme,
  selected,
  availableOptions,
  onChange,
}: {
  colorScheme: string;
  selected: string[];
  availableOptions: string[];
  onChange: Dispatch<string[]>;
}) {
  const [toggleOption, isOptionChecked] = useToggleOptions(selected);
  return (
    <Wrap justify="center" spacing={1}>
      {availableOptions.map((opt) => (
        <WrapItem key={opt}>
          <Tag
            size="lg"
            borderRadius="full"
            onClick={() => onChange(toggleOption(opt))}
            colorScheme={isOptionChecked(opt) ? colorScheme : "white"}
            value={opt}
          >
            <TagLabel style={{ cursor: "pointer" }}>{opt}</TagLabel>
            <SlideFade in={isOptionChecked(opt)} unmountOnExit>
              <TagCloseButton />
            </SlideFade>
          </Tag>
        </WrapItem>
      ))}
    </Wrap>
  );
}

export default function Filter({
  availableFacets,
}: {
  availableFacets: string[];
}): JSX.Element {
  const { filters, dispatch } = useContext(FilterContext);
  const isPrintMode = usePrintMode("grid", "none");
  return (
    <Grid
      className="no-print"
      display={isPrintMode}
      templateColumns={{
        base: "auto",
        sm: "min-content auto",
      }}
      columnGap={2}
      rowGap={2}
      justifyItems={{ base: "center", sm: "flex-start" }}
      alignItems="baseline"
      alignSelf="center"
    >
      <Heading
        justifySelf={{ base: "center", sm: "flex-end" }}
        as="h5"
        fontSize="md"
        fontWeight="light"
        colorScheme="black"
      >
        Facets
      </Heading>
      <TagOptions
        onChange={(it) => dispatch({ facets: it })}
        colorScheme="purple"
        availableOptions={availableFacets}
        selected={filters.facets}
      />
    </Grid>
  );
}
