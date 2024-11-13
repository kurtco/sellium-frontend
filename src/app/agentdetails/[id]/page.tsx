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
import { fetchUserDetails } from "../../../../store/details/UserDetailsSlice";
import { useParams, notFound as showNotFoundPage } from "next/navigation";
import LicenseAndTrainingsWrapper from "@/app/_components/Details/LicenseAndTrainings/LicenseAndTrainingsWrapper";
import { calculateProfileCompletion } from "@/utils/commonFunctions";

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

  // Consolidated selector for all required state slices
  const {
    isFetched,
    notFound,
    personalInformation,
    jobInformation,
    licenseAndTrainings,
  } = useSelector((state: RootState) => ({
    isFetched: state.userDetailsTabs.isFetched,
    notFound: state.userDetailsTabs.notFound,
    personalInformation: state.personalInformation.personalInformation,
    jobInformation: state.jobInformation.jobInformation,
    licenseAndTrainings: state.licenseAndTraining.licenseAndTrainings,
  }));

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
      dispatch(fetchUserDetails(userCode));
    }
  }, [dispatch, userCode, isFetched, notFound]);

  return (
    <DetailsTabs tabs={tabsData} profileCompletion={overallProfileCompletion} />
  );
};

export default AgentDetails;
