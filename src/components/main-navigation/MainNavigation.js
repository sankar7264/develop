import React, { useEffect, useRef, useState } from 'react'
import { AppBar, Button, Typography, useMediaQuery } from '@mui/material'
import Toolbar from '@mui/material/Toolbar'
import { makeStyles } from 'tss-react/mui'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import theme from 'src/styles/theme'
import MegaMenu from 'src/components/main-navigation/mega-menu/MegaMenu'
import Search from 'src/components/main-navigation/search-bar/Search'
import SmallLogo from 'src/components/icons/SmallLogo'
import Drawer from 'src/components/main-navigation/drawer/Drawer'
import { APPBAR_HEIGHT } from 'src/common/constants'

const useStyles = makeStyles()((props) => ({
  appbar: {
    backgroundColor: theme.palette.presidio.color.BAKER_BEACH_GRAY,
    position: 'sticky',
    top: 0,
    margin: '0 auto',
    [theme.breakpoints.up('lg')]: {
      margin: `calc(-${APPBAR_HEIGHT} / 2) auto 0`,
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: theme.palette.presidio.color.BAKER_BEACH_GRAY,
    color: theme.palette.presidio.color.DARK_GRAY,
    zIndex: 100,
    position: 'absolute',
    top: '0',
    height: APPBAR_HEIGHT,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.16)',
    [theme.breakpoints.up('lg')]: {
      boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.24)',
      borderRadius: '5px',
    },
  },
  smallIconlogo: {
    [theme.breakpoints.up('lg')]: {
      cursor: 'pointer',
      display: 'flex',
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      color: theme.palette.primary.dark,
    },
  },
  tabsWrapper: {
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      gap: '1rem', // figma override
      // gap: '2rem', // figma
    },
    [theme.breakpoints.up('xl')]: {
      gap: '2rem', // figma override
    },
  },
  tabsContainer: {
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1.125rem', // figma override
      // gap: '2rem', // figma
    },
    [theme.breakpoints.up('xl')]: {
      gap: '2rem', // figma override
    },
  },
  tabContainer: {
    [theme.breakpoints.up('lg')]: {
      boxSizing: 'border-box',
      padding: '8px 8px 4px 8px',
    },
  },
  tab: {
    [theme.breakpoints.up('lg')]: {
      cursor: 'pointer',
      fontSize: '1.125rem !important', // figma override
      // fontSize: '1.5rem !important', // figma
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '1.5rem !important', // figma (not required if we keep fontSize to 1.5rem on lg screens)
    },
  },
  dividerLineContainer: {
    [theme.breakpoints.up('lg')]: {
      boxSizing: 'border-box',
      padding: '8px 8px 4px 8px',
    },
  },
  dividerLine: {
    [theme.breakpoints.up('lg')]: {
      borderRight: `2px solid ${theme.palette.primary.main}`,
    },
  },
  callToActionContainer: {
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '25px',
      background: theme.palette.primary.dark,
      padding: '5px 32px 7px',
    },
  },
  callToAction: {
    [theme.breakpoints.up('lg')]: {
      ...theme.typography.button,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      color: theme.palette.presidio.color.NEAR_WHITE,
      borderRadius: '0px',
      padding: '7px 0 3px',
      fontSize: '1rem !important', // figma override
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '1.125rem !important', // figma override
    },
  },
}))

