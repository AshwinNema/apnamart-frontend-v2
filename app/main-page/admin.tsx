import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import { FcBusinessman } from "react-icons/fc";
import { FaMapLocationDot } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { routes } from "../_utils";
import { useRouter } from "next/navigation";

export const AdminLandingPage = () => {
  const { admin } = routes;
  const itemList = [
    {
      key: admin.merchants,
      icon: <FcBusinessman />,
      description:
        "🛍️ Oversee and support our merchants to help them thrive in our marketplace.",
      title: "Manage Merchants",
    },
    {
      key: admin.deliveryArea,
      icon: <FaMapLocationDot />,
      description:
        "📍 Define and manage delivery zones to ensure our customers receive their orders on time.",
      title: "Set Delivery Areas",
    },
    {
      key: admin.product,
      icon: <AiFillProduct />,
      description:
        "📦Add, update, or remove products to keep our inventory fresh and appealing.",
      title: "Manage Products",
    },
  ];
  const router = useRouter();
  return (
    <>
      <Card className="m-5 mt-11">
        <CardHeader className="flex justify-center font-bold text-4xl">
          🌟 Welcome to the Admin Dashboard! 🌟
        </CardHeader>
        <CardBody>
          <div className="text-xl mt-8">
            As the backbone of our eCommerce platform, you play a crucial role
            in ensuring everything runs smoothly! Here, you have the power to:
          </div>
          <Listbox
            onAction={(key) => {
              router.push(key as string);
            }}
          >
            {itemList.map((item) => {
              return (
                <ListboxItem
                  key={item.key}
                  startContent={item.icon}
                  description={item.description}
                >
                  {item.title}
                </ListboxItem>
              );
            })}
          </Listbox>
        </CardBody>
        <CardFooter>
          <div>
            <div className="text-xl">
              Your efforts help create a seamless shopping experience for our
              users. Let’s make online shopping better together! 🚀
            </div>
            <p className="font-bold mt-5">
              Note: You can navigate to the above respective function by
              clicking on them or through menu in the nav bar
            </p>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};
