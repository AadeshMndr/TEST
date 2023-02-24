import accessDB, { getAll } from "@/components/hooks/use-DB";

const reqHandler = async (req, res) => {
  try {
    const sections = await getAll({
      DB: "Shop",
      collection: "sections",
    });

    let sectionName = req.query.ShopSectionNameAPI;
    let itemName = req.query.ItemNameAPI;

    const selectedSection = sections.filter(
      (section) => section.name === sectionName
    )[0];

    if (req.method === "PUT") {

      await accessDB({
        DB: "Shop",
        collection: "sections",
        data: { reqBody: req.body, selectedSection, itemName },
        action: itemPutter,
      });

      res.json(204).json("edited!");

    } else if (req.method === "DELETE") {
        
      await accessDB({
        DB: "Shop",
        collection: "sections",
        data: {selectedSection, itemName},
        action: itemDeleter,
      });

      res.json(204).json("deleted!");

    }
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
};

export default reqHandler;

const itemPutter = async (data, selectedCollection) => {
  let newItems = data.selectedSection.items.map((item) => {
    if (item.name === data.itemName) {
      return data.reqBody;
    } else {
      return item;
    }
  });

  let result = await selectedCollection.replaceOne(
    { name: data.selectedSection.name },
    { ...data.selectedSection, items: newItems }
  );

  return result;
};

const itemDeleter = async (data, selectedCollection) => {
    let newItems = data.selectedSection.items.filter( (item) => item.name !== data.itemName );

    let result = await selectedCollection.replaceOne(
        { name: data.selectedSection.name },
        { ...data.selectedSection, items: newItems }
      );
    
      return result;
}
