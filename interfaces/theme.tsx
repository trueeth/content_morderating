const theme = {
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    },
    MuiTabs: {
      defaultProps: {
        TabIndicatorProps: { style: { backgroundColor: 'var(--Primary1)' } }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: 'var(--Primary1)',
            borderRadius: '25px'
          }
        }
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'var(--Secondry-L)'
          },
          backgroundColor: 'var(--Secondry-L)',
          border: 'none',
          '&.Mui-selected:nth-of-type(1)': {
            color: 'white',
            backgroundColor: '#2caa70'
          },
          '&.Mui-selected:nth-of-type(2)': {
            color: 'white',
            backgroundColor: '#ff8787'
          }
        }
      }
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: 'var(--Primary1)',
          '&.Mui-checked': {
            color: 'var(--Primary1)'
          }
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true
      }
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: 'separate',
          borderSpacing: '0 0.5rem'
        }
      }
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            paddingLeft: '7px !important'
          },
          '& .MuiTableRow-root': {
            '& > .MuiTableCell-root': {
              textAlign: 'left',
              borderTop: '1px solid #ccc',
              borderBottom: '1px solid #ccc',
              '&:first-of-type': {
                borderLeft: '1px solid #ccc',
                borderTopLeftRadius: '6px',
                borderBottomLeftRadius: '6px'
              },
              '&:last-of-type': {
                borderRight: '1px solid #ccc',
                borderTopRightRadius: '6px',
                borderBottomRightRadius: '6px'
              }
            }
          },
          '& .media-row.MuiTableRow-root:nth-child(even)': {
            '& > .MuiTableCell-root': {
              padding: '0px !important'
            }
          },
          '& .MuiTableRow-root:nth-child(odd)': {
            height: '60px'
          }
        }
      }
    },
    MuiSelect: {
      defaultProps: {
        fullWidth: true,
        displayEmpty: true
      },
      styleOverrides: {
        root: {
          height: '40px',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--Primary1)'
          }
        }
      }
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          marginBottom: '10px',
          backgroundColor: 'transparent',
          color: 'grey',
          border: '1px solid #eee',
          '&.Mui-selected': {
            backgroundColor: 'var(--Primary1)',
            color: '#fff',
            border: 'none',
            '&:hover': {
              backgroundColor: 'var(--Primary1)',
              color: '#fff',
              border: 'none'
            }
          }
        }
      }
    },



  }
}


export default theme
