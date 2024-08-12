"use client";
import React from "react";
import { Listbox, ListboxItem, ListboxSection, Link } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { ImageComponent } from "../_custom-components";
import { browserTheme } from "../layout-components/theme-switch";
import { guideItem, guideItems } from "./constants";

export default function NotFound() {
  const { theme } = useTheme();
  return (
    <div className="flex justify-center mt-11">
      <div>
        <div className="flex justify-center">
          <div>
            <div>
              <ImageComponent
                width={256}
                height={256}
                src={`${theme === browserTheme.dark ? "https://res.cloudinary.com/ash006/image/upload/v1722048587/th_1_-removebg-preview_tzwznw.jpg" : "https://res.cloudinary.com/ash006/image/upload/v1722047691/th_1_og8ujy.jpg"}`}
                alt="Not found"
              />
            </div>
            <p className="text-4xl font-bold"> Page Not Found!</p>
          </div>
        </div>
        <div className=" flex justify-center">
          <div>
            <div className="text-2xl flex items-center justify-center"></div>
            <p>
              It looks like the page you’re trying to reach doesn’t exist
              anymore or may have moved.<Link href="/">Click here</Link> to go
              back to home page. Don’t worry; we’re here to help you find what
              you need!
            </p>

            <div>
              <Listbox aria-label="Documentation list" variant="flat">
                <ListboxSection title="You can refer below for understanding this project better">
                  {guideItems.map((item: guideItem) => {
                    const { key, description, Icon, mainText } = item;
                    return (
                      <ListboxItem
                        key={key}
                        description={description}
                        startContent={<Icon />}
                      >
                        {mainText}
                      </ListboxItem>
                    );
                  })}
                </ListboxSection>
              </Listbox>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
