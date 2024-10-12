"use client";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  LinearProgress,
  useTheme,
} from "@mui/material";
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
  const theme = useTheme();

  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    if (id) {
      console.log(`Fetching details for agent with ID: ${id}`);
    }
  }, [id]);

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: 2,
        border: `1px solid ${theme.palette.grey[200]}`,
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
        margin: 2,
      }}
    >
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
