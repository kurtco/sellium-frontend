"use client";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  useTheme,
  LinearProgress,
} from "@mui/material";
import { AgentDetailsLabels } from "@/constants/labels.enums";
import { useParams } from "next/navigation";

interface TabContent {
  label: string;
  content: React.ReactNode;
}

interface DetailsTabsProps {
  tabs: TabContent[];
  progress: number;
}

const DetailsTabs = ({ tabs, progress }: DetailsTabsProps) => {
  const theme = useTheme();

  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    if (id) {
      console.log(`Fetching details for agent with ID: ${id}`);
    }
  }, [id]);

  const [selectedTab, setSelectedTab] = useState(4);

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
        boxShadow: "none",
        margin: 2,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" gutterBottom>
          {AgentDetailsLabels.title}
        </Typography>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          marginRight={{ xs: 0, md: 6 }}
        >
          <Typography
            variant="body2"
            sx={{ marginRight: 1 }}
            color="textSecondary"
          >
            {AgentDetailsLabels.profileCompletion}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ width: 80, marginRight: 1 }}
          />
          <Typography
            variant="body2"
            color="textSecondary"
          >{`${progress}%`}</Typography>
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          marginBottom: 2,
          borderBottom: 1,
          borderColor: "divider",
          borderRadius: 1,
          padding: "16px 0px 0px 20px ",
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} sx={{ textTransform: "none" }} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ padding: 2 }}>{tabs[selectedTab].content}</Box>
    </Box>
  );
};

export default DetailsTabs;
