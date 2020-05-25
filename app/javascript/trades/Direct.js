import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AxiosHelper from "../utils/AxiosHelper";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Card from "@material-ui/core/Card";

import Chat from "./Chat";
import Spinner from "../components/Spinner";

const Direct = () => {
  const [tradeReq, setTradeReq] = useState();
  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    AxiosHelper();
    axios.get(`/api/trade_requests/${id}`).then((resp) => {
      setTradeReq(resp.data);
    });
    return () => {};
  }, []);
  if (tradeReq) {
    return (
      <Card variant="outlined">
        <Chat tradeReq={tradeReq} handleBackClick={() => history.goBack()} />
      </Card>
    );
  }
  return <Spinner />;
};

export default Direct;
