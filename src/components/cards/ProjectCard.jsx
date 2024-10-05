// ... React modules
import { useContext } from "react";
import { BiPlusCircle } from "react-icons/bi";

// ... Context
import { DefaultContext } from "@contexts/DefaultContextProvider.jsx";

// ... Components

// ... Assets

/*
  |----------------------------------------------------------------------------
  |----------------------------------------------------------------------------
  |----------------------------------------------------------------------------
*/
const ProjectCard = ({ project }) => {
  // Context
  const { def_project_img_1 } = useContext(DefaultContext);

  // Extract variables from data (Project data)
  const project_main_image = project?.main_image?.asset?.url || "";
  const project_title = project?.title || "Title";
  const project_type = project?.project_types?.[0]?.title || "Type";
  const project_url = project?.project_url || "/";

  /*
    |----------------------------------------
    | Return
    |----------------------------------------
  */
  return (
    <div className="work-box">
      {/* Image */}
      <a
        data-gallery="portfolioGallery"
        className="portfolio-lightbox cursor_pointer"
        rel="noreferrer"
        target="_blank"
        href={project_url}
      >
        <div className="work-img">
          <img
            src={project_main_image || def_project_img_1}
            alt={project_title}
            className="img-fluid"
            onError={(e) => {
              e.target.onerror = null; // Prevents infinite loop if the default image fails
              e.target.src = def_project_img_1; // Set the default image on error
            }}
          />
        </div>
      </a>

      {/* Work content */}
      <div className="work-content">
        <div className="row">
          <div className="col-sm-9">
            <h2 className="w-title mb-2"> {project_title} </h2>
            <div className="w-more">
              <span className="w-category text_accent_1">WebDev</span> /{" "}
              <span className="w-date">{project_type}</span>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="w-like">
              <a
                className="plus_link cursor_pointer"
                href={project_url}
                rel="noreferrer"
                target="_blank"
              >
                {" "}
                <BiPlusCircle className="plus_icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectCard;
