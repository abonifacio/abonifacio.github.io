import { Divider, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import MacroExperience from "../model/macroExperience";
import MacroExperienceComponent from "./MacroExperience";
import { EnhancedExperience } from "../service/experience";

export default function Section({
  title,
  experiences,
  experienceComponent: Component = MacroExperienceComponent,
}: {
  title: React.ReactElement;
  experienceComponent?: React.FC<MacroExperience & EnhancedExperience>;
  experiences: (MacroExperience & EnhancedExperience)[] | undefined;
}): React.ReactElement | null {
  return experiences?.length ? (
    <VStack p={6} as="section" align="flex-start">
      <Heading size="md" fontWeight="normal">
        {title}
      </Heading>
      <VStack w="100%" spacing={4} align="flex-start">
        {experiences.map((j) => (
          <React.Fragment key={`${j.title}-${j.period}-${j.organization}`}>
            <Divider />
            <Component {...j} />
          </React.Fragment>
        ))}
      </VStack>
    </VStack>
  ) : null;
}
