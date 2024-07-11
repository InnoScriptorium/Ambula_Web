import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Grid, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { setProfileDetails } from '../store/slices/userSlice'; // Assuming you have a setProfileDetails action
import { RootState } from '../store'; // Adjust the path to match your Redux setup
import { styled } from '@mui/system';


// Define the options for day, month, year, states, and districts
const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const years = Array.from({ length: 35 }, (_, i) => (1990 + i).toString()); 
const indianStates = [
  { value: 'Andhra Pradesh', districts: ['Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool', 'Prakasam', 'Srikakulam', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa'] },
  { value: 'Arunachal Pradesh', districts: ['Tawang', 'West Kameng', 'East Kameng', 'Papum Pare', 'Kurung Kumey', 'Kra Daadi', 'Lower Subansiri', 'Upper Subansiri', 'West Siang', 'East Siang', 'Siang', 'Upper Siang', 'Lower Siang', 'Dibang Valley', 'Lower Dibang Valley', 'Anjaw', 'Lohit', 'Namsai', 'Changlang', 'Tirap', 'Longding'] },
  { value: 'Assam', districts: ['Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar', 'Charaideo', 'Chirang', 'Darrang', 'Dhemaji', 'Dhubri', 'Dibrugarh', 'Dima Hasao', 'Goalpara', 'Golaghat', 'Hailakandi', 'Hojai', 'Jorhat', 'Kamrup', 'Kamrup Metropolitan', 'Karbi Anglong', 'Karimganj', 'Kokrajhar', 'Lakhimpur', 'Majuli', 'Morigaon', 'Nagaon', 'Nalbari', 'Sivasagar', 'Sonitpur', 'South Salmara-Mankachar', 'Tinsukia', 'Udalguri', 'West Karbi Anglong'] },
  { value: 'Bihar', districts: ['Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur', 'Bhojpur', 'Buxar', 'Darbhanga', 'East Champaran (Motihari)', 'Gaya', 'Gopalganj', 'Jamui', 'Jehanabad', 'Kaimur (Bhabua)', 'Katihar', 'Khagaria', 'Kishanganj', 'Lakhisarai', 'Madhepura', 'Madhubani', 'Munger (Monghyr)', 'Muzaffarpur', 'Nalanda', 'Nawada', 'Patna', 'Purnia (Purnea)', 'Rohtas', 'Saharsa', 'Samastipur', 'Saran', 'Sheikhpura', 'Sheohar', 'Sitamarhi', 'Siwan', 'Supaul', 'Vaishali', 'West Champaran'] },
  { value: 'Chhattisgarh', districts: ['Balod', 'Baloda Bazar', 'Balrampur', 'Bastar', 'Bemetara', 'Bijapur', 'Bilaspur', 'Dantewada (South Bastar)', 'Dhamtari', 'Durg', 'Gariyaband', 'Janjgir-Champa', 'Jashpur', 'Kabirdham (Kawardha)', 'Kanker (North Bastar)', 'Kondagaon', 'Korba', 'Koriya', 'Mahasamund', 'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sukma', 'Surajpur', 'Surguja'] },
  { value: 'Goa', districts: ['North Goa', 'South Goa'] },
  { value: 'Gujarat', districts: ['Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha (Palanpur)', 'Bharuch', 'Bhavnagar', 'Botad', 'Chhota Udepur', 'Dahod', 'Dang (Ahwa)', 'Devbhoomi Dwarka', 'Gandhinagar', 'Gir Somnath', 'Jamnagar', 'Junagadh', 'Kachchh', 'Kheda (Nadiad)', 'Mahisagar', 'Mehsana', 'Morbi', 'Narmada (Rajpipla)', 'Navsari', 'Panchmahal (Godhra)', 'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha (Himmatnagar)', 'Surat', 'Surendranagar', 'Tapi (Vyara)', 'Vadodara', 'Valsad'] },
  { value: 'Haryana', districts: ['Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad', 'Gurugram (Gurgaon)', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh', 'Nuh', 'Palwal', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'] },
  { value: 'Himachal Pradesh', districts: ['Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu', 'Lahaul & Spiti', 'Mandi', 'Shimla', 'Sirmaur', 'Solan', 'Una'] },
  { value: 'Jharkhand', districts: ['Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka', 'East Singhbhum', 'Garhwa', 'Giridih', 'Godda', 'Gumla', 'Hazaribagh', 'Jamtara', 'Khunti', 'Koderma', 'Latehar', 'Lohardaga', 'Pakur', 'Palamu', 'Ramgarh', 'Ranchi', 'Sahibganj', 'Seraikela-Kharsawan', 'Simdega', 'West Singhbhum'] },
  { value: 'Karnataka', districts: ['Bagalkot', 'Ballari (Bellary)', 'Belagavi (Belgaum)', 'Bengaluru Rural', 'Bengaluru Urban', 'Bidar', 'Chamarajanagar', 'Chikballapur', 'Chikkamagaluru (Chikmagalur)', 'Chitradurga', 'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri', 'Kalaburagi (Gulbarga)', 'Kodagu', 'Kolar', 'Koppal', 'Mandya', 'Mysuru (Mysore)', 'Raichur', 'Ramanagara', 'Shivamogga (Shimoga)', 'Tumakuru (Tumkur)', 'Udupi', 'Uttara Kannada (Karwar)', 'Vijayapura (Bijapur)', 'Yadgir'] },
  { value: 'Kerala', districts: ['Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'] },
  { value: 'Madhya Pradesh', districts: ['Agar Malwa', 'Alirajpur', 'Anuppur', 'Ashoknagar', 'Balaghat', 'Barwani', 'Betul', 'Bhind', 'Bhopal', 'Burhanpur', 'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dhar', 'Dindori', 'Guna', 'Gwalior', 'Harda', 'Hoshangabad', 'Indore', 'Jabalpur', 'Jhabua', 'Katni', 'Khandwa', 'Khargone', 'Mandla', 'Mandsaur', 'Morena', 'Narsinghpur', 'Neemuch', 'Panna', 'Raisen', 'Rajgarh', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni', 'Shahdol', 'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi', 'Singrauli', 'Tikamgarh', 'Ujjain', 'Umaria', 'Vidisha'] },
  { value: 'Maharashtra', districts: ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'] },
  { value: 'Manipur', districts: ['Bishnupur', 'Chandel', 'Churachandpur', 'Imphal East', 'Imphal West', 'Jiribam', 'Kakching', 'Kamjong', 'Kangpokpi', 'Noney', 'Pherzawl', 'Senapati', 'Tamenglong', 'Tengnoupal', 'Thoubal', 'Ukhrul'] },
  { value: 'Meghalaya', districts: ['East Garo Hills', 'East Jaintia Hills', 'East Khasi Hills', 'North Garo Hills', 'Ri Bhoi', 'South Garo Hills', 'South West Garo Hills', 'South West Khasi Hills', 'West Garo Hills', 'West Jaintia Hills', 'West Khasi Hills'] },
  { value: 'Mizoram', districts: ['Aizawl', 'Champhai', 'Hnahthial', 'Khawzawl', 'Kolasib', 'Lawngtlai', 'Lunglei', 'Mamit', 'Saiha', 'Saitual', 'Serchhip'] },
  { value: 'Nagaland', districts: ['Dimapur', 'Kiphire', 'Kohima', 'Longleng', 'Mokokchung', 'Mon', 'Peren', 'Phek', 'Tuensang', 'Wokha', 'Zunheboto'] },
  { value: 'Odisha', districts: ['Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh', 'Cuttack', 'Deogarh', 'Dhenkanal', 'Gajapati', 'Ganjam', 'Jagatsinghpur', 'Jajpur', 'Jharsuguda', 'Kalahandi', 'Kandhamal', 'Kendrapara', 'Kendujhar (Keonjhar)', 'Khordha', 'Koraput', 'Malkangiri', 'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada', 'Puri', 'Rayagada', 'Sambalpur', 'Subarnapur (Sonepur)', 'Sundargarh'] },
  { value: 'Puducherry', districts: ['Karaikal', 'Mahe', 'Puducherry', 'Yanam'] },
  { value: 'Punjab', districts: ['Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka', 'Ferozepur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Mansa', 'Moga', 'Muktsar', 'Pathankot', 'Patiala', 'Rupnagar', 'Sangrur', 'Shaheed Bhagat Singh Nagar (Nawanshahr)', 'Sri Muktsar Sahib', 'Tarn Taran'] },
  { value: 'Rajasthan', districts: ['Ajmer', 'Alwar', 'Banswara', 'Baran', 'Barmer', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dausa', 'Dholpur', 'Dungarpur', 'Hanumangarh', 'Jaipur', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Karauli', 'Kota', 'Nagaur', 'Pali', 'Pratapgarh', 'Rajsamand', 'Sawai Madhopur', 'Sikar', 'Sirohi', 'Sri Ganganagar', 'Tonk', 'Udaipur'] },
  { value: 'Sikkim', districts: ['East Sikkim', 'North Sikkim', 'South Sikkim', 'West Sikkim'] },
  { value: 'Tamil Nadu', districts: ['Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'] },
  { value: 'Telangana', districts: ['Adilabad', 'Bhadradri Kothagudem', 'Hyderabad', 'Jagtial', 'Jangaon', 'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar', 'Khammam', 'Komaram Bheem Asifabad', 'Mahabubabad', 'Mahabubnagar', 'Mancherial', 'Medak', 'Medchal–Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda', 'Narayanpet', 'Nirmal', 'Nizamabad', 'Peddapalli', 'Rajanna Sircilla', 'Rangareddy', 'Sangareddy', 'Siddipet', 'Suryapet', 'Vikarabad', 'Wanaparthy', 'Warangal Rural', 'Warangal Urban', 'Yadadri Bhuvanagiri'] },
  { value: 'Tripura', districts: ['Dhalai', 'Gomati', 'Khowai', 'North Tripura', 'Sepahijala', 'South Tripura', 'Unakoti', 'West Tripura'] },
  { value: 'Uttar Pradesh', districts: ['Agra', 'Aligarh', 'Ambedkar Nagar', 'Amethi (Chatrapati Sahuji Mahraj Nagar)', 'Amroha (J.P. Nagar)', 'Auraiya', 'Ayodhya', 'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki', 'Bareilly', 'Basti', 'Bhadohi', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli', 'Chitrakoot', 'Deoria', 'Etah', 'Etawah', 'Farrukhabad', 'Fatehpur', 'Firozabad', 'Gautam Buddha Nagar', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur', 'Hapur (Panchsheel Nagar)', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur Dehat', 'Kanpur Nagar', 'Kasganj', 'Kaushambi', 'Kheri', 'Kushinagar (Padrauna)', 'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 'Mau', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh', 'Prayagraj (Allahabad)', 'Raebareli', 'Rampur', 'Saharanpur', 'Sambhal (Bhim Nagar)', 'Sant Kabir Nagar', 'Shahjahanpur', 'Shamli', 'Shravasti', 'Siddharthnagar', 'Sitapur', 'Sonbhadra', 'Sultanpur', 'Unnao', 'Varanasi'] },
  { value: 'Uttarakhand', districts: ['Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun', 'Haridwar', 'Nainital', 'Pauri Garhwal', 'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal', 'Udham Singh Nagar', 'Uttarkashi'] },
  { value: 'West Bengal', districts: ['Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur (South Dinajpur)', 'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram', 'Kalimpong', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia', 'North 24 Parganas', 'Paschim Medinipur (West Medinipur)', 'Paschim (West) Burdwan (Bardhaman)', 'Purba Burdwan (Bardhaman)', 'Purba Medinipur (East Medinipur)', 'Purulia', 'South 24 Parganas', 'Uttar Dinajpur (North Dinajpur)'] }
  // Add more states and districts as needed
];
const StyledContainer = styled(Container)({
  backgroundColor: '#ffffff',
  padding: '32px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  marginTop: '64px',
  textAlign: 'center',
  width: '100%',
  margin: '64px auto',
});

const StyledSubContainer = styled(Container)({
  padding: '16px',
  borderRadius: '4px',
  boxShadow: '0 0 8px rgba(0,0,0,0.1)',
  marginBottom: '16px',
  textAlign: 'left',
});

const ProfileDetails: React.FC = () => {
  const [details, setDetails] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    day: '',
    month: '',
    year: '',
    gender: '',
    mobileNumber: '',
    address: '',
    state: '',
    district: '',
    pincode: '',
    email: '',
    termsAccepted: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch mobile number from Redux store
  const mobileNumber = useSelector((state: RootState) => state.user.mobileNumber);

  const handleContinue = () => {
    if (!details.firstName || !details.day || !details.month || !details.year || !details.gender || !details.address || !details.state || !details.district || !details.pincode || !details.termsAccepted) {
      alert('All fields are mandatory');
      return;
    }

    dispatch(setProfileDetails(details));
    navigate('/user-suggestions');
  };

  const handleInputChange = (key: string, value: string | boolean) => {
    if (key === 'pincode') {
      const pincodeValue = value as string;
      if (pincodeValue.length > 6) return;
      const pincodeRegex = /^[0-9]{0,6}$/;
      if (!pincodeRegex.test(pincodeValue)) {
        setErrors(prevErrors => ({ ...prevErrors, pincode: 'Pincode must be a 6-digit number.' }));
      } else {
        setErrors(prevErrors => ({ ...prevErrors, pincode: '' }));
      }
    }

    setDetails(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleStateChange = (state: string) => {
    // Find the selected state object
    const selectedState = indianStates.find(s => s.value === state);
    if (selectedState) {
      setDetails(prevState => ({
        ...prevState,
        state,
        district: '', // Reset district when state changes
      }));
    }
  };

  const renderMandatoryLabel = (label: string) => (
    <>
      {label}
      <span style={{ color: 'red' }}> *</span>
    </>
  );

  return (
    <StyledContainer>
      <Typography variant="h4">Personal Details</Typography>

      {/* Name Fields Subcontainer */}
      <StyledSubContainer>
        <Typography variant="h5">Name</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label={renderMandatoryLabel("First Name")}
              value={details.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Middle Name"
              value={details.middleName}
              onChange={(e) => handleInputChange('middleName', e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label={renderMandatoryLabel("Last Name")}
              value={details.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </StyledSubContainer>

      {/* Date of Birth and Gender Subcontainer */}
      <StyledSubContainer>
        <Typography variant="h5">Date of Birth</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              label={renderMandatoryLabel("Day")}
              value={details.day}
              onChange={(e) => handleInputChange('day', e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            >
              {days.map(day => (
                <MenuItem key={day} value={day}>{day}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              label={renderMandatoryLabel("Month")}
              value={details.month}
              onChange={(e) => handleInputChange('month', e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            >
              {months.map(month => (
                <MenuItem key={month} value={month}>{month}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              label={renderMandatoryLabel("Year")}
              value={details.year}
              onChange={(e) => handleInputChange('year', e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            >
              {years.map(year => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              label={renderMandatoryLabel("Gender")}
              value={details.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </StyledSubContainer>

      {/* Contact Details Subcontainer */}
      <StyledSubContainer>
        <Typography variant="h5">Contact Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Mobile Number"
              value={details.mobileNumber || mobileNumber}
              disabled
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </StyledSubContainer>

      {/* Address Fields Subcontainer */}
      <StyledSubContainer>
        <Typography variant="h5">Address Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label={renderMandatoryLabel("Address")}
              value={details.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label={renderMandatoryLabel("State")}
              value={details.state}
              onChange={(e) => handleStateChange(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            >
              {indianStates.map(state => (
                <MenuItem key={state.value} value={state.value}>{state.value}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label={renderMandatoryLabel("District")}
              value={details.district}
              onChange={(e) => handleInputChange('district', e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            >
              {/* Dynamic population of districts based on selected state */}
              {details.state &&
                indianStates
                  .find(s => s.value === details.state)
                  ?.districts.map(district => (
                    <MenuItem key={district} value={district}>{district}</MenuItem>
                  ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label={renderMandatoryLabel("Pincode")}
              value={details.pincode}
              onChange={(e) => handleInputChange('pincode', e.target.value)}
              fullWidth
              margin="normal"
              error={!!errors.pincode}
              helperText={errors.pincode}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </StyledSubContainer>

      {/* Terms and Conditions */}
      <StyledSubContainer>
        <FormControlLabel
          control={<Checkbox checked={details.termsAccepted} onChange={(e) => handleInputChange('termsAccepted', e.target.checked)} />}
          label="I agree to voluntarily share my identity information with NHA to create my ABHA Address"
        />
      </StyledSubContainer>

      <Button
        variant="contained"
        color="primary"
        onClick={handleContinue}
        style={{ marginTop: '16px' }}
        disabled={!details.termsAccepted}
      >
        Continue
      </Button>
    </StyledContainer>
  );
};

export default ProfileDetails;
