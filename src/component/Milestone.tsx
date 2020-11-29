import React, { useContext } from "react";
import { VscMilestone } from "react-icons/all";
import { Box, Divider, HStack, ListIcon, Tag, Text } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import Milestone from "../model/milestone";
import { FilterContext } from "../hook/useFilters";
import getColorScheme from "../service/badge";
import milestoneToPlainText from "../service/plaintext";

export default function MilestoneComponent({
  title,
  description,
  tags,
}: Milestone): JSX.Element {
  const { tags: selectedTags } = useContext(FilterContext).filters;
  // eslint-disable-next-line no-console
  const logMilestone = () => console.log(milestoneToPlainText({ title, tags }));
  return (
    <Box mb={2}>
      <HStack>
        <Text onDoubleClick={logMilestone}>
          <ListIcon
            verticalAlign="text-top"
            as={VscMilestone}
            color="green.500"
          />
          {title}
        </Text>
        {tags?.length ? (
          <Box>
            {tags?.map((t) => (
              <Tag
                colorScheme={
                  selectedTags.includes(t) ? getColorScheme(t) : undefined
                }
                size="sm"
                textAlign="right"
                mr={2}
                key={t}
              >
                {t}
              </Tag>
            ))}
          </Box>
        ) : undefined}
      </HStack>
      {description && (
        <HStack pl={6}>
          <Divider h="auto" alignSelf="stretch" orientation="vertical" />
          <Box pt={2}>
            <ReactMarkdown className="markdown">{description}</ReactMarkdown>
          </Box>
        </HStack>
      )}
    </Box>
  );
}
