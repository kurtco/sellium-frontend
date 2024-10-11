"use client";

import React, { useState } from "react";
import { Tabs, Tab, Box, Typography, LinearProgress } from "@mui/material";
import { AgentDetalsLabels } from "@/constants/labels.enums";
import { useParams } from "next/navigation";

interface TabContent {
  label: string;
  content: React.ReactNode;
}

interface CustomTabsProps {
  tabs: TabContent[];
  progress: number;
}

const CustomTabs = ({ tabs, progress }: CustomTabsProps) => {
  const params = useParams();
  const id = params?.id;

  console.log("id ", id);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        {AgentDetalsLabels.title}
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>
        <Box display="flex" alignItems="center" sx={{ marginLeft: 2 }}>
          <Typography variant="body2" sx={{ marginRight: 1 }}>
            {AgentDetalsLabels.profileCompletation}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ width: 100, marginRight: 1 }}
          />
          <Typography variant="body2">{`${progress}%`}</Typography>
        </Box>
      </Box>
      <Box sx={{ padding: 2 }}>{tabs[selectedTab].content}</Box>
    </Box>
  );
};

export default CustomTabs;
