import React from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getProductById, getProducts } from '../../redux/api/getResourceAsyncThunk.js';
import { useDispatch, useSelector } from 'react-redux';

const TableActions = ({Id, setId, setOpen, setFormValues}) => {

    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleEdit = () =>
    {
        setId(Id);
        dispatch(getProductById(Id))
        setOpen(true);
        setAnchorEl(null);
    }

  return (
    <div>
    <Button
      id="basic-button"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
    >
      <MoreVertIcon/>
    </Button>
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={handleEdit}>Edit</MenuItem>
      <MenuItem onClick={handleClose}>Delete</MenuItem>
    </Menu>
  </div>

  )
}

export default TableActions