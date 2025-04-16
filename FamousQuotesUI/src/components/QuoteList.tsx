import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Box, 
  Button,
  TextField,
  CircularProgress,
  Alert,
  Paper,
  Container,
  Divider,
  Fade,
  Zoom
} from '@mui/material';
import axios from 'axios';
import { Add as AddIcon, FormatQuote as QuoteIcon } from '@mui/icons-material';

interface Quote {
  id: number;
  content: string;
  author: string;
  dateAdded: string;
}

const QuoteList = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [newQuote, setNewQuote] = useState({ content: '', author: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_URL = 'https://localhost:7057/api/Quotes';

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(API_URL);
      setQuotes(response.data);
    } catch (err) {
      setError('Failed to fetch quotes. Please make sure the API is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setSuccess('');
      await axios.post(API_URL, newQuote);
      setNewQuote({ content: '', author: '' });
      setSuccess('Quote added successfully!');
      fetchQuotes();
    } catch (err) {
      setError('Failed to add quote. Please try again.');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in timeout={1000}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          align="center" 
          sx={{ 
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 4,
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Famous Quotes
        </Typography>
      </Fade>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      <Zoom in timeout={500}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3, 
            mb: 4,
            background: 'white',
            borderRadius: '12px'
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ mb: 2, color: 'rgba(0, 0, 0, 0.87)' }}>
            Add New Quote
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  label="Quote Text"
                  value={newQuote.content}
                  onChange={(e) => setNewQuote({ ...newQuote, content: e.target.value })}
                  required
                  multiline
                  rows={3}
                  variant="outlined"
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(0, 0, 0, 0.6)',
                    },
                    '& .MuiOutlinedInput-input': {
                      color: 'rgba(0, 0, 0, 0.87)',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  label="Author"
                  value={newQuote.author}
                  onChange={(e) => setNewQuote({ ...newQuote, author: e.target.value })}
                  required
                  variant="outlined"
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(0, 0, 0, 0.6)',
                    },
                    '& .MuiOutlinedInput-input': {
                      color: 'rgba(0, 0, 0, 0.87)',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  startIcon={<AddIcon />}
                  sx={{ 
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }
                  }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Zoom>

      <Divider sx={{ my: 4 }} />

      <Grid container spacing={3}>
        {quotes.map((quote, index) => (
          <Grid item xs={12} key={quote.id}>
            <Fade in timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
              <Card sx={{ 
                height: '100%',
                transition: 'all 0.3s ease',
                background: 'white',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
                }
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <QuoteIcon sx={{ color: 'primary.main', mr: 1, fontSize: '2.5rem' }} />
                    <Typography 
                      variant="h6" 
                      component="blockquote" 
                      sx={{ 
                        fontStyle: 'italic',
                        mb: 2,
                        lineHeight: 1.6,
                        color: 'rgba(0, 0, 0, 0.87)',
                        fontWeight: 500
                      }}
                    >
                      {quote.content}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="subtitle1" 
                    color="rgba(0, 0, 0, 0.87)" 
                    align="right"
                    sx={{ 
                      fontWeight: 'bold',
                      fontStyle: 'italic'
                    }}
                  >
                    - {quote.author}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color="rgba(0, 0, 0, 0.6)" 
                    display="block" 
                    align="right"
                    sx={{ mt: 1 }}
                  >
                    Added: {new Date(quote.dateAdded).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default QuoteList; 