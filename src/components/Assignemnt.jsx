//frontend code

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Assignemnt = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/count")
      .then((res) => {
        console.log(res.data.count);
        setCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateCount = (action) => {
    axios
      .post("http://localhost:5000/count", { action })
      .then((res) => {
        setCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <p className="text-blue font-bold text-xl">Current Count: {count}</p>
      <div>
        <button
          className="bg-green-500 text-white p-6 rounded my-4"
          onClick={updateCount("increment")}
        >
          Increment
        </button>
      </div>
      <div>
        <button
          className="bg-red-500 text-white p-6 rounded"
          onClick={updateCount("decrement")}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Assignemnt;

//backend code

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

let count = 0;

app.get("/count", (req, res) => {
  res.json({ count });
});

app.post("/count", (req, res) => {
  const { action } = req.body;
  if (action === "increment") {
    count++;
  } else if (action === "decrement") {
    count--;
  }

  res.json({ count });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
