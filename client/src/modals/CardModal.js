import { Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import { ModalStyle, actionCardStyle } from './style/globalStyle'
import BasicEditModal from './EditModal'
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import useStockCall from '../service/useStockCall';

const CardModal = ({cardData ,urlRoute=null}) => {
  console.log("cardData",cardData)
    const imagePath="https://www.fullstackteam.org/upload"
    const { deleteStock } = useStockCall();
    const handleDelete = (url,id) => {
        if (window.confirm("Are you sure you want to delete this?")) {
          deleteStock(url,id)
        }
      };
  return (
    
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(256px, 1fr))",
              gap: "10px",
            }}
          >
            {cardData?.map((item) => (
              <Card key={item._id} sx={ModalStyle}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    width="140"
                    height="140"
                    image={`${imagePath}/${item.image}`}
                   
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography  gutterBottom variant="h5" component="div">
                       {`${item.name.toUpperCase()}`}
                    </Typography>
                    {
                      item.adress && (  <Typography variant="body2" color="text.secondary">
                      Address: {item.adress}
                    </Typography>)
                    }
                  
                  {
                      item.phone && (  <Typography variant="body2" color="text.secondary">
                      Phone: {item.phone}
                    </Typography>)
                    }
                  </CardContent>
                </CardActionArea>
                <CardActions sx={actionCardStyle}>
                  <BasicEditModal url={urlRoute} firm={item} />
                  <IconButton
                    onClick={() => handleDelete(urlRoute,item._id)}
                    size="small"
                    color="primary"
                  >
                    <DeleteOutlineOutlinedIcon color="error" />
                    <Typography
                      variant="caption"
                      style={{ fontWeight: "normal", marginLeft: "4px" }}
                    >
                      DELETE
                    </Typography>
                  </IconButton>
                </CardActions>
              </Card>
            ))}
          </div>
         
        </div>
      )
}

export default CardModal