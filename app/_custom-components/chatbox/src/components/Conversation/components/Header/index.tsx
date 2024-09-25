import { chatBoxProps } from "@/app/_custom-components/chatbox";

type Props = {
  title: chatBoxProps["title"];
  subtitle: string;
};

function Header({ title, subtitle }: Props) {
  return (
    <div className="bg-transparent">
      <div className="bg-chatBoxHeader rounded-t-3xl text-white text-center pt-2 pb-10">
        <h4 className="text-2xl py-4">{title}</h4>
        <span>{subtitle}</span>
      </div>
    </div>
  );
}

export default Header;
