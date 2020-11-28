import React from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaPrint, MdBrightnessMedium } from "react-icons/all";
import useResume from "./hook/useResume";
import useFilters, { FilterContext } from "./hook/useFilters";
import Filter from "./component/Filter";
import {
  PrintContext,
  usePrint,
  usePrintModeReducer,
} from "./hook/usePrintMode";
import ResumeComponent from "./component/Resume";

function App(): JSX.Element | null {
  const { colorMode, toggleColorMode } = useColorMode();
  const [printMode, togglePrintMode] = usePrintModeReducer();
  usePrint(printMode, togglePrintMode);
  const [filters, dispatch] = useFilters();
  const { resume } = useResume(filters);
  if (!resume) {
    return null;
  }
  return (
    <PrintContext.Provider value={printMode}>
      <FilterContext.Provider value={{ filters, dispatch }}>
        <ResumeComponent
          resume={resume}
          toggles={
            <>
              <IconButton
                display={printMode ? "none" : "inline-flex"}
                aria-label="Dark mode"
                onClick={toggleColorMode}
              >
                <MdBrightnessMedium />
              </IconButton>
              <IconButton
                ml={2}
                display={{
                  base: "none",
                  md: colorMode === "dark" ? "none" : "inline-flex",
                }}
                aria-label="Print"
                onClick={togglePrintMode}
              >
                <FaPrint />
              </IconButton>
            </>
          }
          filters={
            <Filter
              availableTags={resume.filters.tags}
              availableFacets={resume.filters.facets}
              {...filters}
              onChange={dispatch}
            />
          }
        />
      </FilterContext.Provider>
    </PrintContext.Provider>
  );
}

export default App;
