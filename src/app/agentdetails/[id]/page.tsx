"use client";
import React, { useEffect, useState } from "react";
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
import ProgressWrapper from "@/app/_components/Details/Progress/ProgressWrapper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { fetchUserDetails } from "../../../../store/details/UserDetailsSlice";
import { useParams } from "next/navigation";
import LicenseAndTrainingsWrapper from "@/app/_components/Details/LicenseAndTrainings/LicenseAndTrainingsWrapper";
import { calculateProfileCompletion } from "@/utils/commonFunctions";

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

// Example usage with each data type

const AgentDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();

  const { licenseAndTraining, personalInformation, jobInformation } =
    useSelector((state: RootState) => state);
  // const progress = useSelector(
  //   (state: RootState) => state.userDetailsTabs.progress
  // );

  const [overallProfileCompletion, setOverallProfileCompletion] = useState(0);

  // Calcular el completion de cada sección y actualizar `overallProfileCompletion`
  useEffect(() => {
    const personalInformationCompletion = calculateProfileCompletion(
      personalInformation.personalInformation
    );
    const jobInformationCompletion = calculateProfileCompletion(
      jobInformation.jobInformation
    );
    const licenseAndTrainingsCompletion = calculateProfileCompletion(
      licenseAndTraining.licenseAndTrainings
    );

    const calculatedOverallCompletion = Math.round(
      (personalInformationCompletion +
        jobInformationCompletion +
        licenseAndTrainingsCompletion) /
        3
    );
    setOverallProfileCompletion(calculatedOverallCompletion);
  }, [
    personalInformation.personalInformation,
    jobInformation.jobInformation,
    licenseAndTraining.licenseAndTrainings,
  ]);

  useEffect(() => {
    const userCode = params.id as string;
    console.log("userCode fron url", userCode);

    if (userCode) {
      dispatch(fetchUserDetails(userCode));
    }
  }, [dispatch, params.id]);

  return (
    <DetailsTabs tabs={tabsData} profileCompletion={overallProfileCompletion} />
  );
};

export default AgentDetails;
