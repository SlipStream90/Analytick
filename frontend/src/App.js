import React, { useEffect, useState, useRef } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, IconButton, InputBase, Card, CardContent, Chip, Divider, Button, MenuItem, Select, FormControl, InputLabel, Dialog, DialogTitle, DialogContent } from '@mui/material';
import axios from 'axios';
import './App.css';

// Log React version for debugging
console.log('React version:', React.version);

// Define MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#546e7a',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: '#1a237e',
    },
    h5: {
      fontWeight: 600,
      color: '#1a237e',
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

// TradingView Widget Component
const TradingViewWidget = ({ symbol, interval, theme: chartTheme, height = '100%' }) => {
  const container = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadChart = () => {
      try {
        if (!container.current) return;

        // Clean up any existing content
        container.current.innerHTML = '';

        // Create widget container with unique ID
        const widgetContainer = document.createElement('div');
        const containerId = `tradingview_${Math.random().toString(36).substr(2, 9)}`;
        widgetContainer.id = containerId;
        widgetContainer.style.height = height;
        widgetContainer.style.width = '100%';
        container.current.appendChild(widgetContainer);

        // Initialize widget with minimal configuration
        new window.TradingView.widget({
          container_id: containerId,
          symbol: symbol,
          interval: interval,
          theme: chartTheme,
          autosize: true,
          width: '100%',
          height: '100%',
          timezone: "Etc/UTC",
          style: "1",
          locale: "en",
          toolbar_bg: chartTheme === "dark" ? "#131722" : "#ffffff",
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          save_image: true,
          show_popup_button: false,
          popup_width: "1000",
          popup_height: "650",
          disabled_features: [
            "use_localstorage_for_settings",
            "header_widget",
            "header_compare",
            "header_settings",
            "border_around_the_chart",
            "header_undo_redo",
            "header_screenshot",
            "header_saveload"
          ],
          enabled_features: [
            "study_templates",
            "create_volume_indicator_by_default",
            "volume_force_overlay"
          ],
          charts_storage_url: 'https://saveload.tradingview.com',
          client_id: 'tradingview.com',
          user_id: 'public_user_id',
          overrides: {
            "mainSeriesProperties.style": 1,
            "mainSeriesProperties.visible": true,
            "mainSeriesProperties.showPriceLine": true,
            "mainSeriesProperties.priceLineWidth": 1,
            "mainSeriesProperties.lockScale": false,
            "mainSeriesProperties.minTick": "default",
            "mainSeriesProperties.extendedHours": false,
            "paneProperties.background": chartTheme === "dark" ? "#131722" : "#ffffff",
            "paneProperties.vertGridProperties.color": chartTheme === "dark" ? "#363c4e" : "#f0f3fa",
            "paneProperties.horzGridProperties.color": chartTheme === "dark" ? "#363c4e" : "#f0f3fa",
            "scalesProperties.backgroundColor": chartTheme === "dark" ? "#131722" : "#ffffff",
            "scalesProperties.lineColor": chartTheme === "dark" ? "#363c4e" : "#f0f3fa",
            "scalesProperties.textColor": chartTheme === "dark" ? "#d1d4dc" : "#131722",
            "mainSeriesProperties.candleStyle.upColor": "#089981",
            "mainSeriesProperties.candleStyle.downColor": "#f23645",
            "mainSeriesProperties.candleStyle.drawWick": true,
            "mainSeriesProperties.candleStyle.drawBorder": true,
            "mainSeriesProperties.candleStyle.borderColor": "",
            "mainSeriesProperties.candleStyle.borderUpColor": "#089981",
            "mainSeriesProperties.candleStyle.borderDownColor": "#f23645",
            "mainSeriesProperties.candleStyle.wickUpColor": "#089981",
            "mainSeriesProperties.candleStyle.wickDownColor": "#f23645",
            "paneProperties.legendProperties.showStudyArguments": true,
            "paneProperties.legendProperties.showStudyTitles": true,
            "paneProperties.legendProperties.showStudyValues": true,
            "paneProperties.legendProperties.showSeriesTitle": true,
            "paneProperties.legendProperties.showSeriesOHLC": true,
            "symbolWatermarkProperties.transparency": 90,
            "paneProperties.topMargin": 5,
            "paneProperties.bottomMargin": 5
          },
          studies_overrides: {
            "volume.volume.color.0": chartTheme === "dark" ? "#f23645" : "#f23645",
            "volume.volume.color.1": chartTheme === "dark" ? "#089981" : "#089981",
            "volume.volume.transparency": 70,
            "volume.volume ma.color": "#FF9800",
            "volume.volume ma.transparency": 30,
            "volume.volume ma.linewidth": 1,
            "volume.show ma": false,
            "volume.options.showStudyArguments": false
          },
          loading_screen: { backgroundColor: chartTheme === "dark" ? "#131722" : "#ffffff" }
        });

        setError(null);
      } catch (err) {
        console.error('TradingView widget error:', err);
        setError('Failed to initialize chart. Please try again.');
      }
    };

    // Load TradingView script if not already loaded
    if (!window.TradingView) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = loadChart;
      script.onerror = () => setError('Failed to load TradingView library');
      document.head.appendChild(script);
    } else {
      loadChart();
    }

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [symbol, interval, chartTheme, height]);

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <div 
      ref={container} 
      style={{ 
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: chartTheme === 'dark' ? '#131722' : '#ffffff'
      }}
    />
  );
};

