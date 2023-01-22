import React,{ Fragment } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
export default function Message({messages}) {
  return (
    <div>
    <List>
      {messages.flatMap((messageObject, index) => [(
        <ListItem alignItems="flex-start" key={index}>
          <ListItemAvatar>
            <Avatar alt="Avatar alt text" src={messageObject.user_avatar} />
          </ListItemAvatar>
          <ListItemText
            primary={messageObject.user_name}
            secondary={
              <Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  {messageObject.message_text}
                </Typography>
              </Fragment>
            }
          />
        </ListItem>
        ),<Divider variant="inset" component="li" key={"divider-"+index} />])}
    </List>
    </div>
  )
}
