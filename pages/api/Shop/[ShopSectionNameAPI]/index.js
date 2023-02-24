import accessDB, { getAll } from "@/components/hooks/use-DB";

const reqHandler = async (req, res) => {
    const sections = await getAll( {DB: "Shop", collection: "sections"} );

    const [ selectedSection ] = sections.filter( (section) => section.name === req.query.ShopSectionNameAPI );

    if (req.method === "PUT"){

        await accessDB( {DB: "Shop", collection: "sections", data: { selectedSection, reqBody: req.body }, action: sectionPutter} );

        res.status(204).json("updated!");
        
    } else if (req.method === "DELETE"){
        
        await accessDB( {DB: "Shop", collection: "sections", data: { selectedSection }, action: sectionDeleter} );

        res.status(202).json("deleted!");

    } else if (req.method === "POST"){

        await accessDB( {DB: "Shop", collection: "sections", data: { selectedSection, reqBody: req.body }, action: itemPoster} );

        res.status(201).json("added!");

    }
}

const sectionPutter = async (data, selectedCollection) => {
    let result = await selectedCollection.replaceOne({ name: data.selectedSection.name}, { ...data.selectedSection , ...data.reqBody});
    return result;
}

const sectionDeleter = async (data, selectedCollection) => {
    let result = await selectedCollection.deleteOne(data.selectedSection);
    return result;
}

const itemPoster = async (data, selectedCollection) => {
    let result = await selectedCollection.replaceOne( {name: data.selectedSection.name}, {...data.selectedSection, items: [...data.selectedSection.items, data.reqBody] } );
    return result;
}

export default reqHandler;