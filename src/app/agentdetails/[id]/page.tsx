import React from "react";
import SummaryWrapper from "@/app/_components/Details/Summary/SummaryWrapper";
import CustomTabs from "@/app/_components/DetailsTabs";

const tabsData = [
  { label: "Summary", content: <SummaryWrapper /> },
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
