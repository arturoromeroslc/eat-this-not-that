import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import red from '@material-ui/core/colors/red'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import breakpoints from '../utils/breakpoints'

const styles = theme => ({
  card: {
    margin: '10px',
    display: 'inline-block',
    [breakpoints.tablet]: {
      width: '46%',
    },
    [breakpoints.desktop]: {
      width: '30%',
    },
  },
  cardHeader: {
    '&:hover': {
      cursor: 'pointer',
    },
    height: '64px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
})

class FoodCard extends PureComponent {
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  render() {
    const { classes, ingredientLines, label, image, calories, url } = this.props

    return (
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          onClick={() => {
            window.location = url
          }}
          action={
            <IconButton onClick={e => e.preventDefault()}>
              <MoreVertIcon />
            </IconButton>
          }
          title={label}
        />
        <CardMedia className={classes.media} image={image} />
        <CardContent>
          <Typography component="ul">
            {ingredientLines.map(ingredient => (
              <li key={shortid.generate()}>{ingredient}</li>
            ))}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            onClick={e => e.preventDefault()}
            aria-label="Add to favorites"
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton onClick={e => e.preventDefault()} aria-label="Share">
            <ShareIcon />
          </IconButton>
          {calories} cal
        </CardActions>
      </Card>
    )
  }
}

FoodCard.propTypes = {
  classes: PropTypes.object.isRequired,
  ingredientLines: PropTypes.array,
  label: PropTypes.string,
  image: PropTypes.string,
  calories: PropTypes.string,
  url: PropTypes.string,
}

export default withStyles(styles)(FoodCard)
