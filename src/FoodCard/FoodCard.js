import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import red from '@material-ui/core/colors/red'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const styles = theme => ({
  card: {
    margin: '10px',
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
  state = { expanded: false }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  render() {
    const { classes, ingredientLines, label, image, calories } = this.props

    return (
      <Card className={classes.card}>
        <CardHeader
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={label}
          subheader="September 14, 2016"
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
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          {calories} cal
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph variant="body2">
              Method:
            </Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            </Typography>
          </CardContent>
        </Collapse>
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
}

export default withStyles(styles)(FoodCard)
