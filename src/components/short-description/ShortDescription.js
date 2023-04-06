import { Typography } from '@mui/material'
import PropTypes from 'prop-types'
import Button from 'src/common/button/Button'
import { COLOR_THEME, Link_Target } from 'src/common/constants'
import rem from 'src/common/utils/css'
import theme, { SECONDARY_COLOR } from 'src/styles/theme'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((defaultTheme, props) => {
  const { indent, background_color } = props

  const background =
    background_color === COLOR_THEME.CHRISSY_FIELD
      ? SECONDARY_COLOR.LIGHT[40]
      : theme.palette.presidio.color.LIGHT_BACKGROUND

  return {
    container: {
      background: background,
      padding: `${rem('40')} ${rem('24')}`,
      [theme.breakpoints.up('md')]: {
        padding: rem('40'),
      },
      [theme.breakpoints.up('lg')]: {
        padding: `${rem('64')} ${
          indent === 'yes'
            ? `${rem('258')} ${rem('64')} ${rem('120')}`
            : `${rem('258')} ${rem('64')} ${rem('40')}`
        }`,
      },
      [theme.breakpoints.up('xl')]: {
        padding: `${rem('64')} ${
          indent === 'yes'
            ? `${rem('448')} ${rem('64')} ${rem('252')}`
            : `${rem('544')} ${rem('64')} ${rem('156')}`
        }`,
      },
    },
    title: {
      ...theme.typography.h3,
      marginBottom: rem('40'),
      color: theme.palette.primary.dark,
      [theme.breakpoints.down('md')]: {
        fontSize: rem('24'),
      },
    },
    description: {
      ...theme.typography.largeBody.default,
      color: theme.palette.presidio.color.DARK_GRAY,
    },
    button: {
      marginTop: rem('40'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 'auto',
      },
    },
  }
})

export default function ShortDescription(props) {
  const { data } = props
  if (!data) return null

  const { title, short_desc, cta_button, indent, background_color } = data
  if (!title && !short_desc) return null

  const { classes } = useStyles({ indent, background_color })

  return (
    <div className={classes.container}>
      <Typography className={classes.title}>{title}</Typography>
      <Typography className={classes.description}>{short_desc}</Typography>
      {cta_button && (
        <a href={cta_button.url} target={Link_Target[cta_button.target]}>
          <Button className={classes.button} variant={cta_button.variant}>
            CALL TO ACTION
          </Button>
        </a>
      )}
    </div>
  )
}

ShortDescription.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    short_desc: PropTypes.string,
    cta_button: PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string.isRequired,
      target: PropTypes.string,
      variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
    }),
    indent: PropTypes.oneOf(['yes', 'no']),
    background_color: PropTypes.oneOf([
      COLOR_THEME.THE_BAKER_BEACH,
      COLOR_THEME.CHRISSY_FIELD,
    ]),
  }).isRequired,
}
