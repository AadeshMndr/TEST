import CryptoJS from "crypto-js";

import accessDB from "@/components/hooks/use-DB";

const secret_key = "shhh, It's a secret";

const encryptPassword = (password) => {
    const passPhrase = secret_key;
    const cipherText = CryptoJS.AES.encrypt(password, passPhrase).toString();

    return cipherText;
}

const decryptPassword = (cipherText) => {
    const passPhrase = secret_key;
    const password = CryptoJS.AES.decrypt(cipherText, passPhrase).toString(CryptoJS.enc.Utf8);

    return password;
}


const reqHandler = async (req, res) => {
    try{
    if (req.method === "POST"){

        await accessDB({
            DB: "Auth",
            collection: "users",
            data: req.body,
            action: userPoster,
        });

        res.status(201).json("registered");
    } else if (req.method === "PATCH") {
        
        const user = await accessDB({
            DB: "Auth",
            collection: "users",
            data: req.body,
            action: userGetter,
        });

        if (user.password === req.body.password){
            res.status(200).json(true);
        } else {
            res.status(401).json(false);
        }

    }
    } catch(err){
        console.log(err.message);
    }
}

export default reqHandler;

const userPoster = async (data, selectedCollection) => {
    let encryptedData = { ...data, password: encryptPassword(data.password) }

    let result = await selectedCollection.insertOne(encryptedData);

    return result;
}

const userGetter = async (data, selectedCollection) => {
    let [ result ] = await selectedCollection.find({ username: data.username }).toArray();

    result = { ...result, _id: result._id.toString(), password: decryptPassword(result.password) }

    return result;
}