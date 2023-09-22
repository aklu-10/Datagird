import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from './redux/api/getResourceAsyncThunk.js';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RefreshIcon from '@mui/icons-material/Refresh';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TablePagination } from '@mui/material';
import { useTheme } from '@emotion/react';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { postProducts } from './redux/api/postResourceAsyncThunk.js';
import TableActions from './Components/TableActions/TableActions.jsx';
import { putProducts } from './redux/api/putResourceAsyncThunk.js';



function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const App = () => {

  let {value:rows, status, editData} = useSelector(state=>state.products);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filterData, setFilterData] = useState('?_start=0&_end='+rowsPerPage);
  const [Id, setId] = useState('');
  const [formValues, setFormValues] = useState({title:'', description:'', price:''});
  const [colIds, setColIds] = useState({page0:[]});
  let prevColIds = useRef();

  let dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'title',
      headerName: 'Title',
      width: 150,
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 150,
      editable: true,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 110,
      editable: true,
    },
   
  ];
  
  const actionColumns = [
    {
      field: 'actions', 
      headerName: 'Actions',
      width: 90,
      renderCell:(params)=>
      {
        return <TableActions Id={params.row.id} setId={setId} setOpen={setOpen} setFormValues={setFormValues}/>
      }
    }];

  const handleClickOpen = () => {
    if(!Id)
    {
      setFormValues({});
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setId('');
  };

  const handleChangePage = (event, newPage) => {
    if(newPage)
      setFilterData('?_start='+(newPage*rowsPerPage)+'&_end='+((rowsPerPage*newPage)+rowsPerPage))
    else
      setFilterData('?_start=0&_end='+rowsPerPage);
    setPage(newPage);

    prevColIds.current = {...prevColIds.current, ...colIds};

  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setFilterData('?_start=0&_end='+event.target.value);
    setPage(0);
  };

  const CustomPagination = () =>
  {
    return  <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
              count={31}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
  }


  const handleFieldsChanges = (e) => 
  {
    setFormValues((prev)=>({...prev, [e.target.name]:e.target.value}));
  }

  const handleSubmit = () =>
  {
    if(Id)
    {
      dispatch(putProducts({id:Id, body:formValues})); 
    }
    else
    {
      dispatch(postProducts(formValues)); 
    }

  }

  const handleRefresh = () =>
  {
    dispatch(getProducts(filterData));
  }

  useEffect(()=>
  {
    dispatch(getProducts(filterData));
  },[filterData]);

  useEffect(()=>
  {
    setFormValues({title:editData?.title, description:editData?.description, price:editData?.price})

  },[editData]);

  console.log(prevColIds.current)

  return (

    <>

        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h1>Product List</h1>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'10%'}}>
            <AddBoxIcon style={{fontSize:'2rem'}} onClick={handleClickOpen}/>
            <RefreshIcon style={{fontSize:'2rem'}} onClick={handleRefresh}/>
          </div>
        </div>
        
          <DataGrid
            rows={rows}
            columns={columns.concat(actionColumns)}
            loading={status!='success' ? true : false}
            onRowSelectionModelChange={(data)=>
              {
                setColIds({['page'+page]:data})
                prevColIds.current = {...prevColIds.current, ['page'+page]:data};

              }}

            checkboxSelection
            rowSelectionModel={prevColIds.current['page'+page]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: rowsPerPage,
                },
              },
            }}
            pageSizeOptions={[5,10]}
            disableRowSelectionOnClick
            components={{
              Pagination:CustomPagination
            }}
          />

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{Id ? 'Edit' : 'Add'}</DialogTitle>
            <DialogContent>
                <input type='text' placeholder='title' name='title' onChange={handleFieldsChanges} value={formValues.title}/>
                <input type='text' placeholder='description' name='description' onChange={handleFieldsChanges} value={formValues.description}/>
                <input type='text' placeholder='price' name='price' onChange={handleFieldsChanges} value={formValues.price}/>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
          </Dialog>



    </>

  )
}

export default App