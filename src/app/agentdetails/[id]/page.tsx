import CustomTabs from "@/app/_components/DetailsTabs";
import React from "react";

const tabsData = [
  { label: "Summary", content: <div>Summary content here</div> },
  {
    label: "Personal Information",
    content: <div>Personal Information content here</div>,
  },
  {
    label: "Job Information",
    content: <div>Job Information content here</div>,
  },
  {
    label: "License & Trainings",
    content: <div>License & Trainings content here</div>,
  },
  { label: "Progress", content: <div>Progress content here</div> },
];

const AgentDetails: React.FC = () => {
  return <CustomTabs tabs={tabsData} progress={75} />;
};

export default AgentDetails;
