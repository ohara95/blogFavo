import React, { FC } from 'react';
import Main from '../Main';

// material
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import TurnedInNotRoundedIcon from '@material-ui/icons/TurnedInNotRounded';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

type Props = {
  data: number[]; //適当
  title: string;
  number?: number;
  isCategory?: boolean;
  memo: string;
  tag?: string;
};

const PageDetail: FC<Props> = ({
  data,
  title,
  number,
  isCategory = false,
  memo,
  tag,
}) => {
  const classes = useStyles();
  console.log(data);

  return (
    // <Main>
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {data.map((card) => (
          <Grid item key={card} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image="https://source.unsplash.com/random"
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {title}
                </Typography>
                {isCategory && (
                  <Typography gutterBottom variant="h5" component="h2">
                    ({number})
                  </Typography>
                )}
                <Typography>{memo}</Typography>
                <Typography>{tag}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  blog
                </Button>
                <Button size="small" color="primary">
                  edit
                </Button>
                {isCategory && (
                  <>
                    <Button size="small" color="primary">
                      <StarBorderRoundedIcon />
                    </Button>
                    <Button size="small" color="primary">
                      <TurnedInNotRoundedIcon />
                    </Button>
                  </>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    // </Main>
  );
};

export default PageDetail;
