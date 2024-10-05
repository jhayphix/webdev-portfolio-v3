import ProjectDashboardSection from "@pages/project_details_page/sections/ProjectDashboardSection";
import StorySection from "@pages/project_details_page/sections/StorySection";

// ... Assets

/*
|----------------------------------------------------------------------------
|----------------------------------------------------------------------------
|----------------------------------------------------------------------------
*/
const ProjectDetailsPage = () => {
  /*
  |----------------------------------------
  | Return
  |----------------------------------------
  */
  return (
    <div className="container-lg" style={{ paddingBottom: "60px" }}>
      <StorySection />
      <ProjectDashboardSection />
    </div>
  );
};

export default ProjectDetailsPage;
