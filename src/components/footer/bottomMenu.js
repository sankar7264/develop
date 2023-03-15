import { Grid, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import theme from 'src/styles/theme'
import { useState } from 'react'
import PresidioLogo from 'src/components/icons/FullLogo'
import Link from 'next/link'

const useStyles = makeStyles(theme)((props) => ({
  root: {
    '& ul': {
      listStyleType: 'none' /* Remove bullets */,
      padding: 0 /* Remove padding */,
      margin: 0,
    },
    '& a': {
      color: theme.palette.presidio.color.NEAR_WHITE,
    },
    '& li': {
      padding: '5px 0',
    },
    paddingTop: '48px',
  },
  typo: {
    color: theme.palette.presidio.color.BAKER_BEACH_WHITE,
  },
}))

const BottomMenu = (props) => {
  const { data } = props
  const [menu, setMenu] = useState(Object.values(data))
  const { classes } = useStyles(props)
  return (
    <>
      <div>
        <PresidioLogo color={theme.palette.presidio.color.NEAR_WHITE} />
      </div>
      <div className={classes.root}>
        <Grid container spacing={5}>
          {menu.map((i) => (
            <Grid item xs={12} sm={4}>
              <ul>
                <li>
                  <Typography className={classes.typo} variant="h4">
                    {i.title}
                  </Typography>
                </li>
                {Object.values(i.menuitem).map((j) => (
                  <li>
                    <Link href="#">{j.title}</Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  )
}

export default BottomMenu
