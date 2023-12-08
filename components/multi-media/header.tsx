import { Box, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { FilterList, GetApp } from '@mui/icons-material';
import * as React from 'react';
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { PrimaryButton } from '@components/common/styled-button';
import SearchInput from '@components/common/search-input';

interface IProps {
  title: string;
  groupByValue: string[];
  handleExport?: () => void;
}

const MediaSectionHeader = (props: IProps) => {
  const [vState, setState] = React.useState({ groupBy: 0 });

  // Handler change in the "Group by" select menu
  const handleGroupByChange = (event: any) => {
    setState({ groupBy: event.target.value as number });
  };

  // Handler export button click
  const handleExport = () => {
    // console.warn('Media Export');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        color: 'black',
        backgroundColor: '#00000008',
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 2,
          '& .MuiGrid-item': {
            display: 'flex',
            alignItems: 'center',
          },
        }}
      >
        <Grid item>
          {/* Media title and Filters button */}
          <Typography>{props.title}</Typography>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            sx={{
              ml: 2,
              textTransform: 'none',
              fontSize: '.8rem',
              color: 'black',
              borderColor: '#ccc',
            }}
          >
            Filters
          </Button>
        </Grid>

        <Grid item container spacing={2} sx={{ width: 'fit-content' }}>
          {/* Group by select, SearchInput, and Export button */}
          <Grid item>
            {/* Label and Select for "Group by" */}
            <Typography whiteSpace="nowrap">Group by:</Typography>
            <Select
              value={vState.groupBy}
              onChange={handleGroupByChange}
              sx={{
                ml: 2,
                height: '36px',
                width: '8rem',
                fontSize: '.8rem',
              }}
            >
              {/* Menu items for each groupByValue */}
              {props.groupByValue.map((val, index) => (
                <MenuItem key={index} value={index} sx={{ fontSize: '.8rem' }}>
                  {val}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item>
            {/* SearchInput component */}
            <SearchInput />
          </Grid>
          <Grid item>
            {/* PrimaryButton for export */}
            <PrimaryButton onClick={handleExport}>
              <GetApp sx={{ color: 'white' }} />
              Export
            </PrimaryButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MediaSectionHeader;