export default function MainNavigation(props) {
  const { mainNavigationData, headerData } = props || {}

  const { classes } = useStyles(props)

  const router = useRouter()

  const [openMenu, setOpenMenu] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [activeTab, setActiveTab] = useState(null)
  const [menuItems, setMenuItems] = useState(null)

  // guards
  if (Object.keys(mainNavigationData).length === 0) {
    return null
  }

  // formatting logic for mega menu data
  const formattedMainNavigation =
    Object.values(mainNavigationData?.Megamenu) || []

  let routesArr
  let customLinks

  if (formattedMainNavigation.length !== 0) {
    routesArr = formattedMainNavigation.slice(
      0,
      formattedMainNavigation.length - 1
    )
    customLinks = formattedMainNavigation.pop()
  }

  const formattedCustomLinks = Object.values(customLinks?.menuitem) || []

  const handleTabClick = (e, route) => {
    /**
     * Close mega menu if same tab is selected
     * swap mega menu content if a different tab is selected
     * keep mega menu closed if there is no content available
     */

    if (anchorEl === e.target) {
      // we are targeting the same tab which is selected
      setOpenMenu(!openMenu)
      setMenuItems(null)
      setActiveTab(null)
      setAnchorEl(null)
      return
    }

    if (route.menuitem && route.menuitem.length !== 0) {
      setOpenMenu(true)
      setAnchorEl(e.target)
      setMenuItems({
        menuItems: route.menuitem,
        menuHeader: route.description,
        menuCard: route.feature__article,
      })
      setActiveTab(route.title)
    } else {
      setOpenMenu(false)
      setAnchorEl(null)
      setMenuItems(null)
      setActiveTab(null)
    }
  }

  const lgUp = useMediaQuery(() => theme.breakpoints.up('lg'))
  const xlUp = useMediaQuery(() => theme.breakpoints.up('xl'))

  // Determining navigation bar's position using IntersectionObserver to set isSticky state
  const ref = useRef()
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const cachedRef = ref.current
    const observer = new IntersectionObserver(
      ([e]) => setIsSticky(e.intersectionRatio < 1),
      {
        threshold: [1],
        rootMargin: '-1px 0px 0px 0px', // alternatively, use this and set `top:0` in the CSS
      }
    )

    observer.observe(cachedRef)

    return function () {
      observer.unobserve(cachedRef)
    }
  }, [])

  // Determining app bar width as per device size
  console.log({ lgUp, xlUp })
  let appBarWidth = '100%'
  if (lgUp && !xlUp) appBarWidth = '92.57%'
  // if (xlUp) appBarWidth = '78.33%' // figma
  if (xlUp) appBarWidth = '85%' // figma override

  const tabs = (
    <div className={classes.tabsWrapper}>
      <div className={classes.tabsContainer}>
        {isSticky && (
          <div
            className={classes.smallIconlogo}
            onClick={() => router.push('/')}
            onKeyDown={() => router.push('/')}
          >
            <SmallLogo height="39" width="32" />
          </div>
        )}
        {routesArr &&
          routesArr.map((route) => (
            <div key={route.menuid}>
              <div className={classes.tabContainer}>
                <Typography
                  variant="h4"
                  className={classes.tab}
                  sx={{
                    marginBottom: '2px',
                    color:
                      activeTab === route.name && theme.palette.primary.dark,
                  }}
                  onClick={(e) => handleTabClick(e, route)}
                  onKeyDown={(e) => handleTabClick(e, route)}
                >
                  {route.title}
                </Typography>
                <div
                  style={{
                    borderBottom:
                      activeTab === route.title
                        ? `2px solid ${theme.palette.primary.main}`
                        : `2px solid transparent`, // prevents layout shift
                  }}
                />
              </div>
            </div>
          ))}
        {openMenu && menuItems && <MegaMenu menuData={menuItems} />}
      </div>
      <div className={classes.dividerLineContainer}>
        <span className={classes.dividerLine} />
      </div>
      {formattedCustomLinks[0].title && (
        <Search
          iconColor={theme.palette.presidio.color.DARK_GRAY}
          iconHeight="22"
          iconWidth="22"
          label={formattedCustomLinks[0].title}
        />
      )}
      {formattedCustomLinks[1].title && (
        <div className={classes.callToActionContainer}>
          <Button
            disableRipple
            aria-label={formattedCustomLinks[1].title}
            className={classes.callToAction}
            onClick={() => {
              router.push(formattedCustomLinks[1].url)
            }}
          >
            {formattedCustomLinks[1].title}
          </Button>
        </div>
      )}
    </div>
  )

  return (
    <AppBar
      className={classes.appbar}
      ref={ref}
      style={{
        width: isSticky ? '100%' : appBarWidth,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Toolbar disableGutters className={classes.toolbar}>
          {lgUp ? (
            tabs
          ) : (
            <Drawer
              mainNavigationData={mainNavigationData}
              headerData={headerData}
            />
          )}
        </Toolbar>
      </div>
    </AppBar>
  )
}

MainNavigation.propTypes = {
  mainNavigationData: PropTypes.shape({
    Megamenu: PropTypes.object.isRequired,
  }),
  // eslint-disable-next-line react/no-unused-prop-types
  headerData: PropTypes.object,
}
