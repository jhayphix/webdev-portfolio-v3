// ... React modules
import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// ... Context
import { ProjectContext } from "@contexts/ProjectContextProvider";

// ... Components
import NavTab from "@components/tabs/NavTab";

// ... Assets

/*
  |----------------------------------------------------------------------------
  |----------------------------------------------------------------------------
  |----------------------------------------------------------------------------
*/
const ProjectNavTab = () => {
  const {
    active_project_tab_index,
    projectTabs,
    setProjectTabIndex,
    setActiveProjectTabName,
  } = useContext(ProjectContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const projectCategoryParams = searchParams.get("type") || "all";
  const first_project_tab_name = projectTabs?.[0]?.toLowerCase();

  useEffect(() => {
    // Set the search parameter to the first story's tab name on initial render
    setSearchParams({ type: first_project_tab_name });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setActiveProjectTabName(projectCategoryParams);
  }, [projectCategoryParams, setActiveProjectTabName]);

  const handleProjectTabClick = (index, type) => {
    setProjectTabIndex(index);
    setSearchParams({ type: type });
  };

  /*
  |----------------------------------------
  | Return
  |----------------------------------------
  */
  return (
    <NavTab
      activeTabIndex={active_project_tab_index}
      tab_names={projectTabs}
      handleTabClick={handleProjectTabClick}
    />
  );
};

export default ProjectNavTab;
