import { productType } from "@/constants/constant";
import { ProductCardLabels } from "@/constants/labels.enums";
import { PersonalDetails } from "@/interfaces/interfaces";
import {
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";

interface ProductCardProps {
  personalDetails: PersonalDetails;
  setPersonalDetails: React.Dispatch<React.SetStateAction<PersonalDetails>>;
}

const ProductCard = ({
  personalDetails,
  setPersonalDetails,
}: ProductCardProps) => {
  return (
    <Card variant="outlined">
      <Box
        sx={{
          marginBottom: 2,
          borderBottom: 1,
          borderColor: "divider",
          borderRadius: 1,
          padding: "16px 0px 16px 20px ",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {ProductCardLabels.title}
        </Typography>
      </Box>
      <CardContent>
        <FormControl>
          <Typography variant="body2" gutterBottom>
            {ProductCardLabels.areYouInsured}
          </Typography>
          <RadioGroup
            row
            value={personalDetails.insured}
            onChange={(e) =>
              setPersonalDetails({
                ...personalDetails,
                insured: e.target.value,
              })
            }
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        <Grid2 size={12} sx={{ marginBottom: "10px", marginTop: "22px" }}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {ProductCardLabels.productType}
          </Typography>
          <FormControl fullWidth>
            <Select
              value={personalDetails.product}
              onChange={(e) =>
                setPersonalDetails({
                  ...personalDetails,
                  product: e.target.value,
                })
              }
            >
              {productType.map((product) => (
                <MenuItem key={product} value={product}>
                  {product}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default ProductCard;