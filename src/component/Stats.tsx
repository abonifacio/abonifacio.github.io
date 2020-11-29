import {
  Flex,
  SlideFade,
  Stat,
  StatHelpText,
  StatNumber,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import React, { useContext, useMemo } from "react";
import { Stats } from "../service/stats";
import useToggleOptions from "../hook/useToggleOptions";
import { FilterContext } from "../hook/useFilters";
import { usePrintMode } from "../hook/usePrintMode";

function daysToString(days: number): string {
  const years = days / 365;
  const integer = Math.floor(years);
  const decimals = years - integer;
  if (decimals > 0.7) {
    return `${integer + 1}`;
  }
  if (integer === 0) {
    return `<1`;
  }
  if (decimals > 0.2) {
    return `${integer}+`;
  }
  return `${integer}`;
}

export default function StatsComponent({
  experience,
  tags,
}: Stats & { tags: string[] }): JSX.Element {
  const { filters, dispatch } = useContext(FilterContext);
  const isPrintMode = usePrintMode(false, true) as boolean;
  const [toggleOption, isOptionChecked] = useToggleOptions(filters.tags);
  const stats = useMemo(
    () =>
      tags
        .sort()
        .sort((a, b) => experience[b] - experience[a])
        .map((tag) => [tag, daysToString(experience[tag])]),
    [tags, experience]
  );
  return (
    <Flex w="100%" justifyContent="space-around" wrap="wrap">
      {stats.map(([tag, years]) => (
        <Stat mt={2} flexGrow={0} textAlign="center" key={tag}>
          <Tag
            size="lg"
            borderRadius="full"
            onClick={() => dispatch({ tags: toggleOption(tag) })}
            colorScheme={
              isOptionChecked(tag) && !isPrintMode ? "green" : "white"
            }
            value={tag}
          >
            <TagLabel style={{ cursor: "pointer" }}>{tag}</TagLabel>
            <SlideFade in={isOptionChecked(tag) && !isPrintMode} unmountOnExit>
              <TagCloseButton />
            </SlideFade>
          </Tag>
          {/* <StatLabel>{tag}</StatLabel> */}
          <StatNumber>{years}</StatNumber>
          <StatHelpText mb={0}>Years</StatHelpText>
        </Stat>
      ))}
    </Flex>
  );
}
