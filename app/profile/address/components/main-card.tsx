import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
} from "@nextui-org/react";
import { IoLocation } from "react-icons/io5";
import { getUserLocation, mainConfig } from "../utils";
import { FaLocationArrow } from "react-icons/fa";
import { keyVals } from "@/app/_utils";
import LocationAutoCompleteInput from "./auto-complete";

export default function MainCardComponent({
  setMultipleData,
  config,
}: {
  setMultipleData: (keyVals: keyVals[]) => void;
  config: mainConfig;
}) {
  return (
    <>
      <CardHeader className="flex flex-col">
        <div className="font-bold flex justify-center text-2xl items-center">
          <IoLocation /> Select your location
        </div>
        <div className="flex justify-end w-full">
          <Button
            onClick={() => {
              getUserLocation((val: [number, number]) => {
                setMultipleData([
                  ["fly", true],
                  ["flyToLocation", val],
                ]);
              });
            }}
            endContent={<FaLocationArrow />}
            className="cursor-pointer p-3"
            color="primary"
            size="sm"
          >
            Go to your location
          </Button>
        </div>
      </CardHeader>

      <div className="m-2">
        <LocationAutoCompleteInput
          setLocation={(val, address) => {
            setMultipleData([
              ["fly", true],
              ["flyToLocation", val],
              ["address", address],
            ]);
          }}
        />
        <Skeleton isLoaded={config.isAddLoaded}>
          <Card className="my-3 min-h-20">
            <CardBody>
              <p>{config.address}</p>
            </CardBody>
          </Card>
        </Skeleton>
      </div>
    </>
  );
}
