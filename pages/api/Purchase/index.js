import accessDB from "@/components/hooks/use-DB";

const reqHandler = async (req, res) => {
  try {
    if (req.method === "POST") {

      await accessDB({
        DB: req.body.username,
        collection: req.body.time,
        data: { __Date: req.body.__Date, purchases: req.body.purchases },
        action: purchasePoster,
      });

      res.status(201).json("saved!");
    } else if (req.method === "PATCH") {

      let result = await accessDB({
        DB: req.body.username,
        collection: req.body.time,
        data: null,
        action: purchaseGetter,
      });

      res.status(200).json(result);
    }
  } catch (err) {
    console.log(err.message);
  }
};

const purchasePoster = async (data, selectedCollection) => {
  const check = await selectedCollection
    .find({ __Date: data.__Date })
    .toArray();

  let result = null;

  if (check.length > 0) {
    result = await selectedCollection.replaceOne(check[0], data);
  } else {
    result = await selectedCollection.insertOne(data);
  }

  return result;
};

const purchaseGetter = async (data, selectedCollection) => {
  let result = await selectedCollection.find().toArray();

  let final = [];
  result.forEach((day) => {
    final = [...final, ...day.purchases];
  });


  return final;
};

export default reqHandler;
