import React from "react";
import SummaryWrapper from "@/app/_components/Details/Summary/SummaryWrapper";
import DetailsTabs from "@/app/_components/DetailsTabs";
import JobInformationWrapper from "@/app/_components/Details/JobInformation/JobInformationWrapper";
import {
  JobInformationCardLabels,
  LicensedAndTrainingCardLabels,
  PersonalInformationCardLabels,
  ProgressCardLabels,
  SummaryCardComponentLabels,
} from "@/constants/labels.enums";

const tabsData = [
  { label: SummaryCardComponentLabels.title, content: <SummaryWrapper /> },
  {
    label: PersonalInformationCardLabels.title,
    content: <div>Personal Information content here</div>,
  },
  {
    label: JobInformationCardLabels.title,
    content: <JobInformationWrapper />,
  },
  {
    label: LicensedAndTrainingCardLabels.title,
    content: <div>License & Trainings content here</div>,
  },
  {
    label: ProgressCardLabels.title,
    content: <div>Progress content here</div>,
  },
];

const AgentDetails: React.FC = () => {
  return <DetailsTabs tabs={tabsData} progress={75} />;
};

export default AgentDetails;
