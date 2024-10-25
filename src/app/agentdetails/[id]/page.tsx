"use client";
import React, { useEffect } from "react";
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
import PersonalInformationWrapper from "@/app/_components/Details/PersonalInformation/PersonalInformationWrapper";
import LicenseAndTrainingsWrapper from "@/app/_components/LicenseAndTrainings/LicenseAndTrainingsWrapper";
import ProgressWrapper from "@/app/_components/Details/Progress/ProgressWrapper";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { fetchUserDetails } from "../../../../store/details/UserDetailsSlice";
import { useParams } from "next/navigation";

// eslint-disable-next-line react-hooks/rules-of-hooks

const tabsData = [
  { label: SummaryCardComponentLabels.title, content: <SummaryWrapper /> },
  {
    label: PersonalInformationCardLabels.title,
    content: <PersonalInformationWrapper />,
  },
  {
    label: JobInformationCardLabels.title,
    content: <JobInformationWrapper />,
  },
  {
    label: LicensedAndTrainingCardLabels.title,
    content: <LicenseAndTrainingsWrapper />,
  },
  {
    label: ProgressCardLabels.title,
    content: <ProgressWrapper />,
  },
];

const AgentDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();

  useEffect(() => {
    const userCode = params.id as string;
    console.log("userCode fron url", userCode);

    if (userCode) {
      dispatch(fetchUserDetails(userCode));
    }
  }, [dispatch, params.id]);

  return <DetailsTabs tabs={tabsData} progress={75} />;
};

export default AgentDetails;
