import React, { useEffect, useState } from 'react';
import { use100vh } from 'react-div-100vh';
import { Box, Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import VideoListPanel from './components/VideoListPanel';
import {
  getFollowingListAction,
  getForYouListAction,
} from 'actions/creators/video';

import 'pure-react-carousel/dist/react-carousel.es.css';

const classes = {
  tabListBox: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 500,
    display: 'flex',
    justifyContent: 'center',
  },
  tab: {
    color: 'gray.500',
    _selected: { color: 'white' },
    fontWeight: 'bold',
    borderWidth: 0,
  },
  panel: {
    outline: '0px',
    outlineOffset: 0,
    padding: 0,
  },
};

function DashboardPage() {
  const { followingList, forYouList } = useSelector(({ video }) => video);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const groupList = [
    { list: followingList, action: getFollowingListAction },
    { list: forYouList, action: getForYouListAction },
  ];

  const height = use100vh();

  const dispatch = useDispatch();

  const handleTabChange = (nextIndex) => {
    const { list, action } = groupList[nextIndex];
    setCurrentTabIndex(nextIndex);

    if (list) return;
    dispatch(action());
  };

  useEffect(() => {
    handleTabChange(currentTabIndex);
  }, []);

  return (
    <Tabs
      colorScheme="whiteAlpha.500"
      variant="unstyled"
      onChange={handleTabChange}
      defaultIndex={currentTabIndex}
    >
      <Box sx={classes.tabListBox}>
        <TabList>
          <Tab sx={classes.tab}>Following</Tab>
          <Tab sx={classes.tab}>For You</Tab>
        </TabList>
      </Box>
      <TabPanels>
        <VideoListPanel
          isActive={currentTabIndex === 0}
          list={followingList}
          vh={height}
        />
        <VideoListPanel
          isActive={currentTabIndex === 1}
          list={forYouList}
          vh={height}
        />
      </TabPanels>
    </Tabs>
  );
}

export default DashboardPage;
