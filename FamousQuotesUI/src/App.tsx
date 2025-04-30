import React from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import QuoteList from './components/QuoteList'
import { Container, AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {t('app.title')}
            </Typography>
            <Box>
              <Button 
                color="inherit" 
                onClick={() => changeLanguage('en')}
                sx={{ mr: 1 }}
              >
                EN
              </Button>
              <Button 
                color="inherit" 
                onClick={() => changeLanguage('es')}
              >
                ES
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<QuoteList />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  )
}

export default App
