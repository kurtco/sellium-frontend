"use client";
import React, { useEffect, useMemo } from "react";
import SummaryWrapper from "@/app/_components/Details/Summary/SummaryWrapper";
import DetailsTabs from "@/app/_components/DetailsTabs";
import JobInformationWrapper from "@/app/_components/Details/JobInformation/JobInformationWrapper";
import {
  JobInformationCardLabels,
  LicensedAndTrainingCardLabels,
  PersonalInformationCardLabels,
  SummaryCardComponentLabels,
} from "@/constants/labels.enums";
import PersonalInformationWrapper from "@/app/_components/Details/PersonalInformation/PersonalInformationWrapper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";

import { useParams, notFound as showNotFoundPage } from "next/navigation";
import LicenseAndTrainingsWrapper from "@/app/_components/Details/LicenseAndTrainings/LicenseAndTrainingsWrapper";
import { calculateProfileCompletion } from "@/utils/commonFunctions";
import { fetchUserOverview } from "../../../../store/details/userOverviewSlice";

// Tab configuration
const tabsData = [
  { label: SummaryCardComponentLabels.title, content: <SummaryWrapper /> },
  {
    label: PersonalInformationCardLabels.title,
    content: <PersonalInformationWrapper />,
  },
  { label: JobInformationCardLabels.title, content: <JobInformationWrapper /> },
  {
    label: LicensedAndTrainingCardLabels.title,
    content: <LicenseAndTrainingsWrapper />,
  },
  // {
  //   label: ProgressCardLabels.title,
  //   content: <ProgressWrapper />,
  // },
];

const AgentDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const userCode = params.id as string;

  const { isFetched, notFound } = useSelector(
    (state: RootState) => state.userDetails.userOverview
  );

  const { data: personalInformation } = useSelector(
    (state: RootState) => state.userDetails.personalInformation
  );

  const { data: jobInformation } = useSelector(
    (state: RootState) => state.userDetails.jobInformation
  );

  const { data: licenseAndTrainings } = useSelector(
    (state: RootState) => state.userDetails.licenseAndTrainings
  );

  // Memoized calculation for overall profile completion
  const overallProfileCompletion = useMemo(() => {
    const personalCompletion = calculateProfileCompletion(personalInformation);
    const jobCompletion = calculateProfileCompletion(jobInformation);
    const licenseCompletion = calculateProfileCompletion(licenseAndTrainings);

    return Math.round(
      (personalCompletion + jobCompletion + licenseCompletion) / 3
    );
  }, [personalInformation, jobInformation, licenseAndTrainings]);

  useEffect(() => {
    if (notFound) {
      showNotFoundPage();
      return;
    }
    if (!isFetched && userCode) {
      dispatch(fetchUserOverview(userCode));
    }
  }, [dispatch, userCode, isFetched, notFound]);

  return (
    <DetailsTabs tabs={tabsData} profileCompletion={overallProfileCompletion} />
  );
};

export default AgentDetails;
