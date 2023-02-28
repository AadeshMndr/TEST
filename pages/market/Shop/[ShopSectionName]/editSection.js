import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import useHTTP from "@/components/hooks/use-HTTP";
import { getAll } from "@/components/hooks/use-DB";
import MarketLayout from "@/layouts/MarketLayout";
import AddShopSectionForm from "@/components/Shop/AddShopSectionForm";
import { ShopActions } from "@/store/ShopSlice";
import { usersActions } from "@/store/UsersSlice";

const EditSection = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { error, loading, fetcher } = useHTTP();
  const sections = useSelector((state) => state.shop.sections);

  const selectedSection_Name = useSelector(
    (state) => state.shop.selectedSection_Name
  );

  useEffect(() => {
    let newData = data;

    if (sections.length > 0){
      newData = sections;
    }

    dispatch(ShopActions.replaceSections(newData));
  }, []);


  const listOfNames = sections
    .map((section) => section.name)
    .filter((name) => name !== selectedSection_Name);

  const [sectionObj] = sections.filter(
    (section) => selectedSection_Name === section.name
  );
  let name = "", image = "";
  if (sectionObj) {
    name = sectionObj.name;
    image = sectionObj.image;
  }

  const updateData = async (data) => {
    dispatch(usersActions.reevaluatePurchasedSections( {sectionName: selectedSection_Name, newSectionName: data.name } ))
    dispatch(ShopActions.updateSection(data));
    
    await fetcher({
      URL: `/api/Shop/${selectedSection_Name}`,
      method: "PUT",
      body: data,
      headers: {
        "Content-Type": "application/json"
      },
    });

    router.push("/market/Shop");
  };

  const deleteSection = async () => {
    dispatch(ShopActions.removeSection());

    await fetcher({
      URL: `/api/Shop/${selectedSection_Name}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    });

    router.push("/market/Shop");
  };

  return (
    <AddShopSectionForm
      defaultName={name}
      defaultImage={image}
      saveData={updateData}
      listOfNonRepeatableItems={listOfNames}
      type="Edit"
      deleteSection={deleteSection}
      isEditing={loading}
    />
  );
};

EditSection.Layout = MarketLayout;

export default EditSection;

//server-side-code
export const getStaticProps = async () => {
  const sections = await getAll({
    DB: "Shop",
    collection: "sections",
  });

  return {
    props: {
      data: sections.map((section) => ({
        ...section,
        _id: section._id.toString(),
      })),
    },

    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  const sections = await getAll({
    DB: "Shop",
    collection: "sections",
  });

  const paths = sections.map((section) => ({
    params: { ShopSectionName: section.name },
  }));

  return {
    fallback: "blocking",
    paths,
  };
};
