import React from "react";
import { Grid } from "@chakra-ui/react";
import Education from "../model/education";
import MacroExperienceComponent from "./MacroExperience";
import Certificate from "./Certificate";
import { EnhancedExperience } from "../service/experience";

export default function EducationComponent(
  education: Education & EnhancedExperience
): JSX.Element {
  const { certificate, ...rest } = education;
  return (
    <Grid
      templateColumns={{ base: "1fr", md: "auto max-content" }}
      columnGap={4}
      w="100%"
    >
      <MacroExperienceComponent {...rest} />
      {certificate && <Certificate link={certificate} />}
    </Grid>
  );
}
