import accessDB from "@/components/hooks/use-DB";

const reqHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      await accessDB({
        DB: "Shop",
        collection: "sections",
        data: req.body,
        action: sectionPoster,
      });

      res.status(201).json("added!");
    } catch (err) {
      console.log(err.message);
    }
  } else {
    try{
        const result = await accessDB({
            DB: "Shop",
            collection: "sections",
            data: null,
            action: sectionGetter,
        });

        res.status(200).json(result);
    } catch(err){
        console.log(err.message);
    }
  }
};

const sectionPoster = async (data, sections) => {
  let result = await sections.insertOne(data);
  return result;
};

const sectionGetter = async (data, sections) => {
    let result = await sections.find().toArray();
    return result;
}

export default reqHandler;
