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
import React, { Dispatch } from "react";
import { ResumeFilter } from "../service/resume";
import useToggleOptions from "../hook/useToggleOptions";
import { usePrintMode } from "../hook/usePrintMode";

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
  onChange,
  tags,
  facets,
  availableTags,
  availableFacets,
}: ResumeFilter & {
  availableTags: string[];
  availableFacets: string[];
  onChange: Dispatch<Partial<ResumeFilter>>;
}): JSX.Element {
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
        Tags
      </Heading>
      <TagOptions
        onChange={(it) => onChange({ tags: it })}
        colorScheme="green"
        availableOptions={availableTags}
        selected={tags}
      />
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
        onChange={(it) => onChange({ facets: it })}
        colorScheme="purple"
        availableOptions={availableFacets}
        selected={facets}
      />
    </Grid>
  );
}
