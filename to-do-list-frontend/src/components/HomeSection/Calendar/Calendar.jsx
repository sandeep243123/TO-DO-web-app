import * as React from 'react';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

function Calendar({setDate}) {
  const [cleared, setCleared] = React.useState(false);
  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  const handleOnchange=(date)=>{
    setDate(date.format("L"));
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
        <DesktopDatePicker
          sx={{ 
            width: 300,
            margin:"5px"
          }}
          slotProps={{
            field: { clearable: true, onClear: () => setCleared(true) },
          }}
          onChange={handleOnchange}
        />
      {cleared && (
        <Alert
          sx={{ position: 'absolute', bottom: 0, right: 0 }}
          severity="success"
        >
          Field cleared!
        </Alert>
      )}
    </Box>
  </LocalizationProvider>
  )
}

export default Calendar
