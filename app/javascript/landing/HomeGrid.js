import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import GiftCard from "../gift/GiftCard";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const fetchGifts = () => {
  return axios.get("/api/gifts");
};

const HomeGrid = () => {
  const classes = useStyles();
  const [gifts, setGifts] = useState([]);
  useEffect(() => {
    fetchGifts().then((resp) => {
      setGifts(resp.data);
    });
    return () => {};
  }, []);

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {gifts.map((gift) => (
          <Grid key={gift.id} item xs={12} sm={6} md={4}>
            <GiftCard
              gift={gift}
              cardActions={
                <>
                  <Button
                    component={Link}
                    size="small"
                    color="primary"
                    to={`/gifts/${gift.id}`}
                  >
                    View
                  </Button>
                  <UserContext.Consumer>
                    {(value) => {
                      if (value) {
                        return (
                          <Button
                            size="small"
                            color="primary"
                            component={Link}
                            size="small"
                            color="primary"
                            to={`/gifts/${gift.id}/edit`}
                          >
                            Edit
                          </Button>
                        );
                      }
                    }}
                  </UserContext.Consumer>
                </>
              }
            ></GiftCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomeGrid;
