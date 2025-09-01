"use client";
import { useEffect, useState } from "react";
import { 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography,
  Box,
  ThemeProvider,
  createTheme
} from "@mui/material";
import Link from "next/link";

// สร้าง theme สีชมพู
const pinkTheme = createTheme({
  palette: {
    primary: {
      main: '#ec4899', // สีชมพูเข้ม
      light: '#f9a8d4', // สีชมพูอ่อน
      dark: '#be185d', // สีชมพูแก่
    },
    secondary: {
      main: '#fce7f3', // สีชมพูอ่อนมาก
    },
    background: {
      default: '#fdf2f8', // สีพื้นหลังชมพูอ่อน
    }
  }
});

export default function SigninPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordError, setPasswordError] = useState("");
    
  useEffect(() => {
    if (password.length < 8 && password.length > 0) {
      setIsPasswordValid(false);
      setPasswordError("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร");
    } else {
      setIsPasswordValid(true);
      setPasswordError("");
    }
  }, [password]);

  const handleSignIn = () => {
    console.log("signin form", { username, password });
  };

  return (
    <ThemeProvider theme={pinkTheme}>
      <Box 
        sx={{ 
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #f9a8d4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2
        }}
      >
        <Card 
          sx={{ 
            maxWidth: 400, 
            width: '100%',
            borderRadius: 4,
            boxShadow: '0 20px 40px rgba(236, 72, 153, 0.3)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(236, 72, 153, 0.2)'
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom 
              align="center"
              sx={{ 
                color: '#be185d',
                fontWeight: 'bold',
                mb: 3,
                textShadow: '0 2px 4px rgba(236, 72, 153, 0.3)'
              }}
            >
              💖 เข้าสู่ระบบ 💖
            </Typography>

            <TextField
              label="ชื่อผู้ใช้"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  '&:hover fieldset': {
                    borderColor: '#ec4899',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ec4899',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#ec4899',
                },
              }}
            />

            <TextField
              label="รหัสผ่าน"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!isPasswordValid}
              helperText={passwordError}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  '&:hover fieldset': {
                    borderColor: '#ec4899',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ec4899',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#ec4899',
                },
              }}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleSignIn}
              sx={{ 
                mt: 3,
                py: 1.5,
                borderRadius: 3,
                background: 'linear-gradient(45deg, #ec4899 30%, #f472b6 90%)',
                boxShadow: '0 8px 20px rgba(236, 72, 153, 0.4)',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(45deg, #be185d 30%, #ec4899 90%)',
                  boxShadow: '0 12px 30px rgba(236, 72, 153, 0.6)',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              🌸 เข้าสู่ระบบ 🌸
            </Button>

            <Typography 
              variant="body2" 
              align="center" 
              sx={{ mt: 3, color: '#be185d' }}
            >
              ยังไม่มีบัญชี?{" "}
              <Link 
                href="/signup" 
                style={{ 
                  color: '#ec4899',
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}
              >
                สมัครสมาชิก 💕
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}