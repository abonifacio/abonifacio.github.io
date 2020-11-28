import { Divider, Flex, Heading, Icon, Tag, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { BiGlassesAlt, IoMdBriefcase, VscBook } from "react-icons/all";
import { from } from "rxjs";
import { toArray } from "rxjs/operators";
import ProfileComponent from "./Profile";
import Section from "./Section";
import EducationComponent from "./Education";
import MilestoneComponent from "./Milestone";
import { EnhancedResume } from "../service/resume";
import useObservable from "../hook/useObservable";
import { collectFacets } from "../service/tags";
import { FilterContext } from "../hook/useFilters";

export default function ResumeComponent({
  resume,
  toggles,
  filters,
}: {
  toggles: React.ReactElement;
  filters: React.ReactElement;
  resume: EnhancedResume;
}): JSX.Element {
  const { facets: selectedFacets } = useContext(FilterContext).filters;
  const { data: sideProjectTags } = useObservable(
    () => from(resume.sideProjects).pipe(collectFacets, toArray()),
    [resume.sideProjects]
  );
  return (
    <VStack
      p={{ base: 0, md: 4 }}
      as="header"
      spacing={6}
      align={{ base: "center", md: "start" }}
    >
      <ProfileComponent {...resume.me} darkModeToggle={toggles} />
      {filters}
      <Section
        title={
          <>
            <Icon verticalAlign="text-top" as={IoMdBriefcase} /> Experience
          </>
        }
        experiences={resume.jobs}
      />
      <Section
        title={
          <>
            <Icon verticalAlign="bottom" mb="2px" as={VscBook} /> Education
          </>
        }
        experienceComponent={EducationComponent}
        experiences={resume.education}
      />
      {resume.sideProjects.length ? (
        <VStack p={6} as="section" align="flex-start">
          <Heading size="md" fontWeight="normal">
            <Icon verticalAlign="bottom" mb="2px" as={BiGlassesAlt} /> Side
            Projects
          </Heading>
          <Divider />
          {sideProjectTags?.length ? (
            <Flex mb={6} wrap="wrap">
              {sideProjectTags.map((it) => (
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
          <VStack w="100%" spacing={2} align="flex-start">
            {resume.sideProjects.map((milestone) => (
              <React.Fragment key={`${milestone.title}-${milestone.date}`}>
                <MilestoneComponent {...milestone} />
              </React.Fragment>
            ))}
          </VStack>
        </VStack>
      ) : undefined}
    </VStack>
  );
}
