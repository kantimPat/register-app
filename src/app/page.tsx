"use client";
import { 
  Box, 
  Button, 
  Typography, 
  Container,
  Stack,
  ThemeProvider,
  createTheme
} from "@mui/material";
import Link from "next/link";

// สร้าง theme สีชมพู
const pinkTheme = createTheme({
  palette: {
    primary: {
      main: '#ec4899',
      light: '#f9a8d4',
      dark: '#be185d',
    },
    secondary: {
      main: '#fce7f3',
    },
    background: {
      default: '#fdf2f8',
    }
  }
});

export default function Home() {
  return (
    <ThemeProvider theme={pinkTheme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 30%, #f9a8d4 70%, #ec4899 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: 6,
              p: 6,
              boxShadow: '0 30px 60px rgba(236, 72, 153, 0.3)',
              border: '1px solid rgba(236, 72, 153, 0.2)',
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                background: 'linear-gradient(45deg, #ec4899, #be185d)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                textShadow: '0 4px 8px rgba(236, 72, 153, 0.3)',
                mb: 2
              }}
            >
              💖 Hello World 💖
            </Typography>
            
            <Typography
              variant="h5"
              sx={{
                color: '#be185d',
                mb: 4,
                fontWeight: '500'
              }}
            >
              ยินดีต้อนรับสู่เว็บไซต์สีชมพูน่ารัก! 🌸
            </Typography>

            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={3} 
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                size="large"
                component={Link}
                href="/signin"
                sx={{
                  py: 2,
                  px: 4,
                  borderRadius: 4,
                  background: 'linear-gradient(45deg, #ec4899 30%, #f472b6 90%)',
                  boxShadow: '0 8px 20px rgba(236, 72, 153, 0.4)',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  minWidth: 200,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #be185d 30%, #ec4899 90%)',
                    boxShadow: '0 12px 30px rgba(236, 72, 153, 0.6)',
                    transform: 'translateY(-3px)',
                  }
                }}
              >
                🌸เข้าสู่ระบบ🌸
              </Button>

              <Button
                variant="outlined"
                size="large"
                component={Link}
                href="/signup"
                sx={{
                  py: 2,
                  px: 4,
                  borderRadius: 4,
                  borderColor: '#ec4899',
                  color: '#ec4899',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  minWidth: 200,
                  borderWidth: 2,
                  '&:hover': {
                    borderColor: '#be185d',
                    color: '#be185d',
                    backgroundColor: 'rgba(236, 72, 153, 0.1)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 20px rgba(236, 72, 153, 0.3)',
                  }
                }}
              >
                💕สมัครสมาชิก💕
              </Button>
            </Stack>

            <Box sx={{ mt: 4 }}>
              <Typography
                variant="body1"
                sx={{
                  color: '#be185d',
                  fontStyle: 'italic'
                }}
              >
                ✨ สร้างบัญชีใหม่หรือเข้าสู่ระบบเพื่อเริ่มต้นใช้งาน ✨
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}