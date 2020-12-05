import {
  Flex,
  Heading,
  HStack,
  List,
  ListItem,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";
import MacroExperience from "../model/macroExperience";
import MilestoneComponent from "./Milestone";
import { EnhancedExperience } from "../service/experience";
import { FilterContext } from "../hook/useFilters";
import { experienceToPlainText } from "../service/plaintext";

export default function MacroExperienceComponent({
  title,
  period,
  collectedFacets,
  description,
  organization,
  children,
  milestones,
}: MacroExperience &
  EnhancedExperience & {
    children?: React.ReactFragment | null;
  }): JSX.Element {
  const { facets: selectedFacets } = useContext(FilterContext).filters;
  const logExperience = () =>
    // eslint-disable-next-line no-console
    console.log(experienceToPlainText({ description, milestones }));
  return (
    <VStack align="flex-start" spacing={1}>
      <Heading onDoubleClick={logExperience} size="sm">
        {title}
      </Heading>
      <HStack spacing={2} align="baseline">
        <Heading as="h6" size="xs" whiteSpace="nowrap" fontWeight="light">
          {period}
        </Heading>
        <Text fontSize="md" fontWeight="light">
          {organization}
        </Text>
      </HStack>
      {description ? (
        <ReactMarkdown className="markdown">{description}</ReactMarkdown>
      ) : null}
      {collectedFacets?.length ? (
        <Flex mb={6} wrap="wrap">
          {collectedFacets?.map((it) => (
            <Tag
              colorScheme={
                !selectedFacets.length || selectedFacets.includes(it)
                  ? "purple"
                  : "gray"
              }
              mt={3}
              mr={4}
              key={it}
            >
              {it}
            </Tag>
          ))}
        </Flex>
      ) : undefined}
      {milestones ? (
        <List spacing={2}>
          {milestones.map((m) => (
            <ListItem key={m.title}>
              <MilestoneComponent {...m} />
            </ListItem>
          ))}
        </List>
      ) : undefined}
      {children}
    </VStack>
  );
}
