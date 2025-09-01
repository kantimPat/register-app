"use client";
import { useEffect, useState } from "react";
import { 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  Box,
  Grid,
  Alert,
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

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    address: "",
    province: "",
    gender: ""
  });

  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  // รายชื่อจังหวัด 77 จังหวัด
  const provinces = [
    "กรุงเทพมหานคร", "กระบี่", "กาญจนบุรี", "กาฬสินธุ์", "กำแพงเพชร",
    "ขอนแก่น", "จันทบุรี", "ฉะเชิงเทรา", "ชลบุรี", "ชัยนาท",
    "ชัยภูมิ", "ชุมพร", "เชียงราย", "เชียงใหม่", "ตรัง",
    "ตราด", "ตาก", "นครนายก", "นครปฐม", "นครพนม",
    "นครราชสีมา", "นครศรีธรรมราช", "นครสวรรค์", "นนทบุรี", "นราธิวาส",
    "น่าน", "บึงกาฬ", "บุรีรัมย์", "ปทุมธานี", "ประจวบคีรีขันธ์",
    "ปราจีนบุรี", "ปัตตานี", "พระนครศรีอยุธยา", "พังงา", "พัทลุง",
    "พิจิตร", "พิษณุโลก", "เพชรบุรี", "เพชรบูรณ์", "แพร่",
    "ภูเก็ต", "มหาสารคาม", "มุกดาหาร", "แม่ฮ่องสอน", "ยะลา",
    "ยโสธร", "ร้อยเอ็ด", "ระนอง", "ระยอง", "ราชบุรี",
    "ลพบุรี", "ลำปาง", "ลำพูน", "เลย", "ศรีสะเกษ",
    "สกลนคร", "สงขลา", "สตูล", "สมุทรปราการ", "สมุทรสงคราม",
    "สมุทรสาคร", "สระแก้ว", "สระบุรี", "สิงห์บุรี", "สุโขทัย",
    "สุพรรณบุรี", "สุราษฎร์ธานี", "สุรินทร์", "หนองคาย", "หนองบัวลำภู",
    "อ่างทอง", "อำนาจเจริญ", "อุดรธานี", "อุตรดิตถ์", "อุทัยธานี",
    "อุบลราชธานี"
  ].sort();

  const validateEmail = (email) => {
    return email.includes("@") && email.includes(".");
  };

  const validatePassword = (password) => {
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    return password.length >= 8 && hasNumber && hasLetter;
  };

  const validateDate = (day, month, year) => {
    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    
    if (monthNum < 1 || monthNum > 12) return false;
    
    const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
    return dayNum >= 1 && dayNum <= daysInMonth;
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "กรุณากรอกอีเมล";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";
    }

    if (!formData.password) {
      newErrors.password = "กรุณากรอกรหัสผ่าน";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร และประกอบด้วยตัวเลขและตัวหนังสือ";
    }

    if (!formData.firstName) {
      newErrors.firstName = "กรุณากรอกชื่อ";
    }

    if (!formData.lastName) {
      newErrors.lastName = "กรุณากรอกนามสกุล";
    }

    if (!formData.birthDay || !formData.birthMonth || !formData.birthYear) {
      newErrors.birthDate = "กรุณากรอกวันเดือนปีเกิดให้ครบถ้วน";
    } else if (!validateDate(formData.birthDay, formData.birthMonth, formData.birthYear)) {
      newErrors.birthDate = "วันเดือนปีเกิดไม่ถูกต้อง";
    }

    if (!formData.address) {
      newErrors.address = "กรุณากรอกที่อยู่";
    }

    if (!formData.province) {
      newErrors.province = "กรุณาเลือกจังหวัด";
    }

    if (!formData.gender) {
      newErrors.gender = "กรุณาเลือกเพศ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      setAlertMessage("🎉 ลงทะเบียนสำเร็จ! 🎉");
      setAlertSeverity("success");
      console.log("Registration data:", {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthDate: `${formData.birthDay}/${formData.birthMonth}/${formData.birthYear}`,
        address: formData.address,
        province: formData.province,
        gender: formData.gender
      });
    } else {
      setAlertMessage("❌ กรุณาตรวจสอบข้อมูลให้ครบถ้วนและถูกต้อง");
      setAlertSeverity("error");
    }
  };

  const textFieldStyle = {
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
  };

  return (
    <ThemeProvider theme={pinkTheme}>
      <Box 
        sx={{ 
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #f9a8d4 100%)',
          py: 4,
          px: 2
        }}
      >
        <Card 
          sx={{ 
            maxWidth: 700, 
            margin: "auto",
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
              🌸 ลงทะเบียน 🌸
            </Typography>

            {alertMessage && (
              <Alert 
                severity={alertSeverity} 
                sx={{ 
                  mb: 3,
                  borderRadius: 3,
                  boxShadow: '0 4px 12px rgba(236, 72, 153, 0.2)',
                  '&.MuiAlert-standardSuccess': {
                    backgroundColor: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    color: '#15803d',
                  },
                  '&.MuiAlert-standardError': {
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#dc2626',
                  }
                }}
              >
                {alertMessage}
              </Alert>
            )}

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="✉️ อีเมล"
                  variant="outlined"
                  fullWidth
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  error={!!errors.email}
                  helperText={errors.email}
                  sx={textFieldStyle}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="🔒 รหัสผ่าน"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  error={!!errors.password}
                  helperText={errors.password}
                  sx={textFieldStyle}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="👤 ชื่อ"
                  variant="outlined"
                  fullWidth
                  value={formData.firstName}
                  onChange={handleInputChange('firstName')}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  sx={textFieldStyle}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="👥 นามสกุล"
                  variant="outlined"
                  fullWidth
                  value={formData.lastName}
                  onChange={handleInputChange('lastName')}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  sx={textFieldStyle}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  label="📅 วัน"
                  variant="outlined"
                  fullWidth
                  type="number"
                  inputProps={{ min: 1, max: 31 }}
                  value={formData.birthDay}
                  onChange={handleInputChange('birthDay')}
                  error={!!errors.birthDate}
                  sx={textFieldStyle}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  label="📅 เดือน"
                  variant="outlined"
                  fullWidth
                  type="number"
                  inputProps={{ min: 1, max: 12 }}
                  value={formData.birthMonth}
                  onChange={handleInputChange('birthMonth')}
                  error={!!errors.birthDate}
                  sx={textFieldStyle}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  label="📅 ปี (พ.ศ.)"
                  variant="outlined"
                  fullWidth
                  type="number"
                  inputProps={{ min: 2400, max: 2567 }}
                  value={formData.birthYear}
                  onChange={handleInputChange('birthYear')}
                  error={!!errors.birthDate}
                  helperText={errors.birthDate}
                  sx={textFieldStyle}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="🏠 ที่อยู่"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  value={formData.address}
                  onChange={handleInputChange('address')}
                  error={!!errors.address}
                  helperText={errors.address}
                  sx={textFieldStyle}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" error={!!errors.province}>
                  <InputLabel sx={{ '&.Mui-focused': { color: '#ec4899' } }}>
                    🏛️ จังหวัด
                  </InputLabel>
                  <Select
                    value={formData.province}
                    onChange={handleInputChange('province')}
                    label="🏛️ จังหวัด"
                    sx={{
                      borderRadius: 3,
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ec4899',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ec4899',
                      },
                    }}
                  >
                    {provinces.map((province) => (
                      <MenuItem key={province} value={province}>
                        {province}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.province && <FormHelperText>{errors.province}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" error={!!errors.gender}>
                  <InputLabel sx={{ '&.Mui-focused': { color: '#ec4899' } }}>
                    ⚧️ เพศ
                  </InputLabel>
                  <Select
                    value={formData.gender}
                    onChange={handleInputChange('gender')}
                    label="⚧️ เพศ"
                    sx={{
                      borderRadius: 3,
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ec4899',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ec4899',
                      },
                    }}
                  >
                    <MenuItem value="ชาย">👨 ชาย</MenuItem>
                    <MenuItem value="หญิง">👩 หญิง</MenuItem>
                    <MenuItem value="ไม่ระบุ">🤷 ไม่ระบุ</MenuItem>
                  </Select>
                  {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                </FormControl>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              fullWidth
              onClick={handleRegister}
              sx={{ 
                mt: 4,
                py: 2,
                borderRadius: 3,
                background: 'linear-gradient(45deg, #ec4899 30%, #f472b6 90%)',
                boxShadow: '0 8px 20px rgba(236, 72, 153, 0.4)',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(45deg, #be185d 30%, #ec4899 90%)',
                  boxShadow: '0 12px 30px rgba(236, 72, 153, 0.6)',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              🌟 ลงทะเบียน 🌟
            </Button>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2" sx={{ color: '#be185d' }}>
                มีบัญชีอยู่แล้ว?{" "}
                <Link 
                  href="/signin"
                  style={{ 
                    color: '#ec4899',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                  }}
                >
                  เข้าสู่ระบบ 💕
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}