// Dashboard Component
function Dashboard() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMarketOpen, setIsMarketOpen] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState('COINBASE:BTCUSD');
  const [chartInterval, setChartInterval] = useState('D');
  const [chartTheme, setChartTheme] = useState('light');
  const [isChartFullscreen, setIsChartFullscreen] = useState(false);

  const intervals = [
    { value: '1', label: '1 minute' },
    { value: '5', label: '5 minutes' },
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: 'D', label: '1 day' },
    { value: 'W', label: '1 week' },
    { value: 'M', label: '1 month' }
  ];

  const chartSymbols = [
    { value: 'COINBASE:BTCUSD', label: 'Bitcoin' },
    { value: 'BINANCE:ETHUSDT', label: 'Ethereum' },
    { value: 'NSE:NIFTY', label: 'Nifty 50' },
    { value: 'NSE:BANKNIFTY', label: 'Bank Nifty' },
    { value: 'NSE:RELIANCE', label: 'Reliance' },
    { value: 'NSE:TCS', label: 'TCS' }
  ];

  const fetchStocks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/analytick_1/api/stocks/');
      setStocks(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching stocks:', err);
      setError('Failed to load stocks data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
    
    // Check market status every minute
    const checkMarketStatus = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const isWeekday = now.getDay() > 0 && now.getDay() < 6;
      const isOpen = isWeekday && ((hour === 9 && minute >= 15) || (hour > 9 && hour < 15) || (hour === 15 && minute <= 30));
      setIsMarketOpen(isOpen);
    };

    checkMarketStatus();
    const interval = setInterval(checkMarketStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const filteredStocks = stocks.filter(stock =>
    stock.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.symbol?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.sector?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Grid container spacing={6}>
          {/* Stats Cards in a single row */}
          <Grid container item spacing={3} sx={{ mb: 2 }}>
            <Grid item xs={12} md={4}>
              <Paper 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
              >
                <Typography color="text.secondary" variant="subtitle2" gutterBottom>
                  Total Stocks
                </Typography>
                <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                  {stocks.length}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
              >
                <Typography color="text.secondary" variant="subtitle2" gutterBottom>
                  Sectors
                </Typography>
                <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                  {[...new Set(stocks.map(stock => stock.sector))].length}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
              >
                <Typography color="text.secondary" variant="subtitle2" gutterBottom>
                  Market Status
                </Typography>
                <Chip
                  label={isMarketOpen ? 'Market Open' : 'Market Closed'}
                  color={isMarketOpen ? 'success' : 'error'}
                  sx={{ mt: 1 }}
                />
              </Paper>
            </Grid>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Paper sx={{ p: 4, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 500 }}>
                  Live Chart
                </Typography>
                <IconButton 
                  onClick={() => setIsChartFullscreen(true)}
                  color="primary"
                  size="small"
                  sx={{ 
                    border: '1px solid',
                    borderColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white'
                    }
                  }}
                >
                  <OpenInFullIcon />
                </IconButton>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel size="small">Symbol</InputLabel>
                  <Select
                    value={selectedSymbol}
                    label="Symbol"
                    onChange={(e) => setSelectedSymbol(e.target.value)}
                    size="small"
                  >
                    {chartSymbols.map((symbol) => (
                      <MenuItem key={symbol.value} value={symbol.value}>
                        {symbol.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel size="small">Interval</InputLabel>
                  <Select
                    value={chartInterval}
                    label="Interval"
                    onChange={(e) => setChartInterval(e.target.value)}
                    size="small"
                  >
                    {intervals.map((interval) => (
                      <MenuItem key={interval.value} value={interval.value}>
                        {interval.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel size="small">Theme</InputLabel>
                  <Select
                    value={chartTheme}
                    label="Theme"
                    onChange={(e) => setChartTheme(e.target.value)}
                    size="small"
                  >
                    <MenuItem value="light">Light</MenuItem>
                    <MenuItem value="dark">Dark</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ 
                height: 600, 
                border: '1px solid rgba(0, 0, 0, 0.12)', 
                borderRadius: 1,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: chartTheme === "dark" ? "#131722" : "#ffffff"
              }}>
                <TradingViewWidget
                  symbol={selectedSymbol}
                  interval={chartInterval}
                  theme={chartTheme}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Stocks Table */}
          <Grid item xs={12}>
            <Paper 
              sx={{ 
                p: 3,
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 500 }}>
                  Stocks
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Search stocks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <IconButton type="button" sx={{ p: '10px' }}>
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                  <IconButton onClick={fetchStocks}>
                    <RefreshIcon />
                  </IconButton>
                </Box>
              </Box>

              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Symbol</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Sector</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredStocks.map((stock) => (
                        <TableRow key={stock.id}>
                          <TableCell>{stock.symbol}</TableCell>
                          <TableCell>{stock.name}</TableCell>
                          <TableCell>
                            <Chip label={stock.sector} size="small" />
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => setSelectedSymbol(`NSE:${stock.symbol}`)}
                            >
                              View Chart
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Fullscreen Chart Dialog */}
      <Dialog
        fullScreen
        open={isChartFullscreen}
        onClose={() => setIsChartFullscreen(false)}
        sx={{
          '& .MuiDialog-paper': {
            bgcolor: chartTheme === 'dark' ? '#131722' : '#ffffff'
          }
        }}
      >
        <DialogTitle sx={{ 
          m: 0, 
          p: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          bgcolor: chartTheme === 'dark' ? '#1e222d' : '#f8f9fd',
          borderBottom: '1px solid',
          borderColor: chartTheme === 'dark' ? '#2a2e39' : '#e0e3eb'
        }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl sx={{ minWidth: 200 }}>
              <Select
                value={selectedSymbol}
                size="small"
                onChange={(e) => setSelectedSymbol(e.target.value)}
              >
                {chartSymbols.map((symbol) => (
                  <MenuItem key={symbol.value} value={symbol.value}>
                    {symbol.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={chartInterval}
                size="small"
                onChange={(e) => setChartInterval(e.target.value)}
              >
                {intervals.map((interval) => (
                  <MenuItem key={interval.value} value={interval.value}>
                    {interval.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={chartTheme}
                size="small"
                onChange={(e) => setChartTheme(e.target.value)}
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <IconButton
            onClick={() => setIsChartFullscreen(false)}
            sx={{
              color: chartTheme === 'dark' ? '#b2b5be' : '#787b86',
              '&:hover': {
                color: chartTheme === 'dark' ? '#d1d4dc' : '#131722'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column' }}>
          <TradingViewWidget
            symbol={selectedSymbol}
            interval={chartInterval}
            theme={chartTheme}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="static" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
          <Toolbar>
            <ShowChartIcon sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ flexGrow: 1, color: 'text.primary' }}>
              AnalyTick Dashboard
            </Typography>
            <Button color="inherit">Home</Button>
            <Button color="inherit">About</Button>
            <Button color="inherit">Contact</Button>
            <Button color="primary" variant="contained" sx={{ ml: 2 }}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
        <Dashboard />
      </Box>
    </ThemeProvider>
  );
}

export default App;