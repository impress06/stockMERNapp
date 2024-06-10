import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import InventoryIcon from "@mui/icons-material/Inventory"
import StoreIcon from "@mui/icons-material/Store"
import StarsIcon from "@mui/icons-material/Stars"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { useNavigate } from "react-router-dom"

const icons = [
  {
    icon: <SpaceDashboardIcon />,
    title: "Dashboard",
    url: "/stock/",
  },
  {
    title: "Firms",
    icon: <StoreIcon />,
    url: "/stock/firms/",
  },
  {
    title: "Products",
    icon: <InventoryIcon />,
    url: "/stock/products/",
  },
  {
    title: "Purchases",
    icon: <ShoppingCartIcon />,
    url: "/stock/purchases/",
  },
  {
    title: "Sales",
    icon: <AttachMoneyIcon />,
    url: "/stock/sales/",
  },
 
  {
    title: "Brands",
    icon: <StarsIcon />,
    url: "/stock/brands/",
  },

]

const MenuListItems = () => {
  const navigate = useNavigate()
  return (
    <List>
      {icons.map((item, index) => (
        <ListItem
          sx={{
            color: "black",
            "&:hover": { color: "#73BA9B" },
            "&:hover .MuiSvgIcon-root": { color: "#73BA9B" },
            "& .MuiSvgIcon-root": { color: "black" },
          }}
          key={index}
          disablePadding
          onClick={() => navigate(item.url)}
        >
          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default MenuListItems
