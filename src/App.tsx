import React from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaPrint, MdBrightnessMedium } from "react-icons/all";
import useResume from "./hook/useResume";
import useFilters, { FilterContext } from "./hook/useFilters";
import {
  PrintContext,
  usePrint,
  usePrintModeReducer,
} from "./hook/usePrintMode";
import ResumeComponent from "./component/Resume";
import useInputData, { InputDataModal } from "./hook/useInputData";
import InputMissingData from "./component/InputMissingData";

function App(): JSX.Element | null {
  const { colorMode, toggleColorMode } = useColorMode();
  const [printMode, togglePrintMode] = usePrintModeReducer();
  usePrint(printMode, togglePrintMode);
  const [filters, dispatch] = useFilters();
  const modalContext = useInputData();
  const { resume } = useResume(filters, modalContext.data);
  if (!resume) {
    return null;
  }
  return (
    <PrintContext.Provider value={printMode}>
      <InputDataModal.Provider value={modalContext}>
        <InputMissingData />
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
          />
        </FilterContext.Provider>
      </InputDataModal.Provider>
    </PrintContext.Provider>
  );
}

export default App;
