import * as React from 'react';
import {useState} from 'react';
import {alpha, styled} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {Link} from "react-router-dom";
import Divider from "@mui/material/Divider";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

type ButtonAppBarPropsType = {
    open: boolean;
    setOpen: (open: boolean) => void;
    changeSearchUserName: (name: string) => void;
}

export default function ButtonAppBar(props: ButtonAppBarPropsType) {
    const [title, setTitle] = useState('');

    const changeSearchUserName = () => {
        props.changeSearchUserName(title)
        setTitle('');
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{mr: 2}}
                        onClick={() => props.setOpen(!props.open)}
                    >
                        <MenuIcon/>
                    </IconButton>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                    >
                        <Link style={{textDecoration: 'none', color: 'inherit'}} to={'/'}>
                            Real time messenger
                        </Link>
                    </Typography>

                    <Search sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{'aria-label': 'search'}}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
                        <Link to={'/users'}>
                            <IconButton color="primary" sx={{p: '10px'}} aria-label="directions" onClick={changeSearchUserName}>
                                <SearchIcon/>
                            </IconButton>
                        </Link>
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
