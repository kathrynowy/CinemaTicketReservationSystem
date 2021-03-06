import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AppBar, Toolbar, IconButton, Typography, InputBase, MenuItem, Menu } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { logOut } from '../../actions/users';
import { filterMovies } from '../../sagas/movies';
import { history } from '../../App';
import { CHECK_AUTH, LOG_OUT } from '../../constans/actionTypes';


const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    lineHeight: '1.35',
    fontSize: '30px',
    cursor: 'pointer'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
    color: 'white'
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    opacity: '0.8'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  app: {
    background: 'linear-gradient(15deg,#000,#51102b 100%,#51102b)',
    color: '#880e4f'
  },
  sectionDesctopLinks: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  sectionDesctopLinksItem: {
    textAlign: 'center',
    margin: '0 0.5rem',
    alignSelf: 'center',

  },
  sectionDesctopLink: {
    color: 'white',
    opacity: '0.8',
    textDecoration: 'none',
    fontSize: '1.1rem',
  },
  moreIcon: {
    color: 'white',
    opacity: '0.8'
  }
});

class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  filterMovies = (event) => {
    this.props.onFilterMovies(event.target.value);
  }

  handleLogOut = () => {
    this.props.logOut();
    this.handleMenuClose();
  }

  handleRedirect = () => {
    history.push('/profile');
    this.handleMenuClose();
  }

  componentDidMount() {
    this.props.checkAuth();
  }

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleRedirect}>Profile</MenuItem>}
        <MenuItem onClick={this.handleLogOut}>Log out</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p >Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.app}>
          <Toolbar>
            <IconButton
              className={classes.menuButton && classes.sectionMobile}
              onClick={this.props.click}
              color="inherit"
              aria-label="Open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} onClick={() => history.push('/')} variant="h6" color="inherit" noWrap>
              CineGo
            </Typography>
            {
              this.props.isSearchInputShown
                ? <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    onChange={this.filterMovies} />
                </div>
                : ''
            }
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>

              <ul className={classes.sectionDesctopLinks}>
                <li className={classes.sectionDesctopLinksItem}>
                  <Link to={{ pathname: "/" }} className={classes.sectionDesctopLink}> Main Page </Link>
                </li>
                {
                  !this.props.currentUser.id && <li className={classes.sectionDesctopLinksItem}>
                    <Link to={{ pathname: "/sign-in" }} className={classes.sectionDesctopLink}> Sign In </Link>
                  </li>
                }
                {
                  !this.props.currentUser.id && <li className={classes.sectionDesctopLinksItem}>
                    <Link to={{ pathname: "/sign-up" }} className={classes.sectionDesctopLink}> Sign Up </Link>
                  </li>
                }
              </ul>

              {this.props.currentUser.username && <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
                className={classes.moreIcon}
              >
                <AccountCircle />
              </IconButton>
              }
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit" className={classes.moreIcon}>
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {this.props.currentUser.username && renderMenu}
        {this.props.currentUser.username && renderMobileMenu}
      </div>
    );
  }
}


PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = store => ({
  currentUser: store.users.currentUser
})

const mapDispatchToProps = dispatch => ({
  onFilterMovies(value) {
    dispatch(filterMovies(value));
  },
  logOut() {
    dispatch({ type: LOG_OUT });
  },
  checkAuth() {
    dispatch({ type: CHECK_AUTH })
  }
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PrimarySearchAppBar));
